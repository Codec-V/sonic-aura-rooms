import React from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { Users, Zap, Globe, Shield, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Background animation component similar to HomePage but simplified
const AboutBackground = () => {
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

const AboutPage = () => {
  const navigate = useNavigate();
  
  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/team/alex.jpg", // Replace with actual image paths
      bio: "Alex founded SonicAura with a vision to create meaningful audio connections in a digital world."
    },
    {
      name: "Maya Rodriguez",
      role: "Chief Product Officer",
      image: "/team/maya.jpg",
      bio: "Maya leads product development, ensuring SonicAura delivers an exceptional user experience."
    },
    {
      name: "David Chen",
      role: "CTO",
      image: "/team/david.jpg",
      bio: "David oversees our technical infrastructure, making sure SonicAura runs smoothly and securely."
    },
    {
      name: "Sarah Williams",
      role: "Head of Community",
      image: "/team/sarah.jpg",
      bio: "Sarah builds and nurtures our vibrant community of creators and listeners."
    },
    {
      name: "James Taylor",
      role: "Lead Designer",
      image: "/team/james.jpg",
      bio: "James crafts the visual and interactive elements that make SonicAura beautiful and intuitive."
    },
    {
      name: "Olivia Martinez",
      role: "Marketing Director",
      image: "/team/olivia.jpg",
      bio: "Olivia spreads the word about SonicAura, helping us reach new audiences worldwide."
    }
  ];
  
  // Values data
  const values = [
    {
      icon: <Users className="h-8 w-8 text-sonic-blue" />,
      title: "Community First",
      description: "We believe in the power of human connection and build everything with our community in mind."
    },
    {
      icon: <Zap className="h-8 w-8 text-sonic-coral" />,
      title: "Innovation",
      description: "We're constantly exploring new ways to improve audio experiences and conversations."
    },
    {
      icon: <Globe className="h-8 w-8 text-sonic-mint" />,
      title: "Inclusivity",
      description: "We're committed to creating a platform where everyone feels welcome and represented."
    },
    {
      icon: <Shield className="h-8 w-8 text-sonic-blue" />,
      title: "Trust & Safety",
      description: "We prioritize creating a secure environment where users can express themselves freely."
    },
    {
      icon: <Heart className="h-8 w-8 text-sonic-coral" />,
      title: "Passion",
      description: "We're passionate about audio and its unique ability to create intimate, meaningful connections."
    },
    {
      icon: <Award className="h-8 w-8 text-sonic-mint" />,
      title: "Quality",
      description: "We strive for excellence in everything we do, from code to customer support."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-muted/80 dark:from-background/90 dark:to-background/70">
      <AboutBackground />
      <MainNav />
      
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
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
            About SonicAura
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Connecting the world through the power of voice.
          </motion.p>
        </motion.section>
        
        {/* Our Story Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      SonicAura began in 2023 with a simple idea: to create a space where people could connect through the intimacy and authenticity of voice.
                    </p>
                    <p>
                      In a world dominated by visual content and text-based communication, we saw an opportunity to build something different—a platform that celebrates the unique power of audio to create meaningful connections.
                    </p>
                    <p>
                      What started as a small project among friends has grown into a global community of creators, thinkers, and listeners who come together daily to share ideas, stories, and conversations.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden aspect-square bg-muted">
                  <img 
                    src="https://placehold.co/600x600/2563eb/ffffff?text=Our+Story" 
                    alt="Company story" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Our Values Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at SonicAura.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
                
        {/* Stats Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto glass-card p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold mb-2 sonic-gradient-text">2M+</h3>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 sonic-gradient-text">10K+</h3>
                <p className="text-muted-foreground">Daily Rooms</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 sonic-gradient-text">150+</h3>
                <p className="text-muted-foreground">Countries</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2 sonic-gradient-text">5M+</h3>
                <p className="text-muted-foreground">Hours of Conversation</p>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Join Us Section */}
        <motion.section 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground mb-6">
              We're just getting started, and we'd love for you to be part of our story. Join SonicAura today and experience the power of voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-sonic-blue hover:bg-sonic-blue/90 text-white btn-bounce"
                onClick={() => navigate('/')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-sonic-blue text-sonic-blue hover:bg-sonic-blue/10"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.section>
        
        {/* Careers Teaser */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-xl bg-gradient-to-r from-sonic-blue/10 to-sonic-mint/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                  <p className="text-muted-foreground mb-6">
                    We're always looking for talented individuals who are passionate about audio, community, and technology. Check out our open positions and become part of the SonicAura family.
                  </p>
                  <Button 
                    className="bg-sonic-blue hover:bg-sonic-blue/90 text-white mx-auto"
                    onClick={() => navigate('/careers')}
                  >
                    View Open Positions
                  </Button>
                </div>
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index}
                    className="glass-card rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <div className="aspect-square bg-muted">
                      <img 
                        src={`https://placehold.co/400x400/2563eb/ffffff?text=${member.name.replace(' ', '+')}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-sonic-blue mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/')}>Home</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/explore')}>Explore Rooms</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/create')}>Create Room</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/community')}>Community</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/help')}>Help Center</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/guidelines')}>Community Guidelines</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/blog')}>Blog</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/careers')}>Careers</Button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/cookies')}>Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/accessibility')}>Accessibility</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} SonicAura. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/privacy')}>Privacy</Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/terms')}>Terms</Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-sonic-blue" onClick={() => navigate('/cookies')}>Cookies</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;