import { initializeHomePage } from '../utils/homePageLogic.js';
import store from '../store/store.js';

const HomePage = {
  render: async () => {
    return `
      <div class="home-page" id="home-page">
        <header class="header" id="header">
            <div class="header__container">
                <div title="PronaFlow">
                    <img src="../assets/images/logo-light.svg" alt="PronaFlow's logo'" class="logo">
                    <a class="web-name" href="#/" >PronaFlow</a>
                </div>
                <nav class="main-nav" id="main-nav">
                    <ul>
                        <li class="nav-item"><a href="#philosophy-section">Philosophy</a></li>
                        <li class="nav-item"><a href="#tool-section">Tools</a></li>
                        <li class="nav-item"><a href="#timeline-section">Roadmap</a></li>
                        <li class="nav-item"><a href="#feature-dashboard">Features</a></li>
                        <li class="nav-item"><a href="#team-section">Team</a></li>
                    </ul>
                </nav>
                <div class="header-cta-group">
                    <a href="#/login" class="btn--base login-btn">Login</a>
                    <a href="#/login" class="btn--base sigup-btn">Sign Up</a>
                </div>
                <div class="menu-toggle" id="menu-toggle">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </header>

        <main>
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h1 class="hero-title">Manage Your Projects With Ease</h1>
                            <p class="hero-description">PronaFlow helps teams move work forward. Collaborate, manage projects, and reach new productivity peaks.</p>
                            <div class="hero-cta">
                                <a href="#/login" class="btn btn-primary btn-lg">Get Started</a>
                                <a href="#feature-dashboard" class="btn btn-outline-secondary btn-lg">Learn More</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <img src="../assets/images/hero-image.svg" alt="Project Management" class="hero-image">
                        </div>
                    </div>
                </div>
            </section>

            <!-- Philosophy Section -->
            <section id="philosophy-section" class="philosophy-section section">
                <div class="container">
                    <h2 class="section-title">Our Philosophy</h2>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="philosophy-card">
                                <i data-lucide="target" class="philosophy-icon"></i>
                                <h3>Focus on What Matters</h3>
                                <p>Eliminate distractions and stay focused on your most important tasks.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="philosophy-card">
                                <i data-lucide="users" class="philosophy-icon"></i>
                                <h3>Collaborate Seamlessly</h3>
                                <p>Work together with your team in real-time, no matter where you are.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="philosophy-card">
                                <i data-lucide="trending-up" class="philosophy-icon"></i>
                                <h3>Continuous Improvement</h3>
                                <p>Track progress and adapt your workflow to achieve better results.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Dashboard Section -->
            <section id="feature-dashboard" class="feature-dashboard section">
                <div class="container">
                    <h2 class="section-title">Powerful Features</h2>
                    <div class="feature-tabs">
                        <div class="feature-tab active" data-tab="task-management">Task Management</div>
                        <div class="feature-tab" data-tab="kanban-boards">Kanban Boards</div>
                        <div class="feature-tab" data-tab="calendar-view">Calendar View</div>
                        <div class="feature-tab" data-tab="reporting">Reporting</div>
                    </div>
                    <div class="feature-content active" id="task-management-content">
                        <div class="row">
                            <div class="col-md-6">
                                <h3>Efficient Task Management</h3>
                                <p>Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies to keep your projects on track.</p>
                                <ul class="feature-list">
                                    <li><i data-lucide="check-circle" class="feature-icon"></i> Create and assign tasks</li>
                                    <li><i data-lucide="check-circle" class="feature-icon"></i> Set priorities and deadlines</li>
                                    <li><i data-lucide="check-circle" class="feature-icon"></i> Track progress in real-time</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <img src="../assets/images/task-management.svg" alt="Task Management" class="feature-image">
                            </div>
                        </div>
                    </div>
                    <!-- Other feature content sections would go here -->
                </div>
            </section>

            <!-- Call to Action -->
            <section class="cta-section">
                <div class="container">
                    <h2>Ready to boost your productivity?</h2>
                    <p>Join thousands of teams already using PronaFlow to manage their projects.</p>
                    <a href="#/login" class="btn btn-primary btn-lg">Get Started for Free</a>
                </div>
            </section>
        </main>

        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <img src="../assets/images/logo-light.svg" alt="PronaFlow Logo" class="footer-logo">
                        <p>PronaFlow helps teams move work forward.</p>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4">
                                <h4>Product</h4>
                                <ul class="footer-links">
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#pricing">Pricing</a></li>
                                    <li><a href="#integrations">Integrations</a></li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <h4>Company</h4>
                                <ul class="footer-links">
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#careers">Careers</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <h4>Resources</h4>
                                <ul class="footer-links">
                                    <li><a href="#blog">Blog</a></li>
                                    <li><a href="#help">Help Center</a></li>
                                    <li><a href="#community">Community</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} PronaFlow. All rights reserved.</p>
                    <div class="social-links">
                        <a href="#" class="social-link"><i data-lucide="facebook" class="social-icon"></i></a>
                        <a href="#" class="social-link"><i data-lucide="twitter" class="social-icon"></i></a>
                        <a href="#" class="social-link"><i data-lucide="linkedin" class="social-icon"></i></a>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    `;
  },
  after_render: async () => {
    // Khởi tạo các hiệu ứng, sự kiện cho trang home
    initializeHomePage();
    
    // Khởi tạo các icon Lucide
    lucide.createIcons();
    
    // Xử lý menu toggle cho mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
    
    // Xử lý các tab tính năng
    const featureTabs = document.querySelectorAll('.feature-tab');
    featureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Xóa active class từ tất cả các tab
        featureTabs.forEach(t => t.classList.remove('active'));
        
        // Thêm active class cho tab được click
        tab.classList.add('active');
        
        // Hiển thị nội dung tương ứng
        const tabId = tab.getAttribute('data-tab');
        document.querySelectorAll('.feature-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(`${tabId}-content`)?.classList.add('active');
      });
    });
    
    // Smooth scrolling cho các anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Nếu là link điều hướng SPA thì không xử lý
        if (href.startsWith('#/')) return;
        
        e.preventDefault();
        
        const targetId = href === '#' ? 'home-page' : href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

export default HomePage;