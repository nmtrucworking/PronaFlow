import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, Home, Rocket, Layers, Users, CreditCard, ChevronRight, ChevronDown, 
  Sparkles, Eye, ThumbsUp, ThumbsDown, HelpCircle, BookOpen, PlayCircle, 
  MessageSquare, ArrowLeft, Menu, X, FileText, Share2, Copy, Check
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface Article {
  id: string;
  title: string;
  category_id: string;
  views: number;
  last_updated: string;
  content_html: string;
  tags: string[];
  toc: { id: string; title: string; level: number }[];
}

interface FaqItem {
  question: string;
  answer: string;
}

// --- MOCK DATA ---
const CATEGORIES: Category[] = [
  { id: 'home', name: 'Trang chủ', icon: Home, description: 'Tổng quan và tìm kiếm' },
  { id: 'onboarding', name: 'Bắt đầu (Onboarding)', icon: Rocket, description: 'Thiết lập tài khoản và workspace' },
  { id: 'project_mgmt', name: 'Quản lý Dự án', icon: Layers, description: 'Kanban, Gantt và Task' },
  { id: 'team', name: 'Đội nhóm & User', icon: Users, description: 'Phân quyền và quản lý thành viên' },
  { id: 'billing', name: 'Thanh toán & Gói', icon: CreditCard, description: 'Hóa đơn và nâng cấp' },
];

const ARTICLES_DB: Article[] = [
  // --- PROJECT MANAGEMENT ---
  {
    id: 'kanban-guide',
    title: 'Hướng dẫn sử dụng Kanban Board từ A-Z',
    category_id: 'project_mgmt',
    views: 12500,
    last_updated: '2 ngày trước',
    tags: ['Kanban', 'Module 4', 'Productivity'],
    content_html: `
      <p class="lead text-lg text-slate-600 mb-6">Kanban là phương pháp trực quan giúp quản lý dòng chảy công việc. Trong PronaFlow, chúng tôi tối ưu hóa Kanban với khả năng kéo thả mượt mà và tích hợp AI.</p>
      
      <h2 id="section-1" class="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Tạo cột trạng thái (Lists)</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Mặc định, một dự án mới sẽ có 3 cột: <code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-sm">To Do</code>, <code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-sm">In Progress</code>, và <code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-sm">Done</code>. Để thêm cột mới:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-700">
          <li>Nhấn vào nút <strong>+ Add List</strong> ở bên phải cùng của bảng.</li>
          <li>Nhập tên danh sách (Ví dụ: "In Review", "Blocked").</li>
          <li>Nhấn Enter để lưu.</li>
      </ul>

      <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 my-6 rounded-r-lg">
          <h4 class="font-bold text-indigo-900 text-sm mb-1">Mẹo chuyên nghiệp</h4>
          <p class="text-sm text-indigo-800">Bạn có thể thiết lập giới hạn công việc (WIP Limit) cho từng cột để tránh quá tải cho team. Vào <em>Column Settings > Set WIP Limit</em>.</p>
      </div>

      <h2 id="section-2" class="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Di chuyển thẻ (Card Movement)</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">PronaFlow hỗ trợ kéo thả (Drag & Drop) mượt mà. Khi bạn kéo một thẻ từ cột này sang cột khác, hệ thống sẽ tự động cập nhật trạng thái (Status) của Task tương ứng.</p>
      
      <h3 id="section-2-1" class="text-xl font-semibold text-slate-800 mt-6 mb-3">Xử lý xung đột</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Nếu hai người cùng di chuyển một thẻ, hệ thống sẽ ưu tiên hành động đến sau và thông báo cho người còn lại qua Socket Real-time.</p>
    `,
    toc: [
      { id: 'section-1', title: '1. Tạo cột trạng thái', level: 2 },
      { id: 'section-2', title: '2. Di chuyển thẻ', level: 2 },
      { id: 'section-2-1', title: 'Xử lý xung đột', level: 3 },
    ]
  },
  {
    id: 'ai-prediction',
    title: 'Thiết lập AI Prediction cho dự án',
    category_id: 'project_mgmt',
    views: 8200,
    last_updated: '1 tuần trước',
    tags: ['AI', 'Module 10', 'Automation'],
    content_html: `<p>Kích hoạt Module 10 để hệ thống tự động gợi ý nhân sự.</p>`,
    toc: []
  },
  {
    id: 'gantt-chart',
    title: 'Lập kế hoạch tổng thể với Gantt Chart',
    category_id: 'project_mgmt',
    views: 6400,
    last_updated: '5 ngày trước',
    tags: ['Gantt', 'Planning'],
    content_html: `<p>Gantt Chart giúp bạn hình dung tiến độ dự án.</p>`,
    toc: []
  },
  // --- TEAM ---
  {
    id: 'rbac-guide',
    title: 'Hiểu về phân quyền (RBAC) trong Workspace',
    category_id: 'team',
    views: 5100,
    last_updated: '3 tuần trước',
    tags: ['Security', 'Module 2'],
    content_html: `<p>Chi tiết về các quyền Owner, Admin, Member...</p>`,
    toc: []
  },
  {
    id: 'invite-members',
    title: 'Mời thành viên mới và tạo Nhóm',
    category_id: 'team',
    views: 3200,
    last_updated: '1 tháng trước',
    tags: ['Onboarding', 'Team'],
    content_html: `<p>Hướng dẫn cách mời đồng nghiệp vào Workspace.</p>`,
    toc: []
  },
  // --- ONBOARDING ---
  {
    id: 'workspace-setup',
    title: 'Thiết lập Workspace đầu tiên của bạn',
    category_id: 'onboarding',
    views: 15000,
    last_updated: '2 ngày trước',
    tags: ['Getting Started', 'Setup'],
    content_html: `<p>5 bước cơ bản để khởi tạo không gian làm việc.</p>`,
    toc: []
  },
  {
    id: 'import-data',
    title: 'Import dữ liệu từ Trello, Jira hoặc Excel',
    category_id: 'onboarding',
    views: 9800,
    last_updated: '1 tuần trước',
    tags: ['Migration', 'Data'],
    content_html: `<p>Sử dụng công cụ Import của chúng tôi.</p>`,
    toc: []
  },
  // --- BILLING ---
  {
    id: 'billing-plans',
    title: 'So sánh các gói cước: Free vs Pro',
    category_id: 'billing',
    views: 4500,
    last_updated: '2 ngày trước',
    tags: ['Pricing', 'Upgrade'],
    content_html: `<p>Chọn gói cước phù hợp.</p>`,
    toc: []
  },
  {
    id: 'invoices',
    title: 'Hướng dẫn xem và tải hóa đơn VAT',
    category_id: 'billing',
    views: 2100,
    last_updated: '1 tháng trước',
    tags: ['Finance', 'Legal'],
    content_html: `<p>Hệ thống tự động xuất hóa đơn.</p>`,
    toc: []
  }
];

