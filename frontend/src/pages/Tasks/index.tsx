import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar as CalendarIcon, 
  Filter, 
  Search, 
  LayoutList, 
  Kanban as KanbanIcon, 
  MoreHorizontal, 
  ArrowUpCircle, 
  AlertCircle, 
  ArrowRight, 
  CalendarDays,
  Plus,
  Settings2,
  ChevronDown,
  ArrowUpDown,
  Check,
  X,
  Eye,
  User as UserIcon,
  AlignLeft,
  FilePlus,
  FolderPlus,
  Upload,
  UploadCloud,
  FileSpreadsheet,
  Trash2,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILITIES ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- HOOKS ---
function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
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

// --- DOMAIN ENTITIES & TYPES ---

type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
type ViewMode = 'LIST' | 'KANBAN';
type DensityMode = 'COMFORTABLE' | 'COMPACT';
type SortOption = 'DUE_DATE_ASC' | 'PRIORITY_DESC' | 'TITLE_ASC';

interface ProjectRef {
  id: string;
  name: string;
  key: string;
  color: string;
}

interface UserEntity {
  id: string;
  name: string;
  avatar: string;
}

interface TaskEntity {
  id: string;
  key: string;
  title: string;
  project: ProjectRef;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  estimatedHours: number;
  assignees: UserEntity[];
  description?: string;
}

