import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET: 获取所有客户
export async function GET() {
  try {
    // schema.prisma 没有 Customer 模型，客户应为 role=user 的 User
    const customers = await prisma.user.findMany({ where: { role: 'user' } });
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: 新增客户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // schema.prisma 没有 Customer 模型，插入 User 表，role 固定为 user
    const customer = await prisma.user.create({ data: { ...body, role: 'user' } });
    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
