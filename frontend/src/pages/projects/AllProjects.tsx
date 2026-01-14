import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  PieChart, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Archive, 
  X,
  ChevronDown,
  Briefcase,
  Kanban as KanbanIcon,
  ArrowUpDown,
  Check,
  FilePlus,
  Upload,
  Edit,
  Trash2,
  Activity,
  Layers,
  Zap,
  Flag,
  User as UserIcon,
  FolderOpen
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILITIES ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// --- DOMAIN TYPES ---

type ProjectStatus = 'DRAFT' | 'PLANNING' | 'EXECUTION' | 'MONITORING' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
type ProjectType = 'WATERFALL' | 'AGILE'; 
type ProjectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

type ViewMode = 'GRID' | 'LIST' | 'KANBAN';
type SortOption = 'NAME_ASC' | 'PRIORITY_DESC' | 'DUE_DATE_ASC' | 'PROGRESS_DESC';

interface UserEntity {
  id: string;
  name: string;
  avatar: string;
}

interface ProjectEntity {
  id: string;
  key: string;
  name: string;
  description: string;
  manager: UserEntity;
  members: UserEntity[];
  status: ProjectStatus;
  type: ProjectType;
  priority: ProjectPriority;
  progress: number; 
  startDate: string;
  dueDate: string;
  category: string; 
  taskCount: { total: number; completed: number };
}

// --- MOCK DATA ---

