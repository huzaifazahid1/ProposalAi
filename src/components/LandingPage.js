// components/LandingPage.js
// ===========================================
'use client';
import { motion } from 'framer-motion';
import { 
  FaRocket, FaStar, FaUsers, FaArrowRight, FaHistory, FaFileAlt, 
  FaDownload, FaChartBar, FaRobot, FaMagic, FaCheckCircle, 
  FaLightbulb, FaClock, FaGithub, FaLinkedin, FaTwitter, FaEnvelope 
} from 'react-icons/fa';
import { 
  Sparkles, Zap, Target, Brain, TrendingUp, Shield,
  Award, Users, Clock, BarChart3, FileText, Cpu
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <motion.header 
        className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ProposalAI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/templates" className="text-white/80 hover:text-white transition-colors">Templates</Link>
              <Link href="/history" className="text-white/80 hover:text-white transition-colors">History</Link>
              <Link href="/chat" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
                animate={floatingAnimation}
              />
              <motion.div 
                className="absolute top-40 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
                animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
              />
              <motion.div 
                className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
              />
            </div>

            <motion.div variants={itemVariants} className="relative z-10">
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-white/90 text-sm font-medium">AI-Powered Proposal Generation</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 1, delay: 0.2 }}
              >
                Win More
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Upwork Jobs
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto"
                variants={itemVariants}
              >
                Create winning proposals with advanced AI, get detailed analytics, 
                use professional templates, and export in multiple formats. 
                <br />
                <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  Your success starts here.
                </span>
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                variants={itemVariants}
              >
                <Link href="/chat">
                  <motion.button
                    className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-2xl text-xl shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-3">
                      <Zap className="w-6 h-6" />
                      Start Creating Now
                      <motion.div
                        className="group-hover:translate-x-1 transition-transform"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaArrowRight />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>

                <Link href="/templates">
                  <motion.button
                    className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl text-xl hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      Browse Templates
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { 
                icon: Cpu, 
                title: "Multiple AI Models", 
                desc: "Choose from Llama, Gemma, and Mixtral models for optimal results",
                color: "from-blue-500 to-purple-600",
                link: "/chat" 
              },
              { 
                icon: Clock, 
                title: "Proposal History", 
                desc: "Save, organize, and manage all your proposals with smart search",
                color: "from-green-500 to-teal-600", 
                link: "/history" 
              },
              { 
                icon: FileText, 
                title: "Smart Templates", 
                desc: "Industry-specific templates for developers, designers, and more",
                color: "from-orange-500 to-red-600", 
                link: "/templates" 
              },
              { 
                icon: BarChart3, 
                title: "AI Analytics", 
                desc: "Get detailed insights, keyword analysis, and improvement suggestions",
                color: "from-purple-500 to-pink-600", 
                link: "/chat" 
              }
            ].map((feature, index) => (
              <Link key={index} href={feature.link}>
                <motion.div
                  className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center cursor-pointer overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon Container */}
                  <motion.div 
                    className={`relative mx-auto mb-6 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Hover Effect Arrow */}
                  <motion.div 
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <FaArrowRight className="text-white/70" />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mb-20"
            variants={itemVariants}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
              <p className="text-white/70 text-lg">Join the community of successful freelancers</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Proposals Generated", icon: FileText },
                { number: "95%", label: "Success Rate", icon: Target },
                { number: "15K+", label: "Happy Users", icon: Users },
                { number: "12", label: "AI Models", icon: Cpu }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-black" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-white/10 rounded-3xl p-12"
            variants={itemVariants}
          >
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Win More Projects?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers who are already using ProposalAI to land more clients and grow their business.
            </p>
            <Link href="/chat">
              <motion.button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-12 rounded-2xl text-xl shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Success Story
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modern Footer */}
      <motion.footer 
        className="border-t border-white/10 bg-black/20 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">ProposalAI</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                Empowering freelancers with AI-driven proposal generation, analytics, and professional templates to win more projects.
              </p>
              <div className="flex space-x-4">
                {[FaTwitter, FaLinkedin, FaGithub, FaEnvelope].map((Icon, index) => (
                  <motion.div 
                    key={index}
                    className="p-3 bg-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-3">
                {['Templates', 'History', 'Analytics', 'Export'].map((link, index) => (
                  <div key={index} className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    {link}
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-3">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((link, index) => (
                  <div key={index} className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 ProposalAI. All rights reserved. Made with ❤️ for freelancers worldwide.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}