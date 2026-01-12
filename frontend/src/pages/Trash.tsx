import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  File, 
  CheckSquare, 
  Folder, 
  AlertTriangle, 
  Clock, 
  MoreHorizontal, 
  X,
  Undo2,
  Calendar,
  User,
  Archive,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS & MOCK DATA ---

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOCK PRIMITIVES (Thay thế Radix UI để chạy Preview không cần cài đặt) ---

const MockDialog = ({ isOpen, onClose, title, description, children, isDanger }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-full flex-shrink-0", isDanger ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600")}>
            {isDanger ? <AlertTriangle className="w-6 h-6" /> : <RefreshCw className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const MockToast = ({ isOpen, onClose, title, desc, type }: any) => {
  if (!isOpen) return null;
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[100] w-80 bg-white border rounded-xl shadow-lg p-4 flex items-start gap-4 animate-in slide-in-from-bottom-10 fade-in duration-300",
      type === 'danger' ? "border-red-100" : "border-emerald-100"
    )}>
      <div className={cn("p-2 rounded-full flex-shrink-0", type === 'danger' ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600")}>
        {type === 'danger' ? <Trash2 className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 mt-1 leading-snug">{desc}</p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1"><X className="w-4 h-4" /></button>
    </div>
  );
};

const MockTooltip = ({ children, content }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};

// --- DOMAIN LOGIC ---

type EntityType = 'PROJECT' | 'TASK' | 'FILE' | 'NOTE';

interface TrashItemEntity {
  trash_id: string;
  entity_type: EntityType;
  entity_id: string;
  name: string;
  original_location: string;
  deleted_by: {
    id: string;
    name: string;
    avatar: string;
  };
  deleted_at: string;
  purge_after: string;
  size?: string;
}

const MOCK_TRASH_ITEMS: TrashItemEntity[] = [
  {
    trash_id: 't1',
    entity_type: 'TASK',
    entity_id: 'task-101',
    name: 'Thiết kế Wireframe trang chủ v2',
    original_location: 'Dự án: Website Redesign',
    deleted_by: { id: 'u1', name: 'Nguyễn Văn A', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff' },
    deleted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    purge_after: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    trash_id: 't2',
    entity_type: 'FILE',
    entity_id: 'file-202',
    name: 'Báo cáo tài chính Q3_final.pdf',
    original_location: 'Task: Tổng kết quý',
    deleted_by: { id: 'u2', name: 'Trần Thị B', avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=E11D48&color=fff' },
    deleted_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    purge_after: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
    size: '2.4 MB'
  },
  {
    trash_id: 't3',
    entity_type: 'PROJECT',
    entity_id: 'proj-303',
    name: 'Marketing Chiến dịch Mùa hè (Old)',
    original_location: 'Workspace: PronaFlow Corp',
    deleted_by: { id: 'u1', name: 'Nguyễn Văn A', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff' },
    deleted_at: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    purge_after: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    trash_id: 't4',
    entity_type: 'NOTE',
    entity_id: 'note-404',
    name: 'Biên bản cuộc họp Product 12/10',
    original_location: 'Wiki: Product Team',
    deleted_by: { id: 'u3', name: 'Lê C', avatar: 'https://ui-avatars.com/api/?name=Le+C&background=059669&color=fff' },
    deleted_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    purge_after: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    trash_id: 't5',
    entity_type: 'TASK',
    entity_id: 'task-105',
    name: 'Fix bug login mobile',
    original_location: 'Dự án: Mobile App MVP',
    deleted_by: { id: 'u1', name: 'Nguyễn Văn A', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff' },
    deleted_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    purge_after: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// --- SUB COMPONENTS ---

const EntityIcon = ({ type }: { type: EntityType }) => {
  switch (type) {
    case 'TASK': return <CheckSquare className="w-4 h-4 text-emerald-600" />;
    case 'PROJECT': return <Folder className="w-4 h-4 text-blue-600" />;
    case 'FILE': return <File className="w-4 h-4 text-orange-600" />;
    case 'NOTE': return <Archive className="w-4 h-4 text-purple-600" />;
    default: return <File className="w-4 h-4 text-slate-500" />;
  }
};

const RetentionBadge = ({ purgeDate }: { purgeDate: string }) => {
  const daysLeft = Math.ceil((new Date(purgeDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  if (daysLeft <= 3) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Xóa vĩnh viễn trong {daysLeft} ngày
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
      <Clock className="w-3 h-3 mr-1" />
      Còn {daysLeft} ngày
    </span>
  );
};

// --- MAIN PAGE ---

export default function TrashBinPage() {
  const [items, setItems] = useState<TrashItemEntity[]>(MOCK_TRASH_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  
  const [toast, setToast] = useState<{ open: boolean, title: string, desc: string, type: 'success' | 'danger' }>({ 
    open: false, title: '', desc: '', type: 'success' 
  });
  
  const [dialogConfig, setDialogConfig] = useState<{ open: boolean, title: string, desc: string, actionLabel: string, isDanger: boolean, onConfirm: () => void }>({
    open: false, title: '', desc: '', actionLabel: '', isDanger: false, onConfirm: () => {}
  });

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Auto close toast
  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => setToast(prev => ({ ...prev, open: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.original_location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || item.entity_type === filterType;
      return matchesSearch && matchesType;
    });
  }, [items, searchQuery, filterType]);

  // Actions
  const showToast = (title: string, desc: string, type: 'success' | 'danger') => {
    setToast({ open: true, title, desc, type });
  };

  const confirmAction = (title: string, desc: string, actionLabel: string, isDanger: boolean, onConfirm: () => void) => {
    setDialogConfig({ open: true, title, desc, actionLabel, isDanger, onConfirm });
  };

  const handleRestore = (id: string) => {
    const item = items.find(i => i.trash_id === id);
    setItems(prev => prev.filter(i => i.trash_id !== id));
    showToast('Đã khôi phục thành công', `"${item?.name}" đã được đưa trở lại vị trí cũ.`, 'success');
  };

  const handleDelete = (id: string) => {
    const item = items.find(i => i.trash_id === id);
    confirmAction(
      "Xóa vĩnh viễn?",
      `Bạn có chắc chắn muốn xóa "${item?.name}"? Hành động này không thể hoàn tác.`,
      "Xóa ngay",
      true,
      () => {
        setItems(prev => prev.filter(i => i.trash_id !== id));
        setDialogConfig(prev => ({ ...prev, open: false }));
        showToast('Đã xóa vĩnh viễn', `"${item?.name}" không thể khôi phục được nữa.`, 'danger');
      }
    );
  };

  const handleEmptyTrash = () => {
    confirmAction(
      "Dọn sạch thùng rác?",
      "Hành động này sẽ xóa vĩnh viễn tất cả các mục trong thùng rác. Bạn sẽ KHÔNG thể hoàn tác hành động này.",
      "Xóa tất cả",
      true,
      () => {
        setItems([]);
        setDialogConfig(prev => ({ ...prev, open: false }));
        showToast('Đã dọn sạch thùng rác', 'Tất cả dữ liệu đã được xóa an toàn.', 'danger');
      }
    );
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleRestoreSelected = () => {
    setItems(prev => prev.filter(i => !selectedIds.has(i.trash_id)));
    showToast('Khôi phục hàng loạt', `${selectedIds.size} mục đã được khôi phục.`, 'success');
    setSelectedIds(new Set());
    setIsSelectionMode(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="px-8 py-6 bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Thùng rác</h1>
            </div>
            <p className="text-sm text-slate-500 mt-1 ml-11">
              Quản lý các mục đã xóa. Dữ liệu sẽ tự động bị xóa vĩnh viễn sau 30 ngày (Module 8).
            </p>
          </div>

          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button 
                onClick={handleEmptyTrash}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors active:scale-95"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Dọn sạch thùng rác
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
        
        {/* TOOLBAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg w-fit">
            {['ALL', 'TASK', 'PROJECT', 'FILE'].map(type => (
              <button 
                key={type} 
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  filterType === type 
                    ? "bg-white text-indigo-600 shadow-sm font-semibold" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {type === 'ALL' ? 'Tất cả' : type === 'TASK' ? 'Công việc' : type === 'PROJECT' ? 'Dự án' : 'Tài liệu'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm kiếm mục đã xóa..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                isSelectionMode ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              )}
              title="Chọn nhiều mục"
            >
              <CheckSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TABLE AREA */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Thùng rác trống</h3>
              <p className="text-slate-500 max-w-sm mt-1">Tuyệt vời! Không có dữ liệu rác nào. Hệ thống sẽ tự động dọn dẹp các mục cũ sau 30 ngày.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {isSelectionMode && <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded border-slate-300 accent-indigo-600" /></th>}
                    <th className="px-6 py-3 font-semibold text-slate-500">Tên mục</th>
                    <th className="px-6 py-3 font-semibold text-slate-500">Vị trí gốc</th>
                    <th className="px-6 py-3 font-semibold text-slate-500">Người xóa</th>
                    <th className="px-6 py-3 font-semibold text-slate-500">Ngày xóa</th>
                    <th className="px-6 py-3 font-semibold text-slate-500 text-right">Lưu trữ</th>
                    <th className="px-6 py-3 font-semibold text-slate-500 text-right w-24">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map(item => (
                    <tr key={item.trash_id} className="group hover:bg-slate-50 transition-colors">
                      {isSelectionMode && (
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.has(item.trash_id)}
                            onChange={() => toggleSelection(item.trash_id)}
                            className="rounded border-slate-300 accent-indigo-600 w-4 h-4 cursor-pointer" 
                          />
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <EntityIcon type={item.entity_type} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                              {item.name}
                              {item.entity_type === 'FILE' && <span className="text-xs text-slate-400 font-normal border border-slate-200 px-1 rounded">{item.size}</span>}
                            </div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.entity_type}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-slate-500">
                          <ArrowUpRight className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          {item.original_location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MockTooltip content={item.deleted_by.name}>
                            <img src={item.deleted_by.avatar} alt={item.deleted_by.name} className="w-6 h-6 rounded-full border border-white shadow-sm" />
                          </MockTooltip>
                          <span className="text-slate-600">{item.deleted_by.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{new Date(item.deleted_at).toLocaleDateString('vi-VN')}</span>
                          <span>{new Date(item.deleted_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <RetentionBadge purgeDate={item.purge_after} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MockTooltip content="Khôi phục">
                            <button onClick={() => handleRestore(item.trash_id)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                              <Undo2 className="w-4 h-4" />
                            </button>
                          </MockTooltip>

                          <MockTooltip content="Xóa vĩnh viễn">
                            <button onClick={() => handleDelete(item.trash_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </MockTooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* BULK ACTION BAR */}
        {isSelectionMode && selectedIds.size > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl rounded-full px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-4 z-50">
            <span className="text-sm font-medium text-slate-700">{selectedIds.size} mục đã chọn</span>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex gap-2">
              <button onClick={handleRestoreSelected} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                <Undo2 className="w-3.5 h-3.5" /> Khôi phục
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Xóa vĩnh viễn
              </button>
            </div>
            <button onClick={() => { setIsSelectionMode(false); setSelectedIds(new Set()); }} className="ml-2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

      {/* FEEDBACK OVERLAYS */}
      <MockDialog 
        isOpen={dialogConfig.open} 
        onClose={() => setDialogConfig(prev => ({ ...prev, open: false }))}
        title={dialogConfig.title}
        description={dialogConfig.desc}
        isDanger={dialogConfig.isDanger}
      >
        <button 
          onClick={() => setDialogConfig(prev => ({ ...prev, open: false }))}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Hủy bỏ
        </button>
        <button 
          onClick={dialogConfig.onConfirm}
          className={cn(
            "px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-all active:scale-95",
            dialogConfig.isDanger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          {dialogConfig.actionLabel}
        </button>
      </MockDialog>

      <MockToast 
        isOpen={toast.open} 
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        title={toast.title}
        desc={toast.desc}
        type={toast.type}
      />
    </div>
  );
}