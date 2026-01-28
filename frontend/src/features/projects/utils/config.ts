import type { ProjectStatus, ProjectPriority} from '../../../types/project';

export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, { label: string, color: string }> = {
    DRAFT: { label: 'Khởi tạo', color: 'bg-slate-500' },
    PLANNING: { label: 'Lập kế hoạch', color: 'bg-sky-500' },
    EXECUTION: { label: 'Thực thi', color: 'bg-indigo-500' },
    MONITORING: { label: 'Kiểm soát', color: 'bg-amber-500' },
    COMPLETED: { label: 'Hoàn thành', color: 'bg-emerald-500' },
    ON_HOLD: { label: 'Tạm dừng', color: 'bg-orange-500' }
};

export const PRIORITY_CONFIG: Record<ProjectPriority, { label: string, color: string, bg: string }> = {
    CRITICAL: { label: 'Nghiêm trọng', color: 'text-red-700', bg: 'bg-red-100' },
    HIGH: { label: 'Cao', color: 'text-orange-700', bg: 'bg-orange-100' },
    MEDIUM: { label: 'Trung bình', color: 'text-blue-700', bg: 'bg-blue-100' },
    LOW: { label: 'Thấp', color: 'text-slate-600', bg: 'bg-slate-100' }
};