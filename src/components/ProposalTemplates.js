// ===========================================
// components/ProposalTemplates.js
// ===========================================
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCode, FaPen, FaPaintBrush, FaCamera, FaChartBar, FaMobile, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function ProposalTemplates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      title: "Web Developer",
      category: "development",
      icon: FaCode,
      description: "Perfect for web development projects",
      template: `I noticed you're looking for a web developer to build [specific project details]. 

I recently completed a similar [project type] for [client/company] that increased their conversion rate by 35%.

Here's what I can deliver:
• Clean, responsive code using [relevant technologies]
• SEO-optimized structure
• Mobile-first design
• Fast loading speeds (< 3 seconds)

My portfolio: [your portfolio link]

I'd love to discuss how I can help achieve your goals. When would be a good time for a quick call?

Best regards,
[Your name]`,
      tags: ["React", "Node.js", "JavaScript", "HTML/CSS"]
    },
    {
      id: 2,
      title: "Graphic Designer",
      category: "design",
      icon: FaPaintBrush,
      description: "For graphic design and branding projects",
      template: `Your brand deserves designs that make people stop and take notice.

I recently helped [client name] redesign their brand identity, resulting in 40% more social media engagement and 25% increase in leads.

What you'll get:
• 3 initial concepts to choose from
• Unlimited revisions until perfect
• All source files + brand guidelines
• Commercial usage rights

Portfolio: [your portfolio link]

Ready to make your brand unforgettable? Let's chat about your vision.

[Your name]`,
      tags: ["Photoshop", "Illustrator", "Branding", "Logo Design"]
    },
    {
      id: 3,
      title: "Content Writer",
      category: "writing",
      icon: FaPen,
      description: "For content writing and copywriting projects",
      template: `Your audience is waiting for content that connects and converts.

I just helped [client name] boost their blog traffic by 150% in 3 months with strategic content that ranks on Google's first page.

My content approach:
• Research-backed, SEO-optimized articles
• Engaging headlines that drive clicks
• Clear calls-to-action that convert
• Original, plagiarism-free writing

Samples: [your writing samples]

Let's create content that turns readers into customers. What's your content goal?

[Your name]`,
      tags: ["SEO Writing", "Blog Posts", "Copywriting", "Content Strategy"]
    },
    {
      id: 4,
      title: "Digital Marketer",
      category: "marketing",
      icon: FaChartBar,
      description: "For digital marketing campaigns",
      template: `Looking to scale your business with proven digital marketing strategies?

I recently managed a campaign for [client name] that generated 300% ROI and 50+ qualified leads in the first month.

My marketing toolkit:
• Google Ads & Facebook Ads optimization
• Email marketing automation
• Conversion rate optimization
• Analytics and performance tracking

Case study: [your case study link]

Ready to see similar results? Let's discuss your growth goals.

[Your name]`,
      tags: ["Google Ads", "Facebook Ads", "Email Marketing", "Analytics"]
    },
    {
      id: 5,
      title: "Mobile App Developer",
      category: "development",
      icon: FaMobile,
      description: "For mobile app development projects",
      template: `Your app idea deserves flawless execution from day one.

I recently launched [app name] for [client], which hit 10K downloads in the first month with a 4.8-star rating.

Development process:
• Native iOS/Android or cross-platform
• User-friendly UI/UX design
• Rigorous testing on multiple devices
• App Store optimization for visibility

Portfolio: [your app portfolio]

Let's turn your app concept into reality. What's your launch timeline?

[Your name]`,
      tags: ["React Native", "Swift", "Kotlin", "Flutter"]
    },
    {
      id: 6,
      title: "Photographer",
      category: "creative",
      icon: FaCamera,
      description: "For photography and visual content projects",
      template: `Great photos tell your story before words ever could.

I recently shot [type of project] for [client name], and their engagement increased by 80% across all social platforms.

Photography services:
• Professional product photography
• Brand storytelling through visuals
• High-resolution, edited images
• Quick 48-hour turnaround

Portfolio: [your photography portfolio]

Ready to elevate your visual content? What's your creative vision?

[Your name]`,
      tags: ["Product Photography", "Portrait", "Commercial", "Photo Editing"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'development', name: 'Development', count: templates.filter(t => t.category === 'development').length },
    { id: 'design', name: 'Design', count: templates.filter(t => t.category === 'design').length },
    { id: 'writing', name: 'Writing', count: templates.filter(t => t.category === 'writing').length },
    { id: 'marketing', name: 'Marketing', count: templates.filter(t => t.category === 'marketing').length },
    { id: 'creative', name: 'Creative', count: templates.filter(t => t.category === 'creative').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyTemplate = (template) => {
    navigator.clipboard.writeText(template);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Proposal Templates
        </motion.h1>

        {/* Search and Filter */}
        <motion.div 
          className="glass-morphism p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:border-white/50"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="template-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <template.icon className="text-3xl text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{template.title}</h3>
                    <p className="text-white/70 text-sm">{template.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyTemplate(template.template)}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <FaCopy />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map(tag => (
                  <span key={tag} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Preview */}
              <div className="bg-white/10 p-4 rounded-lg mb-4">
                <pre className="text-white/90 text-sm whitespace-pre-wrap font-sans overflow-hidden">
                  {template.template.substring(0, 200)}...
                </pre>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link href="/chat">
                  <button className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    Use Template
                  </button>
                </Link>
                <button
                  onClick={() => copyTemplate(template.template)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center text-white/60 mt-12">
            <p className="text-xl mb-2">No templates found</p>
            <p>Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
