import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div style={styles.app}>
      <Sidebar />

      <div style={styles.main}>
        <Header />

        <div style={styles.content}>
          <h1>📊 Bảng điều khiển</h1>
          <p>Chào mừng thầy đến với VietEdu Smart.</p>

          <div style={styles.cards}>
            <div style={styles.card}>
              <h3>📘 Soạn bài AI</h3>
              <p>Tạo giáo án nhanh chóng.</p>
            </div>

            <div style={styles.card}>
              <h3>📝 Kiểm tra</h3>
              <p>Tạo đề tự động.</p>
            </div>

            <div style={styles.card}>
              <h3>📈 Thống kê</h3>
              <p>Theo dõi tiến độ.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily: "system-ui, sans-serif",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: 24,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 20,
  },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
};
