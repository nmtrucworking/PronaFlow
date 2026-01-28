import React, { useState, useMemo } from 'react';
import * as Progress from '@radix-ui/react-progress';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Popover from '@radix-ui/react-popover';
import * as Switch from '@radix-ui/react-switch';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { 
  Check, 
  Clock, 
  AlertCircle, 
  Calendar as CalendarIcon, 
  Filter, 
  MoreHorizontal, 
  Search,
  LayoutGrid,
  List as ListIcon,
  ArrowRight,
  Settings,
  Edit,
  Trash2,
  CalendarDays,
  EyeOff,
  Plus,
  ChevronRight,
  User,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
interface ProjectEntity {
  project_id: string;
  name: string;
  key: string;
}

interface UserEntity {
  user_id: string;
  username: string;
  avatar_url?: string;
}

type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';

interface TaskEntity {
  task_id: string;
  task_number: number;
  title: string;
  project: ProjectEntity;
  status: TaskStatus;
  priority: TaskPriority;
  planned_end: string;
  assignees: UserEntity[];
}

type DensityMode = 'comfortable' | 'compact';

interface DashboardConfig {
  showStats: boolean;
  showCalendar: boolean;
  showActivity: boolean;
  showWeeklyProgress: boolean;
}

// --- MOCK DATA ---
const CURRENT_USER: UserEntity = { user_id: 'u1', username: 'Truc Nguyen', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' };

const MOCK_TASKS: TaskEntity[] = [
  {
    task_id: 't1',
    task_number: 101,
    title: 'Design System Architecture Diagram',
    project: { project_id: 'p1', name: 'PronaFlow Core', key: 'PFLOW' },
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    planned_end: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    assignees: [CURRENT_USER],
  },
  {
    task_id: 't2',
    task_number: 102,
    title: 'Review PR #45 for Auth Module',
    project: { project_id: 'p1', name: 'PronaFlow Core', key: 'PFLOW' },
    status: 'NOT_STARTED',
    priority: 'HIGH',
    planned_end: new Date().toISOString(),
    assignees: [CURRENT_USER],
  },
  {
    task_id: 't3',
    task_number: 205,
    title: 'Update User Documentation for Module 9',
    project: { project_id: 'p2', name: 'Documentation', key: 'DOCS' },
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    planned_end: new Date().toISOString(),
    assignees: [CURRENT_USER],
  },
  {
    task_id: 't4',
    task_number: 88,
    title: 'Weekly Sync with Marketing Team',
    project: { project_id: 'p3', name: 'Marketing Q1', key: 'MKT' },
    status: 'NOT_STARTED',
    priority: 'LOW',
    planned_end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    assignees: [CURRENT_USER],
  },
];

// --- CONSTANTS ---
const PRIORITY_CONFIG = {
  URGENT: { label: 'Urgent', color: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900', icon: AlertCircle },
  HIGH: { label: 'High', color: 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900', icon: ArrowRight },
  MEDIUM: { label: 'Medium', color: 'text-sky-600 bg-sky-50 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-900', icon: ArrowRight },
  LOW: { label: 'Low', color: 'text-slate-500 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700', icon: ArrowRight },
};

// --- COMPONENTS ---

const TaskPriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const config = PRIORITY_CONFIG[priority];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border shadow-sm", config.color)}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

// Task Actions Menu using Radix Dropdown
const TaskActionsMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-all outline-none focus:opacity-100 focus:ring-2 focus:ring-indigo-500/20 active:scale-95">
          <MoreHorizontal className="w-4 h-4 text-slate-500" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="min-w-[160px] bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl p-1 animate-in fade-in zoom-in-95 duration-150 z-50"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item className="flex items-center px-2 py-2 text-xs text-slate-700 dark:text-slate-300 outline-none hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer transition-colors">
            <Edit className="w-3.5 h-3.5 mr-2 text-slate-400" />
            Chỉnh sửa
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex items-center px-2 py-2 text-xs text-slate-700 dark:text-slate-300 outline-none hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer transition-colors">
            <CalendarDays className="w-3.5 h-3.5 mr-2 text-slate-400" />
            Dời ngày hạn
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
          <DropdownMenu.Item className="flex items-center px-2 py-2 text-xs text-red-600 dark:text-red-400 outline-none hover:bg-red-50 dark:hover:bg-red-900/10 rounded cursor-pointer transition-colors">
            <Trash2 className="w-3.5 h-3.5 mr-2" />
            Xóa công việc
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const TaskRow = ({ task, density, onToggle }: { task: TaskEntity; density: DensityMode; onToggle: (id: string) => void }) => {
  const isOverdue = new Date(task.planned_end) < new Date() && new Date(task.planned_end).toDateString() !== new Date().toDateString() && task.status !== 'DONE';
  const paddingClass = density === 'comfortable' ? 'py-3' : 'py-1.5';
  const titleSize = density === 'comfortable' ? 'text-sm' : 'text-xs';

  return (
    <div className={cn(
      "group flex items-center border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-200 px-4 relative overflow-hidden",
      paddingClass
    )}>
      {/* Selection Highlight Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex-shrink-0 mr-3 z-10">
        <Checkbox.Root 
          className="flex h-5 w-5 appearance-none items-center justify-center rounded border border-slate-300 bg-white hover:border-indigo-400 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900 transition-all duration-200 active:scale-90"
          id={`task-${task.task_id}`}
          checked={task.status === 'DONE'}
          onCheckedChange={() => onToggle(task.task_id)}
        >
          <Checkbox.Indicator>
            <Check className="h-3.5 w-3.5 text-white animate-in zoom-in duration-200" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>

      <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center z-10">
        <div className="col-span-12 md:col-span-6">
          <div className="flex items-center space-x-2">
            <span className="flex-shrink-0 text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded transition-colors group-hover:bg-slate-200 dark:group-hover:bg-slate-700">
              {task.project.key}-{task.task_number}
            </span>
            <TaskPriorityBadge priority={task.priority} />
          </div>
          <p className={cn(
            "font-medium text-slate-900 dark:text-slate-100 truncate mt-1 cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200",
            titleSize,
            task.status === 'DONE' && "line-through text-slate-400 decoration-slate-400 group-hover:text-slate-500"
          )}>
            {task.title}
          </p>
        </div>

        <div className="hidden md:block col-span-3">
          <span className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-default">
            {task.project.name}
          </span>
        </div>

        <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end space-x-4">
          <div className={cn(
            "flex items-center text-xs whitespace-nowrap transition-colors duration-200",
            isOverdue 
              ? "text-red-600 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/50" 
              : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
          )}>
            <CalendarIcon className="w-3 h-3 mr-1.5" />
            {new Date(task.planned_end).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-2 hover:space-x-1 transition-all duration-300">
              {task.assignees.map(user => (
                <Tooltip.Provider key={user.user_id}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <img 
                        src={user.avatar_url} 
                        alt={user.username}
                        className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-900 grayscale-[0.2] hover:grayscale-0 hover:ring-indigo-100 dark:hover:ring-indigo-900 hover:scale-110 transition-all duration-200 z-0 hover:z-10 shadow-sm" 
                      />
                    </Tooltip.Trigger>
                    <Tooltip.Content className="px-2 py-1 text-xs bg-slate-900 text-white rounded shadow-md z-50 animate-in fade-in zoom-in-95 duration-200" sideOffset={5}>
                      {user.username}
                      <Tooltip.Arrow className="fill-slate-900" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </div>
            
            <TaskActionsMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskGroup = ({ title, count, type, children, onSeeAll }: { title: string, count: number, type: 'danger' | 'info' | 'neutral', children: React.ReactNode, onSeeAll?: () => void }) => {
  const headerColor = {
    danger: 'text-red-600 dark:text-red-400',
    info: 'text-indigo-600 dark:text-indigo-400',
    neutral: 'text-slate-600 dark:text-slate-400'
  };

  if (count === 0) return null;

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex items-center justify-between mb-3 group/header cursor-pointer" onClick={onSeeAll}>
        <h3 className={cn("text-sm font-semibold flex items-center uppercase tracking-wider transition-opacity hover:opacity-80", headerColor[type])}>
          {title} <span className="ml-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-0.5 px-2 rounded-full text-xs font-bold shadow-sm">{count}</span>
        </h3>
        
        {/* Quick Navigate Button */}
        <button 
          className="flex items-center text-xs font-medium text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all opacity-0 group-hover/header:opacity-100 -translate-x-2 group-hover/header:translate-x-0 duration-300"
        >
          Xem tất cả <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 transition-all hover:shadow-md">
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, subtext, type }: { label: string, value: string, subtext: string, type?: 'danger' | 'success' }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group">
    <div className="flex justify-between items-start">
      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{label}</p>
      {type === 'danger' && <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
    </div>
    <div className="mt-2 flex items-baseline">
      <span className={cn(
        "text-3xl font-bold tracking-tight",
        type === 'danger' ? "text-red-600 dark:text-red-400" : type === 'success' ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
      )}>{value}</span>
    </div>
    <p className="text-xs text-slate-400 mt-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{subtext}</p>
  </div>
);

// --- FILTER POPOVER ---
const FilterMenu = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all active:scale-95 outline-none focus:ring-2 focus:ring-indigo-500/20">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Bộ lọc
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content 
          className="w-72 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl p-4 animate-in zoom-in-95 duration-200 z-50" 
          sideOffset={8} 
          align="end"
        >
          <div className="space-y-5">
            {/* Sort Section */}
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                <ArrowUpDown className="w-3 h-3 mr-1.5" /> Sắp xếp theo
              </h4>
              <RadioGroup.Root defaultValue="dueDate" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroup.Item value="dueDate" id="sort-due" className="w-4 h-4 rounded-full border border-slate-300 text-indigo-600 focus:ring-indigo-500">
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-indigo-600" />
                  </RadioGroup.Item>
                  <label htmlFor="sort-due" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Ngày đến hạn (Gần nhất)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroup.Item value="priority" id="sort-priority" className="w-4 h-4 rounded-full border border-slate-300 text-indigo-600 focus:ring-indigo-500">
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-indigo-600" />
                  </RadioGroup.Item>
                  <label htmlFor="sort-priority" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Độ ưu tiên (Cao nhất)</label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* Filter Section */}
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                <Filter className="w-3 h-3 mr-1.5" /> Lọc công việc
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox.Root className="flex h-4 w-4 appearance-none items-center justify-center rounded border border-slate-300 bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500/20" id="filter-me">
                    <Checkbox.Indicator>
                      <Check className="h-3 w-3 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor="filter-me" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Chỉ hiện việc của tôi</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox.Root className="flex h-4 w-4 appearance-none items-center justify-center rounded border border-slate-300 bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500/20" id="filter-hide-done">
                    <Checkbox.Indicator>
                      <Check className="h-3 w-3 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor="filter-hide-done" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">Ẩn việc đã hoàn thành</label>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 text-xs font-semibold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
          <Popover.Arrow className="fill-white dark:fill-slate-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// --- DASHBOARD CUSTOMIZER POPOVER ---
const DashboardCustomizer = ({ config, onToggle }: { config: DashboardConfig, onToggle: (key: keyof DashboardConfig) => void }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-indigo-400 transition-all active:scale-95 shadow-sm">
          <Settings className="w-3.5 h-3.5 mr-2" />
          Tùy biến
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="w-64 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl p-4 animate-in zoom-in-95 duration-200 z-50" sideOffset={5} align="end">
          <h4 className="text-sm font-semibold mb-3 text-slate-900 dark:text-white">Hiển thị Widget</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between group">
              <label className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer group-hover:text-indigo-600 transition-colors" htmlFor="toggle-stats">Thẻ thống kê</label>
              <Switch.Root 
                id="toggle-stats" 
                checked={config.showStats}
                onCheckedChange={() => onToggle('showStats')}
                className="w-[30px] h-[18px] bg-slate-200 dark:bg-slate-700 rounded-full relative data-[state=checked]:bg-indigo-600 outline-none cursor-pointer transition-colors"
              >
                <Switch.Thumb className="block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[14px] shadow-sm" />
              </Switch.Root>
            </div>
            <div className="flex items-center justify-between group">
              <label className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer group-hover:text-indigo-600 transition-colors" htmlFor="toggle-weekly">Hiệu suất tuần</label>
              <Switch.Root 
                id="toggle-weekly" 
                checked={config.showWeeklyProgress}
                onCheckedChange={() => onToggle('showWeeklyProgress')}
                className="w-[30px] h-[18px] bg-slate-200 dark:bg-slate-700 rounded-full relative data-[state=checked]:bg-indigo-600 outline-none cursor-pointer transition-colors"
              >
                <Switch.Thumb className="block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[14px] shadow-sm" />
              </Switch.Root>
            </div>
            <div className="flex items-center justify-between group">
              <label className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer group-hover:text-indigo-600 transition-colors" htmlFor="toggle-calendar">Lịch (Sidebar)</label>
              <Switch.Root 
                id="toggle-calendar" 
                checked={config.showCalendar}
                onCheckedChange={() => onToggle('showCalendar')}
                className="w-[30px] h-[18px] bg-slate-200 dark:bg-slate-700 rounded-full relative data-[state=checked]:bg-indigo-600 outline-none cursor-pointer transition-colors"
              >
                <Switch.Thumb className="block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[14px] shadow-sm" />
              </Switch.Root>
            </div>
            <div className="flex items-center justify-between group">
              <label className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer group-hover:text-indigo-600 transition-colors" htmlFor="toggle-activity">Hoạt động gần đây</label>
              <Switch.Root 
                id="toggle-activity" 
                checked={config.showActivity}
                onCheckedChange={() => onToggle('showActivity')}
                className="w-[30px] h-[18px] bg-slate-200 dark:bg-slate-700 rounded-full relative data-[state=checked]:bg-indigo-600 outline-none cursor-pointer transition-colors"
              >
                <Switch.Thumb className="block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[14px] shadow-sm" />
              </Switch.Root>
            </div>
          </div>
          <Popover.Arrow className="fill-white dark:fill-slate-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function MyWorkPage() {
  const [density, setDensity] = useState<DensityMode>('comfortable');
  const [tasks, setTasks] = useState<TaskEntity[]>(MOCK_TASKS);
  
  // Personalization State (Module 9)
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>({
    showStats: true,
    showCalendar: true,
    showActivity: true,
    showWeeklyProgress: true
  });

  const toggleDashboardConfig = (key: keyof DashboardConfig) => {
    setDashboardConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const groupedTasks = useMemo(() => {
    const today = new Date().toDateString();
    const now = new Date();

    return {
      overdue: tasks.filter(t => new Date(t.planned_end) < now && new Date(t.planned_end).toDateString() !== today && t.status !== 'DONE'),
      today: tasks.filter(t => new Date(t.planned_end).toDateString() === today && t.status !== 'DONE'),
      upcoming: tasks.filter(t => new Date(t.planned_end) > now && new Date(t.planned_end).toDateString() !== today && t.status !== 'DONE'),
      done: tasks.filter(t => t.status === 'DONE'),
    };
  }, [tasks]);

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.task_id === id 
        ? { ...t, status: t.status === 'DONE' ? 'IN_PROGRESS' : 'DONE' } 
        : t
    ));
  };

  const handleNavigate = (type: string) => {
    console.log(`Navigating to list view: ${type}`);
    // Navigation logic here
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Header Zone */}
      <header className="px-6 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Chào buổi sáng, {CURRENT_USER.username} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5" />
              {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
            <DashboardCustomizer config={dashboardConfig} onToggle={toggleDashboardConfig} />
            
            <div className="flex items-center p-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button 
                      onClick={() => setDensity('comfortable')}
                      className={cn(
                        "p-1.5 rounded transition-all active:scale-95",
                        density === 'comfortable' ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="px-2 py-1 text-xs bg-slate-900 text-white rounded" sideOffset={5}>Chế độ Thoải mái</Tooltip.Content>
                </Tooltip.Root>
                
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button 
                      onClick={() => setDensity('compact')}
                      className={cn(
                        "p-1.5 rounded transition-all active:scale-95",
                        density === 'compact' ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="px-2 py-1 text-xs bg-slate-900 text-white rounded" sideOffset={5}>Chế độ Thu gọn</Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
            
            <button className="flex items-center justify-center w-8 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 hover:-translate-y-0.5">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Stats Zone (Collapsible via Personalization) */}
        {dashboardConfig.showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
            <StatCard 
              label="Quá hạn" 
              value={groupedTasks.overdue.length.toString()} 
              subtext="Cần xử lý ngay" 
              type={groupedTasks.overdue.length > 0 ? 'danger' : undefined} 
            />
            <StatCard 
              label="Hôm nay" 
              value={groupedTasks.today.length.toString()} 
              subtext="Khoảng 4.5 giờ làm việc" 
            />
            <StatCard 
              label="Sắp tới" 
              value={groupedTasks.upcoming.length.toString()} 
              subtext="Trong 7 ngày tới" 
            />
            
            {dashboardConfig.showWeeklyProgress ? (
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-4 rounded-xl text-white shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group hover:-translate-y-1">
                {/* Background Pattern decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Clock className="w-16 h-16 transform rotate-12" />
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                  <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Hiệu suất tuần</span>
                  <Clock className="w-4 h-4 opacity-80" />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold">85%</span>
                    <span className="text-xs opacity-90 font-medium bg-white/20 px-2 py-0.5 rounded-full">Xuất sắc</span>
                  </div>
                  <Progress.Root className="relative overflow-hidden bg-black/20 rounded-full w-full h-1.5" value={85}>
                    <Progress.Indicator 
                      className="bg-white w-full h-full transition-transform duration-[1000ms] ease-out" 
                      style={{ transform: `translateX(-${100 - 85}%)` }} 
                    />
                  </Progress.Root>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-400 text-xs hover:border-slate-300 transition-colors">
                <span className="flex items-center gap-2"><EyeOff className="w-3 h-3" /> Widget ẩn</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* 3. Main Content Zone */}
      <main className="px-6 pb-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Task Lists */}
        <div className={cn("space-y-2 transition-all duration-300", dashboardConfig.showCalendar || dashboardConfig.showActivity ? "lg:col-span-8" : "lg:col-span-12")}>
          
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm z-30 py-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm kiếm công việc..." 
                className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
              />
            </div>
            
            <FilterMenu />
          </div>

          <TaskGroup title="Quá hạn" count={groupedTasks.overdue.length} type="danger" onSeeAll={() => handleNavigate('overdue')}>
            {groupedTasks.overdue.map(task => (
              <TaskRow key={task.task_id} task={task} density={density} onToggle={handleToggleTask} />
            ))}
          </TaskGroup>

          <TaskGroup title="Hôm nay" count={groupedTasks.today.length} type="info" onSeeAll={() => handleNavigate('today')}>
            {groupedTasks.today.length > 0 ? (
              groupedTasks.today.map(task => (
                <TaskRow key={task.task_id} task={task} density={density} onToggle={handleToggleTask} />
              ))
            ) : (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in duration-300">
                <div className="w-16 h-16 mx-auto bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">All caught up!</h3>
                <p className="mt-1">Bạn đã hoàn thành hết công việc hôm nay. Thư giãn thôi!</p>
              </div>
            )}
          </TaskGroup>

          <TaskGroup title="Sắp tới" count={groupedTasks.upcoming.length} type="neutral" onSeeAll={() => handleNavigate('upcoming')}>
            {groupedTasks.upcoming.map(task => (
              <TaskRow key={task.task_id} task={task} density={density} onToggle={handleToggleTask} />
            ))}
          </TaskGroup>

           <div className="pt-8">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
               Đã hoàn thành <span className="ml-2 text-[10px] font-normal bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">RECENT</span>
             </h3>
             <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                {groupedTasks.done.slice(0, 3).map(task => (
                  <TaskRow key={task.task_id} task={task} density={density} onToggle={handleToggleTask} />
                ))}
             </div>
           </div>

        </div>

        {/* Right Column: Context Helper (Collapsible via Personalization) */}
        {(dashboardConfig.showCalendar || dashboardConfig.showActivity) && (
          <aside className="hidden lg:block lg:col-span-4 space-y-6 animate-in slide-in-from-right-8 duration-500">
            
            {dashboardConfig.showCalendar && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm sticky top-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-indigo-500" /> Lịch tháng 1
                  </h3>
                  <button className="text-xs text-indigo-600 hover:underline">Mở rộng</button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                    <span key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className={cn(
                      "aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 relative group",
                      i === 11 ? "bg-indigo-600 text-white font-bold shadow-indigo-200 shadow-md transform scale-105" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105",
                      [10, 14, 22].includes(i) && i !== 11 && "font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50"
                    )}>
                      {i + 1}
                      {[10, 14, 22].includes(i) && (
                        <div className="absolute bottom-1 w-1 h-1 bg-orange-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dashboardConfig.showActivity && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold mb-4 text-slate-900 dark:text-white">Hoạt động gần đây</h3>
                <div className="relative pl-2 border-l border-slate-100 dark:border-slate-800 space-y-6">
                  <div className="relative pl-4 group">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 shadow-sm group-hover:scale-125 transition-transform" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-white">Sarah</span> đã hoàn thành task <span className="font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-1 rounded">MKT-88</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">10 phút trước</p>
                  </div>
                  <div className="relative pl-4 group">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 shadow-sm group-hover:scale-125 transition-transform" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-white">Hệ thống</span> đã gán bạn vào <span className="font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-1 rounded">DOCS-205</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">1 giờ trước</p>
                  </div>
                  <div className="relative pl-4 group">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-600 shadow-sm group-hover:scale-125 transition-transform" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-white">Bạn</span> đã bình luận trong <span className="font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-1 rounded">PFLOW-101</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">3 giờ trước</p>
                  </div>
                </div>
              </div>
            )}

          </aside>
        )}
      </main>
    </div>
  );
}