
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Plus, Bell, User, LogOut } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";

const MainNav = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const handleCreateRoom = () => {
    // Will be implemented later
    toast({
      title: "Coming Soon",
      description: "Room creation will be available soon!",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-sonic-dark/70 border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-gradient-sonic flex items-center justify-center">
            <span className="text-white font-bold text-lg">SA</span>
          </div>
          <span className="font-bold text-xl sonic-gradient-text">SonicAura</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCreateRoom}
            className="relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-sonic-pink rounded-full"></span>
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative overflow-hidden rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sonic-purple to-sonic-pink flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
