import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET: 获取所有订单
export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: 新增订单
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = await prisma.order.create({ data: body });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