const FAQS: FaqItem[] = [
  { question: "Làm sao để khôi phục dự án đã xóa?", answer: "Truy cập mục <strong>Trash</strong> trong Settings. Lưu trữ 30 ngày." },
  { question: "Tôi có thể mời khách (Guest) không?", answer: "Có. Mời với vai trò <strong>Viewer</strong>." },
  { question: "Hỗ trợ xuất hóa đơn VAT không?", answer: "Có, tự động xuất vào ngày 5 hàng tháng." },
];

// --- COMPONENTS ---

// 1. HEADER
const Header = ({ onToggleMobileMenu }: { onToggleMobileMenu: () => void }) => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-30 sticky top-0">
    <div className="flex items-center gap-3">
      <button 
        onClick={onToggleMobileMenu} 
        className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">P</div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 leading-tight">PronaFlow</span>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Help Center</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block">
        Quay lại Workspace
      </a>
      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden hover:ring-2 hover:ring-indigo-100 transition-all cursor-pointer">
        <img src="https://ui-avatars.com/api/?name=Truc+Nguyen&background=6366f1&color=fff" alt="User" className="w-full h-full object-cover" />
      </div>
    </div>
  </header>
);

// 2. SIDEBAR
const Sidebar = ({ 
  currentCategory, 
  onSelectCategory, 
  isOpen, 
  onClose 
}: { 
  currentCategory: string, 
  onSelectCategory: (id: string) => void,
  isOpen: boolean,
  onClose: () => void
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      <aside className={cn(
        "bg-white border-r border-slate-200 flex-col shrink-0 flex h-full z-50 transition-transform duration-300",
        "fixed md:relative top-0 left-0 w-64 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile Header in Sidebar */}
        <div className="md:hidden h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <span className="font-bold text-slate-800">Danh mục</span>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Danh mục hỗ trợ</h3>
          <nav className="space-y-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className={cn("w-4.5 h-4.5 transition-colors", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                  {cat.name}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl p-4 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageSquare className="w-16 h-16 transform rotate-12" />
            </div>
            <h4 className="text-sm font-bold mb-1 relative z-10">Vẫn cần hỗ trợ?</h4>
            <p className="text-xs text-indigo-100 mb-3 relative z-10 opacity-90">Đội ngũ kỹ thuật sẵn sàng trả lời 24/7.</p>
            <button className="w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-50 transition-colors relative z-10">
              Gửi Ticket
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// 3. TOAST NOTIFICATION
const Toast = ({ message, visible }: { message: string, visible: boolean }) => (
  <div className={cn(
    "fixed top-20 right-6 z-[60] bg-slate-800 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 transition-all duration-300",
    visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
  )}>
    <Check className="w-4 h-4 text-emerald-400" />
    <span className="text-sm font-medium">{message}</span>
  </div>
);

// 4. ARTICLE VIEWER
const ArticleViewer = ({ article, onBack, onShowToast }: { article: Article, onBack: () => void, onShowToast: (msg: string) => void }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    document.getElementById('mainContent')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Tìm bài viết liên quan (cùng category, khác ID)
  const relatedArticles = useMemo(() => 
    ARTICLES_DB.filter(a => a.category_id === article.category_id && a.id !== article.id).slice(0, 3),
  [article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onShowToast("Đã sao chép liên kết bài viết");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <button onClick={onBack} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Help Center
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="truncate max-w-[150px]">{CATEGORIES.find(c => c.id === article.category_id)?.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-8 pb-8 border-b border-slate-200">
          <div className="flex gap-2 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-100">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{article.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <img src="https://ui-avatars.com/api/?name=Admin&background=0f172a&color=fff" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Author" />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">PronaFlow Team</p>
                  <p className="text-slate-500 text-[10px]">Tác giả</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-slate-500 text-xs">Cập nhật lần cuối</p>
                <p className="font-medium text-slate-700 text-xs">{article.last_updated}</p>
              </div>
            </div>
            
            <button 
              onClick={handleCopyLink}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" 
              title="Sao chép liên kết"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content_html }} />
        </article>

        {/* Feedback */}
        <div className="mt-16 p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 text-center shadow-sm">
          <h4 className="font-bold text-slate-900 mb-2 text-lg">Bài viết này có hữu ích không?</h4>
          <p className="text-sm text-slate-500 mb-6">Phản hồi của bạn giúp chúng tôi cải thiện.</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => { setFeedback('up'); onShowToast("Cảm ơn đánh giá của bạn!"); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 shadow-sm",
                feedback === 'up' ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-slate-200 hover:border-emerald-400 hover:text-emerald-600 text-slate-600"
              )}
            >
              <ThumbsUp className={cn("w-5 h-5", feedback === 'up' && "fill-current")} />
              <span>Có, rất hữu ích</span>
            </button>
            <button 
              onClick={() => { setFeedback('down'); onShowToast("Chúng tôi sẽ cải thiện hơn."); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 shadow-sm",
                feedback === 'down' ? "bg-red-50 border-red-500 text-red-700" : "bg-white border-slate-200 hover:border-red-400 hover:text-red-600 text-slate-600"
              )}
            >
              <ThumbsDown className={cn("w-5 h-5", feedback === 'down' && "fill-current")} />
              <span>Không, cần cải thiện</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block col-span-3">
        <div className="sticky top-24">
          {article.toc.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Menu className="w-3 h-3" /> Mục lục
              </h4>
              <ul className="space-y-3 border-l-2 border-slate-200 pl-4">
                {article.toc.map((item, index) => (
                  <li key={item.id} className={cn("text-sm transition-colors", item.level === 3 ? "ml-3" : "")}>
                    <a 
                      href={`#${item.id}`} 
                      className={cn(
                        "block hover:text-indigo-600 transition-colors duration-200",
                        index === 0 ? "text-indigo-600 font-medium -ml-[18px] pl-4 border-l-2 border-indigo-600" : "text-slate-500"
                      )}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-8 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Bài viết liên quan</h4>
            {relatedArticles.length > 0 ? (
              <div className="space-y-4">
                {relatedArticles.map(rel => (
                  <a key={rel.id} href="#" className="group block p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 transition-colors">
                    <span className="text-xs text-slate-500 group-hover:text-indigo-500 font-medium block mb-1">
                      {CATEGORIES.find(c => c.id === rel.category_id)?.name}
                    </span>
                    <span className="text-sm text-slate-700 group-hover:text-indigo-900 font-semibold block leading-tight">
                      {rel.title}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Không có bài viết liên quan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. MAIN APP
export default function HelpCenterApp() {
  const [currentView, setCurrentView] = useState<'HOME' | 'ARTICLE'>('HOME');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string, visible: boolean }>({ msg: '', visible: false });

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  // Logic lọc bài viết: theo Category + Search Query
  const displayArticles = useMemo(() => {
    let filtered = ARTICLES_DB;

    // 1. Filter by Category
    if (selectedCategory !== 'home') {
      filtered = filtered.filter(a => a.category_id === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    // Sort by views if Home & No Search
    if (selectedCategory === 'home' && !searchQuery) {
      return [...filtered].sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const categoryInfo = useMemo(() => 
    CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0], 
  [selectedCategory]);

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('ARTICLE');
  };

  const handleBackToHome = () => {
    setCurrentView('HOME');
    setSelectedArticleId(null);
  };

  const currentArticle = useMemo(() => 
    ARTICLES_DB.find(a => a.id === selectedArticleId) || ARTICLES_DB[0], 
  [selectedArticleId]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Header onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />
      <Toast message={toast.msg} visible={toast.visible} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          currentCategory={selectedCategory} 
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            if(currentView === 'ARTICLE') setCurrentView('HOME');
          }}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main id="mainContent" className="flex-1 overflow-y-auto bg-slate-50 scroll-smooth w-full">
          {currentView === 'HOME' ? (
            <div className="animate-in fade-in duration-500">
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 py-12 md:py-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                <div className="relative z-10 max-w-3xl mx-auto">
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                    {searchQuery 
                      ? `Kết quả tìm kiếm cho "${searchQuery}"`
                      : (selectedCategory === 'home' ? "Xin chào, PronaFlow có thể giúp gì?" : `Hỗ trợ: ${categoryInfo.name}`)
                    }
                  </h1>
                  <p className="text-indigo-100 mb-8 text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
                    {categoryInfo.description}
                  </p>
                  
                  <div className="relative max-w-xl mx-auto group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="w-5 h-5 text-indigo-300 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-11 pr-12 py-3 md:py-4 bg-white text-slate-900 rounded-2xl shadow-xl border-0 ring-0 focus:ring-4 focus:ring-indigo-400/30 placeholder:text-slate-400 text-base transition-all" 
                      placeholder="Tìm kiếm bài viết, hướng dẫn..."
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-3 flex items-center p-2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
                {/* Article List */}
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    {searchQuery ? <Search className="w-5 h-5 text-indigo-500" /> : (selectedCategory === 'home' ? <Sparkles className="w-5 h-5 text-amber-500" /> : <FileText className="w-5 h-5 text-indigo-500" />)}
                    <h2 className="text-xl font-bold text-slate-800">
                      {searchQuery 
                        ? `Tìm thấy ${displayArticles.length} kết quả` 
                        : (selectedCategory === 'home' ? "Bài viết phổ biến" : "Danh sách bài viết")
                      }
                    </h2>
                  </div>

                  {displayArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayArticles.map((article) => (
                        <div 
                          key={article.id}
                          onClick={() => handleArticleClick(article.id)} 
                          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full flex flex-col"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            {article.tags[0] && (
                              <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-full uppercase tracking-wide">
                                {article.tags[0]}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2 text-base">
                            {article.title}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                            Tìm hiểu chi tiết về {article.title} và cách áp dụng trong công việc của bạn.
                          </p>
                          
                          <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-slate-50 pt-3 mt-auto">
                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>{article.last_updated}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-slate-300 text-center px-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy kết quả</h3>
                      <p className="text-slate-500 max-w-sm">
                        Thử tìm kiếm với từ khóa khác hoặc quay lại trang chủ để xem các danh mục.
                      </p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('home'); }}
                        className="mt-4 text-indigo-600 font-medium hover:underline"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  )}
                </div>

                {/* FAQ Section (Hide when searching) */}
                {!searchQuery && selectedCategory === 'home' && (
                  <div className="max-w-3xl mx-auto pb-20 border-t border-slate-200 pt-12">
                    <div className="flex items-center gap-2 mb-6 justify-center">
                      <HelpCircle className="w-5 h-5 text-indigo-500" />
                      <h2 className="text-xl font-bold text-slate-800">Câu hỏi thường gặp</h2>
                    </div>
                    <div className="space-y-4">
                      {FAQS.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:border-indigo-200 transition-colors">
                          <details className="group">
                            <summary className="flex items-center justify-between w-full p-4 text-left font-medium text-slate-700 hover:bg-slate-50 cursor-pointer list-none">
                              <span>{faq.question}</span>
                              <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 pt-0 text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100 mt-2">
                              <div className="pt-3" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <ArticleViewer 
              article={currentArticle} 
              onBack={handleBackToHome} 
              onShowToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}