const USERS: Record<string, UserEntity> = {
  u1: { id: 'u1', name: 'Nguyễn Văn A', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff' },
  u2: { id: 'u2', name: 'Trần Thị B', avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=E11D48&color=fff' },
  u3: { id: 'u3', name: 'Lê C', avatar: 'https://ui-avatars.com/api/?name=Le+C&background=059669&color=fff' },
  u4: { id: 'u4', name: 'Phạm D', avatar: 'https://ui-avatars.com/api/?name=Pham+D&background=7C3AED&color=fff' },
};

const INITIAL_PROJECTS: ProjectEntity[] = [
  {
    id: 'p1', key: 'MKT-24', name: 'Chiến dịch Marketing Mùa Hè 2024',
    description: 'Xây dựng kế hoạch và triển khai quảng cáo đa kênh cho dòng sản phẩm mới.',
    manager: USERS.u2,
    members: [USERS.u1, USERS.u2, USERS.u3],
    status: 'EXECUTION',
    type: 'AGILE',
    priority: 'HIGH',
    progress: 45,
    startDate: '2024-03-01',
    dueDate: '2024-06-30',
    category: 'Marketing',
    taskCount: { total: 120, completed: 54 }
  },
  {
    id: 'p2', key: 'DEV-CORE', name: 'PronaFlow Core System Upgrade',
    description: 'Nâng cấp kiến trúc Backend lên Microservices và tối ưu hiệu năng.',
    manager: USERS.u1,
    members: [USERS.u1, USERS.u4],
    status: 'PLANNING',
    type: 'WATERFALL',
    priority: 'CRITICAL',
    progress: 10,
    startDate: '2024-04-01',
    dueDate: '2024-09-15',
    category: 'Development',
    taskCount: { total: 85, completed: 8 }
  },
  {
    id: 'p3', key: 'HR-OFF', name: 'Quy trình Onboarding Nhân sự mới',
    description: 'Số hóa toàn bộ quy trình tiếp nhận nhân sự và đào tạo hội nhập.',
    manager: USERS.u3,
    members: [USERS.u3, USERS.u2, USERS.u4, USERS.u1],
    status: 'COMPLETED',
    type: 'WATERFALL',
    priority: 'MEDIUM',
    progress: 100,
    startDate: '2023-10-01',
    dueDate: '2023-12-20',
    category: 'Human Resources',
    taskCount: { total: 40, completed: 40 }
  },
  {
    id: 'p4', key: 'FIN-Q1', name: 'Báo cáo Tài chính Q1/2024',
    description: 'Tổng hợp số liệu và kiểm toán nội bộ cho quý đầu năm.',
    manager: USERS.u4,
    members: [USERS.u4],
    status: 'MONITORING',
    type: 'WATERFALL',
    priority: 'HIGH',
    progress: 85,
    startDate: '2024-01-01',
    dueDate: '2024-04-15',
    category: 'Finance',
    taskCount: { total: 25, completed: 20 }
  },
  {
    id: 'p5', key: 'WEB-LAND', name: 'Landing Page Redesign',
    description: 'Thiết kế lại giao diện trang chủ theo brand guideline mới.',
    manager: USERS.u1,
    members: [USERS.u1, USERS.u2],
    status: 'DRAFT',
    type: 'AGILE',
    priority: 'LOW',
    progress: 0,
    startDate: '2024-05-01',
    dueDate: '2024-06-01',
    category: 'Design',
    taskCount: { total: 0, completed: 0 }
  },
];

// --- VISUAL CONFIGURATION ---

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; icon: any; border: string }> = {
  DRAFT: { label: 'Khởi tạo', color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200', icon: FilePlus },
  PLANNING: { label: 'Lập kế hoạch', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', icon: Calendar },
  EXECUTION: { label: 'Thực thi', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', icon: Zap },
  MONITORING: { label: 'Kiểm soát', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Activity },
  COMPLETED: { label: 'Hoàn thành', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 },
  ON_HOLD: { label: 'Tạm hoãn', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertCircle },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: X },
};

const PRIORITY_CONFIG: Record<ProjectPriority, { label: string; color: string; bg: string }> = {
  CRITICAL: { label: 'Nghiêm trọng', color: 'text-red-700', bg: 'bg-red-100' },
  HIGH: { label: 'Cao', color: 'text-orange-700', bg: 'bg-orange-100' },
  MEDIUM: { label: 'Trung bình', color: 'text-blue-700', bg: 'bg-blue-100' },
  LOW: { label: 'Thấp', color: 'text-slate-600', bg: 'bg-slate-100' },
};

const TYPE_CONFIG: Record<ProjectType, { label: string; icon: any; color: string }> = {
  WATERFALL: { label: 'Waterfall', icon: Layers, color: 'text-blue-600' },
  AGILE: { label: 'Agile', icon: Zap, color: 'text-purple-600' },
};

// --- BASE COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

const Popover = ({ 
  trigger, 
  content, 
  isOpen, 
  setIsOpen,
  align = 'end'
}: { 
  trigger: React.ReactNode; 
  content: React.ReactNode; 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  align?: 'start' | 'end';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={cn(
          "absolute top-full mt-2 z-50 bg-white rounded-xl border border-slate-200 shadow-xl p-1 animate-in fade-in zoom-in-95 duration-200 min-w-[240px] max-h-[400px] overflow-y-auto custom-scrollbar",
          align === 'end' ? 'right-0' : 'left-0'
        )}>
          {content}
        </div>
      )}
    </div>
  );
};

// --- SUB COMPONENTS ---

const AvatarStack = ({ users, limit = 3 }: { users: UserEntity[], limit?: number }) => {
  const visible = users.slice(0, limit);
  const remaining = users.length - limit;
  return (
    <div className="flex -space-x-2">
      {visible.map(u => (
        <img 
          key={u.id} 
          src={u.avatar} 
          alt={u.name} 
          title={u.name} 
          className="w-6 h-6 rounded-full ring-2 ring-white bg-slate-200 object-cover hover:scale-110 hover:z-10 transition-transform duration-200 cursor-pointer" 
        />
      ))}
      {remaining > 0 && (
        <div className="w-6 h-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-600">+{remaining}</div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", config.bg, config.color, config.border)}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: ProjectPriority }) => {
  const config = PRIORITY_CONFIG[priority];
  return (
    <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide", config.bg, config.color)}>
      {config.label}
    </span>
  );
};

const TypeBadge = ({ type }: { type: ProjectType }) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;
  return (
    <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
      <Icon className={cn("w-3 h-3", config.color)} />
      {config.label}
    </div>
  );
};

// --- POPOVERS ---

const ProjectActionsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      }
      content={
        <div className="w-40">
          <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tùy chọn</div>
          <button className="w-full text-left px-2 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded transition-colors flex items-center gap-2">
            <Edit className="w-3.5 h-3.5"/> Chỉnh sửa
          </button>
          <button className="w-full text-left px-2 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded transition-colors flex items-center gap-2">
            <Archive className="w-3.5 h-3.5"/> Lưu trữ
          </button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-2">
            <Trash2 className="w-3.5 h-3.5"/> Xóa dự án
          </button>
        </div>
      }
    />
  );
};

