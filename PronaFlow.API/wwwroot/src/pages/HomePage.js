import { initializeHomePage } from '../utils/homePageLogic.js';

const HomePage = {
  render: async () => {
    // Chúng ta sẽ fetch nội dung từ file home.html gốc của bạn
    const response = await fetch('home.html');
    if (!response.ok) return `<div>Error loading home page.</div>`;

    let html = await response.text();

    return html;
  },
  after_render: async () => {
    // Khởi tạo các hiệu ứng, sự kiện cho trang home
    initializeHomePage();
  }
};
export default HomePage;