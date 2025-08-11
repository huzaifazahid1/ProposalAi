// ===========================================
// app/layout.js
// ===========================================
import './globals.css';

export const metadata = {
  title: 'Upwork Proposal Generator - AI Powered',
  description: 'Generate winning Upwork proposals with AI assistance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
