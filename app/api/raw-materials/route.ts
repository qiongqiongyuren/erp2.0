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
    console.log('收到的原材料数据:', body);
    
    // 确保数据正确处理
    const data = {
      name: body.name ? body.name.toString() : '',
      price: typeof body.price === 'number' ? body.price : parseFloat(body.price?.toString() || '0'),
      stock: typeof body.stock === 'number' ? body.stock : parseInt(body.stock?.toString() || '0'),
      unit: body.unit ? body.unit.toString() : '',
      description: body.description ? body.description.toString() : ''
    };
    
    // 确保数字字段是有效的数字
    if (isNaN(data.price)) data.price = 0;
    if (isNaN(data.stock)) data.stock = 0;
    
    console.log('处理后的数据:', data);
    
    const material = await prisma.rawMaterial.create({ data });
    console.log('成功创建的原材料:', material);
    return NextResponse.json(material);
  } catch (error: any) {
    console.error('新增原材料失败:', error);
    let errorMessage = '新增失败';
    if (error.code) {
      errorMessage = `数据库错误: ${error.message}`;
    } else if (error.name === 'ValidationError') {
      errorMessage = `数据验证失败: ${error.message}`;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
