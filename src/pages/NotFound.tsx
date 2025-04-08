
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Headphones, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted dark:from-background dark:to-slate-900/50">
      <div className="text-center max-w-md px-4 animate-float-up">
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-sonic rounded-full flex items-center justify-center shadow-lg shadow-sonic-blue/20">
          <Headphones className="h-16 w-16 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold mb-6 warm-gradient-text">404</h1>
        <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
          Oops! This audio room doesn't exist or has ended.
        </p>
        
        <Link to="/">
          <Button className="bg-gradient-sonic hover:opacity-90 transition-opacity px-8 py-6 h-auto text-lg flex items-center gap-2 rounded-full">
            <ArrowLeft className="h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
