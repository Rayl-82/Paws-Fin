import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let product = await prisma.product.findUnique({
      where: { id }
    });

    // Fallback: If banner dummy ID is used, find the actual product by name in the DB
    if (!product && (id === 'prod1' || id === 'sub1' || id === 'sub2')) {
      const bannerProductNames: Record<string, string> = {
        'prod1': 'Premium Salmon Treats',
        'sub1': 'Ocean Omega Box',
        'sub2': 'Kitten Starter Pack'
      };
      
      product = await prisma.product.findFirst({
        where: { name: bannerProductNames[id] }
      });
    }

    if (!product && (id === 'sub1' || id === 'sub2' || id === 'sub3')) {
      const mockSubs = {
        'sub1': { id: 'sub1', name: 'Kotak Ocean Omega', price: 375000, description: 'Pengiriman bulanan kotak ikan premium kami', imageUrl: '/images/sub1.png', category: 'Subscription', features: ['Tinggi Omega-3', 'Bebas Biji-bijian'], billingInterval: 'Bulanan', stock: 100, createdAt: new Date() },
        'sub2': { id: 'sub2', name: 'Kotak Hewan Aktif', price: 450000, description: 'Cemilan protein energi tinggi untuk hewan peliharaan aktif', imageUrl: '/images/sub2.png', category: 'Subscription', features: ['Tinggi Protein', 'Dukungan Energi'], billingInterval: 'Bulanan', stock: 100, createdAt: new Date() },
        'sub3': { id: 'sub3', name: 'Kotak Perawatan Senior', price: 345000, description: 'Cemilan lembut, mudah dikunyah dengan dukungan sendi', imageUrl: '/images/sub3.png', category: 'Subscription', features: ['Mudah Dikunyah', 'Dukungan Sendi'], billingInterval: 'Bulanan', stock: 100, createdAt: new Date() }
      };
      product = mockSubs[id as keyof typeof mockSubs] as any;
    }

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(product);
  } catch (error: any) {
    console.error('Failed to fetch product:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Admin validation
    const userRole = req.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return errorResponse('Forbidden: Admin access required', 403);
    }

    const { id } = await params;
    const body = await req.json();

    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return errorResponse('Product not found', 404);
    }

    const { name, description, price, stock, imageUrl, category } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock, 10) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(category !== undefined && { category })
      }
    });

    return successResponse(updatedProduct);
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Admin validation
    const userRole = req.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return errorResponse('Forbidden: Admin access required', 403);
    }

    const { id } = await params;

    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return errorResponse('Product not found', 404);
    }

    await prisma.product.delete({
      where: { id }
    });

    return successResponse({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete product:', error);
    return errorResponse('Internal server error', 500);
  }
}
