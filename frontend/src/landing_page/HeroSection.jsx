
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center relative z-10">
      {/* Background Ambient Aura Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] h-[400px] bg-[#c0c1ff]/5 md:bg-[#c0c1ff]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Platform Version Update Stream Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191f31] border border-[#464554]/50 mb-8 max-w-full">
        <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-pulse flex-shrink-0"></span>
        <span className="text-xs font-semibold text-[#c7c4d7] tracking-wide truncate">Code Buddy AI Engine v2.0 Live</span>
      </div>
      
      {/* Typography Main Header Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#dce1fb] text-center mb-6 max-w-4xl tracking-tight leading-tight drop-shadow-sm">
        Code review that makes you <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0c1ff] to-[#494bd6]">think.</span>
      </h1>
      
      {/* Main Pitch Subtext */}
      <p className="text-base md:text-lg text-[#c7c4d7] text-center max-w-2xl mx-auto mb-10 leading-relaxed">
        Elevate your engineering standards. Code Buddy delivers deep, context-aware AI code reviews tailored to your skill level and emotional readiness.
      </p>
      
      {/* CTA Button Action Cluster */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20 w-full sm:w-auto px-4 sm:px-0">
        <a className="bg-[#c0c1ff] text-[#1000a9] font-bold px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(192,193,255,0.2)] hover:shadow-[0_0_30px_rgba(192,193,255,0.4)] hover:bg-[#e1e0ff] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base" href="#trial">
          Start Free Trial <ArrowRight className="w-4 h-4" />
        </a>
        <a className="border border-[#464554] text-[#dce1fb] font-semibold px-8 py-4 rounded-lg hover:bg-[#191f31] transition-colors active:scale-95 flex items-center justify-center text-sm md:text-base" href="#demo">
          View Demo
        </a>
      </div>

      {/* High-Fidelity Mockup Container Window Frame */}
      <div className="w-full max-w-[1100px] relative rounded-xl border border-[#464554]/50 bg-[#0f172a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mx-auto">
        <div className="h-10 border-b border-[#464554]/30 flex items-center px-4 gap-2 bg-[#0c1324]/80 backdrop-blur-sm relative z-20">
          <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffb3ad]"></div>
          <div className="w-3 h-3 rounded-full bg-[#c0c1ff]"></div>
          <div className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-[#908fa0] tracking-tight">pull-request-142.ts</div>
        </div>
        <div className="relative w-full aspect-[16/9] bg-[#070d1f]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#494bd6]/10 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
          <img alt="CodeWise Interface Mockup" className="w-full h-full object-cover opacity-40 mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsJoyTlMiqxp-vvvV5S4S6MkkpRHS05JWsk9O1trA-6bPZiK88hSpii6zzm8gWuRKYmxSEUmBEJ6W0CkO8DxIplArDXIf-s02D4cgjzPeD6DtuWMZEG-Mz4FD5eK-4tASqSbRd57J13LE_eOoGdvT4S5p-YLYuUxpOiSTq53P2mpj37okHsmLqkXGHZoELPLzbE66RtcWE1OLn6bGpKgm5jQvTqfVS5sO76e09DpXE1h6DpmqcwdJsxD97xxxoNQECMQUZZYCRfYi4" />
          <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;