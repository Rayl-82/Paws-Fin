import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: {
              select: { id: true, name: true, imageUrl: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return successResponse(orders);
  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { shippingAddress, notes } = body;

    if (!shippingAddress || shippingAddress.trim() === '') {
      return errorResponse('Shipping address is required', 400);
    }

    // 1. Fetch user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return errorResponse('Cart is empty', 400);
    }

    // 2. Validate stock and calculate total
    let subtotal = 0;
    const shippingFee = 10000; 

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return errorResponse(`Not enough stock for ${item.product.name}`, 400);
      }
      subtotal += item.product.price * item.quantity;
    }
    
    const totalPrice = subtotal + shippingFee;

    // 3. Create order, order items, update stock, clear cart in a transaction
    const order = await prisma.$transaction(async (tx: any) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          shippingAddress,
          notes,
          status: 'Processing',
          orderItems: {
            create: cartItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price // Lock in the price
            }))
          }
        }
      });

      // Update product stock
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Clear the user's cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return newOrder;
    });

    return successResponse(order, 201);
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return errorResponse('Internal server error', 500);
  }
}
