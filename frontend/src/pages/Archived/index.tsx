import React, { useState, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Popover from '@radix-ui/react-popover';
import * as Tooltip from '@radix-ui/react-tooltip';
import { 
  Archive, 
  Search, 
  Filter, 
  RotateCcw, 
  Trash2, 
  MoreHorizontal, 
  FileText, 
  FolderLock, 
  Calendar, 
  Info, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Settings2,
  ArrowUpDown,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  Clock,
  ShieldAlert,
  Database,
  CheckCircle2,
  HardDrive,
  Activity,
  HelpCircle,
  ShieldCheck,
  Zap,
  Trash
} from 'lucide-react';

/**
 * PRONAFLOW ARCHIVED STORE v1.4 - ACCESSIBILITY FIXED
 * - Fixed: Added Dialog.Title and Dialog.Description for Radix UI compliance.
 * - Layout: Bulk Action Bar integrated into Footer (Left side) for a clean UI.
 * - Standardized Radius: Optimized to rounded-xl (12px) and rounded-lg (8px).
 * - UX: Integrated context helpers and double-click interactions.
 */

interface ArchiveItem {
  id: string;
  name: string;
  type: 'Project' | 'Task' | 'Document' | 'Workspace';
  archived_at: string;
  expiry_date: string;
  size: string;
  archived_by: string;
  reason: string;
  status: 'Safe' | 'Expiring' | 'Locked';
}

const TYPE_CONFIG = {
  Project: { icon: FolderLock, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  Task: { icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  Document: { icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  Workspace: { icon: Database, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
};

const STATUS_THEME = {
  Safe: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100',
  Expiring: 'text-red-600 bg-red-50 dark:bg-red-900/30 border-red-100 animate-pulse',
  Locked: 'text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200',
};

const ArchivedStorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ArchiveItem; direction: 'asc' | 'desc' }>({
    key: 'archived_at',
    direction: 'desc',
  });

  // Mock Data
  const archiveData: ArchiveItem[] = useMemo(() => [
    {
      id: 'ARC-001',
      name: 'Chiến dịch Marketing Mùa Đông 2023',
      type: 'Project',
      archived_at: '2024-12-20',
      expiry_date: '2026-12-20',
      size: '1.2 GB',
      archived_by: 'Trần Thế Tường',
      reason: 'Dự án đã hoàn thành và nghiệm thu đầy đủ các hạng mục.',
      status: 'Safe'
    },
    {
      id: 'ARC-002',
      name: 'Tài liệu API Version 1.0 (Deprecated)',
      type: 'Document',
      archived_at: '2025-01-05',
      expiry_date: '2025-06-05',
      size: '45 MB',
      archived_by: 'Lê Minh Hạnh',
      reason: 'Thay thế bằng phiên bản 2.0 ổn định hơn.',
      status: 'Expiring'
    },
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `ARC-0${i+3}`,
      name: `Bản sao lưu hệ thống định kỳ ${i+3}`,
      type: (i % 3 === 0 ? 'Task' : i % 3 === 1 ? 'Document' : 'Project') as any,
      archived_at: '2024-11-15',
      expiry_date: '2027-01-01',
      size: '120 KB',
      archived_by: 'System Bot',
      reason: 'Lưu trữ tự động theo chính sách hàng tháng.',
      status: 'Safe' as any
    }))
  ], []);

  // Selection Logic
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === pagedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pagedData.map(item => item.id));
    }
  };

  // Filter & Sort Logic
  const processedData = useMemo(() => {
    let result = archiveData.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = typeFilter === 'all' || item.type === typeFilter;
      return matchSearch && matchType;
    });

    result.sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [archiveData, searchQuery, typeFilter, sortConfig]);

  const pagedData = processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(processedData.length / pageSize);

  const handleSort = (key: keyof ArchiveItem) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans select-none transition-all duration-500">
      
      {/* 1. Global Header */}
      <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-40 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700">
          <div className="bg-slate-900 dark:bg-white p-2 rounded-lg text-white dark:text-slate-900">
            <Archive size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">Kho lưu trữ</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-70">Module 8: Compliance</p>
          </div>
        </div>

        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right duration-700">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-inner">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Tìm bản ghi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-transparent border-none text-sm font-semibold focus:ring-0 w-48 lg:w-64 outline-none transition-all"
              />
            </div>
            
            <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mx-1" />

            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all relative">
                  <Filter size={13} /> 
                  Lọc
                  {typeFilter !== 'all' && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content sideOffset={8} align="end" className="w-64 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-200 outline-none">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Loại thực thể</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['all', 'Project', 'Document', 'Task'].map(t => (
                         <button 
                          key={t} 
                          onClick={() => setTypeFilter(t)}
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border ${typeFilter === t ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-transparent hover:bg-slate-100'}`}
                         >
                           {t === 'all' ? 'Tất cả' : t}
                         </button>
                       ))}
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                  <HelpCircle size={18} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" className="w-64 bg-slate-900 text-white p-4 rounded-lg text-xs font-medium shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2 text-center lg:text-left">
                    <p className="font-black text-blue-400 uppercase tracking-widest mb-1">Quy tắc tuân thủ</p>
                    <p>Mọi thao tác khôi phục hoặc tiêu hủy bản ghi đều được ghi lại vào nhật ký Audit Log hệ thống.</p>
                  </div>
                  <Tooltip.Arrow className="fill-slate-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all uppercase tracking-widest">
            <FolderLock size={14} strokeWidth={3} /> Thiết lập lưu trữ
          </button>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col p-6 gap-6">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-4 gap-4 shrink-0 animate-in fade-in slide-in-from-top-4 duration-700">
           <ArchiveStatTile label="Tổng lưu trữ" value="1.54 GB" icon={HardDrive} color="blue" trend="+12% tháng" />
           <ArchiveStatTile label="Bảo vệ" value={archiveData.length} icon={ShieldCheck} color="emerald" trend="Safe" />
           <ArchiveStatTile label="Sắp tiêu hủy" value="02" icon={Clock} color="red" pulse trend="Cần xử lý" />
           <ArchiveStatTile label="Tự động" value="48" icon={Database} color="purple" trend="Cronjob" />
        </div>

        {/* Main Data Table */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-100">
          <div className="grid grid-cols-12 px-6 py-3 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest items-center">
             <div className="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === pagedData.length && pagedData.length > 0} 
                  onChange={handleSelectAll}
                  className="custom-checkbox" 
                />
             </div>
             <div className="col-span-4 flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('name')}>
                Tên bản lưu <SortIcon active={sortConfig.key === 'name'} dir={sortConfig.direction} />
             </div>
             <div className="col-span-2">Phân loại</div>
             <div className="col-span-2 flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('archived_at')}>
                Thời điểm <SortIcon active={sortConfig.key === 'archived_at'} dir={sortConfig.direction} />
             </div>
             <div className="col-span-2">Retention</div>
             <div className="col-span-1 text-right pr-2">Actions</div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar-y overflow-x-hidden">
            {pagedData.length > 0 ? (
              pagedData.map((item, idx) => (
                <div 
                  key={item.id} 
                  onDoubleClick={() => setSelectedItem(item)}
                  className={`grid grid-cols-12 px-6 py-3.5 items-center border-b border-slate-50 dark:border-slate-800 last:border-0 group cursor-default transition-all duration-300 animate-in fade-in slide-in-from-left duration-500 ${selectedIds.includes(item.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}
                  style={{ animationDelay: `${idx * 20}ms` }}
                >
                  <div className="col-span-1 flex justify-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleToggleSelect(item.id)}
                      className="custom-checkbox" 
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${TYPE_CONFIG[item.type].bg} ${TYPE_CONFIG[item.type].color} shrink-0 transition-transform group-hover:scale-105`}>
                       {React.createElement(TYPE_CONFIG[item.type].icon, { size: 16 })}
                    </div>
                    <div className="flex flex-col overflow-hidden pr-4">
                       <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors truncate">{item.name}</span>
                       <span className="text-[10px] font-medium text-slate-400 truncate flex items-center gap-1 uppercase tracking-tight italic">
                          {item.id} • {item.size}
                       </span>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{item.type}</span>
                  </div>

                  <div className="col-span-2 flex flex-col">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.archived_at}</span>
                    <span className="text-[10px] text-slate-400 font-medium italic opacity-70">By: {item.archived_by.split(' ')[0]}</span>
                  </div>

                  <div className="col-span-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase border tracking-tighter shadow-sm ${STATUS_THEME[item.status]}`}>
                       {item.status === 'Expiring' ? 'Sắp tiêu hủy' : item.expiry_date}
                    </span>
                  </div>

                  <div className="col-span-1 text-right pr-2">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 group-hover:opacity-100 opacity-0 active:scale-90 shadow-sm">
                          <MoreHorizontal size={16} />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content className="w-48 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-2xl border border-slate-100 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-200 outline-none">
                          <DropdownMenuItem icon={RotateCcw} label="Khôi phục" color="text-blue-600" />
                          <DropdownMenuItem icon={Info} label="Xem thông số kỹ thuật" onClick={() => setSelectedItem(item)} />
                          <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-1" />
                          <DropdownMenuItem icon={Trash2} label="Tiêu hủy vĩnh viễn" color="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" />
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-32 opacity-20 grayscale">
                 <Archive size={64} strokeWidth={1} className="mb-4" />
                 <p className="text-sm font-black uppercase tracking-[0.2em]">Kho lưu trữ trống</p>
              </div>
            )}
          </div>

          {/* Footer - Integration of Bulk Actions & Pagination */}
          <footer className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/20 flex items-center justify-between shrink-0">
             {/* Left side: Bulk actions integrated */}
             <div className="flex items-center min-h-[40px]">
                {selectedIds.length > 0 ? (
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900/50 shadow-sm animate-in slide-in-from-left-2 duration-300">
                    <div className="flex items-center gap-2 pr-3 border-r border-slate-100 dark:border-slate-800">
                      <span className="w-5 h-5 flex items-center justify-center bg-blue-600 text-[10px] font-black text-white rounded-md">{selectedIds.length}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase">Đã chọn</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-black text-blue-600 rounded-md transition-all uppercase">
                        <RotateCcw size={12} /> Khôi phục
                      </button>
                      <button className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-[10px] font-black text-red-500 rounded-md transition-all uppercase">
                        <Trash size={12} /> Tiêu hủy
                      </button>
                    </div>
                    <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 opacity-70">
                    <Zap size={10} className="text-amber-500" />
                    Hệ thống lưu trữ an toàn (SOC2 Compliant)
                  </div>
                )}
             </div>

             {/* Right side: Pagination controls */}
             <div className="flex items-center gap-1.5">
                <PaginationBtn icon={ChevronLeft} onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} />
                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase mr-2 ml-1">
                   Trang {currentPage} / {totalPages}
                </div>
                <div className="flex items-center gap-1">
                   {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setCurrentPage(p)} className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${p === currentPage ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800'}`}>
                        {p}
                      </button>
                   ))}
                </div>
                <PaginationBtn icon={ChevronRight} onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} />
             </div>
          </footer>
        </div>
      </main>

      {/* 3. Detail Inspect Modal (Refined for Accessibility) */}
      <Dialog.Root open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] animate-in fade-in duration-500" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-[101] border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300 outline-none">
            {selectedItem && (
              <div className="flex flex-col h-[650px]">
                {/* Visual Header with ARIA Labels */}
                <div className="h-24 bg-slate-900 relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent" />
                  <Dialog.Close className="absolute right-4 top-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-md">
                    <X size={18} strokeWidth={2.5} aria-hidden="true" />
                    <span className="sr-only">Đóng modal</span>
                  </Dialog.Close>
                  <div className="absolute bottom-3 left-10 flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-emerald-500/30">
                    <ShieldCheck size={10} /> Dữ liệu đã xác thực
                  </div>
                </div>
                
                <div className="px-10 -mt-10 flex-1 overflow-y-auto custom-scrollbar-y pb-10">
                  <div className="flex items-end gap-6 mb-10 relative">
                    <div className={`w-24 h-24 rounded-xl flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-2xl ${TYPE_CONFIG[selectedItem.type].bg}`}>
                      {React.createElement(TYPE_CONFIG[selectedItem.type].icon, { size: 36, className: TYPE_CONFIG[selectedItem.type].color })}
                    </div>
                    <div className="flex-1 pb-1">
                      {/* ACCESSIBILITY: Dialog.Title is mandatory */}
                      <Dialog.Title className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                        {selectedItem.name}
                      </Dialog.Title>
                      <Dialog.Description className="text-blue-600 font-bold text-[10px] mt-1 uppercase tracking-[0.1em]">
                        Mã định danh: {selectedItem.id}
                      </Dialog.Description>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <DetailField icon={Archive} label="Loại thực thể" value={selectedItem.type} highlight />
                    <DetailField icon={HardDrive} label="Dung lượng" value={selectedItem.size} />
                    <DetailField icon={Calendar} label="Thời điểm lưu" value={selectedItem.archived_at} />
                    <DetailField icon={ShieldAlert} label="Chính sách hủy" value={selectedItem.expiry_date} />
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">Mô tả lý do</h4>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800 italic shadow-inner">
                        "{selectedItem.reason}"
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Nhật ký tuân thủ</h4>
                      <div className="space-y-5 border-l-2 border-slate-100 dark:border-slate-800 ml-1 pl-5">
                         <ActivityItem text="Mã hóa bản sao bằng AES-256 hoàn tất" time="Gần đây" />
                         <ActivityItem text="Gán nhãn bảo mật mức độ doanh nghiệp" time="Lúc khởi tạo" />
                      </div>
                    </section>
                  </div>
                </div>

                <div className="px-10 py-5 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-800/30 flex gap-3">
                   <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[11px] font-black shadow-xl hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                      <RotateCcw size={14} strokeWidth={3} /> KHÔI PHỤC DỮ LIỆU
                   </button>
                   <button className="px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-red-500 hover:bg-red-50 transition-all active:scale-90">
                      <Trash2 size={18} />
                   </button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style>{`
        .custom-scrollbar-y::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-y::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-y::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar-y::-webkit-scrollbar-thumb { background: #334155; }
        
        .custom-checkbox {
          appearance: none;
          background-color: transparent;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 14px;
          height: 14px;
          border: 1.5px solid #cbd5e1;
          border-radius: 4px;
          display: grid;
          place-content: center;
          cursor: pointer;
        }
        .custom-checkbox::before {
          content: "";
          width: 8px;
          height: 8px;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em #3b82f6;
          border-radius: 2px;
        }
        .custom-checkbox:checked::before {
          transform: scale(1);
        }
        .custom-checkbox:checked {
          border-color: #3b82f6;
        }
        .dark .custom-checkbox { border-color: #475569; }
        .dark .custom-checkbox:checked { border-color: #3b82f6; }
      `}</style>
    </div>
  );
};

