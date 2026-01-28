export type ProjectStatus = 'DRAFT' | 'PLANNING' | 'EXECUTION' | 'MONITORING' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type ProjectType = 'WATERFALL' | 'AGILE'; 
export type ProjectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface UserEntity {
    id: string;
    name: string;
    avatar: string;
}

export interface ProjectEntity {
  id: string;
  key: string;
  name: string;
  description: string;
  manager: UserEntity;
  members: UserEntity[];
  status: ProjectStatus;
  type: ProjectType;
  priority: ProjectPriority;
  progress: number; 
  startDate: string;
  dueDate: string;
  category: string; 
  taskCount: { total: number; completed: number };
}
