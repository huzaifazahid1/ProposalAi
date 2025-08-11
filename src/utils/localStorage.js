// utils/localStorage.js
// ===========================================
export const saveProposal = (proposal) => {
  if (typeof window === 'undefined') return;
  
  const proposals = getProposals();
  const newProposal = {
    id: Date.now().toString(),
    content: proposal.content,
    jobDescription: proposal.jobDescription,
    profession: proposal.profession,
    aiModel: proposal.aiModel,
    createdAt: new Date().toISOString(),
    analytics: {
      wordCount: proposal.content.split(' ').length,
      readingTime: Math.ceil(proposal.content.split(' ').length / 200),
      sentiment: analyzeSentiment(proposal.content)
    }
  };
  
  proposals.unshift(newProposal);
  localStorage.setItem('upwork_proposals', JSON.stringify(proposals.slice(0, 50))); // Keep only 50 latest
  return newProposal;
};

export const getProposals = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const proposals = localStorage.getItem('upwork_proposals');
    return proposals ? JSON.parse(proposals) : [];
  } catch (error) {
    console.error('Error loading proposals:', error);
    return [];
  }
};

export const deleteProposal = (id) => {
  if (typeof window === 'undefined') return;
  
  const proposals = getProposals().filter(p => p.id !== id);
  localStorage.setItem('upwork_proposals', JSON.stringify(proposals));
};

export const analyzeSentiment = (text) => {
  const positiveWords = ['excellent', 'great', 'amazing', 'perfect', 'outstanding', 'professional', 'experienced', 'successful'];
  const negativeWords = ['problem', 'difficult', 'challenge', 'issue', 'struggle', 'hard'];
  
  const words = text.toLowerCase().split(' ');
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};
