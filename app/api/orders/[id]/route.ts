import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Unauthorized', 401);

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return errorResponse('Order not found', 404);
    }

    if (order.userId !== userId) {
      return errorResponse('Forbidden: Access denied to this order', 403);
    }

    return successResponse(order);
  } catch (error: any) {
    console.error('Failed to fetch order details:', error);
    return errorResponse('Internal server error', 500);
  }
}
