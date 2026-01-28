export type ProjectStatus = 'DRAFT' | 'PLANNING' | 'EXECUTION' | 'MONITORING' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type ProjectType = 'WATERFALL' | 'AGILE'; 
export type ProjectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type FileType = 'PDF' | 'DOC' | 'IMG' | 'XLS' | 'OTHER';

import type { Member } from './member';

export interface Project {
  id: string;
  name: string;
  key: string; // e.g., "PRJ-01"
  description: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  progress: number; // 0 - 100
  start_date: string; // ISO Date
  end_date: string;   // ISO Date
  manager: Member;
  members: Member[];
  tags: string[];
  thumbnail_url?: string; // Optional cover image
  type: ProjectType;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploader: Member;
  uploadedAt: string;
}

