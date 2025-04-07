
import React from 'react';
import UserAvatar from './UserAvatar';

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isHost: boolean;
  role: 'host' | 'speaker' | 'listener';
}

interface SpeakersGridProps {
  users: User[];
}

const SpeakersGrid = ({ users }: SpeakersGridProps) => {
  // Filter hosts and speakers
  const hosts = users.filter(user => user.role === 'host');
  const speakers = users.filter(user => user.role === 'speaker');
  const listeners = users.filter(user => user.role === 'listener');
  
  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {/* Hosts */}
      <div className="flex flex-wrap justify-center gap-8">
        {hosts.map(user => (
          <UserAvatar
            key={user.id}
            username={user.username}
            avatarUrl={user.avatarUrl}
            isMuted={user.isMuted}
            isSpeaking={user.isSpeaking}
            isHost={true}
            size="lg"
          />
        ))}
      </div>
      
      {/* Speakers */}
      {speakers.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl">
          {speakers.map(user => (
            <UserAvatar
              key={user.id}
              username={user.username}
              avatarUrl={user.avatarUrl}
              isMuted={user.isMuted}
              isSpeaking={user.isSpeaking}
              size="md"
            />
          ))}
        </div>
      )}
      
      {/* Listeners */}
      {listeners.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
            Listeners ({listeners.length})
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {listeners.map(user => (
              <UserAvatar
                key={user.id}
                username={user.username}
                avatarUrl={user.avatarUrl}
                isMuted={true}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakersGrid;
