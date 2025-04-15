
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Bell, Menu, X } from "lucide-react";
import { useNotifications } from "@/context/NotificationsContext";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MainNav = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sonic-blue to-sonic-coral flex items-center justify-center mr-2">
              <span className="text-white font-bold">SA</span>
            </div>
            <span className="font-bold text-xl sonic-gradient-text hidden sm:inline-block">SonicAura</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-sonic-blue">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-sonic-blue">
              About
            </Link>
            <Link to="/help" className="text-sm font-medium transition-colors hover:text-sonic-blue">
              Help
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-sonic-blue">
              Contact
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Notification Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-sonic-coral text-[10px] font-medium flex items-center justify-center text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground"
                      onClick={() => markAllAsRead()}
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id} 
                      className={`flex flex-col items-start p-3 cursor-default ${!notification.read ? 'bg-muted/50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center w-full">
                        <span className="font-medium">{notification.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-sonic-blue absolute top-3 right-3"></div>
                      )}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Create Account Button - Hide on mobile */}
            <Link to="/create-account" className="hidden md:block">
              <Button className="bg-sonic-blue hover:bg-sonic-blue/90 text-white">
                Create Account
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6 mt-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sonic-blue to-sonic-coral flex items-center justify-center mr-2">
                      <span className="text-white font-bold">SA</span>
                    </div>
                    <span className="font-bold text-xl sonic-gradient-text">SonicAura</span>
                  </div>
                  
                  <div className="flex flex-col space-y-4">
                    <Link 
                      to="/" 
                      className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="text-base font-medium">Home</span>
                    </Link>
                    <Link 
                      to="/about" 
                      className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="text-base font-medium">About</span>
                    </Link>
                    <Link 
                      to="/help" 
                      className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="text-base font-medium">Help</span>
                    </Link>
                    <Link 
                      to="/contact" 
                      className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <span className="text-base font-medium">Contact</span>
                    </Link>
                  </div>
                  
                  <div className="mt-auto">
                    <Link to="/create-account" className="w-full">
                      <Button className="w-full bg-sonic-blue hover:bg-sonic-blue/90 text-white">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
