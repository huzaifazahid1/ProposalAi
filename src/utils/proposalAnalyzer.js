// utils/proposalAnalyzer.js
// ===========================================
// utils/proposalAnalyzer.js
// utils/proposalAnalyzer.js
export async function analyzeProposal(proposal) {
  // Call our backend API for sentiment
  const sentimentRes = await fetch("/api/sentiment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: proposal }),
  });
  const { sentiment } = await sentimentRes.json();

  return {
    wordCount: proposal.split(" ").length,
    characterCount: proposal.length,
    paragraphCount: proposal.split("\n").filter((p) => p.trim()).length,
    readingTime: Math.ceil(proposal.split(" ").length / 200),
    sentiment,
    keywordDensity: calculateKeywordDensity(proposal),
    readabilityScore: calculateReadabilityScore(proposal),
    suggestions: generateSuggestions(proposal),
  };
}



const calculateKeywordDensity = (text) => {
  const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
  const wordCount = {};
  
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / words.length) * 100).toFixed(2)
    }));
};

const calculateReadabilityScore = (text) => {
  if (!text || typeof text !== "string") {
    return { score: 'N/A', color: 'gray', avgWordsPerSentence: 0 };
  }

  // Split sentences more accurately
  const sentences = text
    .split(/(?<=[.?!])\s+/) // match sentence-ending punctuation
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Count words
  const words = text
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);

  const sentenceCount = sentences.length || 1; // avoid division by zero
  const wordCount = words.length;
  const avgWordsPerSentence = Math.round((wordCount / sentenceCount) * 10) / 10; // 1 decimal

  // Scoring thresholds (tweakable)
  let score, color;
  if (avgWordsPerSentence <= 15) {
    score = 'Easy';
    color = 'green';
  } else if (avgWordsPerSentence <= 20) {
    score = 'Moderate';
    color = 'yellow';
  } else if (avgWordsPerSentence <= 30) {
    score = 'Hard';
    color = 'red';
  } else {
    score = 'Very Hard';
    color = 'darkred';
  }

  return { score, color, avgWordsPerSentence };
};

const generateSuggestions = (proposal) => {
  const suggestions = [];
  const wordCount = proposal.split(' ').length;
  
  if (wordCount < 100) {
    suggestions.push({ type: 'warning', text: 'Proposal might be too short. Consider adding more details.' });
  }
  if (wordCount > 250) {
    suggestions.push({ type: 'warning', text: 'Proposal might be too long. Consider making it more concise.' });
  }
  if (!proposal.includes('?')) {
    suggestions.push({ type: 'info', text: 'Consider asking a question to engage the client.' });
  }
  if (proposal.split('\n').filter(p => p.trim()).length < 3) {
    suggestions.push({ type: 'info', text: 'Break your proposal into shorter paragraphs for better readability.' });
  }
  
  return suggestions;
};
