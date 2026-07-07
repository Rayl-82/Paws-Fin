import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: { id: true, name: true, price: true, imageUrl: true }
        }
      },
      orderBy: { id: 'asc' }
    });

    const items = cartItems.map(item => ({
      id: item.id,
      product: item.product,
      quantity: item.quantity,
      subtotal: item.quantity * item.product.price
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    return successResponse({ items, total });
  } catch (error: any) {
    console.error('Failed to fetch cart:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { productId, quantity = 1 } = body;

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return errorResponse('Invalid product ID or quantity', 400);
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    if (product.stock < quantity) {
      return errorResponse('Not enough stock available', 400);
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: { userId, productId }
    });

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;
      if (product.stock < newQuantity) {
        return errorResponse('Not enough stock available for total quantity', 400);
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
        include: { product: true }
      });
      return successResponse(updatedItem);
    }

    const newCartItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity
      },
      include: { product: true }
    });

    return successResponse(newCartItem, 201);
  } catch (error: any) {
    console.error('Failed to add to cart:', error);
    return errorResponse('Internal server error', 500);
  }
}
