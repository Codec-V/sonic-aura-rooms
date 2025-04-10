
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user prefers dark mode from localStorage or system preference
    const storedTheme = localStorage.getItem("theme");
    const isDark = 
      storedTheme === "dark" || 
      (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    // Set theme as soon as component mounts to avoid flash
    setIsDarkMode(isDark);
    
    // Apply the theme immediately
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Store in localStorage to persist across refreshes
    if (!storedTheme) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      
      return newMode;
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
    >
      <Sun className={`w-5 h-5 absolute transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
      <Moon className={`w-5 h-5 absolute transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
    </Button>
  );
};

export default ThemeToggle;
