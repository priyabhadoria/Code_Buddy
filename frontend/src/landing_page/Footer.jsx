
import { Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-[#464554]/20 bg-[#070d1f] py-12 px-4 md:px-8 mt-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright Cluster Frame */}
        <div className="flex items-center gap-2 ordered-last md:order-first">
          <Terminal className="text-[#908fa0] w-5 h-5" />
          <span className="text-sm text-[#908fa0] tracking-tight">© 2026 Code Buddy Inc. All rights reserved.</span>
        </div>
        
        {/* Platform Policy / Legal External Web anchors */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a className="text-sm text-[#908fa0] hover:text-[#c0c1ff] transition-colors text-center" href="#privacy">Privacy Policy</a>
          <a className="text-sm text-[#908fa0] hover:text-[#c0c1ff] transition-colors text-center" href="#terms">Terms of Service</a>
          <a className="text-sm text-[#908fa0] hover:text-[#c0c1ff] transition-colors text-center" href="#docs">Documentation</a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;