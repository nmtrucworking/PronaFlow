import type { Member } from './member';

export interface Note {
  id: string;
  title: string;
  excerpt: string;
  author: Member;
  updatedAt: string;
  tags: string[];
}