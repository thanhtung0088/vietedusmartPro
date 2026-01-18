e/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      // Giữ nguyên custom của bạn nếu cần (màu, radius...)
    },
  },
  plugins: [],
}
