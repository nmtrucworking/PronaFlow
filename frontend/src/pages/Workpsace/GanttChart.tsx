import React, { useState, useMemo, useEffect } from 'react';
// Sử dụng CDN để đảm bảo Preview chạy được, khi đưa vào dự án bạn đổi lại thành:
// import { Gantt, ViewMode } from 'gantt-task-react';
import { Gantt, ViewMode } from 'gantt-task-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import * as Separator from '@radix-ui/react-separator';
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Filter, Calendar, User, Clock, 
  AlertCircle, ChevronDown, Layers, Flag, 
  Tag, ArrowRight, Maximize2, Minimize2, ListFilter, 
  ArrowUpDown, HelpCircle, Link2, X, Target, Zap, 
  Briefcase, Info, MousePointer2, Keyboard, Settings2, Search
} from 'lucide-react';

/**
 * PRONAFLOW DESIGN SYSTEM CONFIG
 */
const PRIORITIES = {
  "URGENT": { label: "Khẩn cấp", color: "#EF4444", bg: "bg-red-500", light: "bg-red-50", text: "text-red-600" },
  "HIGH": { label: "Cao", color: "#F97316", bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600" },
  "NORMAL": { label: "Trung bình", color: "#3B82F6", bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
  "LOW": { label: "Thấp", color: "#64748B", bg: "bg-slate-500", light: "bg-slate-50", text: "text-slate-600" }
};

const STATUSES = {
  "TODO": { label: "Cần làm", color: "#94A3B8", bg: "bg-slate-100", dot: "bg-slate-400", text: "text-slate-600" },
  "IN_PROGRESS": { label: "Đang làm", color: "#3B82F6", bg: "bg-blue-50", dot: "bg-blue-500", text: "text-blue-700" },
  "REVIEW": { label: "Chờ duyệt", color: "#A855F7", bg: "bg-purple-50", dot: "bg-purple-500", text: "text-purple-700" },
  "DONE": { label: "Hoàn thành", color: "#10B981", bg: "bg-emerald-50", dot: "bg-emerald-500", text: "text-emerald-700" }
};

/**
 * DATA MAPPING ENGINE
 */
type TaskType = 'project' | 'task';

interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type: TaskType;
  hideChildren?: boolean;
  displayOrder: number;
  styles: { backgroundColor: string; progressColor: string; backgroundSelectedColor?: string };
  project?: string;
  dependencies?: string[];
  assignee?: string;
  priority?: string;
}

const INITIAL_DATA: Task[] = [
  {
    id: "P-01",
    name: "Tối ưu hóa hạ tầng Cloud v3",
    start: new Date(2026, 0, 2),
    end: new Date(2026, 0, 28),
    progress: 45,
    type: "project",
    hideChildren: false,
    displayOrder: 1,
    styles: { backgroundColor: '#f1f5f9', progressColor: '#64748b', backgroundSelectedColor: '#e2e8f0' },
  },
  {
    id: "T-101",
    name: "Phân tích log và nghẽn mạng",
    start: new Date(2026, 0, 2),
    end: new Date(2026, 0, 7),
    progress: 100,
    type: "task",
    project: "P-01",
    displayOrder: 2,
    dependencies: [],
    styles: { backgroundColor: '#F97316', progressColor: '#ea580c' },
    assignee: "Hoàng Anh",
    priority: "HIGH"
  },
  {
    id: "T-102",
    name: "Thiết kế kiến trúc Serverless",
    start: new Date(2026, 0, 8),
    end: new Date(2026, 0, 18),
    progress: 60,
    type: "task",
    project: "P-01",
    displayOrder: 3,
    dependencies: ["T-101"],
    styles: { backgroundColor: '#EF4444', progressColor: '#dc2626' },
    assignee: "Minh Tú",
    priority: "URGENT"
  },
  {
    id: "T-103",
    name: "Triển khai Auto-scaling engine",
    start: new Date(2026, 0, 19),
    end: new Date(2026, 0, 28),
    progress: 10,
    type: "task",
    project: "P-01",
    displayOrder: 4,
    dependencies: ["T-102"],
    styles: { backgroundColor: '#3B82F6', progressColor: '#2563eb' },
    assignee: "Quốc Bảo",
    priority: "NORMAL"
  }
];

const App = () => {
  const [viewMode, setViewMode] = useState(ViewMode.Week);
  const [density, setDensity] = useState('Comfortable');
  const [tasks, setTasks] = useState(INITIAL_DATA);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriorities, setSelectedPriorities] = useState<Set<string>>(new Set());
  const [selectedAssignees, setSelectedAssignees] = useState<Set<string>>(new Set());
  const [includeProjects, setIncludeProjects] = useState(true);

  // Inject CSS của thư viện vì môi trường preview không hỗ trợ import .css trực tiếp từ lib
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://esm.sh/gantt-task-react/dist/index.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const rowHeight = density === 'Comfortable' ? 68 : 46;
  const listCellWidth = density === 'Comfortable' ? "300px" : "240px";
  const chartScale = 0.9; // Thu nhỏ kích thước tổng thể của chart

  const assignees = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach(t => { if (t.assignee) set.add(t.assignee); });
    return Array.from(set);
  }, [tasks]);

  const childrenByProject = useMemo(() => {
    const map = new Map<string, Task[]>();
    tasks.filter(t => t.type === 'task' && t.project).forEach(t => {
      const key = t.project as string;
      const arr = map.get(key) || [];
      arr.push(t);
      map.set(key, arr);
    });
    return map;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchTask = (t: Task) => {
      const matchQuery = !query || t.name.toLowerCase().includes(query) || (t.assignee?.toLowerCase().includes(query) ?? false);
      const matchPriority = selectedPriorities.size === 0 || (!!t.priority && selectedPriorities.has(t.priority));
      const matchAssignee = selectedAssignees.size === 0 || (!!t.assignee && selectedAssignees.has(t.assignee));
      return matchQuery && matchPriority && matchAssignee;
    };

    const result: Task[] = [];
    for (const t of tasks) {
      if (t.type === 'task') {
        if (matchTask(t)) result.push(t);
      } else {
        if (!includeProjects) continue;
        const children = childrenByProject.get(t.id) || [];
        const hasChildMatch = children.some(c => matchTask(c));
        const selfMatch = !query || t.name.toLowerCase().includes(query);
        if (hasChildMatch || selfMatch) result.push(t);
      }
    }
    return result.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [tasks, searchQuery, selectedPriorities, selectedAssignees, includeProjects, childrenByProject]);

  const togglePriority = (p: string) => {
    setSelectedPriorities(prev => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p); else next.add(p);
      return next;
    });
  };

  const toggleAssignee = (a: string) => {
    setSelectedAssignees(prev => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a); else next.add(a);
      return next;
    });
  };

  /**
   * CUSTOM TOOLTIP
   */
  const CustomTooltip = ({ task }: { task: any }) => {
    if (task.type === 'project') return null;
    const priority = PRIORITIES[task.priority as keyof typeof PRIORITIES] || PRIORITIES.NORMAL;
    
    return (
      <div className="bg-white rounded-[28px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-7 min-w-[340px] pointer-events-none">
        <div className="flex justify-between items-start mb-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">TASK NODE: {task.id}</span>
            <h4 className="text-xl font-black text-slate-800 leading-tight tracking-tighter">{task.name}</h4>
          </div>
          <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${priority.bg} text-white shadow-md`}>
            {priority.label}
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-slate-50 p-5 rounded-[24px] border border-slate-100 shadow-inner">
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Start</span>
                <div className="text-xs font-black text-slate-700">{task.start.toLocaleDateString('vi-VN')}</div>
             </div>
             <div className="w-px h-8 bg-slate-200" />
             <div className="space-y-1 text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Finish</span>
                <div className="text-xs font-black text-slate-700">{task.end.toLocaleDateString('vi-VN')}</div>
             </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-amber-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiến độ</span>
                </div>
                <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{task.progress}%</span>
             </div>
             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden ring-4 ring-slate-50 shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" style={{ width: `${task.progress}%` }} />
             </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-[12px] font-black text-blue-700 border-2 border-white shadow-sm ring-1 ring-blue-50">
                   {task.assignee?.substring(0, 2)}
                </div>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Owner</span>
                   <span className="text-sm font-black text-slate-800 tracking-tight">{task.assignee}</span>
                </div>
             </div>
             <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">PronaFlow Core</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Tooltip.Provider>
    <div className="flex flex-col h-screen bg-white text-slate-900 overflow-hidden font-sans select-none antialiased gantt-container">
      
      {/* 1. PREMIUM HEADER */}
      <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-slate-100 shrink-0 z-30">
        <div className="flex items-center gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-5">
            <div className="p-3.5 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[22px] text-white shadow-2xl shadow-blue-100 ring-4 ring-blue-50">
              <Layers size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none text-slate-800 uppercase">Lịch trình Gantt</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Temporal Engine v5.2</p>
              </div>
            </div>
          </motion.div>
          
          <Separator.Root orientation="vertical" className="h-10 bg-slate-200 mx-2" />
          
          <div className="flex bg-slate-100 p-1.5 rounded-[18px] border border-slate-200 shadow-inner">
            {[
              { label: 'Ngày', mode: ViewMode.Day },
              { label: 'Tuần', mode: ViewMode.Week },
              { label: 'Tháng', mode: ViewMode.Month }
            ].map(v => (
              <button
                key={v.label}
                onClick={() => setViewMode(v.mode)}
                className={`px-7 py-2.5 text-[11px] font-black rounded-[14px] transition-all duration-500 ${
                  viewMode === v.mode ? 'bg-white shadow-xl text-blue-600 scale-105 ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 ml-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-[16px] border border-slate-200 shadow-inner">
              <Search size={16} className="text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm công việc..."
                className="bg-transparent outline-none text-[12px] font-black text-slate-700 placeholder-slate-400 w-[220px]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>

            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-[16px] border border-slate-200 text-[11px] font-black text-slate-600 hover:shadow-md transition-all">
                  <ListFilter size={16} className="text-blue-600" />
                  Bộ lọc
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content sideOffset={12} className="w-[420px] bg-white p-6 rounded-[24px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100 z-[100] animate-in slide-in-from-top-4 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hiển thị Project</span>
                      <button
                        onClick={() => setIncludeProjects(v => !v)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black ${includeProjects ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'} border border-slate-200`}
                      >
                        {includeProjects ? 'Bật' : 'Tắt'}
                      </button>
                    </div>

                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ưu tiên</div>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.keys(PRIORITIES).map(p => (
                          <button
                            key={p}
                            onClick={() => togglePriority(p)}
                            className={`px-3 py-2 rounded-[12px] text-[10px] font-black border transition-all ${selectedPriorities.has(p) ? 'bg-white border-blue-300 text-blue-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}
                          >
                            {PRIORITIES[p as keyof typeof PRIORITIES].label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Người phụ trách</div>
                      <div className="grid grid-cols-3 gap-2">
                        {assignees.map(a => (
                          <button
                            key={a}
                            onClick={() => toggleAssignee(a)}
                            className={`px-3 py-2 rounded-[12px] text-[10px] font-black border transition-all ${selectedAssignees.has(a) ? 'bg-white border-blue-300 text-blue-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* HELP HELPERS */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="p-3.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-[20px] transition-all border border-transparent hover:border-blue-100 shadow-sm">
                <HelpCircle size={24} />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content sideOffset={18} className="w-[400px] bg-white p-8 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100 z-[100] animate-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-inner"><Zap size={24} /></div>
                  <div>
                    <h4 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">Hướng dẫn vận hành</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 block">Learning the controls</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                   <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[28px] border border-slate-100 group transition-all hover:bg-white hover:shadow-xl">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-500 rounded-xl text-white shadow-lg"><MousePointer2 size={18} /></div>
                          <span className="text-[13px] font-black text-slate-700">Kéo thả để dời hạn</span>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[28px] border border-slate-100 group transition-all hover:bg-white hover:shadow-xl">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-orange-500 rounded-xl text-white shadow-lg"><Link2 size={18} /></div>
                          <span className="text-[13px] font-black text-slate-700">Tạo liên kết dependencies</span>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                   <div className="p-6 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50">
                      <div className="flex items-center gap-2 mb-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                        <Keyboard size={14} /> Phím tắt nhanh
                      </div>
                      <p className="text-[11px] leading-relaxed font-bold text-slate-500">
                        Nhấn <kbd className="bg-white px-1.5 py-0.5 rounded-lg border border-indigo-200 text-indigo-600 shadow-sm mx-1">Alt + Click</kbd> vào thanh công việc để mở trình biên tập logic nâng cao.
                      </p>
                   </div>
                </div>
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Separator.Root orientation="vertical" className="h-10 bg-slate-100" />

          {/* DENSITY ACTION SWITCH */}
          <div className="flex bg-slate-100 p-1.5 rounded-[20px] border border-slate-200 shadow-inner">
             <button 
               onClick={() => setDensity('Comfortable')}
               className={`p-3 rounded-[16px] transition-all duration-500 ${density === 'Comfortable' ? 'bg-white shadow-2xl text-blue-600 scale-110 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Maximize2 size={20} strokeWidth={2.5} />
             </button>
             <button 
               onClick={() => setDensity('Compact')}
               className={`p-3 rounded-[16px] transition-all duration-500 ${density === 'Compact' ? 'bg-white shadow-2xl text-blue-600 scale-110 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Minimize2 size={20} strokeWidth={2.5} />
             </button>
          </div>

          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white text-[12px] font-black rounded-[22px] hover:bg-black transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] active:scale-95 uppercase tracking-[0.2em]"
          >
            <Plus size={22} strokeWidth={3} /> Tạo Task
          </button>
        </div>
      </header>

      {/* 2. GANTT CORE ENGINE AREA */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={density + viewMode}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="h-full w-full"
          >
            <div style={{ transform: `scale(${chartScale})`, transformOrigin: 'top left' }}>
              <Gantt
                tasks={filteredTasks}
                viewMode={viewMode}
                rowHeight={Math.round(rowHeight * 0.9)}
                columnWidth={viewMode === ViewMode.Day ? 110 : 170}
                listCellWidth={listCellWidth}
                TooltipContent={CustomTooltip}
                fontSize={density === 'Comfortable' ? "13px" : "11px"}
                headerHeight={56}
                barCornerRadius={16}
                barFill={80}
                locale="vi-VN"
                onDateChange={(task: any) => {
                  setTasks(prev => prev.map(t => t.id === task.id ? { ...t, start: task.start, end: task.end } : t));
                }}
                onProgressChange={(task: any) => {
                   setTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress: task.progress } : t));
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CUSTOM OVERLAY STYLES FOR THE LIBRARY */}
        <style dangerouslySetInnerHTML={{ __html: `
          .gantt-container ._3_9D1 { border-color: #f8fafc !important; } 
          .gantt-container ._3_9D1:nth-child(even) { background-color: #fdfdfd !important; }
          .gantt-container ._2W_9v { background-color: #fff !important; border-right: 1px solid #f1f5f9 !important; box-shadow: 10px 0 30px -10px rgba(0,0,0,0.02); } 
          .gantt-container ._2L_y3 { border-bottom: 1px solid #f1f5f9 !important; font-weight: 900 !important; color: #94a3b8 !important; text-transform: uppercase; font-size: 11px !important; letter-spacing: 0.2em; height: 60px !important; }
          .gantt-container ._3_G_S { color: #334155 !important; font-weight: 800 !important; font-size: 13px !important; } 
          .gantt-container ._1n_7C { border-radius: 16px !important; border: 2px solid white !important; box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important; } 
          .gantt-container ._1rS_X { font-weight: 900 !important; fill: #64748b !important; }
        `}} />
      </div>

      {/* 3. CREATE DIALOG */}
      <Dialog.Root open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[100] animate-in fade-in duration-700" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] bg-white rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] z-[101] overflow-hidden animate-in zoom-in-95 border border-white/40">
            <div className="p-12">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-blue-100 rounded-[28px] text-blue-600 shadow-inner"><Target size={32} /></div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none">Công việc mới</h2>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 italic">Infrastructure Architecture Plan</p>
                  </div>
                </div>
                <Dialog.Close className="p-4 hover:bg-slate-100 rounded-3xl transition-all duration-300 hover:rotate-90"><X size={28} /></Dialog.Close>
              </div>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-3">Định danh mục tiêu</label>
                  <input type="text" placeholder="Nhập tên task chính thức..." className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[32px] outline-none text-lg font-bold transition-all shadow-inner" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-3">Độ ưu tiên</label>
                    <div className="flex gap-2 p-2 bg-slate-50 rounded-[30px] shadow-inner">
                      {['URGENT', 'HIGH', 'NORMAL'].map(p => (
                        <button key={p} className={`flex-1 py-4 rounded-[22px] text-[10px] font-black transition-all duration-500 ${p === 'NORMAL' ? 'bg-white shadow-xl text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}>
                          {PRIORITIES[p as keyof typeof PRIORITIES].label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-3">Ràng buộc (Links)</label>
                    <div className="relative group">
                      <select className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[30px] outline-none text-[12px] font-black appearance-none cursor-pointer hover:bg-slate-100 transition-colors shadow-inner">
                        <option>Không có ràng buộc</option>
                        {tasks.filter(t => t.type === 'task').map(t => <option key={t.id}>{t.name}</option>)}
                      </select>
                      <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform group-hover:translate-y-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-[40px] border border-blue-100/50 flex items-start gap-6 shadow-sm">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600"><Info size={24} /></div>
                  <div>
                    <p className="text-[13px] leading-relaxed font-bold text-slate-600 italic">
                      "Hệ thống tự động đồng bộ hóa với Module 5 Scheduling Engine để tối ưu hóa lộ trình rủi ro."
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-14 flex gap-6">
                <Dialog.Close asChild>
                  <button className="flex-1 py-6 text-xs font-black text-slate-400 hover:bg-slate-50 rounded-[32px] transition-all uppercase tracking-widest">Hủy lệnh</button>
                </Dialog.Close>
                <button className="flex-[2] py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 text-white text-[13px] font-black rounded-[32px] shadow-2xl shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-95 uppercase tracking-[0.2em]">Xác nhận lộ trình</button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* 4. FOOTER STATUS BAR */}
      <footer className="h-14 bg-white border-t border-slate-100 flex items-center justify-between px-12 shrink-0 z-30 shadow-[0_-10px_50px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-3">
             <div className="relative flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping opacity-60" />
             </div>
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Scheduling Engine Status: Active</span>
          </div>
          <div className="flex items-center gap-10">
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100"><Target size={14} strokeWidth={3} /></div>
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">3 Tasks Syncing</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm border border-orange-100"><Link2 size={14} strokeWidth={3} /></div>
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">2 Active Links</span>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 px-6 py-2.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black border border-slate-200/50 shadow-inner group cursor-pointer transition-all hover:bg-white hover:shadow-lg">
              <Clock size={16} strokeWidth={3} className="text-blue-500 group-hover:rotate-12 transition-transform" />
              AUTO-SAVE: 14:43:01
           </div>
           <Separator.Root orientation="vertical" className="h-8 bg-slate-100" />
           <span className="text-[13px] font-black text-slate-300 uppercase tracking-[0.6em]">PronaFlow Framework v5</span>
        </div>
      </footer>
    </div>
    </Tooltip.Provider>
  );
};

export default App;