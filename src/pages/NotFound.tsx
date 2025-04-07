
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-sonic-dark dark:to-sonic-dark-purple">
      <div className="text-center max-w-md px-4 animate-float-up">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-sonic rounded-full flex items-center justify-center">
          <Headphones className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 sonic-gradient-text">404</h1>
        <p className="text-xl mb-6 text-slate-600 dark:text-slate-300">
          Oops! This audio room doesn't exist or has ended.
        </p>
        
        <Link to="/">
          <Button className="bg-gradient-sonic hover:opacity-90 transition-opacity">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
