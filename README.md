# Upwork Proposal Chatbot

A powerful Next.js 14+ app designed to help freelancers create, analyze, and manage winning Upwork proposals with AI assistance.

---

## 🚀 Installation and Setup Instructions

### 1. Create a new Next.js 14+ project:

```bash
npx create-next-app@latest upwork-proposal-chatbot --app
2. Install dependencies:
bash
Copy
Edit
npm install framer-motion react-icons groq-sdk jspdf html2canvas recharts date-fns
3. Replace the default app structure with the provided files.
4. Create a .env.local file and add your Groq API key:
env
Copy
Edit
GROQ_API_KEY=your_groq_api_key_here
5. Your file structure should look like this:
bash
Copy
Edit
/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   ├── chat/
│   │   ├── layout.js
│   │   └── page.js
│   ├── history/
│   │   └── page.js
│   ├── templates/
│   │   └── page.js
│   └── api/
│       ├── chat/
│       │   └── route.js
│       └── export/
│           └── route.js
├── components/
│   ├── LandingPage.js
│   ├── ChatInterface.js
│   ├── ProposalHistory.js
│   ├── ProposalTemplates.js
│   ├── ProposalAnalysis.js
│   └── ExportOptions.js
└── utils/
    ├── localStorage.js
    └── proposalAnalyzer.js
6. Run the development server:
bash
Copy
Edit
npm run dev
7. Access the application:
Landing page: http://localhost:3000

Chat interface: http://localhost:3000/chat

Proposal history: http://localhost:3000/history

Proposal templates: http://localhost:3000/templates

✨ Features Implemented
✅ Next.js 14+ App Router with page.js and layout.js

✅ Save proposal history in localStorage

✅ Detailed proposal analysis with metrics

✅ Export options: PDF, TXT, Copy to clipboard

✅ Proposal templates for multiple professions

✅ Multiple Groq AI models selection

✅ Search and filter proposals/templates

✅ Responsive design with smooth animations

✅ Analytics dashboard for each proposal

✅ Professional templates library

🆕 New Features Overview
1. Proposal History
Automatically save all generated proposals

Search and filter history by AI model

View detailed analytics per proposal

Delete and export proposals

2. Proposal Analysis
Word count and reading time metrics

Sentiment analysis powered by Groq AI

Keyword density and readability scoring

Suggestions for proposal improvement

Quality metrics dashboard

3. Export Options
Export proposals as professionally formatted PDFs

Export as plain text files

Copy proposal content to clipboard easily

4. Proposal Templates
6 curated templates for different fields

Category-based filtering and search

One-click template insertion and copying

5. Multiple AI Models
Choose from 6 different Groq AI models

Model selector integrated in chat UI

Performance tracking per model

6. Enhanced UI/UX
Modern glassmorphism design style

Smooth, performant animations with Framer Motion

Fully mobile responsive layout

Intuitive, professional color scheme and navigation

📈 Summary
This application provides a complete, user-friendly solution for Upwork freelancers looking to create, analyze, and optimize proposals with the power of AI — all wrapped in a sleek, modern Next.js 14+ interface.

Happy freelancing! 🚀

yaml
Copy
Edit

---

If you want me to generate badges or add a **project description** or **contributing guidelines**, just let me know!








Ask ChatGPT
