import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 支持4种管理员账号
    const users = [
      { username: 'root', password: 'root123', role: 'root' },
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'manager', password: 'manager123', role: 'manager' },
      { username: 'user', password: 'user123', role: 'user' },
    ];
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      return NextResponse.json({
        success: true,
        user: {
          username: found.username,
          role: found.role
        },
        role: found.role
      });
    }

    return NextResponse.json(
      { success: false, message: '用户名或密码错误' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
