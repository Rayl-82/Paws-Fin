import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const { id } = await params;
    const body = await req.json();
    const { quantity } = body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return errorResponse('Invalid quantity', 400);
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!cartItem) return errorResponse('Cart item not found', 404);
    if (cartItem.userId !== userId) return errorResponse('Forbidden', 403);

    if (cartItem.product.stock < quantity) {
      return errorResponse('Not enough stock available', 400);
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: { product: true }
    });

    return successResponse(updatedItem);
  } catch (error: any) {
    console.error('Failed to update cart item:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const { id } = await params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id }
    });

    if (!cartItem) return errorResponse('Cart item not found', 404);
    if (cartItem.userId !== userId) return errorResponse('Forbidden', 403);

    await prisma.cartItem.delete({
      where: { id }
    });

    return successResponse({ message: 'Item removed from cart' });
  } catch (error: any) {
    console.error('Failed to delete cart item:', error);
    return errorResponse('Internal server error', 500);
  }
}
