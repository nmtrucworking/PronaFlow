import { initializeHomePage } from '../utils/homePageLogic.js';
import store from '../store/store.js';

const HomePage = {
  render: async () => {
    return `<div class="home-page" id="home-page">
        <header class="header" id="header">
            <div class="header__container">
                <div title="PronaFlow">
                    <img src="../assets/images/logo-light.svg" alt="PronaFlow's logo'" class="logo">
                    <a class="web-name" href="./home.html" >PronaFlow</a>
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
                    <a href="#/login" class="btn--base login-btn" target="_blank">Login</a>
                    <a href="#/login" class="btn--base sigup-btn" target="_blank">Sign Up</a>
                </div>
                <div class="menu-toggle" id="menu-toggle">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </header>

        <section class="hero-section section" id="hero-section">
            <div class="hero__content">
                <h1 class="hero__title" id="typing-effect-container">
                    Turn <span id="typing-effect"></span> <br>
                    Into True Productivity.
                </h1>
                <p class="hero__subtitle">
                    PronaFlow is not just another task management tool. It's a beautifully designed space to turn
                    complex ideas into a clear, seamless, and efficient workflow. We're not just building software –
                    we're creating a place where ideas take shape, tasks are organized, and success is crafted.
                </p>
                <a href="#final-cta" class="cta-button">Start your journey (Free)</a>
            </div>
        </section>

        <section class="story-section section" id="story-section">
            <div class="container story-section__grid">
                <div class="story-content animate-on-scroll">
                    <h2 class="story-section__title">Everything Started From a Mess</h2>
                    <p class="story-section__text">
                        We've been there too. Using countless apps – one for chatting, one for notes, one for calendar,
                        and lots of emails... Fragmented information. Vague progress. Focus was a luxury.
                    </p>
                    <p class="story-section__text">
                        That chaos became our inspiration. We asked ourselves: <i>"Why does it have to be so
                            complicated?"</i> And PronaFlow was born from that question, with one mission: to bring
                        clarity and order to your work.
                    </p>
                </div>
                <div class="story-section__image animate-on-scroll">
                    <img src="../assets/images/working-group.jpg" alt="Previously chaotic team">
                </div>
            </div>
        </section>

        <section class="philosophy-section section" id="philosophy-section">
            <div class="container">
                <h2 class="section__title--secondary animate-on-scroll">Core Values</h2>
                <div class="philosophy__cards">
                    <div class="philosophy-section-item">
                        <div class="philosophy__card home-page__card animate-on-scroll">
                            <div class="card__icon"><i data-lucide="lightbulb"></i></div>
                            <h3 class="philosophy-card__title">INTUITIVE</h3>
                            <p class="philosophy-card__text">
                                A clean interface that reduces complexity. We believe the best technology is invisible –
                                helping you focus 100% on your work.
                            </p>
                        </div>
                    </div>
                    <div class="philosophy-section-item">
                        <div class="philosophy__card home-page__card animate-on-scroll">
                            <div class="card__icon"><i data-lucide="link-2"></i></div>
                            <h3 class="philosophy-card__title">CONSISTENT</h3>
                            <p class="philosophy-card__text">
                                Every component – from buttons to workflows – follows a unified design language, so you
                                can quickly get familiar and work efficiently.
                            </p>
                        </div>
                    </div>
                    <div class="philosophy-section-item">
                        <div class="philosophy__card home-page__card animate-on-scroll">
                            <div class="card__icon"><i data-lucide="sliders-horizontal"></i></div>
                            <h3 class="philosophy-card__title">FLEXIBLE</h3>
                            <p class="philosophy-card__text">
                                Powerful tools that allow you to customize your workflows – because we understand no two
                                teams are alike.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- section4 - Tool -->
        <section class="tool-section section" id="tool-section">
            <div class="tool-backgrounds">
                <div class="tool-backgrounds__layer tool-backgrounds__layer--default" data-bg="default"></div>
                <div class="tool-backgrounds__layer tool-backgrounds__layer--dashboard" data-bg="dashboard"></div>
                <div class="tool-backgrounds__layer tool-backgrounds__layer--kanban" data-bg="kanban"></div>
                <div class="tool-backgrounds__layer tool-backgrounds__layer--task" data-bg="task"></div>
                <div class="tool-backgrounds__layer tool-backgrounds__layer--contact" data-bg="contact"></div>
            </div>

            <div class="container">
                <div class="container-title animate-on-scroll">
                    <h2 class="section__title--first">
                        Built for the Future of Work
                    </h2>
                    <div class="description description--second">
                        Powerful tools wrapped in a minimalist interface
                    </div>
                </div>
                <div class="row tool-section-content animate-on-scroll">
                    <div class="col-md-3 tool-section-item">
                        <div class="tool-card tool-card-dashboard animate-on-scroll" data-bg="dashboard">
                            <div class="card__icon"><i data-lucide="layout-dashboard"></i></div>
                            <h3>
                                Dashboard
                            </h3>
                            <p>
                                The dashboard provides an overview of everything you need: projects, upcoming tasks, and
                                team activity.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3 tool-section-item">
                        <div class="tool-card tool-card-kanban animate-on-scroll" data-bg="kanban">
                            <div class="card__icon"><i data-lucide="layout-grid"></i></div>
                            <h3>
                                Kanban
                            </h3>
                            <p>
                                Drag, drop, and track your workflow smoothly. Never miss a beat.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3 tool-section-item">
                        <div class="tool-card tool-card-task animate-on-scroll" data-bg="task">
                            <div class="card__icon"><i data-lucide="check-square"></i></div>
                            <h3>
                                Task
                            </h3>
                            <p>
                                Assign, prioritize, and add detailed descriptions to every single task.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3 tool-section-item">
                        <div class="tool-card tool-card-project animate-on-scroll" data-bg="contact">
                            <div class="card__icon"><i data-lucide="users-2"></i></div>
                            <h3>
                                Contact
                            </h3>
                            <p>
                                Collaborate in every project with your team, grow and move forward together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script>

        </script>

        <!-- section5 - Timeline -->
        <section class="timeline-section section" id="timeline-section">
            <div class="container timeline-section__outline">
                <h2 class="section__title--secondary">Constantly Evolving and Growing</h2>
                <div class="timeline-section__inner animate-on-scroll">
                    <!--  -->
                    <div class="timeline-section__card animate-on-scroll">
                        <div class="timeline-dot"></div>
                        <div class="card__content">
                            <h3 class="card__title">Phase 1: Solid Foundation</h3>
                            <p>
                                Launching a stable core product with essential features: Workspace, Project, Task
                                management and inviting team members.
                            </p>
                        </div>
                    </div>
                    <div class="timeline-section__card animate-on-scroll">
                        <div class="timeline-dot"></div>
                        <div class="card__content">
                            <h3 class="card__title">Phase 2: Core Experience</h3>
                            <p>
                                Transforming PronaFlow from a usable tool into a lovable one with Smart Dashboard, Dark
                                Mode, and a personal control center.
                            </p>
                        </div>
                    </div>
                    <div class="timeline-section__card animate-on-scroll">
                        <div class="timeline-dot"></div>
                        <div class="card__content">
                            <h3 class="card__title">Phase 3: For Professionals</h3>
                            <p>
                                Looking to the future with features like Analytics, Templates, Universal Search, and
                                integrations like Slack and Google Drive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="feature-showcase section" id="feature-dashboard">
            <div class="feature-showcase__content animate-on-scroll glass-card">
                <h3 class="feature-showcase__title">It’s Your Command Center</h3>
                <p class="feature-showcase__text">
                    Start your day with clarity. The Dashboard gives you an instant overview of everything: active
                    projects, upcoming tasks, and recent team activity.</p>
            </div>
        </section>

        <section class="feature-showcase" id="feature-kanban">
            <div class="feature-showcase__content animate-on-scroll glass-card">
                <h3 class="feature-showcase__title">It’s Your Workflow Stream</h3>
                <p class="feature-showcase__text">
                    Forget rigid spreadsheets. With a smooth drag-and-drop Kanban interface, you can visualize progress
                    and identify bottlenecks to keep projects moving.</p>
            </div>
        </section>

        <section class="feature-showcase" id="feature-tasks">
            <div class="feature-showcase__content animate-on-scroll glass-card">
                <h3 class="feature-showcase__title">It’s Your Personal Focus</h3>
                <p class="feature-showcase__text">
                    In a world full of distractions, "My Tasks" is your safe space. It gathers all your assignments to
                    help you prioritize and stay productive.</p>
            </div>
        </section>

        <section class="team-section section" id="team-section">
            <div class="container">
                <h2 class="animate-on-scroll">The People Behind PronaFlow</h2>
                <p class="subtitle animate-on-scroll">
                    We're a team of passionate engineers, meticulous designers, and product experts who listen. We share
                    one belief: <i>The best technology is the one that helps people achieve greatness.</i>
                </p>
                <div class="team-container">
                    <div class="team-card animate-on-scroll">
                        <div class="team-card-inner">
                            <div class="team-card-front">
                                <img src="../assets/images/creater-1.jpg" alt="creater-1">
                            </div>
                            <div class="team-card-back">
                                <h4>Jin</h4>
                                <p class="role">Lead Developer</p>
                                <p>"I write code to solve problems, not just to complete features."</p>
                            </div>
                        </div>
                    </div>
                    <div class="team-card animate-on-scroll" style="transition-delay: 0.2s;">
                        <div class="team-card-inner">
                            <div class="team-card-front">
                                <img src="../assets/images/creater-2.jpg" alt="creater-2">
                            </div>
                            <div class="team-card-back">
                                <h4>Ali</h4>
                                <p class="role">UI / UX Designer</p>
                                <p>"Every pixel serves a purpose."</p>
                            </div>
                        </div>
                    </div>
                    <div class="team-card animate-on-scroll" style="transition-delay: 0.4s;">
                        <div class="team-card-inner">
                            <div class="team-card-front">
                                <img src="../assets/images/creater-3.jpg" alt="creater-3">
                            </div>
                            <div class="team-card-back">
                                <h4>Bob</h4>
                                <p class="role">Project Manager</p>
                                <p>"A good plan brings half the success."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="final-cta" id="final-cta">
            <div class="container animate-on-scroll">
                <h2 class="final-cta__title">Ready to Change How You Work?</h2>
                <p class="final-cta__subtitle">Join thousands of users and teams shaping the future of work. Sign up and
                    feel the difference.</p>
                <a href="#/login" class="cta-button" target="_blank">Try PronaFlow for Free</a>
            </div>
        </section>

        <footer class="footer">
            <p class="footer__text">© 2025 PronaFlow. All Rights Reserved. Built for better work management.</p>
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