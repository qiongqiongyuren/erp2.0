import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import { readFile } from 'fs/promises';
import { parse } from 'path';
import xlsx from 'xlsx';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // 1. 解析上传的 Excel 文件
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ success: false, message: '文件上传失败', error: err.message }, { status: 500 }));
        return;
      }
      const file = files.file;
      if (!file) {
        resolve(NextResponse.json({ success: false, message: '未检测到上传文件' }, { status: 400 }));
        return;
      }
      try {
        // 2. 读取 Excel 内容
        const data = await readFile(file.filepath);
        const workbook = xlsx.read(data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // 3. 批量写入数据库
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
        resolve(NextResponse.json({ success: true, count: materials.count }));
      } catch (e: any) {
        resolve(NextResponse.json({ success: false, message: '导入失败', error: e.message }, { status: 500 }));
      }
    });
  });
}
