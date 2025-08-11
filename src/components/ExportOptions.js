// components/ExportOptions.js
// ===========================================
'use client';
import { FaDownload, FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ExportOptions({ proposal, onExport }) {
  const exportToPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('Upwork Proposal', 20, 30);
      
      // Add content
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(proposal, 170);
      doc.text(splitText, 20, 50);
      
      // Add footer
      doc.setFontSize(10);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, doc.internal.pageSize.height - 20);
      
      doc.save('upwork-proposal.pdf');
      onExport?.('pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const exportToTXT = () => {
    const element = document.createElement('a');
    const file = new Blob([proposal], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'upwork-proposal.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onExport?.('txt');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(proposal);
      onExport?.('clipboard');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-3 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.button
        onClick={exportToPDF}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaFilePdf /> Export PDF
      </motion.button>
      
      <motion.button
        onClick={exportToTXT}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        <FaFileAlt /> Export TXT
      </motion.button>
      
      <motion.button
        onClick={copyToClipboard}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        <FaDownload /> Copy Text
      </motion.button>
    </motion.div>
  );
}
