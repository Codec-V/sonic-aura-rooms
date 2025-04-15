import React, { useState } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Background animation component similar to HomePage but simplified
const ContactBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sonic-coral/30 rounded-full filter blur-[100px] opacity-60 animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sonic-blue/30 rounded-full filter blur-[120px] opacity-50 animate-float-slow-reverse" />
      
      {/* Decorative elements */}
      <div className="absolute top-[25%] right-[10%] w-24 h-24 border-4 border-sonic-coral/20 rounded-lg rotate-12 animate-spin-slow" />
      <div className="absolute bottom-[30%] left-[15%] w-32 h-32 border-4 border-sonic-blue/20 rounded-full animate-float-medium" />
    </div>
  );
};

const ContactPage = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value) => {
    setFormState(prev => ({ ...prev, category: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };
  
  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-sonic-blue" />,
      title: "Email Us",
      details: "support@sonicaura.com",
      description: "For general inquiries and support"
    },
    {
      icon: <Phone className="h-6 w-6 text-sonic-coral" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 5pm EST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-sonic-mint" />,
      title: "Visit Us",
      details: "123 Audio Lane, Suite 456",
      description: "San Francisco, CA 94103"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-muted/80 dark:from-background/90 dark:to-background/70">
      <ContactBackground />
      <MainNav />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 sonic-gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Have questions or feedback? We'd love to hear from you.
          </motion.p>
        </motion.section>
        
        {/* Contact Info Cards */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="font-medium text-sonic-blue mb-1">{item.details}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Contact Form Section */}
        <motion.section 
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-16 w-16 text-sonic-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                      category: ''
                    });
                  }}
                  className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={formState.category}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    required
                    className="min-h-[150px] bg-background/50"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-sonic-blue hover:bg-sonic-blue/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.section>
        
        {/* Map Section */}
        <motion.section 
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card p-4 rounded-xl overflow-hidden">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              {/* Replace with actual map component or embed if available */}
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map will be displayed here</p>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* FAQ Teaser */}
        <motion.section 
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">
              Find quick answers to common questions in our help center.
            </p>
            <Button 
              variant="outline" 
              className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10"
              onClick={() => window.location.href = '/help'}
            >
              Visit Help Center
            </Button>
          </div>
        </motion.section>
      </main>
      
      {/* Footer - Same as HomePage */}
      <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sonic-blue to-sonic-coral flex items-center justify-center mr-2">
                  <span className="text-white font-bold">SA</span>
                </div>
                <span className="font-bold text-xl sonic-gradient-text">SonicAura</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect through voice. Join live audio conversations and discover interesting discussions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sonic-blue/10 hover:text-sonic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sonic-blue/10 hover:text-sonic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-sonic-blue/10 hover:text-sonic-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Home</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Explore Rooms</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Create Room</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Community</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Help Center</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Community Guidelines</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Blog</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Careers</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Accessibility</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} SonicAura. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Privacy</Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Terms</Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue">Cookies</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;