const FilterSortPopover = ({ 
  currentSort, 
  onSortChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange
}: { 
  currentSort: SortOption, 
  onSortChange: (sort: SortOption) => void,
  statusFilter: ProjectStatus | 'ALL',
  onStatusFilterChange: (s: ProjectStatus | 'ALL') => void,
  typeFilter: ProjectType | 'ALL',
  onTypeFilterChange: (t: ProjectType | 'ALL') => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all active:scale-95 text-sm font-medium">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Lọc & Sắp xếp</span>
        </button>
      }
      content={
        <div className="p-2 space-y-3">
          {/* SORTING */}
          <div>
            <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Sắp xếp theo</div>
            <button onClick={() => onSortChange('NAME_ASC')} className={cn("w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-lg transition-colors", currentSort === 'NAME_ASC' ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-100")}>
                <span className="flex items-center gap-2"><ArrowUpDown className="w-3.5 h-3.5"/> Tên (A-Z)</span>{currentSort === 'NAME_ASC' && <Check className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => onSortChange('PRIORITY_DESC')} className={cn("w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-lg transition-colors", currentSort === 'PRIORITY_DESC' ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-100")}>
                <span className="flex items-center gap-2"><Flag className="w-3.5 h-3.5"/> Độ ưu tiên</span>{currentSort === 'PRIORITY_DESC' && <Check className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => onSortChange('DUE_DATE_ASC')} className={cn("w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-lg transition-colors", currentSort === 'DUE_DATE_ASC' ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-100")}>
                <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5"/> Hạn chót</span>{currentSort === 'DUE_DATE_ASC' && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* FILTERS */}
          <div>
            <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Loại dự án</div>
            <div className="flex gap-2 px-2">
                <button onClick={() => onTypeFilterChange('ALL')} className={cn("px-2 py-1 text-xs rounded border transition-colors", typeFilter === 'ALL' ? "bg-indigo-100 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50")}>Tất cả</button>
                <button onClick={() => onTypeFilterChange('WATERFALL')} className={cn("px-2 py-1 text-xs rounded border transition-colors", typeFilter === 'WATERFALL' ? "bg-indigo-100 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50")}>Waterfall</button>
                <button onClick={() => onTypeFilterChange('AGILE')} className={cn("px-2 py-1 text-xs rounded border transition-colors", typeFilter === 'AGILE' ? "bg-indigo-100 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50")}>Agile</button>
            </div>
          </div>

          <div>
            <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Trạng thái</div>
            <select 
                className="w-full text-sm border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as ProjectStatus | 'ALL')}
            >
                <option value="ALL">Tất cả trạng thái</option>
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                ))}
            </select>
          </div>
        </div>
      }
    />
  );
};

const CreateMenuPopover = ({ onOpenCreateModal }: { onOpenCreateModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover 
      isOpen={isOpen} setIsOpen={setIsOpen}
      trigger={
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 font-medium text-sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Dự án mới</span>
        </button>
      }
      content={
        <div className="w-56 p-1.5">
          <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Khởi tạo</div>
          <button onClick={() => { onOpenCreateModal(); setIsOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group">
            <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md group-hover:bg-indigo-200 transition-colors"><Briefcase className="w-4 h-4" /></div>
            <div className="text-left"><div className="font-medium">Dự án trống</div><div className="text-[10px] text-slate-500 font-normal">Tạo từ đầu</div></div>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group mt-1">
            <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md group-hover:bg-emerald-200 transition-colors"><FilePlus className="w-4 h-4" /></div>
            <div className="text-left"><div className="font-medium">Dùng mẫu</div><div className="text-[10px] text-slate-500 font-normal">Từ thư viện template</div></div>
          </button>
          <div className="h-px bg-slate-100 my-1.5"></div>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group">
            <Upload className="w-4 h-4 text-slate-400 group-hover:text-slate-600" /><span>Nhập từ Excel/CSV</span>
          </button>
        </div>
      }
    />
  );
};

// --- PROJECT DISPLAY COMPONENTS ---

const ProjectCard = ({ project }: { project: ProjectEntity }) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col overflow-hidden h-full cursor-pointer relative">
      {/* Card Header Color Stripe */}
      <div className={cn(
          "h-1.5 w-full opacity-80 group-hover:opacity-100 transition-opacity bg-gradient-to-r",
          project.type === 'AGILE' ? "from-purple-500 to-pink-500" : "from-blue-500 to-cyan-500"
      )} />
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
             <div className={cn(
                 "p-1.5 rounded-lg transition-colors group-hover:bg-opacity-20", 
                 project.type === 'AGILE' ? "bg-purple-50 text-purple-600 group-hover:bg-purple-100" : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
             )}>
                {project.type === 'AGILE' ? <Zap className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
             </div>
             <span className="text-xs font-mono text-slate-500 group-hover:text-slate-700 transition-colors">{project.key}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
             <ProjectActionsMenu />
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
          {project.name}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
            <PriorityBadge priority={project.priority} />
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{project.category}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Tiến độ</span>
            <span className={cn("font-bold transition-colors duration-300", project.progress === 100 ? "text-emerald-600" : "group-hover:text-indigo-600 text-indigo-600")}>{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all duration-500 ease-out", project.progress === 100 ? "bg-emerald-500" : "bg-indigo-500 group-hover:bg-indigo-600")} 
              style={{ width: `${project.progress}%` }} 
            />
          </div>
        </div>

        {/* Meta Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 group-hover:border-slate-100 transition-colors">
          <AvatarStack users={project.members} />
          <StatusBadge status={project.status} />
        </div>
      </div>
    </div>
  );
};

const ProjectKanbanCard = ({ project }: { project: ProjectEntity }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group mb-3">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{project.key}</span>
                {project.type === 'AGILE' && <Zap className="w-3 h-3 text-purple-500" />}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ProjectActionsMenu />
            </div>
        </div>
        
        <h4 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
            {project.name}
        </h4>

        <div className="flex items-center gap-2 mb-3">
            <PriorityBadge priority={project.priority} />
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }} />
            </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <AvatarStack users={project.members} limit={2} />
            <div className="flex items-center text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                {new Date(project.dueDate).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'})}
            </div>
        </div>
    </div>
  );
};

const ProjectRow = ({ project }: { project: ProjectEntity }) => {
  return (
    <div className="group flex items-center p-4 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="w-10 mr-4 flex-shrink-0 text-center">
        <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-transform duration-200 group-hover:scale-110",
            project.type === 'AGILE' ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
        )}>
            {project.type === 'AGILE' ? <Zap className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px] pr-4">
        <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono text-slate-400 border border-slate-200 px-1 rounded group-hover:border-indigo-200 group-hover:text-indigo-500 transition-colors">{project.key}</span>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">{project.name}</h4>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"/>
            <span>QL: {project.manager.name}</span>
        </div>
      </div>

      <div className="w-24 px-2 flex-shrink-0">
        <TypeBadge type={project.type} />
      </div>

      <div className="w-32 px-4 flex-shrink-0">
        <StatusBadge status={project.status} />
      </div>

      <div className="w-24 px-4 flex-shrink-0">
        <PriorityBadge priority={project.priority} />
      </div>

      <div className="w-32 px-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }} />
            </div>
            <span className="text-xs font-medium text-slate-600 w-8 text-right">{project.progress}%</span>
        </div>
      </div>

      <div className="w-32 px-4 flex-shrink-0 flex justify-center">
        <AvatarStack users={project.members} />
      </div>

      <div className="w-32 px-4 flex-shrink-0 text-right text-xs text-slate-500">
        <div className="flex items-center justify-end gap-1 group-hover:text-slate-700 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            {new Date(project.dueDate).toLocaleDateString('vi-VN')}
        </div>
      </div>

      <div className="w-10 flex-shrink-0 flex justify-end pl-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
        <ProjectActionsMenu />
      </div>
    </div>
  );
};

const CreateProjectModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo dự án mới">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên dự án <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm" placeholder="Ví dụ: Website Redesign 2024" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mã dự án (Key)</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-mono uppercase" placeholder="ABC" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Loại dự án</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm bg-white">
                        <option value="WATERFALL">Waterfall (Truyền thống)</option>
                        <option value="AGILE">Agile (Linh hoạt)</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Độ ưu tiên</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm bg-white">
                    <option value="MEDIUM">Trung bình</option>
                    <option value="HIGH">Cao</option>
                    <option value="CRITICAL">Nghiêm trọng</option>
                    <option value="LOW">Thấp</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm h-24" placeholder="Mô tả mục tiêu và phạm vi của dự án..."></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày bắt đầu</label>
                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày kết thúc dự kiến</label>
                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Hủy bỏ</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all">Tạo dự án</button>
            </div>
        </form>
    </Modal>
  );
};

// --- MAIN PAGE ---

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<ProjectEntity[]>(INITIAL_PROJECTS);
  const [viewMode, setViewMode] = useState<ViewMode>('GRID');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'ALL'>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('NAME_ASC');
  
  // Quick Create State
  const [quickCreateColumn, setQuickCreateColumn] = useState<ProjectStatus | null>(null);
  const [quickProjectName, setQuickProjectName] = useState('');

  // Stats Calculation
  const stats = useMemo(() => {
    return {
        total: projects.length,
        active: projects.filter(p => p.status === 'EXECUTION' || p.status === 'PLANNING').length,
        completed: projects.filter(p => p.status === 'COMPLETED').length,
        delayed: projects.filter(p => new Date(p.dueDate) < new Date() && p.status !== 'COMPLETED').length
    };
  }, [projects]);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.key.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
        const matchesType = typeFilter === 'ALL' || p.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    // Sorting
    if (sortOption === 'NAME_ASC') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'PROGRESS_DESC') {
      result.sort((a, b) => b.progress - a.progress);
    } else if (sortOption === 'DUE_DATE_ASC') {
      result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (sortOption === 'PRIORITY_DESC') {
        const priorityOrder: Record<ProjectPriority, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    return result;
  }, [projects, searchQuery, statusFilter, typeFilter, sortOption]);

  // Kanban Grouping Logic
  const kanbanColumns = useMemo(() => {
    const columns: Record<ProjectStatus, ProjectEntity[]> = {
      DRAFT: [],
      PLANNING: [],
      EXECUTION: [],
      MONITORING: [],
      COMPLETED: [],
      ON_HOLD: [],
      CANCELLED: []
    };
    filteredProjects.forEach(project => {
      if (columns[project.status]) {
        columns[project.status].push(project);
      }
    });
    return columns;
  }, [filteredProjects]);

  const handleQuickCreate = (status: ProjectStatus) => {
    if (!quickProjectName.trim()) return;
    const newProject: ProjectEntity = {
        id: `p${Date.now()}`,
        key: `NEW-${Math.floor(Math.random() * 100)}`,
        name: quickProjectName,
        description: 'Dự án mới được tạo nhanh.',
        manager: USERS.u1,
        members: [USERS.u1],
        status: status,
        type: 'AGILE',
        priority: 'MEDIUM',
        progress: 0,
        startDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000 * 14).toISOString(), // +2 weeks
        category: 'General',
        taskCount: { total: 0, completed: 0 }
    };
    setProjects([...projects, newProject]);
    setQuickProjectName('');
    setQuickCreateColumn(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans overflow-hidden">
      
      {/* HEADER AREA */}
      <header className="px-6 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex-shrink-0">
        <div className="flex flex-col gap-5">
            {/* Top Row: Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        Tất cả dự án
                        <span className="text-sm font-normal text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full mt-1 shadow-sm">
                            {stats.total}
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Quản lý và theo dõi tiến độ của tất cả các dự án trong tổ chức.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Tìm dự án..." 
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white w-56 lg:w-64 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <FilterSortPopover 
                        currentSort={sortOption} 
                        onSortChange={setSortOption}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                        typeFilter={typeFilter}
                        onTypeFilterChange={setTypeFilter}
                    />

                    <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shadow-inner">
                        <button onClick={() => setViewMode('GRID')} className={cn("p-1.5 rounded-md transition-all active:scale-95", viewMode === 'GRID' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700")}><LayoutGrid className="w-4 h-4" /></button>
                        <button onClick={() => setViewMode('LIST')} className={cn("p-1.5 rounded-md transition-all active:scale-95", viewMode === 'LIST' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700")}><ListIcon className="w-4 h-4" /></button>
                        <button onClick={() => setViewMode('KANBAN')} className={cn("p-1.5 rounded-md transition-all active:scale-95", viewMode === 'KANBAN' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700")}><KanbanIcon className="w-4 h-4" /></button>
                    </div>

                    <CreateMenuPopover onOpenCreateModal={() => setIsCreateOpen(true)} />
                </div>
            </div>

            {/* Bottom Row: Stats & Quick Filters */}
            <div className="flex flex-wrap items-center gap-4 text-sm border-t border-slate-100 pt-4">
                <div className="flex items-center gap-6 pr-6 border-r border-slate-200">
                    <div className="flex items-center gap-2 text-slate-600">
                        <PieChart className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-900">{stats.active}</span> Đang chạy
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="font-semibold text-slate-900">{stats.completed}</span> Hoàn thành
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-slate-900">{stats.delayed}</span> Trễ hạn
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 text-xs">
                        <span className="text-slate-500">Loại:</span>
                        <span className="font-medium text-slate-700">{typeFilter === 'ALL' ? 'Tất cả' : typeFilter}</span>
                        {typeFilter !== 'ALL' && <button onClick={() => setTypeFilter('ALL')} className="ml-1 text-slate-400 hover:text-slate-600"><X className="w-3 h-3"/></button>}
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 text-xs">
                        <span className="text-slate-500">Trạng thái:</span>
                        <span className="font-medium text-slate-700">{statusFilter === 'ALL' ? 'Tất cả' : STATUS_CONFIG[statusFilter].label}</span>
                        {statusFilter !== 'ALL' && <button onClick={() => setStatusFilter('ALL')} className="ml-1 text-slate-400 hover:text-slate-600"><X className="w-3 h-3"/></button>}
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className={cn(
        "flex-1 flex flex-col relative", 
        viewMode === 'KANBAN' ? "overflow-hidden" : "overflow-y-auto"
      )}>
        
        {/* GRID VIEW */}
        {viewMode === 'GRID' && (
            <div className="w-full max-w-7xl mx-auto p-6 scroll-smooth">
                {filteredProjects.length === 0 ? (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-60">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            <FolderOpen className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Không tìm thấy dự án nào</h3>
                        <p className="text-slate-500 max-w-xs mt-1">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái của bạn.</p>
                        <button onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setTypeFilter('ALL'); }} className="mt-4 text-indigo-600 hover:underline text-sm font-medium">Xóa bộ lọc</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                        
                        {/* Add New Placeholder Card */}
                        <button 
                            onClick={() => setIsCreateOpen(true)}
                            className="group border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-300 min-h-[250px]"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors mb-3">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-600 group-hover:text-indigo-700">Tạo dự án mới</span>
                        </button>
                    </div>
                )}
            </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'LIST' && (
            <div className="w-full max-w-7xl mx-auto p-6 scroll-smooth">
                {filteredProjects.length === 0 ? (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-60">
                        <FolderOpen className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-slate-500">Không có dự án nào khớp với bộ lọc.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="overflow-x-auto">
                            <div className="min-w-[1000px] border-b border-slate-100 bg-slate-50/80 px-4 py-3 flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wider sticky top-0 z-10">
                                <div className="w-10 mr-4">Loại</div>
                                <div className="flex-1 min-w-[200px] pr-4">Dự án</div>
                                <div className="w-24 px-2">Loại</div>
                                <div className="w-32 px-4">Trạng thái</div>
                                <div className="w-24 px-4">Độ ưu tiên</div>
                                <div className="w-32 px-4">Tiến độ</div>
                                <div className="w-32 px-4 text-center">Thành viên</div>
                                <div className="w-32 px-4 text-right">Ngày hạn</div>
                                <div className="w-10 pl-2"></div>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {filteredProjects.map(project => (
                                    <ProjectRow key={project.id} project={project} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* KANBAN VIEW */}
        {viewMode === 'KANBAN' && (
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 custom-scrollbar">
                <div className="h-full flex gap-6 min-w-max">
                    {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                        const projects = kanbanColumns[key as ProjectStatus];
                        const isQuickCreateActive = quickCreateColumn === key;

                        return (
                            <div key={key} className="flex-shrink-0 w-80 flex flex-col h-full">
                                <div className={cn("flex items-center justify-between mb-3 px-3 py-2.5 rounded-xl border transition-colors duration-300", config.bg, config.border)}>
                                    <div className="flex items-center gap-2 font-bold text-sm text-slate-700">
                                        <config.icon className={cn("w-4 h-4", config.color)} />
                                        {config.label}
                                    </div>
                                    <span className="bg-white/60 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
                                        {projects.length}
                                    </span>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-1 pb-4">
                                    {projects.map(project => (
                                        <ProjectKanbanCard key={project.id} project={project} />
                                    ))}
                                    
                                    {/* Inline Quick Create Input */}
                                    {isQuickCreateActive ? (
                                        <div className="p-3 bg-white border border-indigo-200 rounded-xl shadow-sm animate-in fade-in zoom-in-95 duration-200">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Nhập tên dự án..."
                                                className="w-full text-sm mb-2 px-2 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
                                                value={quickProjectName}
                                                onChange={e => setQuickProjectName(e.target.value)}
                                                onKeyDown={e => { 
                                                    if(e.key === 'Enter') handleQuickCreate(key as ProjectStatus); 
                                                    else if(e.key === 'Escape') setQuickCreateColumn(null); 
                                                }}
                                            />
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => setQuickCreateColumn(null)} className="px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 rounded">Hủy</button>
                                                <button onClick={() => handleQuickCreate(key as ProjectStatus)} className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700">Tạo</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button 
                                            className="w-full py-2.5 mt-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
                                            onClick={() => setQuickCreateColumn(key as ProjectStatus)}
                                        >
                                            <Plus className="w-4 h-4" /> Thêm nhanh
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

      </main>

      {/* MODALS */}
      <CreateProjectModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}