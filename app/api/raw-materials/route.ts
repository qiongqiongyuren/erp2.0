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
    
    // 严格验证数据
    const errors: string[] = [];
    
    // 验证必填字段
    if (!body.name || typeof body.name !== 'string') {
      errors.push('名称必须是字符串');
    }
    if (body.price === undefined || isNaN(parseFloat(body.price?.toString() || '0'))) {
      errors.push('单价必须是数字');
    }
    if (body.stock === undefined || isNaN(parseInt(body.stock?.toString() || '0'))) {
      errors.push('库存必须是数字');
    }
    if (!body.unit || typeof body.unit !== 'string') {
      errors.push('单位必须是字符串');
    }
    
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
    }
    
    // 处理数据
    const data = {
      name: body.name.toString().trim(),
      price: parseFloat(body.price?.toString() || '0'),
      stock: parseInt(body.stock?.toString() || '0'),
      unit: body.unit.toString().trim(),
      description: body.description ? body.description.toString().trim() : ''
    };
    
    // 验证数字是否有效
    if (isNaN(data.price) || data.price < 0) {
      return NextResponse.json({ error: '单价必须是有效的数字' }, { status: 400 });
    }
    if (isNaN(data.stock) || data.stock < 0) {
      return NextResponse.json({ error: '库存必须是有效的数字' }, { status: 400 });
    }
    
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
