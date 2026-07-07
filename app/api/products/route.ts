import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    
    // Pagination defaults
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    
    // Validate pagination
    const safePage = page > 0 ? page : 1;
    const safeLimit = limit > 0 && limit <= 100 ? limit : 20;
    const skip = (safePage - 1) * safeLimit;

    const category = searchParams.get('category');
    const excludeCategory = searchParams.getAll('excludeCategory');
    const search = searchParams.get('search');
    const petType = searchParams.getAll('petType'); 
    const health = searchParams.getAll('health');
    const productType = searchParams.getAll('productType');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '99999999');

    let whereClause: any = {};
    const AND = [];

    if (search) {
      AND.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ]
      });
    }

    if (petType.length > 0) {
      AND.push({ OR: petType.map(pt => ({ description: { contains: pt, mode: 'insensitive' } })) });
    }
    if (health.length > 0) {
      AND.push({ OR: health.map(h => ({ description: { contains: h, mode: 'insensitive' } })) });
    }
    if (productType.length > 0) {
      AND.push({ OR: productType.map(pt => ({ category: { contains: pt, mode: 'insensitive' } })) });
    }
    if (category) {
      AND.push({ category });
    }
    if (excludeCategory.length > 0) {
      AND.push({ category: { notIn: excludeCategory } });
    }
    if (minPrice > 0 || maxPrice < 99999999) {
      AND.push({ price: { gte: minPrice, lte: maxPrice } });
    }

    if (AND.length > 0) {
      whereClause.AND = AND;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        skip,
        take: safeLimit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where: whereClause })
    ]);

    return successResponse({
      products,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit)
      }
    });
  } catch (error: any) {
    console.error('Failed to fetch products:', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Admin validation
    const userRole = req.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return errorResponse('Forbidden: Admin access required', 403);
    }

    const body = await req.json();
    const { name, description, price, stock, imageUrl, category } = body;

    // Validation
    if (!name || !description || price === undefined) {
      return errorResponse('Missing required fields: name, description, price', 400);
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        ...(stock !== undefined && { stock: parseInt(stock, 10) }),
        ...(imageUrl && { imageUrl }),
        ...(category && { category })
      }
    });

    return successResponse(product, 201);
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return errorResponse('Internal server error', 500);
  }
}
