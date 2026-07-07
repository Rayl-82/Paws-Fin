import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = await params;
    const body = await req.json();
    
    // Check ownership
    const existingPet = await prisma.pet.findUnique({
      where: { id }
    });

    if (!existingPet) {
      return errorResponse('Pet not found', 404);
    }

    if (existingPet.userId !== userId) {
      return errorResponse('Forbidden: You do not own this pet profile', 403);
    }

    const { 
      petName, 
      species, 
      breed, 
      age, 
      weight, 
      activityLevel, 
      healthCondition 
    } = body;

    const updatedPet = await prisma.pet.update({
      where: { id },
      data: {
        ...(petName && { petName }),
        ...(species && { species }),
        ...(breed !== undefined && { breed }),
        ...(age !== undefined && { age: age !== null ? parseInt(age) : null }),
        ...(weight !== undefined && { weight: weight !== null ? parseFloat(weight) : null }),
        ...(activityLevel !== undefined && { activityLevel }),
        ...(healthCondition !== undefined && { healthCondition })
      }
    });

    return successResponse(updatedPet);
  } catch (error: any) {
    console.error('Failed to update pet:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = await params;

    // Check ownership
    const existingPet = await prisma.pet.findUnique({
      where: { id }
    });

    if (!existingPet) {
      return errorResponse('Pet not found', 404);
    }

    if (existingPet.userId !== userId) {
      return errorResponse('Forbidden: You do not own this pet profile', 403);
    }

    await prisma.pet.delete({
      where: { id }
    });

    return successResponse({ message: 'Pet deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete pet:', error);
    return errorResponse('Internal server error', 500);
  }
}
