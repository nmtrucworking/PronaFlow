export type ProjectStatus = 'ON_HOLD' | 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type ProjectType = 'WATERFALL' | 'AGILE'; 
export type ProjectPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type FileType = 'PDF' | 'DOC' | 'IMG' | 'XLS' | 'OTHER';

import type { Member } from './member';

export interface UserEntity {
  user_id?: string;
  id?: string;
  username?: string;
  name?: string;
  avatar_url?: string;
  avatar?: string;
}

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

export interface ProjectMember {
  id: string;
  name: string;
  avartar_url?: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
}