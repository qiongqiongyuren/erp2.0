export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 60, color: '#1677ff', marginBottom: 16 }}>404</h1>
        <div style={{ fontSize: 20, color: '#888', marginBottom: 24 }}>页面未找到</div>
        <a href="/" style={{ color: '#1677ff', fontWeight: 500 }}>返回首页</a>
      </div>
    </div>
  );
}
