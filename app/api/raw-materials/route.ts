import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET: 获取所有原材料
export async function GET() {
  try {
    const materials = await prisma.rawMaterial.findMany();
    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: 新增原材料
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = {
      name: body.name || '',
      price: parseFloat(body.price) || 0,
      stock: parseInt(body.stock) || 0,
      unit: body.unit || '',
      description: body.description || ''
    };
    
    const material = await prisma.rawMaterial.create({ data });
    return NextResponse.json(material);
  } catch (error: any) {
    console.error('新增原材料失败:', error);
    return NextResponse.json(
      { error: '新增失败' },
      { status: 500 }
    );
  }
}
