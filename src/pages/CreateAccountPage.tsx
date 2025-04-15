
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2, User, Mail, Lock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Background animation component for CreateAccountPage
const CreateAccountBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sonic-mint/30 rounded-full filter blur-[100px] opacity-60 animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sonic-blue/30 rounded-full filter blur-[120px] opacity-50 animate-float-slow-reverse" />
      
      {/* Decorative elements */}
      <div className="absolute top-[25%] right-[10%] w-24 h-24 border-4 border-sonic-mint/20 rounded-lg rotate-12 animate-spin-slow" />
      <div className="absolute bottom-[30%] left-[15%] w-32 h-32 border-4 border-sonic-blue/20 rounded-full animate-float-medium" />
      
      {/* Sound wave lines - Simplified for this page */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 2) * 60}`}
              stroke={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#F97316"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.5,
                d: [
                  `M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 2) * 60}`,
                  `M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 1200 ${400 + (i - 2) * 60}`,
                  `M 0 ${400 + (i - 2) * 60} Q 300 ${400 + (i - 2) * (i % 2 === 0 ? 80 : -80)} 600 ${400 + (i - 2) * 60} Q 900 ${400 + (i - 2) * (i % 2 === 0 ? -80 : 80)} 1200 ${400 + (i - 2) * 60}`,
                ]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Floating music notes - Fewer than homepage */}
      {[...Array(5)].map((_, i) => {
        const size = 20 + Math.random() * 30;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;
        const rotate = Math.random() * 30 - 15;
        
        return (
          <motion.div
            key={`note-${i}`}
            className="absolute text-sonic-mint/40 dark:text-sonic-mint/30 font-bold"
            style={{
              fontSize: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              textShadow: '0 0 5px rgba(0,0,0,0.2)'
            }}
            initial={{ opacity: 0, rotate: 0}}
            animate={{
              opacity: [0, 0.7, 0],
              y: -100,
              rotate: rotate,
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            {['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)]}
          </motion.div>
        );
      })}
      
      {/* Floating user icons */}
      {[...Array(3)].map((_, i) => {
        const size = 24 + Math.random() * 16;
        const initialX = 20 + Math.random() * 60; // Keep more centered
        const initialY = 20 + Math.random() * 60;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 10;
        
        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-sonic-blue/30 dark:text-sonic-blue/20"
            style={{
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-20, 20, -20],
              x: [0, Math.sin(i) * 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <User size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setUserData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!userData.fullName.trim() || !userData.username.trim() || !userData.email.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    if (!userData.acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('User data:', userData);
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Welcome to SonicAura!",
        variant: "default"
      });
      
      // Navigate to home page or login
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-muted/80 dark:from-background/90 dark:to-background/70 overflow-hidden">
      <CreateAccountBackground />
      <MainNav />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 sonic-gradient-text">Create Account</h1>
            <p className="text-muted-foreground">Join the SonicAura community today</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-8 rounded-xl shadow-lg backdrop-blur-sm bg-background/70"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={userData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                  <Input 
                    id="username"
                    name="username"
                    placeholder="Choose a username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-background/50 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="acceptTerms" 
                    checked={userData.acceptTerms}
                    onCheckedChange={(checked) => handleSwitchChange('acceptTerms', checked)}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-sonic-blue hover:bg-sonic-blue/90 text-white btn-bounce mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-sonic-blue"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateAccountPage;
