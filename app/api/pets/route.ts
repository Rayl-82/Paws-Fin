import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
      return errorResponse('Unauthorized', 401);
    }

    let pets = await prisma.pet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (pets.length === 0) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user && user.email === 'dummy@example.com') {
        pets = [
          {
            id: 'dummy-dog',
            userId,
            petName: 'Luna',
            species: 'Dog',
            breed: 'Golden Retriever',
            age: 3,
            weight: 15.5,
            activityLevel: 'Aktif',
            healthCondition: 'Dukungan Sendi',
            createdAt: new Date(),
          },
          {
            id: 'dummy-cat',
            userId,
            petName: 'Milo',
            species: 'Cat',
            breed: 'Persian',
            age: 2,
            weight: 4.5,
            activityLevel: 'Sedang',
            healthCondition: 'Kesehatan Kulit & Bulu',
            createdAt: new Date(),
          }
        ];
      }
    }

    return successResponse(pets);
  } catch (error: any) {
    console.error('Failed to fetch pets:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await req.json();
    const { 
      petName, 
      species, 
      breed, 
      age, 
      weight, 
      activityLevel, 
      healthCondition 
    } = body;

    // Validation
    if (!petName || !species) {
      return errorResponse('Missing required fields: petName, species', 400);
    }

    const pet = await prisma.pet.create({
      data: {
        userId,
        petName,
        species,
        ...(breed && { breed }),
        ...(age && { age: parseInt(age) }),
        ...(weight && { weight: parseFloat(weight) }),
        ...(activityLevel && { activityLevel }),
        ...(healthCondition && { healthCondition })
      }
    });

    return successResponse(pet, 201);
  } catch (error: any) {
    console.error('Failed to create pet:', error);
    return errorResponse('Internal server error', 500);
  }
}
