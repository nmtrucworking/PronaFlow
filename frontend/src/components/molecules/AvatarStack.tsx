import React from 'react';
import type { UserEntity } from '../../types/project';

interface AvatarStackProps {
  users: UserEntity[];
  limit?: number;
}

export const AvatarStack = ({ users, limit = 3 }: AvatarStackProps) => {
  const visible = users.slice(0, limit);
  const remaining = users.length - limit;

  return (
    <div className="flex -space-x-2">
      {visible.map(u => (
        <img 
          key={u.id} 
          src={u.avatar} 
          alt={u.name} 
          title={u.name} 
          className="w-6 h-6 rounded-full ring-2 ring-white bg-slate-200 object-cover hover:scale-110 hover:z-10 transition-transform duration-200 cursor-pointer" 
        />
      ))}
      {remaining > 0 && (
        <div className="w-6 h-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-600">
          +{remaining}
        </div>
      )}
    </div>
  );
};