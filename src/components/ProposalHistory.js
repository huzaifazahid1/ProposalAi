// ===========================================
// components/ProposalHistory.js
// ===========================================
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCopy, FaEye, FaDownload, FaCalendar, FaRobot, FaSearch } from 'react-icons/fa';
import { getProposals, deleteProposal } from '@/utils/localStorage';
import { format } from 'date-fns';
import ExportOptions from './ExportOptions';

export default function ProposalHistory() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModel, setFilterModel] = useState('all');

  useEffect(() => {
    setProposals(getProposals());
  }, []);

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModel = filterModel === 'all' || proposal.aiModel === filterModel;
    return matchesSearch && matchesModel;
  });

  const handleDelete = (id) => {
    deleteProposal(id);
    setProposals(getProposals());
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const uniqueModels = [...new Set(proposals.map(p => p.aiModel))];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Proposal History
        </motion.h1>

        {/* Search and Filter */}
        <motion.div 
          className="glass-morphism p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:border-white/50"
              />
            </div>
            <select
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded-lg px-4 py-3 min-w-[200px]"
            >
              <option value="all" className="bg-gray-800">All Models</option>
              {uniqueModels.map(model => (
                <option key={model} value={model} className="bg-gray-800">{model}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Proposals Grid */}
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredProposals.map((proposal, index) => (
              <motion.div
                key={proposal.id}
                className="proposal-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{proposal.profession}</h3>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <span className="flex items-center gap-1">
                        <FaCalendar />
                        {format(new Date(proposal.createdAt), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaRobot />
                        {proposal.aiModel}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProposal(selectedProposal === proposal.id ? null : proposal.id)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => copyToClipboard(proposal.content)}
                      className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => handleDelete(proposal.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Analytics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{proposal.analytics.wordCount}</div>
                    <div className="text-white/60 text-sm">Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{proposal.analytics.readingTime}</div>
                    <div className="text-white/60 text-sm">Min Read</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      proposal.analytics.sentiment === 'positive' ? 'text-green-400' : 
                      proposal.analytics.sentiment === 'negative' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {proposal.analytics.sentiment}
                    </div>
                    <div className="text-white/60 text-sm">Sentiment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">A+</div>
                    <div className="text-white/60 text-sm">Grade</div>
                  </div>
                </div>

                {/* Content Preview */}
                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {proposal.content.substring(0, 200)}...
                </p>

                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedProposal === proposal.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/20 pt-4 mt-4"
                    >
                      <div className="bg-white/10 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-white mb-2">Full Proposal:</h4>
                        <p className="text-white/90 whitespace-pre-wrap">{proposal.content}</p>
                      </div>
                      <ExportOptions proposal={proposal.content} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center text-white/60 mt-12">
            <p className="text-xl">No proposals found</p>
            <p>Start creating proposals to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
