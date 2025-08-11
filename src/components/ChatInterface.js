// components/ChatInterface.js
// ===========================================
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPaperPlane, FaRobot, FaUser, FaHome, FaCopy, FaCheck, FaCog, 
  FaChartBar, FaCheckCircle, FaCircle, FaSpinner 
} from 'react-icons/fa';
import { 
  MessageSquare, User, Briefcase, Star, Sparkles, Send, 
  CheckCircle, Circle, ArrowRight, Brain, Zap
} from 'lucide-react';
import Link from 'next/link';
import { saveProposal } from '@/utils/localStorage';
import ExportOptions from './ExportOptions';
import ProposalAnalysis from './ProposalAnalysis';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome! I'm your AI proposal assistant. Let's create a winning Upwork proposal together. First, tell me about your profession.",
      isComplete: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState('llama-3.1-70b-versatile');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [userInfo, setUserInfo] = useState({
    profession: '',
    jobDescription: '',
    experience: '',
    personalTouch: ''
  });
  const [copiedText, setCopiedText] = useState('');
  const [lastProposal, setLastProposal] = useState('');
  const messagesEndRef = useRef(null);

  const aiModels = [
    { id: 'llama3-8b-8192', name: 'Llama 3 8B', desc: 'Fast and lightweight' },
    { id: 'llama3-70b-8192', name: 'Llama 3 70B', desc: 'High-capacity model' },
    { id: 'gemma-7b-it', name: 'Gemma 7B', desc: 'Google open-source' },
    { id: 'gemma2-9b-it', name: 'Gemma 2 9B', desc: 'Improved Gemma' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', desc: 'Mixture-of-experts' },
    { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B', desc: 'Most versatile' },
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', desc: 'Latest model' }
  ];

  const steps = [
    { 
      id: 1, 
      field: 'profession', 
      title: 'Profession',
      question: "What's your profession? (e.g., Web Developer, Graphic Designer, Content Writer)",
      icon: User,
      color: 'from-blue-500 to-purple-600'
    },
    { 
      id: 2, 
      field: 'jobDescription', 
      title: 'Job Details',
      question: "Please paste the job description or project details you want to apply for:",
      icon: Briefcase,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 3, 
      field: 'experience', 
      title: 'Experience',
      question: "Share your relevant experience, skills, and portfolio links:",
      icon: Star,
      color: 'from-pink-500 to-orange-600'
    },
    { 
      id: 4, 
      field: 'personalTouch', 
      title: 'Personal Touch',
      question: "Add any personal story, unique approach, or special value you bring:",
      icon: Sparkles,
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  // Simulate streaming effect
  const simulateStreaming = (text, callback) => {
    setIsStreaming(true);
    setStreamingText('');
    let index = 0;
    const words = text.split(' ');
    
    const interval = setInterval(() => {
      if (index < words.length) {
        setStreamingText(prev => prev + (prev ? ' ' : '') + words[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        callback(text);
        setStreamingText('');
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, isComplete: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Update user info
    if (currentStep <= 4) {
      const currentField = steps[currentStep - 1]?.field;
      if (currentField) {
        setUserInfo(prev => ({ ...prev, [currentField]: input }));
      }
    }

    try {
      if (currentStep < 4) {
        // Move to next step
        const nextStep = currentStep + 1;
        const nextStepInfo = steps[nextStep - 1];
        
        setTimeout(() => {
          setCurrentStep(nextStep);
          simulateStreaming(nextStepInfo.question, (text) => {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: text,
              isComplete: true
            }]);
            setIsLoading(false);
          });
        }, 1000);
      } else {
        // Generate proposal
        const updatedUserInfo = { ...userInfo, personalTouch: input };
        
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userInfo: updatedUserInfo,
            aiModel: selectedModel
          })
        });

        const data = await response.json();
        let proposal = data.proposal || "I apologize, but I couldn't generate a proposal at the moment. Please try again.";
        
        // Format proposal with markdown
        proposal = formatProposal(proposal);
        
        simulateStreaming(proposal, (text) => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: text,
            isComplete: true,
            isProposal: true
          }]);
          setLastProposal(text);
          setCurrentStep(5);
          setIsLoading(false);

          // Save to localStorage
          if (text !== "I apologize, but I couldn't generate a proposal at the moment. Please try again.") {
            saveProposal({
              content: text,
              jobDescription: updatedUserInfo.jobDescription,
              profession: updatedUserInfo.profession,
              aiModel: selectedModel
            });
          }
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        isComplete: true
      }]);
      setIsLoading(false);
    }
  };

  const formatProposal = (text) => {
    // Add markdown formatting for better presentation
    return text
      .replace(/^(.+)$/gm, (match, line) => {
        // Make first line a header if it's a greeting
        if (line.includes('Hi') || line.includes('Hello')) {
          return `## ${line}`;
        }
        return line;
      })
      .replace(/(\d+\.\s)/g, '\n$1') // Add line breaks before numbered lists
      .replace(/([•-]\s)/g, '\n$1'); // Add line breaks before bullet points
  };

  const copyToClipboard = (text) => {
    // Strip markdown for clipboard
    const plainText = text.replace(/[#*_`]/g, '');
    navigator.clipboard.writeText(plainText);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep - 1) return 'completed';
    if (stepIndex === currentStep - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Enhanced Header with Progress */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white">ProposalAI</h1>
                  <p className="text-white/60 text-sm">AI Proposal Generator</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* AI Model Selector */}
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-white/10 backdrop-blur-lg text-white border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/40"
                >
                  {aiModels.map(model => (
                    <option key={model.id} value={model.id} className="bg-gray-900 text-white">
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <Link href="/history">
                <motion.button 
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all backdrop-blur-lg border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  History
                </motion.button>
              </Link>

              <Link href="/">
                <motion.button 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all backdrop-blur-lg border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaHome className="w-4 h-4" /> Home
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Progress Steps */}
          {currentStep <= 4 && (
            <motion.div 
              className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Proposal Setup Progress</h3>
                <span className="text-white/60 text-sm">
                  Step {currentStep} of {steps.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">Progress</span>
                  <span className="text-white/70 text-sm">
                    {Math.round((currentStep / steps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const status = getStepStatus(index);
                  const StepIcon = step.icon;
                  
                  return (
                    <motion.div 
                      key={step.id}
                      className="flex flex-col items-center relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-6 left-8 w-full h-0.5 bg-white/10">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: status === 'completed' ? '100%' : '0%' 
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        </div>
                      )}

                      {/* Step Circle */}
                      <motion.div 
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          status === 'completed' 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-400 text-black' 
                            : status === 'current'
                            ? 'bg-white/10 border-white text-white'
                            : 'bg-white/5 border-white/20 text-white/40'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={status === 'current' ? { 
                          boxShadow: [
                            "0 0 0 0 rgba(255, 255, 255, 0.4)",
                            "0 0 0 10px rgba(255, 255, 255, 0)",
                            "0 0 0 0 rgba(255, 255, 255, 0)"
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </motion.div>

                      {/* Step Info */}
                      <div className="mt-3 text-center min-w-[80px]">
                        <h4 className={`text-sm font-medium ${
                          status === 'completed' || status === 'current' 
                            ? 'text-white' 
                            : 'text-white/40'
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 min-h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className={`max-w-[85%] ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl rounded-br-lg' 
                      : 'bg-white/90 text-gray-800 rounded-3xl rounded-bl-lg shadow-xl'
                  } p-6 relative overflow-hidden`}>
                    
                    {/* Message Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        message.role === 'user' 
                          ? 'bg-white/20' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className={`font-medium text-sm ${
                        message.role === 'user' ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>

                    {/* Message Content */}
                    {/* Message Content */}
<div className="prose prose-sm max-w-none">
  {message.isProposal ? (
    <ReactMarkdown
      components={{
        h1: (props) => <h1 {...props} className="text-xl font-bold mb-3 text-gray-900" />,
        h2: (props) => <h2 {...props} className="text-lg font-semibold mb-2 text-gray-900" />,
        p: (props) => <p {...props} className="mb-3 leading-relaxed text-gray-800" />,
        ul: (props) => <ul {...props} className="list-disc list-inside mb-3 space-y-1" />,
        li: (props) => <li {...props} className="text-gray-800" />,
        strong: (props) => <strong {...props} className="font-semibold text-gray-900" />,
        em: (props) => <em {...props} className="italic text-gray-700" />,
      }}
    >
      {message.content}
    </ReactMarkdown>
  ) : (
    <p
      className={`leading-relaxed ${
        message.role === "user" ? "text-white" : "text-gray-800"
      }`}
    >
      {message.content}
    </p>
  )}
</div>


                    {/* Action Buttons for Proposals */}
                    {message.role === 'assistant' && message.isProposal && (
                      <motion.div 
                        className="mt-4 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          onClick={() => copyToClipboard(message.content)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                            copiedText === message.content 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copiedText === message.content ? <FaCheck /> : <FaCopy />}
                          {copiedText === message.content ? 'Copied!' : 'Copy'}
                        </motion.button>

                        <motion.button
                          onClick={() => setShowAnalysis(!showAnalysis)}
                          className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaChartBar />
                          {showAnalysis ? 'Hide Analysis' : 'Analyze'}
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Decorative Elements for AI Messages */}
                    {message.role === 'assistant' && (
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Streaming Message */}
            {isStreaming && streamingText && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="max-w-[85%] bg-white/90 text-gray-800 rounded-3xl rounded-bl-lg shadow-xl p-6 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm text-gray-600">AI Assistant</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FaSpinner className="w-3 h-3 text-purple-500" />
                    </motion.div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
  <ReactMarkdown
    components={{
      h1: (props) => <h1 {...props} className="text-xl font-bold mb-3 text-gray-900" />,
      h2: (props) => <h2 {...props} className="text-lg font-semibold mb-2 text-gray-900" />,
      p: (props) => <p {...props} className="mb-3 leading-relaxed text-gray-800" />,
      ul: (props) => <ul {...props} className="list-disc list-inside mb-3 space-y-1" />,
      li: (props) => <li {...props} className="text-gray-800" />,
      strong: (props) => <strong {...props} className="font-semibold text-gray-900" />,
    }}
  >
    {streamingText}
  </ReactMarkdown>

  <motion.span
    className="inline-block w-2 h-5 bg-purple-500 ml-1"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity }}
  />
</div>

                </div>
              </motion.div>
            )}

            {/* Loading Indicator */}
            {isLoading && !isStreaming && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white/90 text-gray-800 rounded-3xl rounded-bl-lg shadow-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">AI is thinking</span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    currentStep <= 4 
                      ? `${steps[currentStep - 1]?.title} - Type your answer...` 
                      : "Ask me anything else about your proposal..."
                  }
                  className="w-full p-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-lg text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all resize-none min-h-[60px] max-h-32"
                  disabled={isLoading || isStreaming}
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute right-3 top-3 text-white/40 text-sm">
                  ⌘ + Enter
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading || isStreaming || !input.trim()}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Input Helper */}
            <div className="mt-2 text-white/60 text-sm text-center">
              {currentStep <= 4 && (
                <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}</span>
              )}
            </div>
          </motion.form>
        </div>
      </div>

      {/* Export Options */}
      {lastProposal && currentStep === 5 && (
        <div className="max-w-4xl mx-auto px-6 pb-6">
          <ExportOptions proposal={lastProposal} />
        </div>
      )}

      {/* Analysis Panel */}
      {showAnalysis && lastProposal && (
        <div className="max-w-4xl mx-auto px-6 pb-6">
          <ProposalAnalysis proposal={lastProposal} />
        </div>
      )}
    </div>
  );
}