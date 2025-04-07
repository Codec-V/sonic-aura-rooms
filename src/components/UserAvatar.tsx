
import React from 'react';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';

interface UserAvatarProps {
  username: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  isMuted?: boolean;
  isSpeaking?: boolean;
  isHost?: boolean;
  className?: string;
}

const UserAvatar = ({
  username,
  avatarUrl,
  size = 'md',
  isMuted = false,
  isSpeaking = false,
  isHost = false,
  className,
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-base',
  };
  
  const initials = username
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={cn("relative group", className)}>
      <div 
        className={cn(
          sizeClasses[size],
          "rounded-full flex items-center justify-center relative overflow-hidden",
          "bg-gradient-to-br from-sonic-purple to-sonic-pink border-2",
          "border-white dark:border-sonic-dark",
          isHost && "ring-2 ring-sonic-amber",
          isSpeaking && "speaking-animation animate-breathe",
          "transition-all duration-300"
        )}
      >
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={username} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold text-white">{initials}</span>
        )}
      </div>
      
      {isMuted && (
        <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1">
          <MicOff className="h-3 w-3 text-white" />
        </div>
      )}
      
      {isHost && (
        <div className="absolute -top-1 -right-1 bg-sonic-amber rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white">
          HOST
        </div>
      )}
      
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-xs font-medium">
        {username}
      </div>
    </div>
  );
};

export default UserAvatar;
