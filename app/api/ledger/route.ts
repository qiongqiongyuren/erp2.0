import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const entries = await prisma.ledgerEntry.findMany({ orderBy: { date: 'desc' } });
    return NextResponse.json(entries);
  } catch (e) {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const entry = await prisma.ledgerEntry.create({ data: body });
    return NextResponse.json({ success: true, entry });
  } catch (e) {
    return NextResponse.json({ success: false, message: '新增失败' });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const entry = await prisma.ledgerEntry.update({ where: { id: body.id }, data: body });
    return NextResponse.json({ success: true, entry });
  } catch (e) {
    return NextResponse.json({ success: false, message: '编辑失败' });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, message: '缺少ID' });
  try {
    await prisma.ledgerEntry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, message: '删除失败' });
  }
}
