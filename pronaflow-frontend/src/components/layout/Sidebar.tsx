import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Inbox, 
  Settings, 
  HelpCircle, 
  UserPlus, 
  ChevronRight, 
  Plus, 
  Hash,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Bell
} from 'lucide-react';

/**
 * ENTITY INTERFACES
 * Dựa trên tài liệu 02-Architeture/Entities/Workspace.md & Users.md
 */
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

interface Workspace {
  workspace_id: string;
  name: string;
  logo_url?: string;
}

interface SidebarProps {
  currentWorkspace: Workspace;
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentWorkspace, activePath }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Danh sách Navigation chính
  const mainNav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'tasks', label: 'Công việc của tôi', icon: CheckSquare, path: '/my-tasks' },
    { id: 'inbox', label: 'Hộp thư', icon: Inbox, path: '/inbox', badge: 5 },
  ];

  // Danh sách Project mẫu (Dựa trên Project.md)
  const recentProjects = [
    { id: 'p1', name: 'Website Redesign', color: 'bg-blue-500' },
    { id: 'p2', name: 'PronaFlow Mobile App', color: 'bg-green-500' },
  ];

  return (
    <aside 
      className={`h-screen flex flex-col transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* 1. HEADER: Workspace Switcher */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
              {currentWorkspace.name.charAt(0)}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {currentWorkspace.name}
              </span>
              <span className="text-xs text-slate-500">Workspace cá nhân</span>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto"
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* 2. BODY: Navigation Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6">
        
        {/* Main Menu */}
        <nav className="space-y-1">
          {mainNav.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all group relative ${
                activePath === item.path 
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-medium' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} className={activePath === item.path ? 'text-indigo-600' : ''} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
              {!isCollapsed && item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </a>
          ))}
        </nav>

        {/* Dự án gần đây (Dựa trên Project Lifecycle Management.md) */}
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Dự án của bạn
              </h3>
              <button className="text-slate-400 hover:text-indigo-500">
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-1">
              {recentProjects.map((project) => (
                <a 
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className={`w-2 h-2 rounded-full ${project.color}`} />
                  <span className="text-sm truncate">{project.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER: User & Quick Actions */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <UserPlus size={20} />
            {!isCollapsed && <span className="text-sm">Mời thành viên</span>}
          </button>
          <button className="w-full flex items-center gap-3 p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <HelpCircle size={20} />
            {!isCollapsed && <span className="text-sm">Trợ giúp</span>}
          </button>
        </nav>

        {/* User Profile Section */}
        <div className="pt-4 flex items-center gap-3 border-t border-slate-50 dark:border-slate-800">
          <div className="relative shrink-0">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=PronaFlow" 
              alt="User" 
              className="w-9 h-9 rounded-full bg-slate-100"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">Nguyễn Văn A</p>
              <p className="text-xs text-slate-500 truncate">Lead Designer</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;