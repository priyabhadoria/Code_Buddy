import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0c1324]/80 backdrop-blur-md border-b border-[#464554]/30 fixed top-0 left-0 w-full z-50 px-4 md:px-8 h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        
        {/* Logo Frame */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer">
          <Terminal className="text-[#c0c1ff] w-6 h-6" />
          <span className="text-2xl font-bold text-[#c0c1ff] tracking-tight">Code Buddy</span>
        </div>
        
        {/* Desktop Anchor Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a className="text-sm font-semibold text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors hover:bg-[#2e3447]/50 px-3 py-2 rounded-md" href="#modes">Features</a>
          <a className="text-sm font-semibold text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors hover:bg-[#2e3447]/50 px-3 py-2 rounded-md" href="#how-it-works">How it Works</a>
        </div>
        
        {/* Right CTA / Action Cluster */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate('/signin')} 
            className="bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/30 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#c0c1ff]/20 transition-all duration-200 active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Device Toggle Trigger */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#c0c1ff] hover:bg-[#2e3447]/50 p-2 rounded-md transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Slide Down Mobile Navigation Drawer Menu */}
      <div className={`absolute top-16 left-0 w-full bg-[#0c1324] border-b border-[#464554]/40 md:hidden transition-all duration-300 ease-in-out transform ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
      }`}>
        <div className="px-4 pt-3 pb-6 flex flex-col gap-4 shadow-2xl">
          <a onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#c7c4d7] hover:text-[#c0c1ff] py-2 border-b border-[#464554]/10" href="#modes">Features</a>
          <a onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#c7c4d7] hover:text-[#c0c1ff] py-2 border-b border-[#464554]/10" href="#how-it-works">How it Works</a>
          
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate('/signin'); }}
            className="w-full mt-2 bg-[#494bd6] text-white font-semibold text-center py-3 rounded-lg hover:bg-[#8083ff] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;