// ===========================================
// components/ProposalAnalysis.js
// ===========================================
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeProposal } from '@/utils/proposalAnalyzer';
import { FaChartBar, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

/**
 * A component to display a detailed analysis of a given proposal.
 * It uses the 'analyzeProposal' utility function to calculate metrics
 * like word count, readability, keyword density, and suggestions.
 * * The styling is designed to seamlessly integrate with the existing
 * ChatInterface component's dark, gradient-based theme.
 * * @param {object} props - The component's props.
 * @param {string} props.proposal - The text of the proposal to analyze.
 */
export default function ProposalAnalysis({ proposal }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

// Use useEffect to run the analysis whenever the proposal text changes.
useEffect(() => {
  if (proposal) {
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const result = await analyzeProposal(proposal);
        setAnalysis(result);
      } catch (error) {
        console.error("Failed to analyze proposal:", error);
        setAnalysis(null);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }
}, [proposal]);



  // If there's no analysis or it's loading, show a placeholder.
  if (isLoading || !analysis) {
    return (
      <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl text-white">
        <div className="flex items-center justify-center py-12">
          <FaChartBar className="w-10 h-10 animate-pulse text-purple-400" />
          <span className="ml-4 text-xl font-medium">Analyzing your proposal...</span>
        </div>
      </div>
    );
  }

  // Helper function to get readability color class
  const getReadabilityColor = (score) => {
    switch (score) {
      case 'Easy': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <motion.div
      className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
          <FaChartBar className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Proposal Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Card: Word Count */}
        <MetricCard title="Word Count" value={analysis.wordCount} icon={FaCheckCircle} />
        {/* Metric Card: Reading Time */}
        <MetricCard title="Reading Time" value={`${analysis.readingTime} min`} icon={FaChartBar} />
        {/* Metric Card: Character Count */}
        <MetricCard title="Character Count" value={analysis.characterCount} icon={FaCheckCircle} />
        {/* Metric Card: Paragraphs */}
        <MetricCard title="Paragraphs" value={analysis.paragraphCount} icon={FaChartBar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Readability & Suggestions Section */}
        <div className="space-y-6">
          {/* Readability Score Card */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-green-400" /> Readability
            </h3>
            <p className="text-white/80">
              The proposal readability score is: 
              <span className={`ml-2 font-bold ${getReadabilityColor(analysis.readabilityScore.score)}`}>
                {analysis.readabilityScore.score}
              </span>
            </p>
            <p className="text-sm text-white/60 mt-2">
              Average words per sentence: ~{Math.round(analysis.wordCount / analysis.paragraphCount)}
            </p>
          </motion.div>

          {/* Suggestions List */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaInfoCircle className="text-blue-400" /> Suggestions
            </h3>
            <ul className="space-y-3">
              {analysis.suggestions.length > 0 ? (
                <AnimatePresence>
                  {analysis.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {suggestion.type === 'warning' ? (
                        <FaExclamationTriangle className="text-yellow-400 mt-1 flex-shrink-0" />
                      ) : (
                        <FaInfoCircle className="text-blue-400 mt-1 flex-shrink-0" />
                      )}
                      <span className="text-white/90 text-sm">{suggestion.text}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              ) : (
                <p className="text-white/60 text-sm">No major suggestions found. Great job!</p>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Keyword Density Section */}
        {/* Sentiment Analysis Section */}
<motion.div
  className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
>
  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
    <FaChartBar className={
      analysis.sentiment === "Positive"
        ? "text-green-400"
        : analysis.sentiment === "Negative"
        ? "text-red-400"
        : "text-yellow-400"
    } /> Sentiment
  </h3>
  <p className="text-white/80 text-lg font-bold">
    {analysis.sentiment}
  </p>
</motion.div>

      </div>
    </motion.div>
  );
}

// Reusable Metric Card Component
const MetricCard = ({ title, value, icon: Icon }) => (
  <motion.div 
    className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
    whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="flex items-center justify-center p-3 mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-sm text-white/60 mb-1">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </motion.div>
);
