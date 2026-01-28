import { useState, useMemo } from 'react';
import { Search, LayoutGrid, List as ListIcon, Kanban as KanbanIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

// Import các thành phần đã phân rã
import type { ProjectEntity, ProjectStatus } from '../../types/project';
import { FilterSortPopover } from '../../components/molecules/FilterSortPopover';
import { CreateMenuPopover } from '../../components/molecules/CreateMenuPopover';
import { ProjectCard } from '../../features/projects/components/ProjectCard';
import { ProjectRow } from '../../features/projects/components/ProjectRow';


// Mock data
import { MOCK_PROJECTS } from '../../mocks/projects'

type SortOption = 'NAME_ASC' | 'PRIORITY_DESC';

// Mock dữ liệu ban đầu
const INITIAL_PROJECTS: ProjectEntity[] = MOCK_PROJECTS;

export default function AllProjectsPage() {
  // 1. Quản lý State
  const [projects] = useState<ProjectEntity[]>(INITIAL_PROJECTS); 
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST' | 'KANBAN'>('GRID');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('NAME_ASC');

  // 2. Logic Lọc và Sắp xếp (Computed State)
  const filteredProjects = useMemo(() => {
    let result = projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.key.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Logic Sắp xếp
    if (sortOption === 'NAME_ASC') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === 'PRIORITY_DESC') {
      const priorityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }
    return result;
  }, [projects, searchQuery, statusFilter, sortOption]);

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 overflow-hidden">
      {/* HEADER AREA */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Tất cả dự án</h1>
              <p className="text-sm text-slate-500">Quản lý và theo dõi tiến độ dự án tổ chức.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Tìm dự án..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <FilterSortPopover 
                currentSort={sortOption} 
                onSortChange={setSortOption}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />

              <div className="flex items-center p-1 bg-slate-100 rounded-lg border">
                <button onClick={() => setViewMode('GRID')} className={cn("p-1.5 rounded-md", viewMode === 'GRID' ? "bg-white shadow text-indigo-600" : "text-slate-500")}><LayoutGrid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('LIST')} className={cn("p-1.5 rounded-md", viewMode === 'LIST' ? "bg-white shadow text-indigo-600" : "text-slate-500")}><ListIcon className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('KANBAN')} className={cn("p-1.5 rounded-md", viewMode === 'KANBAN' ? "bg-white shadow text-indigo-600" : "text-slate-500")}><KanbanIcon className="w-4 h-4" /></button>
              </div>

              <CreateMenuPopover onOpenCreateModal={() => {}} />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-6">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-slate-500">Không có dự án nào</p>
          </div>
        ) : (
          <>
            {viewMode === 'GRID' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
                {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            )}

            {viewMode === 'LIST' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {filteredProjects.map(p => <ProjectRow key={p.id} project={p} />)}
              </div>
            )}
            
            {viewMode === 'KANBAN' && (
              <div className="text-slate-500 text-center py-8">
                Chế độ Kanban đang được phát triển
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
