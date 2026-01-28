import type { Member } from './member';

export type TaskPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskType = 'STORY' | 'TASK' | 'BUG';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface Task {
  id: string;
  key: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: Member;
  startDate: string; 
  dueDate: string;   
  progress: number;  
  dependencies?: string[];
  points?: number;
}