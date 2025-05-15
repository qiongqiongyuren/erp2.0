export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 72, color: '#1677ff', marginBottom: 16, fontWeight: 800, letterSpacing: 6 }}>404</h1>
        <div style={{ fontSize: 22, color: '#888', marginBottom: 32, fontWeight: 500 }}>抱歉，页面未找到</div>
        <div style={{ marginBottom: 20 }}>
          <a href="/" style={{ color: '#1677ff', fontWeight: 600, fontSize: 18, marginRight: 28, textDecoration: 'underline' }}>返回首页</a>
          <a href="/admin/login" style={{ color: '#52c41a', fontWeight: 600, fontSize: 18, textDecoration: 'underline' }}>进入后台</a>
        </div>
        <div style={{ color: '#bbb', fontSize: 14 }}>如有疑问请联系管理员</div>
      </div>
    </div>
  );
}
