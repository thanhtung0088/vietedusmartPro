export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        backgroundColor: "#1f2937",
        color: "#ffffff",
        padding: 16,
        minHeight: "100vh",
      }}
    >
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: "2em" }}>
        <li>📊 Dashboard</li>
        <li>🤖 Soạn bài AI</li>
        <li>📝 Kiểm tra</li>
        <li>⚙️ Cài đặt</li>
      </ul>
    </aside>
  );
}
