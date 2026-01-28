import React from 'react';
import { FilePlus, Calendar, Zap, Activity, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ProjectStatus } from '../../types/project';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; icon: any; border: string }> = {
  DRAFT: { label: 'Khởi tạo', color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200', icon: FilePlus },
  PLANNING: { label: 'Lập kế hoạch', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', icon: Calendar },
  EXECUTION: { label: 'Thực thi', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', icon: Zap },
  MONITORING: { label: 'Kiểm soát', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Activity },
  COMPLETED: { label: 'Hoàn thành', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 },
  ON_HOLD: { label: 'Tạm hoãn', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertCircle },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: X },
};

export const StatusBadge = ({ status, className }: { status: ProjectStatus; className?: string }) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-colors", 
      config.bg, config.color, config.border, className
    )}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};