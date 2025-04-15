import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, BellOff, Check, X, MessageSquare, Users, Megaphone, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications, Notification } from '@/context/NotificationsContext';
import { cn } from '@/lib/utils';

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'mention':
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case 'invite':
      return <Users className="h-4 w-4 text-green-500" />;
    case 'announcement':
      return <Megaphone className="h-4 w-4 text-purple-500" />;
    case 'activity':
      return <Activity className="h-4 w-4 text-orange-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const NotificationsPopover = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 rounded-full"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-sonic-coral rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="h-8 text-xs"
            >
              <Check className="mr-1 h-3 w-3" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors",
                    !notification.read && "bg-muted/30"
                  )}
                >
                  <div className="mt-1 rounded-full p-1 bg-muted">
                    <NotificationIcon type={notification.type} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground" 
                          onClick={() => clearNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <BellOff className="h-10 w-10 text-muted-foreground/50 mb-2" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;