/** * INTERNAL COMPONENTS */

const ArchiveStatTile: React.FC<{ label: string, value: any, icon: any, color: string, pulse?: boolean, trend: string }> = ({ label, value, icon: Icon, color, pulse, trend }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-blue-500/20 transition-all duration-300 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 transition-colors" />
    <div className="flex-1 pl-2">
      <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
        <span className={`text-[8px] font-bold ${color === 'red' ? 'text-red-500 font-black' : 'text-slate-400'} uppercase`}>{trend}</span>
      </div>
    </div>
    <div className={`p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm ${pulse ? 'animate-pulse' : ''}`}>
      <Icon size={18} strokeWidth={2.5} />
    </div>
  </div>
);

const SortIcon: React.FC<{ active: boolean, dir: 'asc' | 'desc' }> = ({ active, dir }) => {
  if (!active) return <ArrowUpDown size={12} className="opacity-20" />;
  return dir === 'asc' ? <ArrowUpNarrowWide size={12} className="text-blue-600" /> : <ArrowDownWideNarrow size={12} className="text-blue-600" />;
};

const PaginationBtn: React.FC<{ icon: any, onClick: () => void, disabled: boolean }> = ({ icon: Icon, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-20 disabled:grayscale transition-all active:scale-90 shadow-sm">
    <Icon size={14} strokeWidth={2.5} />
  </button>
);

const DropdownMenuItem: React.FC<{ icon: any, label: string, onClick?: () => void, color?: string }> = ({ icon: Icon, label, onClick, color }) => (
  <DropdownMenu.Item onClick={onClick} className={`flex items-center gap-3 px-3 py-2.5 text-[10px] font-bold ${color || 'text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600'} rounded-lg outline-none cursor-pointer transition-all`}>
    <Icon size={14} strokeWidth={2.5} /> {label}
  </DropdownMenu.Item>
);

const DetailField: React.FC<{ icon: any, label: string, value: string, highlight?: boolean }> = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/20 transition-all">
    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
       <Icon size={10} className="text-blue-500" /> {label}
    </span>
    <span className={`text-[11px] font-black ${highlight ? 'text-blue-600' : 'text-slate-800 dark:text-slate-100'}`}>
       {value}
    </span>
  </div>
);

const ActivityItem: React.FC<{ text: string, time: string }> = ({ text, time }) => (
  <div className="relative group pl-1">
    <div className="absolute -left-[25px] top-1 w-2 h-2 rounded-full bg-blue-600 border border-white dark:border-slate-900 transition-all duration-300 shadow-md shadow-blue-500/20" />
    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors leading-tight">{text}</p>
    <p className="text-[9px] font-medium text-slate-400 italic mt-0.5 uppercase tracking-tighter opacity-70">{time}</p>
  </div>
);

export default ArchivedStorePage;