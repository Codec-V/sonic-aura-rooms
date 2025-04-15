import React, { useState } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Background animation component similar to HomePage but simplified
const HelpBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sonic-mint/30 rounded-full filter blur-[100px] opacity-60 animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sonic-blue/30 rounded-full filter blur-[120px] opacity-50 animate-float-slow-reverse" />
      
      {/* Decorative elements */}
      <div className="absolute top-[25%] right-[10%] w-24 h-24 border-4 border-sonic-mint/20 rounded-lg rotate-12 animate-spin-slow" />
      <div className="absolute bottom-[30%] left-[15%] w-32 h-32 border-4 border-sonic-blue/20 rounded-full animate-float-medium" />
    </div>
  );
};

const HelpPage = () => {
  // FAQ categories
  const categories = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'rooms', name: 'Rooms & Audio' },
    { id: 'features', name: 'Features & Tools' },
    { id: 'troubleshooting', name: 'Troubleshooting' },
    { id: 'billing', name: 'Billing & Subscription' },
  ];
  
  // FAQ data
  const faqs = [
    {
      category: 'getting-started',
      questions: [
        {
          question: "What is SonicAura?",
          answer: "SonicAura is a platform for live audio conversations. You can join existing rooms to listen or participate in discussions, or create your own rooms to host conversations on topics you're passionate about."
        },
        {
          question: "How do I get started?",
          answer: "To get started, create an account, explore the available rooms, and join one that interests you. You can also create your own room and invite others to join your conversation."
        },
        {
          question: "Is SonicAura free to use?",
          answer: "Yes, SonicAura offers a free tier with access to most features. We also offer premium subscriptions with additional features for power users and content creators."
        }
      ]
    },
    {
      category: 'account',
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Create Account' button in the top navigation bar, fill in your details, and follow the verification steps to complete your registration."
        },
        {
          question: "Can I change my username?",
          answer: "Yes, you can change your username once every 30 days from your profile settings page."
        },
        {
          question: "How do I reset my password?",
          answer: "On the login page, click 'Forgot Password' and follow the instructions sent to your registered email address."
        }
      ]
    },
    {
      category: 'rooms',
      questions: [
        {
          question: "How do I create a room?",
          answer: "Click the '+' icon in the navigation bar and follow the prompts to set up your room, including title, description, and privacy settings."
        },
        {
          question: "Can I schedule a room for later?",
          answer: "Yes, when creating a room, you can set a future date and time for it to start. Scheduled rooms appear in the 'Upcoming' section."
        },
        {
          question: "How many people can join a room?",
          answer: "Standard rooms can host up to 100 participants. Premium users can create rooms with up to 500 participants."
        }
      ]
    },
    {
      category: 'features',
      questions: [
        {
          question: "Can I record conversations?",
          answer: "Room hosts can record conversations with the consent of all participants. Recordings are available for 14 days after the room ends."
        },
        {
          question: "Is there a way to share my room with others?",
          answer: "Yes, each room has a unique link that you can share via social media, messaging apps, or email."
        },
        {
          question: "Can I use background music in my room?",
          answer: "Premium users can access our licensed music library to play background music during their conversations."
        }
      ]
    },
    {
      category: 'troubleshooting',
      questions: [
        {
          question: "Why can't I hear other participants?",
          answer: "Check your device's audio settings, ensure you've granted microphone permissions to SonicAura, and try refreshing the page or restarting the app."
        },
        {
          question: "Others can't hear me when I speak",
          answer: "Make sure your microphone is not muted, check if you have the correct microphone selected in your device settings, and ensure you've been given speaking permissions by the room host."
        },
        {
          question: "The app is lagging or crashing",
          answer: "Try clearing your browser cache, updating your browser to the latest version, or using our desktop app for optimal performance."
        }
      ]
    },
    {
      category: 'billing',
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and select regional payment methods."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "Go to your Account Settings, select 'Subscription', and click 'Cancel Subscription'. Your premium features will remain active until the end of your current billing period."
        },
        {
          question: "Is there a refund policy?",
          answer: "We offer a 7-day refund for new premium subscriptions if you're not satisfied with the service. Contact our support team to request a refund."
        }
      ]
    }
  ];
  
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqs.filter(category => category.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-muted/80 dark:from-background/90 dark:to-background/70">
      <HelpBackground />
      <MainNav />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
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
            Help Center
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Find answers to common questions and learn how to get the most out of SonicAura.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 bg-background/50 border-slate-200 dark:border-slate-700 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </motion.section>
        
        {/* FAQ Categories */}
        {!searchQuery && (
          <motion.section 
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={activeCategory === category.id 
                    ? "bg-sonic-blue hover:bg-sonic-blue/90 text-white" 
                    : "hover:bg-sonic-blue/10 hover:text-sonic-blue"
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.section>
        )}
        
        {/* FAQ Accordion */}
        <motion.section 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={category.category} className="mb-8">
              {searchQuery && (
                <h2 className="text-xl font-bold mb-4">{categories.find(c => c.id === category.category)?.name}</h2>
              )}
              
              <div className="glass-card rounded-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4 text-sonic-blue">
                <HelpCircle className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any FAQs matching your search. Try different keywords or browse by category.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10"
              >
                Clear Search
              </Button>
            </div>
          )}
        </motion.section>
        
        {/* Contact Support Section */}
        <motion.section 
          className="text-center py-12 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is ready to assist you with any questions or issues you may have.
            </p>
            <Button 
              size="lg" 
              className="bg-sonic-blue hover:bg-sonic-blue/90 text-white btn-bounce"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Support
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

export default HelpPage;