// --- MOCK DATA ---
const USERS: Record<string, UserEntity> = {
  u1: { id: 'u1', name: 'Nguyễn Văn A', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff' },
  u2: { id: 'u2', name: 'Trần Thị B', avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=E11D48&color=fff' },
  u3: { id: 'u3', name: 'Le C', avatar: 'https://ui-avatars.com/api/?name=Le+C&background=059669&color=fff' },
};

const MOCK_TASKS: TaskEntity[] = [
  {
    id: 't1', key: 'MKT-101', title: 'Hoàn thiện bản thiết kế UI cho Dashboard',
    project: { id: 'p1', name: 'Marketing Q1', key: 'MKT', color: 'bg-blue-500' },
    status: 'IN_PROGRESS', priority: 'URGENT', dueDate: '2023-10-25T10:00:00Z', estimatedHours: 4,
    assignees: [USERS.u1],
    description: 'Cần hoàn thiện wireframe và visual design cho màn hình Dashboard chính.'
  },
  {
    id: 't2', key: 'DEV-88', title: 'Review Pull Request module Auth',
    project: { id: 'p2', name: 'Core Backend', key: 'DEV', color: 'bg-indigo-500' },
    status: 'NOT_STARTED', priority: 'HIGH', dueDate: '2023-10-26T17:00:00Z', estimatedHours: 2,
    assignees: [USERS.u1, USERS.u2]
  },
  {
    id: 't3', key: 'DOC-205', title: 'Cập nhật tài liệu hướng dẫn sử dụng Module 9',
    project: { id: 'p3', name: 'Documentation', key: 'DOC', color: 'bg-emerald-500' },
    status: 'IN_PROGRESS', priority: 'MEDIUM', dueDate: '2023-10-26T14:00:00Z', estimatedHours: 3,
    assignees: [USERS.u2]
  },
  {
    id: 't4', key: 'HRM-12', title: 'Phỏng vấn ứng viên Senior Frontend',
    project: { id: 'p4', name: 'Recruitment', key: 'HRM', color: 'bg-rose-500' },
    status: 'NOT_STARTED', priority: 'MEDIUM', dueDate: '2023-10-27T09:00:00Z', estimatedHours: 1,
    assignees: [USERS.u3, USERS.u1]
  },
  {
    id: 't5', key: 'MKT-105', title: 'Lên kế hoạch content tháng 11',
    project: { id: 'p1', name: 'Marketing Q1', key: 'MKT', color: 'bg-blue-500' },
    status: 'DONE', priority: 'LOW', dueDate: '2023-10-24T17:00:00Z', estimatedHours: 8,
    assignees: [USERS.u1]
  },
  {
    id: 't6', key: 'SYS-01', title: 'Kiểm tra log server định kỳ',
    project: { id: 'p2', name: 'Core Backend', key: 'DEV', color: 'bg-indigo-500' },
    status: 'NOT_STARTED', priority: 'LOW', dueDate: '2023-10-28T00:00:00Z', estimatedHours: 0.5,
    assignees: []
  },
];

// --- UI CONSTANTS ---

const STATUS_CONFIG = {
  NOT_STARTED: { label: 'Chưa bắt đầu', icon: Circle, color: 'text-slate-500', bg: 'bg-slate-100' },
  IN_PROGRESS: { label: 'Đang thực hiện', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
  IN_REVIEW: { label: 'Đang đánh giá', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-100' },
  DONE: { label: 'Hoàn thành', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
};

const PRIORITY_CONFIG = {
  URGENT: { label: 'Khẩn cấp', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
  HIGH: { label: 'Cao', icon: ArrowUpCircle, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  MEDIUM: { label: 'Trung bình', icon: ArrowRight, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  LOW: { label: 'Thấp', icon: ArrowRight, color: 'text-slate-500', bg: 'bg-slate-50 border-slate-200' },
};

// --- BASE COMPONENTS ---

const Modal = ({ isOpen, onClose, children, className }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; className?: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={cn("relative bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 w-full max-h-[90vh] flex flex-col", className)}>
        {children}
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
          "absolute top-full mt-2 z-50 bg-white rounded-xl border border-slate-200 shadow-xl p-1 animate-in fade-in zoom-in-95 duration-200 min-w-[220px] max-h-[400px] overflow-y-auto custom-scrollbar",
          align === 'end' ? 'right-0' : 'left-0'
        )}>
          {content}
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const config = PRIORITY_CONFIG[priority];
  const Icon = config.icon;
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap", 
      config.bg, 
      config.color
    )}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

const ProjectTag = ({ project }: { project: ProjectRef }) => (
  <div className="flex items-center space-x-1.5 group cursor-pointer px-1.5 py-0.5 rounded-full hover:bg-slate-100 transition-colors duration-200 max-w-full">
    <span className={cn("w-2 h-2 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-slate-200 transition-all duration-300", project.color)} />
    <span className="text-xs text-slate-500 group-hover:text-slate-800 font-medium transition-colors truncate">
      {project.name}
    </span>
  </div>
);

const AssigneeAvatarGroup = ({ users, limit = 3 }: { users: UserEntity[], limit?: number }) => {
  if (!users || users.length === 0) {
    return (
      <div className="w-6 h-6 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 bg-slate-50 flex-shrink-0">
        <UserIcon className="w-3 h-3" />
      </div>
    );
  }
  const visibleUsers = users.slice(0, limit);
  const remaining = users.length - limit;
  return (
    <div className="flex -space-x-2 overflow-hidden items-center flex-shrink-0">
      {visibleUsers.map((user) => (
        <img key={user.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white hover:scale-110 hover:z-10 transition-transform duration-200 cursor-pointer object-cover bg-slate-200" src={user.avatar} alt={user.name} title={user.name} />
      ))}
      {remaining > 0 && (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white text-[10px] font-medium text-slate-600">+{remaining}</span>
      )}
    </div>
  );
};

// --- CSV IMPORT MODAL COMPONENT ---

interface CsvDataRow { [key: string]: string | number | null; }
type ImportStep = 'UPLOAD' | 'PREVIEW' | 'IMPORTING' | 'RESULT';

const SAMPLE_CSV_DATA: CsvDataRow[] = [
  { 'Task Name': 'Thiết kế Logo', 'Description': 'Logo cho dự án mới', 'Due Date': '2023-11-01', 'Priority': 'High', 'Assignee': 'design@company.com' },
  { 'Task Name': 'Viết Content', 'Description': '', 'Due Date': '2023-11-05', 'Priority': 'Medium', 'Assignee': 'content@company.com' },
  { 'Task Name': 'Fix Bug #102', 'Description': 'Lỗi login', 'Due Date': 'invalid-date', 'Priority': 'Urgent', 'Assignee': '' },
];

const CsvImportModal = ({ isOpen, onClose, onImportSuccess }: { isOpen: boolean; onClose: () => void; onImportSuccess: (count: number) => void; }) => {
  const [step, setStep] = useState<ImportStep>('UPLOAD');
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<CsvDataRow[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importResults, setImportResults] = useState<{ success: number; failed: number }>({ success: 0, failed: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep('UPLOAD'); setFile(null); setParsedData([]); setUploadProgress(0); }, 300);
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) validateAndSetFile(e.target.files[0]);
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) { alert('Vui lòng chỉ tải lên file .csv'); return; }
    setFile(file);
    setTimeout(() => { setParsedData(SAMPLE_CSV_DATA); setStep('PREVIEW'); }, 800);
  };

  const handleImport = () => {
    setStep('IMPORTING');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setImportResults({ success: 2, failed: 1 });
        setStep('RESULT');
      }
    }, 300);
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div 
        className={cn("border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer", isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50")}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) validateAndSetFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById('csv-upload-input')?.click()}
      >
        <input id="csv-upload-input" type="file" accept=".csv" className="hidden" onChange={handleFileSelect} />
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4"><UploadCloud className="w-8 h-8" /></div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Kéo thả file CSV vào đây</h3>
        <p className="text-sm text-slate-500 mb-6">hoặc nhấn để chọn từ máy tính</p>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full"><FileSpreadsheet className="w-3.5 h-3.5" /> Hỗ trợ: .csv (Max 5MB)</div>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-indigo-500"/> Lưu ý về định dạng</h4>
        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 ml-1">
            <li>Dòng đầu tiên phải là tiêu đề cột.</li>
            <li>Định dạng ngày tháng: <code>YYYY-MM-DD</code>.</li>
            <li>Trường bắt buộc: <strong>Title, Priority, Due Date</strong>.</li>
        </ul>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded"><FileSpreadsheet className="w-5 h-5" /></div>
                <div><p className="text-sm font-medium text-slate-900">{file?.name}</p><p className="text-xs text-slate-500">{(file?.size ? file.size / 1024 : 0).toFixed(2)} KB • {parsedData.length} dòng</p></div>
            </div>
            <button onClick={() => { setFile(null); setStep('UPLOAD'); }} className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
        <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="p-3 font-semibold text-slate-600 border-b border-slate-200 w-10">#</th>
                        {Object.keys(parsedData[0] || {}).map((header) => (
                            <th key={header} className="p-3 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {parsedData.map((row, idx) => {
                        const hasError = row['Due Date'] === 'invalid-date';
                        return (
                            <tr key={idx} className={cn("hover:bg-slate-50 transition-colors", hasError && "bg-red-50 hover:bg-red-100")}>
                                <td className="p-3 text-slate-500 font-mono text-xs border-r border-slate-100">{idx + 1}</td>
                                {Object.values(row).map((cell, cellIdx) => (
                                    <td key={cellIdx} className="p-3 text-slate-700 whitespace-nowrap">
                                        {hasError && cell === 'invalid-date' ? <div className="flex items-center gap-1 text-red-600 font-medium"><AlertTriangle className="w-3.5 h-3.5" /> Invalid</div> : cell}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );

  const renderImportingStep = () => (
    <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-indigo-600 text-sm">{uploadProgress}%</div>
        </div>
        <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold text-slate-900">Đang nhập dữ liệu...</h3>
            <p className="text-sm text-slate-500">Vui lòng không tắt trình duyệt.</p>
        </div>
    </div>
  );

  const renderResultStep = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6 py-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-in zoom-in duration-300"><CheckCircle2 className="w-10 h-10" /></div>
        <div className="text-center space-y-2"><h3 className="text-2xl font-bold text-slate-900">Hoàn tất!</h3><p className="text-slate-500">Quá trình nhập dữ liệu đã kết thúc.</p></div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center"><span className="block text-2xl font-bold text-emerald-600">{importResults.success}</span><span className="text-xs text-emerald-700 font-medium uppercase tracking-wide">Thành công</span></div>
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center"><span className="block text-2xl font-bold text-red-600">{importResults.failed}</span><span className="text-xs text-red-700 font-medium uppercase tracking-wide">Lỗi / Bỏ qua</span></div>
        </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl max-h-[85vh]">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <div><h2 className="text-xl font-bold text-slate-900">Nhập dữ liệu từ CSV</h2><p className="text-sm text-slate-500">Thêm nhanh nhiều công việc vào dự án</p></div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"><X className="w-5 h-5" /></button>
      </div>
      
      {/* STEPS INDICATOR */}
      <div className="px-10 py-4 bg-slate-50/50 border-b border-slate-100 flex-shrink-0">
         <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />
            {['Upload', 'Preview', 'Import'].map((label, index) => {
                const stepIdx = index + 1;
                const currentStepIdx = step === 'UPLOAD' ? 1 : step === 'PREVIEW' ? 2 : 3;
                const isActive = currentStepIdx >= stepIdx; const isCompleted = currentStepIdx > stepIdx;
                return (
                    <div key={label} className="flex flex-col items-center gap-2 bg-white px-2">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300", isActive ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 bg-white text-slate-400", isCompleted && "bg-emerald-500 border-emerald-500")}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4"/> : stepIdx}
                        </div>
                        <span className={cn("text-xs font-medium", isActive ? "text-indigo-700" : "text-slate-400")}>{label}</span>
                    </div>
                )
            })}
         </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto min-h-[300px]">
        {step === 'UPLOAD' && renderUploadStep()}
        {step === 'PREVIEW' && renderPreviewStep()}
        {step === 'IMPORTING' && renderImportingStep()}
        {step === 'RESULT' && renderResultStep()}
      </div>

      {step !== 'IMPORTING' && step !== 'RESULT' && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center rounded-b-2xl flex-shrink-0">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">Hủy bỏ</button>
            <div className="flex gap-3">
                {step === 'PREVIEW' && <button onClick={() => setStep('UPLOAD')} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-white transition-colors">Quay lại</button>}
                <button onClick={step === 'UPLOAD' ? () => document.getElementById('csv-upload-input')?.click() : handleImport} disabled={step === 'UPLOAD' && !file} className={cn("px-6 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-all flex items-center gap-2", (step === 'UPLOAD' && !file) ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200")}>
                    {step === 'UPLOAD' ? 'Chọn File' : 'Tiến hành Nhập'} {step === 'PREVIEW' && <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
      )}
      {step === 'RESULT' && (
         <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-center items-center rounded-b-2xl flex-shrink-0">
            <button onClick={() => { onImportSuccess(importResults.success); onClose(); }} className="px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">Đóng & Xem kết quả</button>
         </div>
      )}
    </Modal>
  );
}

// --- SUB-COMPONENTS FOR MAIN PAGE ---

const TaskDetailPanel = ({ task, onClose }: { task: TaskEntity | null, onClose: () => void }) => {
  return (
    <Modal isOpen={!!task} onClose={onClose} className="max-w-2xl">
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2"><span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">{task?.key}</span><PriorityBadge priority={task?.priority || 'LOW'} /></div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">{task?.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full p-1 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-6">
                <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Trạng thái</label><div className="flex items-center gap-2 text-sm text-slate-700 font-medium">{STATUS_CONFIG[task?.status || 'NOT_STARTED'].label}</div></div>
                <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Dự án</label>{task?.project && <ProjectTag project={task.project} />}</div>
                <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Người thực hiện</label><div className="flex items-center gap-2"><AssigneeAvatarGroup users={task?.assignees || []} /><span className="text-sm text-slate-600">{task?.assignees.length ? task.assignees.map(u => u.name).join(', ') : 'Chưa gán'}</span></div></div>
                <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Ngày hạn</label><div className="flex items-center gap-2 text-sm text-slate-700"><CalendarDays className="w-4 h-4 text-slate-400" />{task?.dueDate && new Date(task.dueDate).toLocaleDateString('vi-VN')}</div></div>
            </div>
            <div className="border-t border-slate-100 pt-4"><label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2"><AlignLeft className="w-4 h-4" /> Mô tả</label><p className="text-sm text-slate-700 leading-relaxed min-h-[80px]">{task?.description || "Chưa có mô tả chi tiết cho công việc này."}</p></div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 flex-shrink-0">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Đóng</button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">Chỉnh sửa</button>
        </div>
    </Modal>
  );
};

const TaskActionsMenu = ({ onViewDetails }: { onViewDetails: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <button className="opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-white hover:shadow-sm hover:text-indigo-600 text-slate-400 transition-all duration-300 ease-out">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      }
      content={
        <div className="w-[180px]">
          <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hành động</div>
          <button onClick={() => { onViewDetails(); setIsOpen(false); }} className="w-full text-left px-2 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium rounded transition-colors flex items-center gap-2"><Eye className="w-3.5 h-3.5"/> Xem chi tiết</button>
          <button className="w-full text-left px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded transition-colors flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5"/> Dời ngày hạn</button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-2"><X className="w-3.5 h-3.5"/> Xóa công việc</button>
        </div>
      }
    />
  );
};

const TaskListRow = ({ task, density, onViewDetails }: { task: TaskEntity; density: DensityMode; onViewDetails: () => void }) => {
  const StatusIcon = STATUS_CONFIG[task.status].icon;
  const isCompact = density === 'COMPACT';
  const isDone = task.status === 'DONE';

  return (
    <div className={cn("group flex items-center border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-all duration-200 px-4 relative overflow-hidden cursor-default", isCompact ? "py-2.5" : "py-4")}>
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
      <button className="flex-shrink-0 mr-4 text-slate-400 hover:text-indigo-600 transition-colors active:scale-90 duration-200 transform focus:outline-none"><StatusIcon className={cn("w-5 h-5 transition-all duration-300", isDone ? "text-emerald-500" : "group-hover:stroke-[2.5px]")} /></button>
      <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 md:col-span-5 pr-4 cursor-pointer" onClick={onViewDetails}>
          <div className="flex items-center gap-2 mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"><span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1 rounded group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">{task.key}</span><PriorityBadge priority={task.priority} /></div>
          <h4 className={cn("font-medium text-slate-900 truncate transition-colors duration-200 group-hover:text-indigo-700", isCompact ? "text-sm" : "text-[15px]", isDone && "text-slate-400 line-through decoration-slate-300")}>{task.title}</h4>
        </div>
        <div className="hidden md:block col-span-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300"><ProjectTag project={task.project} /></div>
        <div className="col-span-6 md:col-span-4 flex items-center justify-end space-x-6">
          <div className="flex items-center gap-3">
             <div className="opacity-70 group-hover:opacity-100 transition-opacity"><AssigneeAvatarGroup users={task.assignees} /></div>
             <div className={cn("flex items-center text-xs px-2 py-1 rounded transition-colors duration-200 whitespace-nowrap", new Date(task.dueDate) < new Date() && !isDone ? "text-red-600 font-bold bg-red-50" : "text-slate-500 group-hover:bg-white group-hover:shadow-sm")}>
                <CalendarDays className={cn("w-3.5 h-3.5 mr-1.5", new Date(task.dueDate) < new Date() && !isDone && "animate-pulse")} />{new Date(task.dueDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
              </div>
          </div>
          <TaskActionsMenu onViewDetails={onViewDetails} />
        </div>
      </div>
    </div>
  );
};

const TaskKanbanCard = ({ task, onViewDetails }: { task: TaskEntity; onViewDetails: () => void }) => {
  return (
    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 ease-out cursor-grab active:cursor-grabbing mb-3 group relative overflow-hidden flex-shrink-0 w-full">
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300", task.project.color)} />
      <div className="flex justify-between items-start mb-2.5">
        <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-500 transition-colors">{task.key}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity"><TaskActionsMenu onViewDetails={onViewDetails} /></div>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-3 line-clamp-2 leading-relaxed group-hover:text-indigo-700 transition-colors cursor-pointer" onClick={onViewDetails}>{task.title}</h4>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50 group-hover:border-slate-100 transition-colors">
        <div className="flex items-center gap-2"><AssigneeAvatarGroup users={task.assignees} limit={2} /></div>
        <div className="flex items-center gap-2">{new Date(task.dueDate) < new Date() && task.status !== 'DONE' && <span className="flex items-center text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded animate-pulse"><Clock className="w-3 h-3 mr-1" /></span>}<PriorityBadge priority={task.priority} /></div>
      </div>
    </div>
  );
};

const TaskGroupSection = ({ title, icon: Icon, count, headerColorClass, borderColorClass, children, isCollapsed, onToggle, className }: any) => {
  return (
    <section className={cn("animate-in slide-in-from-left-2 duration-500", className)}>
      <div className="flex items-center gap-2 mb-3 px-1 cursor-pointer group select-none" onClick={onToggle}>
        <div className="p-1 rounded-md hover:bg-slate-100 transition-colors"><ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", isCollapsed && "-rotate-90")} /></div>
        <h3 className={cn("text-sm font-bold uppercase tracking-wider flex items-center gap-2", headerColorClass)}>{Icon && <Icon className="w-4 h-4"/>} {title} <span className="text-xs font-normal opacity-70 ml-1">({count})</span></h3>
        <div className={cn("h-px flex-1 bg-gradient-to-r", borderColorClass)}></div>
      </div>
      <div className={cn("bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300 ease-in-out", isCollapsed ? "max-h-0 opacity-0 border-none shadow-none" : "max-h-[2000px] opacity-100")}>
        <div className={cn("divide-y", headerColorClass.includes('red') ? "border-red-100 shadow-red-100/50 divide-red-50" : "border-slate-200 divide-slate-50")}>{children}</div>
      </div>
    </section>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('LIST');
  const [density, setDensity] = useState<DensityMode>('COMFORTABLE');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('DUE_DATE_ASC');
  const [selectedTask, setSelectedTask] = useState<TaskEntity | null>(null);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({ OVERDUE: false, TODAY: false, UPCOMING: false, DONE: true });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const toggleSection = (section: string) => setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));

  // Filtering Logic
  const filteredTasks = useMemo(() => {
    let tasks = MOCK_TASKS.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortOption === 'DUE_DATE_ASC') tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    else if (sortOption === 'PRIORITY_DESC') { const pMap = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }; tasks.sort((a, b) => pMap[b.priority] - pMap[a.priority]); }
    else if (sortOption === 'TITLE_ASC') tasks.sort((a, b) => a.title.localeCompare(b.title));
    return tasks;
  }, [searchQuery, sortOption]);

  const groupedTasks = useMemo(() => {
    const today = new Date().toDateString();
    return {
      overdue: filteredTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'DONE'),
      today: filteredTasks.filter(t => new Date(t.dueDate).toDateString() === today && t.status !== 'DONE'),
      upcoming: filteredTasks.filter(t => new Date(t.dueDate) > new Date() && t.status !== 'DONE'),
      done: filteredTasks.filter(t => t.status === 'DONE')
    };
  }, [filteredTasks]);

  const kanbanColumns = {
    NOT_STARTED: filteredTasks.filter(t => t.status === 'NOT_STARTED'),
    IN_PROGRESS: filteredTasks.filter(t => t.status === 'IN_PROGRESS'),
    IN_REVIEW: filteredTasks.filter(t => t.status === 'IN_REVIEW'),
    DONE: filteredTasks.filter(t => t.status === 'DONE'),
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans overflow-hidden">
      {/* HEADER */}
      <header className="px-6 py-5 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">Công việc của tôi <span className="text-sm font-normal text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full mt-1 shadow-sm">{filteredTasks.length}</span></h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2"><span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5"/> {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</span><span className="w-1 h-1 bg-slate-300 rounded-full"></span>{groupedTasks.overdue.length > 0 ? <span className="font-semibold text-red-600 flex items-center gap-1 animate-pulse"><AlertCircle className="w-3.5 h-3.5"/> {groupedTasks.overdue.length} task quá hạn</span> : <span className="text-emerald-600 font-medium">Tất cả đều đúng tiến độ</span>}</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input type="text" placeholder="Tìm kiếm nhanh..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white w-full md:w-56 transition-all shadow-sm hover:shadow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            
            {/* Filter Popover */}
            <Popover 
              isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}
              trigger={<button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all active:scale-95 text-sm font-medium"><Filter className="w-4 h-4" /><span className="hidden sm:inline">Lọc & Sắp xếp</span></button>}
              content={
                <div className="w-64 p-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sắp xếp theo</div>
                  <button onClick={() => setSortOption('DUE_DATE_ASC')} className={cn("w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors", sortOption === 'DUE_DATE_ASC' ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-100")}><span className="flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> Ngày đến hạn (Tăng dần)</span>{sortOption === 'DUE_DATE_ASC' && <Check className="w-4 h-4" />}</button>
                  <button onClick={() => setSortOption('PRIORITY_DESC')} className={cn("w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors", sortOption === 'PRIORITY_DESC' ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-100")}><span className="flex items-center gap-2"><ArrowUpCircle className="w-4 h-4"/> Độ ưu tiên (Cao nhất)</span>{sortOption === 'PRIORITY_DESC' && <Check className="w-4 h-4" />}</button>
                  <button onClick={() => setSortOption('TITLE_ASC')} className={cn("w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors", sortOption === 'TITLE_ASC' ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-100")}><span className="flex items-center gap-2"><ArrowUpDown className="w-4 h-4"/> Tiêu đề (A-Z)</span>{sortOption === 'TITLE_ASC' && <Check className="w-4 h-4" />}</button>
                </div>
              }
            />

            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shadow-inner">
              <button onClick={() => setViewMode('LIST')} className={cn("p-1.5 rounded-md transition-all ease-out active:scale-95", viewMode === 'LIST' ? "bg-white shadow-sm text-indigo-600 ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700")}><LayoutList className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('KANBAN')} className={cn("p-1.5 rounded-md transition-all ease-out active:scale-95", viewMode === 'KANBAN' ? "bg-white shadow-sm text-indigo-600 ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700")}><KanbanIcon className="w-4 h-4" /></button>
            </div>
            
            {/* Create Popover */}
            <Popover 
              isOpen={isCreateOpen} setIsOpen={setIsCreateOpen}
              trigger={<button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 font-medium text-sm"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Tạo mới</span></button>}
              content={
                <div className="w-56 p-1.5">
                  <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Khởi tạo</div>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group"><div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md group-hover:bg-indigo-200 transition-colors"><FilePlus className="w-4 h-4" /></div><div className="text-left"><div className="font-medium">Công việc mới</div><div className="text-[10px] text-slate-500 font-normal">Tạo task và gán người</div></div></button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors group mt-1"><div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md group-hover:bg-emerald-200 transition-colors"><FolderPlus className="w-4 h-4" /></div><div className="text-left"><div className="font-medium">Dự án mới</div><div className="text-[10px] text-slate-500 font-normal">Tạo không gian làm việc</div></div></button>
                  <div className="h-px bg-slate-100 my-1.5"></div>
                  <button onClick={() => { setIsCreateOpen(false); setIsCsvModalOpen(true); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group"><Upload className="w-4 h-4 text-slate-400 group-hover:text-slate-600" /><span>Nhập dữ liệu (CSV)</span></button>
                </div>
              }
            />
          </div>
        </div>
      </header>

      {/* CONTENT AREA - SPLIT SCROLL LOGIC */}
      <main className={cn(
        "flex-1 flex flex-col relative", 
        viewMode === 'LIST' ? "overflow-y-auto" : "overflow-hidden"
      )}>
        
        {viewMode === 'LIST' && (
          <div className="flex-1 w-full max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {groupedTasks.overdue.length > 0 && <TaskGroupSection title="Quá hạn" icon={AlertCircle} count={groupedTasks.overdue.length} headerColorClass="text-red-600" borderColorClass="from-red-200 to-transparent" isCollapsed={collapsedSections.OVERDUE} onToggle={() => toggleSection('OVERDUE')}>{groupedTasks.overdue.map(task => <TaskListRow key={task.id} task={task} density={density} onViewDetails={() => setSelectedTask(task)} />)}</TaskGroupSection>}
            <TaskGroupSection title="Hôm nay" icon={CalendarIcon} count={groupedTasks.today.length} headerColorClass="text-indigo-600" borderColorClass="from-indigo-200 to-transparent" isCollapsed={collapsedSections.TODAY} onToggle={() => toggleSection('TODAY')}>{groupedTasks.today.length > 0 ? groupedTasks.today.map(task => <TaskListRow key={task.id} task={task} density={density} onViewDetails={() => setSelectedTask(task)}/>) : <div className="p-8 text-center text-slate-400 italic text-sm bg-slate-50/50">Không có công việc nào cần làm hôm nay.</div>}</TaskGroupSection>
            <TaskGroupSection title="Sắp tới" icon={ArrowRight} count={groupedTasks.upcoming.length} headerColorClass="text-slate-500" borderColorClass="from-slate-200 to-transparent" isCollapsed={collapsedSections.UPCOMING} onToggle={() => toggleSection('UPCOMING')} className="opacity-90 hover:opacity-100">{groupedTasks.upcoming.map(task => <TaskListRow key={task.id} task={task} density={density} onViewDetails={() => setSelectedTask(task)}/>)}</TaskGroupSection>
            <TaskGroupSection title="Đã hoàn thành" icon={CheckCircle2} count={groupedTasks.done.length} headerColorClass="text-slate-400 line-through decoration-slate-300" borderColorClass="from-slate-200 to-transparent" isCollapsed={collapsedSections.DONE} onToggle={() => toggleSection('DONE')}>{groupedTasks.done.map(task => <TaskListRow key={task.id} task={task} density={density} onViewDetails={() => setSelectedTask(task)}/>)}</TaskGroupSection>
          </div>
        )}

        {/* KANBAN VIEW - HORIZONTAL SCROLL ONLY */}
        {viewMode === 'KANBAN' && (
          <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 custom-scrollbar">
            <div className="h-full flex gap-6 min-w-max">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                const tasks = kanbanColumns[key as TaskStatus];
                return (
                  <div key={key} className="flex-shrink-0 w-80 flex flex-col h-full group/column">
                    <div className={cn("flex items-center justify-between mb-3 px-3 py-2.5 rounded-xl border transition-colors duration-300 flex-shrink-0", config.bg, `border-${config.color.split('-')[1]}-200`)}><div className="flex items-center gap-2 font-bold text-sm text-slate-700"><config.icon className={cn("w-4 h-4", config.color)} />{config.label}</div><span className="bg-white/60 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">{tasks.length}</span></div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-1 pb-4">{tasks.map(task => <TaskKanbanCard key={task.id} task={task} onViewDetails={() => setSelectedTask(task)}/>)}<button className="w-full py-2.5 mt-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 opacity-0 group-hover/column:opacity-100"><Plus className="w-4 h-4" /> Thêm nhanh</button></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      <CsvImportModal isOpen={isCsvModalOpen} onClose={() => setIsCsvModalOpen(false)} onImportSuccess={(count) => { console.log(`Imported ${count}`); setIsCsvModalOpen(false); }} />
    </div>
  );
}