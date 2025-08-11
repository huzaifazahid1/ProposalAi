// ===========================================
// app/templates/page.js
// ===========================================
import ProposalTemplates from '../../components/ProposalTemplates';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function TemplatesPage() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-10">
        <Link href="/">
          <button className="flex items-center gap-2 glass-morphism text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            <FaArrowLeft /> Back to Home
          </button>
        </Link>
      </div>
      <ProposalTemplates />
    </div>
  );
}
