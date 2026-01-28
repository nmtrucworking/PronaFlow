/**
 * ENHANCED GANTT CHART - PronaFlow v5.2
 * Redesigned with modern UI/UX, accessibility, and performance optimizations
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import type { Task as GanttTask } from 'gantt-task-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, Settings, Moon, Sun, HelpCircle, 
  Maximize2, Minimize2, Calendar, LayoutList, Layers,
  Target, X, ChevronDown, Info, Zap, Clock, Link2,
  ArrowRight, MousePointer2, Keyboard, Users, Flag,
  ChevronUp, ArrowUpDown, RotateCcw, Expand, Shrink
} from 'lucide-react';

// Theme and utilities
import { ThemeProvider, useTheme } from '../../themes/ThemeProvider';
import { useResponsiveGanttConfig, useDeviceType } from '../../hooks/useResponsive';
import { 
  useKeyboardNavigation, 
  useFocusTrap, 
  useScreenReaderAnnouncement,
  useReducedMotion,
  generateTaskAriaDescription,
  SkipLinks,
  ARIA_LABELS
} from '../../hooks/useAccessibility.tsx';
import { 
  useDebouncedSearch, 
  useTaskFilter, 
  usePerformanceMonitor,
  useDateCalculations 
} from '../../hooks/usePerformance';

// UI Components
import { Button, Input, Badge, ProgressBar, Tooltip, Avatar, Spinner } from '../../components/ui';
import { CreateTaskModal } from '../../components/ui/CreateTaskModal';

// Types and interfaces
interface Task extends GanttTask {
  project?: string;
  dependencies?: string[];
  assignee?: string;
  priority?: 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';
  status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
}

// Mock data
const INITIAL_TASKS: Task[] = [
  {
    id: 'P-01',
    name: 'Tối ưu hóa hạ tầng Cloud v3',
    start: new Date(2026, 0, 2),
    end: new Date(2026, 0, 28),
    progress: 45,
    type: 'project',
    hideChildren: false,
    displayOrder: 1,
    styles: { backgroundColor: '#f1f5f9', progressColor: '#64748b' },
  },
  {
    id: 'T-101',
    name: 'Phân tích log và nghẽn mạng',
    start: new Date(2026, 0, 2),
    end: new Date(2026, 0, 7),
    progress: 100,
    type: 'task',
    project: 'P-01',
    displayOrder: 2,
    dependencies: [],
    styles: { backgroundColor: '#10b981', progressColor: '#059669' },
    assignee: 'Hoàng Anh',
    priority: 'HIGH',
    status: 'DONE',
  },
  {
    id: 'T-102',
    name: 'Thiết kế kiến trúc Serverless',
    start: new Date(2026, 0, 8),
    end: new Date(2026, 0, 18),
    progress: 60,
    type: 'task',
    project: 'P-01',
    displayOrder: 3,
    dependencies: ['T-101'],
    styles: { backgroundColor: '#ef4444', progressColor: '#dc2626' },
    assignee: 'Minh Tú',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
  },
  {
    id: 'T-103',
    name: 'Triển khai Auto-scaling engine',
    start: new Date(2026, 0, 19),
    end: new Date(2026, 0, 28),
    progress: 10,
    type: 'task',
    project: 'P-01',
    displayOrder: 4,
    dependencies: ['T-102'],
    styles: { backgroundColor: '#3b82f6', progressColor: '#2563eb' },
    assignee: 'Quốc Bảo',
    priority: 'NORMAL',
    status: 'TODO',
  },
];

// Priority and status configs
const PRIORITY_CONFIG = {
  URGENT: { label: 'Khẩn cấp', color: '#ef4444', bgClass: 'bg-red-500' },
  HIGH: { label: 'Cao', color: '#f97316', bgClass: 'bg-orange-500' },
  NORMAL: { label: 'Bình thường', color: '#3b82f6', bgClass: 'bg-blue-500' },
  LOW: { label: 'Thấp', color: '#64748b', bgClass: 'bg-slate-500' },
};

const STATUS_CONFIG = {
  TODO: { label: 'Cần làm', color: '#94a3b8', bgClass: 'bg-slate-400' },
  IN_PROGRESS: { label: 'Đang thực hiện', color: '#3b82f6', bgClass: 'bg-blue-500' },
  REVIEW: { label: 'Chờ duyệt', color: '#a855f7', bgClass: 'bg-purple-500' },
  DONE: { label: 'Hoàn thành', color: '#10b981', bgClass: 'bg-emerald-500' },
};

// Custom tooltip component
function CustomTooltip({ task, fontSize = '14px', fontFamily = 'Inter, system-ui, sans-serif' }: { task: Task; fontSize: string; fontFamily: string }) {
  const { theme } = useTheme();
  const { formatDuration } = useDateCalculations();
  
  if (task.type === 'project') return null;

  const priority = PRIORITY_CONFIG[task.priority || 'NORMAL'];
  const status = STATUS_CONFIG[task.status || 'TODO'];
  const duration = formatDuration(Math.ceil((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 min-w-[320px] max-w-[400px] pointer-events-none"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="info" className="mb-2">{task.id}</Badge>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight">
              {task.name}
            </h4>
          </div>
          <Badge variant={priority.color === '#ef4444' ? 'danger' : priority.color === '#f97316' ? 'warning' : 'default'}>
            {priority.label}
          </Badge>
        </div>

        {/* Progress */}
        <ProgressBar 
          value={task.progress} 
          variant={task.progress === 100 ? 'success' : task.progress > 70 ? 'default' : 'warning'}
          showValue
          label="Tiến độ"
        />

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Bắt đầu</p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {task.start.toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Kết thúc</p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {task.end.toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          {task.assignee && (
            <div className="flex items-center gap-3">
              <Avatar name={task.assignee} size="sm" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Người phụ trách</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{task.assignee}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">{duration}</span>
            </div>
            <Badge variant={status.color === '#10b981' ? 'success' : 'default'}>
              {status.label}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Gantt Chart component
function GanttChartContent() {
  const { theme, mode, toggleTheme } = useTheme();
  const deviceType = useDeviceType();
  const responsiveConfig = useResponsiveGanttConfig();
  const { announcement, announce } = useScreenReaderAnnouncement();
  const prefersReducedMotion = useReducedMotion();
  const { startRender, endRender, getAverageRenderTime } = usePerformanceMonitor();
  
  // State management
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [viewMode, setViewMode] = useState(ViewMode.Week);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<Set<string>>(new Set());
  const [selectedAssignees, setSelectedAssignees] = useState<Set<string>>(new Set());
  const [includeProjects, setIncludeProjects] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // New states for enhanced features
  const [sortField, setSortField] = useState<'name' | 'start' | 'end' | 'progress' | 'assignee' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tableScale, setTableScale] = useState(0.8); // Reduced size
  const [columnWidths, setColumnWidths] = useState({
    listCellWidth: '180px',
    columnWidth: 50,
  });
  
  // Search functionality
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useDebouncedSearch();
  
  // Focus management
  useFocusTrap(isCreateModalOpen);
  
  // Filtered tasks
  const filteredTasks = useTaskFilter(tasks, {
    searchQuery: debouncedSearchTerm,
    selectedPriorities,
    selectedAssignees,
    includeProjects,
  });

  // Available assignees for filtering
  const assignees = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach(task => {
      if (task.assignee) set.add(task.assignee);
    });
    return Array.from(set);
  }, [tasks]);

  // Performance monitoring
  useEffect(() => {
    startRender();
    return () => endRender();
  });

  // Handlers
  const handleDateChange = useCallback((task: any) => {
    setTasks(prev => prev.map(t => 
      t.id === task.id ? { ...t, start: task.start, end: task.end } : t
    ));
    announce(`Đã cập nhật thời gian cho ${task.name}`);
  }, [announce]);

  const handleProgressChange = useCallback((task: any) => {
    setTasks(prev => prev.map(t => 
      t.id === task.id ? { ...t, progress: task.progress } : t
    ));
    announce(`Đã cập nhật tiến độ ${task.progress}% cho ${task.name}`);
  }, [announce]);

  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev => {
      const next = new Set(prev);
      if (next.has(priority)) next.delete(priority);
      else next.add(priority);
      return next;
    });
  };

  const toggleAssignee = (assignee: string) => {
    setSelectedAssignees(prev => {
      const next = new Set(prev);
      if (next.has(assignee)) next.delete(assignee);
      else next.add(assignee);
      return next;
    });
  };

  const handleCreateTask = useCallback((taskData: Omit<Task, 'id' | 'displayOrder' | 'styles'>) => {
    const newTask: Task = {
      ...taskData,
      id: `T-${Date.now()}`, // Simple ID generation
      displayOrder: Math.max(...tasks.map(t => t.displayOrder || 0), 0) + 1,
      styles: {
        backgroundColor: PRIORITY_CONFIG[taskData.priority || 'NORMAL'].color,
        progressColor: PRIORITY_CONFIG[taskData.priority || 'NORMAL'].color,
      },
    };

    setTasks(prev => [...prev, newTask]);
    announce(`Đã tạo công việc mới: ${newTask.name}`);
  }, [tasks, announce]);

  // New handlers for enhanced features
  const handleSort = useCallback((field: 'name' | 'start' | 'end' | 'progress' | 'assignee') => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    
    setTasks(prev => [...prev].sort((a, b) => {
      let aVal, bVal;
      
      switch (field) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'start':
          aVal = a.start.getTime();
          bVal = b.start.getTime();
          break;
        case 'end':
          aVal = a.end.getTime();
          bVal = b.end.getTime();
          break;
        case 'progress':
          aVal = a.progress;
          bVal = b.progress;
          break;
        case 'assignee':
          aVal = a.assignee || '';
          bVal = b.assignee || '';
          break;
        default:
          return 0;
      }
      
      if (newDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    }));
    
    announce(`Đã sắp xếp theo ${field} ${newDirection === 'asc' ? 'tăng dần' : 'giảm dần'}`);
  }, [sortField, sortDirection, announce]);

  const adjustTableScale = useCallback((delta: number) => {
    setTableScale(prev => Math.max(0.5, Math.min(1.5, prev + delta)));
  }, []);

  const adjustColumnWidth = useCallback((type: 'listCell' | 'column', delta: number) => {
    setColumnWidths(prev => ({
      ...prev,
      ...(type === 'listCell' 
        ? { listCellWidth: `${Math.max(120, parseInt(prev.listCellWidth) + delta)}px` }
        : { columnWidth: Math.max(30, prev.columnWidth + delta) }
      )
    }));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SkipLinks />
      
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Header */}
      <header 
        id="task-controls"
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 px-3 lg:px-6 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo and title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white shadow-lg">
              <Layers size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Gantt Chart
              </h1>
              {deviceType === 'desktop' && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PronaFlow v5.2 • {filteredTasks.length} tasks • {Math.round(tableScale * 100)}%
                </p>
              )}
            </div>
          </motion.div>

          {/* View mode switches - Desktop only */}
          {deviceType === 'desktop' && (
            <div className="flex bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg">
              {[
                { label: 'D', mode: ViewMode.Day, tooltip: 'Ngày' },
                { label: 'W', mode: ViewMode.Week, tooltip: 'Tuần' },
                { label: 'M', mode: ViewMode.Month, tooltip: 'Tháng' },
              ].map(({ label, mode, tooltip }) => (
                <Tooltip key={label} content={tooltip}>
                  <button
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      viewMode === mode
                        ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                    aria-label={`${ARIA_LABELS.viewMode}: ${tooltip}`}
                  >
                    {label}
                  </button>
                </Tooltip>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto">
          {/* Search */}
          {responsiveConfig.showSearch && (
            <div className="flex-1 lg:flex-none lg:w-48">
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={14} />}
                rightIcon={searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X size={14} />
                  </button>
                )}
                aria-label={ARIA_LABELS.searchTasks}
                className="text-sm"
              />
            </div>
          )}

          {/* Table Controls - Desktop only */}
          {deviceType === 'desktop' && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
              {/* Scale controls */}
              <Tooltip content="Thu nhỏ bảng">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustTableScale(-0.1)}
                  disabled={tableScale <= 0.5}
                  className="p-1.5 h-8 w-8"
                >
                  <Shrink size={14} />
                </Button>
              </Tooltip>
              
              <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[2.5rem] text-center">
                {Math.round(tableScale * 100)}%
              </span>
              
              <Tooltip content="Phóng to bảng">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustTableScale(0.1)}
                  disabled={tableScale >= 1.5}
                  className="p-1.5 h-8 w-8"
                >
                  <Expand size={14} />
                </Button>
              </Tooltip>
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>
              
              {/* Column width controls */}
              <Tooltip content="Thu nhỏ cột tên">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustColumnWidth('listCell', -20)}
                  className="p-1.5 h-8 w-8"
                >
                  <LayoutList size={14} />
                </Button>
              </Tooltip>
              
              <Tooltip content="Mở rộng cột thời gian">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => adjustColumnWidth('column', 10)}
                  className="p-1.5 h-8 w-8"
                >
                  <Calendar size={14} />
                </Button>
              </Tooltip>
              
              <Tooltip content="Reset kích thước">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTableScale(0.8);
                    setColumnWidths({ listCellWidth: '180px', columnWidth: 50 });
                  }}
                  className="p-1.5 h-8 w-8"
                >
                  <RotateCcw size={14} />
                </Button>
              </Tooltip>
            </div>
          )}

          {/* Sort Controls */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            <Tooltip content="Sắp xếp theo tên">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('name')}
                className={`p-1.5 h-8 min-w-[2rem] ${
                  sortField === 'name' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                {sortField === 'name' && sortDirection === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              </Button>
            </Tooltip>
            
            <Tooltip content="Sắp xếp theo tiến độ">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('progress')}
                className={`p-1.5 h-8 min-w-[2rem] ${
                  sortField === 'progress' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                <ArrowUpDown size={14} />
              </Button>
            </Tooltip>
            
            <Tooltip content="Sắp xếp theo người phụ trách">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('assignee')}
                className={`p-1.5 h-8 min-w-[2rem] ${
                  sortField === 'assignee' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                <Users size={14} />
              </Button>
            </Tooltip>
          </div>

          {/* Filters - Desktop only */}
          {responsiveConfig.showFilters && (
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              aria-label={ARIA_LABELS.filterTasks}
            >
              <Filter size={16} className="mr-2" />
              Bộ lọc
            </Button>
          )}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={mode === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
          >
            {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          {/* Create task */}
          <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
            <Plus size={14} className="mr-1.5" />
            {deviceType === 'desktop' ? 'Tạo Task' : 'Tạo'}
          </Button>
        </div>
      </header>

      {/* Filters panel - Collapsible */}
      <AnimatePresence>
        {showFilters && responsiveConfig.showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Include projects */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Hiển thị dự án
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeProjects}
                      onChange={(e) => setIncludeProjects(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Bao gồm các dự án
                    </span>
                  </label>
                </div>

                {/* Priority filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Độ ưu tiên
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => togglePriority(key)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          selectedPriorities.has(key)
                            ? `bg-blue-500 text-white`
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assignee filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Người phụ trách
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {assignees.map((assignee) => (
                      <button
                        key={assignee}
                        onClick={() => toggleAssignee(assignee)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          selectedAssignees.has(assignee)
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        {assignee}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Gantt Chart Area */}
      <main 
        id="gantt-chart"
        className="flex-1 overflow-hidden"
        aria-label={ARIA_LABELS.ganttChart}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${deviceType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="h-full"
          >
            {filteredTasks.length > 0 ? (
              <div 
                style={{ 
                  transform: `scale(${tableScale})`,
                  transformOrigin: 'top left',
                  height: `${100 / tableScale}%`,
                  width: `${100 / tableScale}%`,
                }}
              >
                <Gantt
                  tasks={filteredTasks}
                  viewMode={viewMode}
                  rowHeight={Math.round(responsiveConfig.rowHeight * tableScale)}
                  columnWidth={columnWidths.columnWidth}
                  listCellWidth={columnWidths.listCellWidth}
                  headerHeight={Math.round(responsiveConfig.headerHeight * tableScale)}
                  fontSize={responsiveConfig.fontSize}
                  TooltipContent={CustomTooltip}
                  barCornerRadius={12}
                  barFill={85}
                  locale="vi-VN"
                  onDateChange={handleDateChange}
                  onProgressChange={handleProgressChange}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Target size={48} className="mx-auto text-slate-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Không tìm thấy công việc
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                    </p>
                  </div>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setSelectedPriorities(new Set());
                    setSelectedAssignees(new Set());
                    setIncludeProjects(true);
                  }}>
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer - Desktop only */}
      {deviceType === 'desktop' && (
        <footer className="flex items-center justify-between px-8 py-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-slate-600 dark:text-slate-400">
                Engine đang hoạt động
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-slate-500 dark:text-slate-500">
                {filteredTasks.filter(t => t.type === 'task').length} công việc
              </span>
              <span className="text-slate-500 dark:text-slate-500">
                Render: {Math.round(getAverageRenderTime())}ms
              </span>
            </div>
          </div>
          
          <div className="text-slate-400 dark:text-slate-500 font-medium">
            PronaFlow Framework v5.2
          </div>
        </footer>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        existingTasks={tasks}
      />
    </div>
  );
}

// Wrapper with theme provider
export default function EnhancedGanttChart() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="pronaflow-gantt-theme">
      <GanttChartContent />
    </ThemeProvider>
  );
}