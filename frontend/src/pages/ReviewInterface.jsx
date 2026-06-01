import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Moon, 
  ChevronDown, 
  Copy, 
  AlignLeft, 
  Flame, 
  Bot, 
  MoreVertical, 
  User, 
  Lightbulb, 
  Send,
  BrainCircuit,
  ShieldAlert,
  PlusSquare,
} from 'lucide-react';

const ReviewInterface = () => {
  const navigate = useNavigate();
  
  // App States
  const [currentMode, setCurrentMode] = useState('standard'); // standard | strict | explain | roast
  const [leftPanelWidth, setLeftPanelWidth] = useState(55); // percentage
  const [codeSnippet, setCodeSnippet] = useState(`// Example implementation of a generic sorting algorithm
function quickSort<T>(arr: T[]): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}

const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const sortedArray = quickSort(unsortedArray);`);

  // Drag Resizing References
  const mainContainerRef = useRef(null);
  const isResizingRef = useRef(false);

  // Mouse drag handlers for the column split resizer
  const handleMouseDown = () => {
    isResizingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current || !mainContainerRef.current) return;
      
      const containerWidth = mainContainerRef.current.offsetWidth;
      const containerLeft = mainContainerRef.current.getBoundingClientRect().left;
      const relativeX = e.clientX - containerLeft;
      
      let newWidthPercentage = (relativeX / containerWidth) * 100;
      
      // Constrain panel splitting widths safely
      if (newWidthPercentage < 20) newWidthPercentage = 20;
      if (newWidthPercentage > 80) newWidthPercentage = 80;
      
      setLeftPanelWidth(newWidthPercentage);
    };

    const handleMouseUp = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Mode UI Config Helper
  const getModeStyles = () => {
    switch (currentMode) {
      case 'roast':
        return {
          bodyClass: "bg-gradient-to-br from-[#020617] via-[#0c1324] to-[#1e1010]",
          aiName: "CodeWise Destroyer",
          aiStatus: "Roast Mode Engaged",
          aiColorClass: "text-red-400",
          aiIconBg: "bg-red-500/20",
          actionBtnClass: "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]",
          actionText: "Roast Code"
        };
      case 'strict':
        return {
          bodyClass: "bg-[#020617]",
          aiName: "CodeWise Auditor",
          aiStatus: "Strict Review Mode",
          aiColorClass: "text-[#ffb3ad]",
          aiIconBg: "bg-[#ffb3ad]/20",
          actionBtnClass: "bg-[#494bd6] hover:bg-[#8083ff] text-white shadow-[0_0_15px_rgba(192,193,255,0.2)]",
          actionText: "Review Code"
        };
      case 'explain':
        return {
          bodyClass: "bg-[#020617]",
          aiName: "CodeWise Teacher",
          aiStatus: "Exploratory Breakdowns",
          aiColorClass: "text-emerald-400",
          aiIconBg: "bg-emerald-500/20",
          actionBtnClass: "bg-[#494bd6] hover:bg-[#8083ff] text-white shadow-[0_0_15px_rgba(192,193,255,0.2)]",
          actionText: "Review Code"
        };
      default:
        return {
          bodyClass: "bg-[#020617]",
          aiName: "CodeWise Assistant",
          aiStatus: "Standard Review Mode",
          aiColorClass: "text-[#c0c1ff]",
          aiIconBg: "bg-[#c0c1ff]/20",
          actionBtnClass: "bg-[#494bd6] hover:bg-[#8083ff] text-white shadow-[0_0_15px_rgba(192,193,255,0.2)]",
          actionText: "Review Code"
        };
    }
  };

  const ui = getModeStyles();

  return (
    <div className={`h-screen flex flex-col font-['Plus_Jakarta_Sans'] text-[#dce1fb] overflow-hidden transition-colors duration-500 selection:bg-[#8083ff] selection:text-[#0d0096] ${ui.bodyClass}`}>
      
      {/* Universal Top Application Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-[#0c1324]/80 backdrop-blur-md border-b border-[#464554]/30">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
          <Terminal className="text-[#c0c1ff] w-6 h-6" />
          <span className="text-xl font-bold text-[#c0c1ff] tracking-tight">CodeWise</span>
        </div>
        
        {/* Navigation Routes */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate('/dashboard')} className="text-sm font-semibold text-[#c7c4d7] hover:text-[#dce1fb] transition-colors px-3 py-1.5 rounded-lg">Dashboard</button>
          <button onClick={() => navigate('/review')} className="text-sm font-semibold text-[#c0c1ff] bg-[#2e3447]/50 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(192,193,255,0.1)]">New Review</button>
          <button onClick={() => navigate('/profile')} className="text-sm font-semibold text-[#c7c4d7] hover:text-[#dce1fb] transition-colors px-3 py-1.5 rounded-lg">Profile</button>
        </nav>
        <button className="text-[#c0c1ff] hover:bg-[#2e3447]/50 p-2 rounded-full transition-colors active:scale-95 duration-200">
          <Moon className="w-5 h-5" />
        </button>
      </header>

      {/* Primary Split View Area Wrapper */}
      <main 
        ref={mainContainerRef}
        className="flex-1 flex mt-16 overflow-hidden p-2 gap-2 max-w-[1280px] mx-auto w-full relative"
      >
        {/* Left Interactive Source Editor Panel */}
        <section 
          className="flex flex-col h-full bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative"
          style={{ flex: window.innerWidth >= 768 ? `0 0 ${leftPanelWidth}%` : '1 1 auto' }}
        >
          {/* Editor Header Bar Controls */}
          <div className="flex items-center justify-between p-3 border-b border-[#464554]/30 bg-[#151b2d]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 px-1">
                <div className="w-3 h-3 rounded-full bg-[#464554]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#464554]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#464554]/50"></div>
              </div>
              
              {/* Dropdown Lang Picker Switcher */}
              <button className="flex items-center gap-2 text-[#c7c4d7] hover:text-[#dce1fb] transition-colors font-semibold text-xs px-2 py-1 rounded bg-[#0c1324] hover:bg-[#2e3447] border border-[#464554]/30">
                <span>TypeScript</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 rounded text-[#c7c4d7] hover:text-[#dce1fb] hover:bg-[#2e3447] transition-colors">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded text-[#c7c4d7] hover:text-[#dce1fb] hover:bg-[#2e3447] transition-colors">
                <AlignLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Work Surface Container Block */}
          <div className="flex-1 bg-black overflow-auto p-4 flex m-0 font-['JetBrains_Mono'] text-sm leading-relaxed">
            {/* Hard-coded Context Line Indicators */}
            <div className="flex flex-col text-right pr-4 border-r border-[#464554]/30 select-none text-[#908fa0] min-w-[2.5rem]">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i + 1}>{i + 1}</span>
              ))}
            </div>
            
            {/* Interactive Editable Display Area Container */}
            <textarea
              className="pl-4 font-mono text-sm m-0 w-full overflow-x-auto bg-transparent border-none text-[#bec6e0] focus:ring-0 resize-none focus:outline-none"
              spellCheck="false"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
            />
          </div>

          {/* Configuration Selector Toolbar Footer */}
          <div className="p-3 border-t border-[#464554]/30 bg-[#151b2d] flex flex-col sm:flex-row gap-2 justify-between items-center">
            <span className="text-xs font-semibold tracking-wide text-[#c7c4d7]">Review Mode:</span>
            <div className="flex flex-wrap gap-1 bg-[#0c1324] p-1 rounded-lg border border-[#464554]/20">
              {[
                { id: 'standard', label: 'Standard', icon: null },
                { id: 'strict', label: 'Strict', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
                { id: 'explain', label: 'Explain', icon: <BrainCircuit className="w-3.5 h-3.5" /> },
                { id: 'roast', label: 'Roast', icon: <Flame className="w-3.5 h-3.5" />, color: 'hover:text-red-400' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1
                    ${currentMode === mode.id 
                      ? (mode.id === 'roast' 
                        ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                        : 'bg-[#c0c1ff] text-[#0c1324] shadow-[0_0_10px_rgba(192,193,255,0.2)]')
                      : `text-[#c7c4d7] hover:text-[#dce1fb] ${mode.color || ''}`
                    }`}
                >
                  {mode.icon}
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Interactive Drag Column Resizer Anchor */}
        <div 
          className="hidden md:block w-1 hover:bg-[#c0c1ff] active:bg-[#c0c1ff] cursor-col-resize transition-colors duration-200"
          onMouseDown={handleMouseDown}
        />

        {/* Right Adaptive AI Assistant Feed Workspace Panel */}
        <section className="hidden md:flex flex-col h-full bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] flex-1 relative">
          
          {/* Active Personality Meta Headers */}
          <div className="p-4 border-b border-[#464554]/30 bg-[#151b2d] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${ui.aiIconBg} flex items-center justify-center ${ui.aiColorClass} transition-all duration-300`}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`font-bold text-base transition-colors duration-300 ${ui.aiColorClass}`}>{ui.aiName}</h2>
                <p className="text-xs text-[#c7c4d7] transition-all">{ui.aiStatus}</p>
              </div>
            </div>
            <button className="p-2 text-[#c7c4d7] hover:text-[#dce1fb] transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Chronological Chat Messages Logs Layout */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#0c1324]">
            
            {/* Default Introduction Block Frame */}
            <div className="flex gap-3 max-w-[90%]">
              <div className="w-8 h-8 rounded-full bg-[#c0c1ff]/20 flex items-center justify-center text-[#c0c1ff] flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#2e3447] p-3 rounded-lg rounded-tl-none border border-[#464554]/20 shadow-sm">
                <p className="text-sm text-[#dce1fb]">I'm ready to review your code. Paste it in the editor on the left, select your desired review mode, and click "{ui.actionText}" or just ask me a question about it.</p>
              </div>
            </div>

            {/* Context Demo Log Prompt: User */}
            <div className="flex gap-3 max-w-[90%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-[#3f465c] flex items-center justify-center text-[#adb4ce] flex-shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-[#8083ff]/20 p-3 rounded-lg rounded-tr-none border border-[#8083ff]/20 shadow-sm">
                <p className="text-sm text-[#dce1fb]">Can you review the quicksort implementation I just pasted?</p>
              </div>
            </div>

            {/* Context Demo Response Frame: Machine Output */}
            <div className="flex gap-3 max-w-[90%]">
              <div className="w-8 h-8 rounded-full bg-[#c0c1ff]/20 flex items-center justify-center text-[#c0c1ff] flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#2e3447] p-3 rounded-lg rounded-tl-none border border-[#464554]/20 shadow-sm flex flex-col gap-2">
                <p className="text-sm text-[#dce1fb]">Looking at your `quickSort` implementation, it's functionally correct and easy to read. However, there are a few performance considerations:</p>
                <ul class="list-disc pl-5 text-sm text-[#c7c4d7] space-y-1">
                  <li>It creates multiple new arrays on every recursive call via `filter` and the spread operator, leading to high memory overhead.</li>
                  <li>For a truly efficient quicksort, you should perform the sorting in-place by swapping elements.</li>
                </ul>
                <div className="mt-2 bg-[#070d1f] p-2 rounded border border-[#464554]/30 flex items-center gap-2">
                  <Lightbulb className="text-[#c0c1ff] w-4 h-4 flex-shrink-0" />
                  <span className="text-xs text-[#dce1fb]">Consider an in-place partition scheme (like Hoare or Lomuto) for production use.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Core Chat text Prompt Form Action Box */}
          <div className="p-4 border-t border-[#464554]/30 bg-[#151b2d]">
            <div className="relative flex items-center">
              <textarea 
                className="w-full bg-[#0c1324] border border-[#464554]/30 rounded-lg py-3 pl-4 pr-12 text-sm text-[#dce1fb] placeholder:text-[#908fa0] focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] focus:outline-none resize-none transition-all" 
                placeholder="Ask a question or request a review..." 
                rows="1"
              />
              <button className="absolute right-2 p-2 text-[#c0c1ff] hover:bg-[#c0c1ff]/10 rounded-md transition-colors flex items-center justify-center">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[11px] text-[#c7c4d7]">Press Enter to send, Shift+Enter for new line</span>
              <button className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 active:scale-95 ${ui.actionBtnClass}`}>
                {ui.actionText}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Nav App Bar (Mobile Screen Fallback Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 bg-[#0c1324]/90 backdrop-blur-lg border-t border-[#464554]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] rounded-t-xl">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center text-[#adb4ce]/60 hover:text-[#c0c1ff]/80 transition-all">
          <Terminal className="w-5 h-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button onClick={() => navigate('/review')} className="flex flex-col items-center justify-center text-[#c0c1ff] bg-[#8083ff]/10 rounded-xl px-4 py-1 shadow-[0_0_15px_rgba(192,193,255,0.2)] transition-all">
          <PlusSquare className="w-5 h-5" />
          <span className="text-xs mt-1">New Review</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center text-[#adb4ce]/60 hover:text-[#c0c1ff]/80 transition-all">
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>

    </div>
  );
};

export default ReviewInterface;