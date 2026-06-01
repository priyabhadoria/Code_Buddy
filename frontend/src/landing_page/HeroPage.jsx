
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import { GraduationCap, TrendingUp, Brain, Flame, Webhook, GitCommit, MessageSquare, Zap } from 'lucide-react';

const HeroPage = () => {
  return (
    <div className="min-h-screen bg-[#0c1324] text-[#dce1fb] font-['Plus_Jakarta_Sans'] overflow-x-hidden">
      
      {/* 1. Global Navigation Top Bar */}
      <Navbar />

      <main>
        {/* 2. Hero Interactive Callout Section */}
        <HeroSection />

        {/* 3. Review Modes (Mentor) Section Grid Layout */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10" id="modes">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#dce1fb] mb-4">Choose Your Mentor</h2>
            <p className="text-sm md:text-base text-[#c7c4d7] max-w-xl mx-auto">Select the review mode that fits your current task, your mood, and your learning goals.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0c1324] border border-[#464554] rounded-xl p-6 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-[#2e3447] flex items-center justify-center mb-6 border border-[#464554]/50 group-hover:border-[#bec6e0]/50 transition-colors">
                <GraduationCap className="text-[#bec6e0] w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-[#dce1fb] mb-3">Beginner</h3>
              <p className="text-sm text-[#c7c4d7] flex-grow">Detailed explanations, definitions of complex terms, and gentle step-by-step guidance. Perfect for learning entirely new stacks.</p>
            </div>

            <div className="bg-[#0c1324] border border-[#464554] rounded-xl p-6 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-[#c0c1ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-lg bg-[#8083ff]/10 flex items-center justify-center mb-6 border border-[#c0c1ff]/20 relative z-10">
                <TrendingUp className="text-[#c0c1ff] w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-[#dce1fb] mb-3 relative z-10">Straight</h3>
              <p className="text-sm text-[#c7c4d7] flex-grow relative z-10">Direct, concise feedback focused entirely on code quality, performance metrics, and strict best practices. Zero fluff.</p>
            </div>

            <div className="bg-[#0c1324] border border-[#464554] rounded-xl p-6 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-[#494bd6]/10 flex items-center justify-center mb-6 border border-[#494bd6]/20">
                <Brain className="text-[#494bd6] w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-[#dce1fb] mb-3">Socratic</h3>
              <p className="text-sm text-[#c7c4d7] flex-grow">Asks guiding architectural questions instead of giving immediate answers. Designed to help you arrive at the optimal solution yourself.</p>
            </div>

            <div className="bg-[#0c1324] border border-[#ffb4ab]/30 rounded-xl p-6 flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(239,68,68,0.15)] transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-[#ffb4ab]/5 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              <div className="w-12 h-12 rounded-lg bg-[#ffb4ab]/10 flex items-center justify-center mb-6 border border-[#ffb4ab]/30 relative z-10 group-hover:bg-[#ffb4ab]/20 transition-colors">
                <Flame className="text-[#ffb4ab] w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-[#ffb4ab] mb-3 relative z-10">Roast Mode</h3>
              <p className="text-sm text-[#c7c4d7] flex-grow relative z-10">Brutal, unvarnished honesty. Expect sarcasm, heavy critique, and zero sugar-coating. For when you need a serious reality check.</p>
            </div>
          </div>
        </section>

        {/* 4. Workflow Integration Feature Bento Cluster Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#464554]/20" id="how-it-works">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 w-full lg:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#dce1fb] mb-8 leading-tight">Seamlessly integrated into your daily workflow.</h2>
              
              <div className="space-y-10">
                <div className="flex gap-5 group">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-[#2e3447] border border-[#464554]/50 flex items-center justify-center group-hover:border-[#c0c1ff]/50 transition-colors">
                    <Webhook className="text-[#c0c1ff] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-[#dce1fb] mb-2">1. Connect Repository</h4>
                    <p className="text-sm md:text-base text-[#c7c4d7] leading-relaxed">Link your GitHub, GitLab, or Bitbucket account securely in seconds. We support all major providers and private enterprise servers.</p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-[#2e3447] border border-[#464554]/50 flex items-center justify-center group-hover:border-[#c0c1ff]/50 transition-colors">
                    <GitCommit className="text-[#c0c1ff] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-[#dce1fb] mb-2">2. Push Your Code</h4>
                    <p className="text-sm md:text-base text-[#c7c4d7] leading-relaxed">Continue working exactly as usual. Code Buddy automatically hooks into your Pull Request workflow without requiring CLI tools.</p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-[#2e3447] border border-[#464554]/50 flex items-center justify-center group-hover:border-[#c0c1ff]/50 transition-colors">
                    <MessageSquare className="text-[#c0c1ff] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-[#dce1fb] mb-2">3. Receive Feedback</h4>
                    <p className="text-sm md:text-base text-[#c7c4d7] leading-relaxed">Get intelligent in-line comments, architectural suggestions, and security warnings based on your selected review mode instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* High Tech Abstract Structured Code Graphic Block */}
            <div className="flex-1 w-fullMain">
              <div className="relative w-full rounded-2xl bg-[#23293c] border border-[#464554]/30 overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)] p-6 md:p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c0c1ff] via-[#494bd6] to-[#23293c]"></div>
                
                <div className="w-full bg-black border border-slate-800 rounded-lg p-6 font-mono text-xs md:text-sm text-[#c7c4d7]/90 overflow-hidden relative shadow-inner">
                  <div className="space-y-3 opacity-90">
                    <p><span className="text-[#ffb3ad]">export async function</span> <span className="text-[#c0c1ff]">analyzeComplexity</span>(astNode: <span className="text-[#bec6e0]">Node</span>) {'{'}</p>
                    <p className="pl-4"><span className="text-[#ffb3ad]">const</span> context = <span className="text-[#c0c1ff]">buildExecutionGraph</span>(astNode);</p>
                    <p className="pl-4 mt-2"><span className="text-[#908fa0] italic">// Check cyclomatic complexity threshold</span></p>
                    <p className="pl-4"><span className="text-[#ffb3ad]">if</span> (context.metrics.complexity &gt; <span className="text-[#ff5451]">MAX_THRESHOLD</span>) {'{'}</p>
                    <p className="pl-8 text-[#ffb4ab]">await engine.triggerRoast(context);</p>
                    <p className="pl-4">{'}'}</p>
                    <p className="pl-4 mt-2"><span className="text-[#ffb3ad]">return</span> context.optimize();</p>
                    <p>{'}'}</p>
                  </div>

                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-[#93000a]/10 border border-[#ffb4ab]/30 rounded-lg p-3 md:p-4 backdrop-blur-md shadow-lg animate-pulse max-w-[240px] md:max-w-[280px]">
                    <div className="flex items-start gap-3">
                      <Zap className="text-[#ffb4ab] w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs md:text-sm font-semibold text-[#ffb4ab] mb-1">Roast Mode Active</p>
                        <p className="text-[11px] md:text-xs text-[#ffb4ab]/80 leading-tight">"A cyclomatic complexity of 42? Are you building a state machine or a plate of spaghetti?"</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer Cluster links view block */}
      <Footer />

    </div>
  );
};

export default HeroPage;