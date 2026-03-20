/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 藍圖主色
        primary: '#4B362F',   // 深咖啡色 
        secondary: '#2E2A28', // 炭灰色 
        bgLight: '#F7F3EE',   // 奶白色 
        // 藍圖輔色
        wood: '#A67C52',      // 木啡色 
        beige: '#E8DED1',     // 淺米色 
      },
      fontFamily: {
        // 中英文雙字體設定
        heading: ['"Cormorant Garamond"', '"Noto Sans TC"', 'serif'],
        sans: ['"Inter"', '"Noto Sans TC"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}