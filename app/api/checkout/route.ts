import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { shippingAddress, notes } = body;

    // Fetch user's cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return errorResponse('Cart is empty', 400);
    }

    // Use Prisma transaction for safe checkout
    const order = await prisma.$transaction(async (tx: any) => {
      // 1. Verify stock for all items
      let totalPrice = 0;
      for (const item of cartItems) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product || product.stock < item.quantity) {
          throw new Error(`Product ${item.product.name} is out of stock`);
        }

        totalPrice += product.price * item.quantity;
      }

      // 2. Create Order and nested OrderItems
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          status: 'paid', // Auto-paid for demo
          shippingAddress,
          notes,
          orderItems: {
            create: cartItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price // Snapshot price at checkout
            }))
          }
        },
        include: { orderItems: true }
      });

      // 3. Decrement Product Stock
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // 4. Clear the user's cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return newOrder;
    });

    return successResponse(order, 201);
  } catch (error: any) {
    console.error('Checkout failed:', error);
    // Return specific stock error message if it was thrown intentionally
    if (error.message && error.message.includes('out of stock')) {
      return errorResponse(error.message, 400);
    }
    return errorResponse('Internal server error', 500);
  }
}
