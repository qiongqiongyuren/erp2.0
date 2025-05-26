import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ success: false, message: '未检测到上传文件' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    const materials = await prisma.rawMaterial.createMany({
      data: jsonData.map((row: any) => ({
        name: row.name || row.名称,
        price: Number(row.price || row.价格),
        stock: Number(row.stock || row.库存),
        unit: row.unit || row.单位,
        description: row.description || row.备注 || '',
      })),
      skipDuplicates: true,
    });
    return NextResponse.json({ success: true, count: materials.count });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: '导入失败', error: e.message }, { status: 500 });
  }
}
