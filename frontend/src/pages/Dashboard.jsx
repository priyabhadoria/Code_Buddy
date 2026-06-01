
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Moon, 
  LayoutDashboard, 
  PlusSquare, 
  History, 
  UserCircle, 
  Plus, 
  BarChart3, 
  Flame, 
  Code2, 
  ArrowRight,
  Brain
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0c1324] text-[#dce1fb] min-h-screen flex flex-col md:flex-row overflow-hidden font-['Plus_Jakarta_Sans'] antialiased selection:bg-[#8083ff] selection:text-[#0d0096]">
      
      {/* Mobile Header View */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#0c1324]/80 backdrop-blur-md border-b border-[#464554]/30 md:hidden">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
          <Terminal className="text-[#c0c1ff] w-6 h-6" />
          <h1 className="text-xl font-bold text-[#c0c1ff] tracking-tight">Code Buddy</h1>
        </div>
        <button className="text-[#c0c1ff] active:scale-95 transition-transform duration-200">
          <Moon className="w-5 h-5" />
        </button>
      </header>

      {/* Desktop Navigation Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-[#464554]/30 bg-[#0c1324]/80 backdrop-blur-md z-40 p-8">
        <div onClick={() => navigate('/')} className="flex items-center gap-3 mb-10 hover:opacity-90 transition-opacity cursor-pointer">
          <Terminal className="text-[#c0c1ff] w-7 h-7" />
          <h1 className="text-2xl font-bold text-[#c0c1ff] tracking-tight">Code Buddy</h1>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c0c1ff] bg-[#8083ff]/10 border border-[#c0c1ff]/20 shadow-[0_0_20px_rgba(192,193,255,0.1)] text-sm font-semibold transition-all w-full text-left"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/review')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c7c4d7] hover:bg-[#2e3447]/50 hover:text-[#c0c1ff] transition-colors text-sm font-semibold group w-full text-left"
          >
            <PlusSquare className="w-5 h-5 group-hover:text-[#c0c1ff] transition-colors" />
            New Review
          </button>
          
          <button 
            onClick={() => navigate('/history')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c7c4d7] hover:bg-[#2e3447]/50 hover:text-[#c0c1ff] transition-colors text-sm font-semibold group w-full text-left"
          >
            <History className="w-5 h-5 group-hover:text-[#c0c1ff] transition-colors" />
            History
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c7c4d7] hover:bg-[#2e3447]/50 hover:text-[#c0c1ff] transition-colors text-sm font-semibold group mt-auto w-full text-left"
          >
            <UserCircle className="w-5 h-5 group-hover:text-[#c0c1ff] transition-colors" />
            Profile
          </button>
        </nav>
      </aside>

      {/* Main Panel Area */}
      <main className="flex-1 w-full pt-20 pb-24 md:pt-8 md:pb-8 md:pl-[calc(16rem+2rem)] px-4 md:pr-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Main Context Summary Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#dce1fb] mb-1 tracking-tight">Overview</h2>
              <p className="text-lg text-[#c7c4d7]">Your recent activity and AI code reviews.</p>
            </div>
            <button 
              onClick={() => navigate('/review')}
              className="bg-[#c0c1ff] text-[#1000a9] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#e1e0ff] transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(192,193,255,0.2)]"
            >
              <Plus className="w-4 h-4" />
              Start New Review
            </button>
          </header>

          {/* Metrics Section Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Total Sessions Metric */}
            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#464554]/30 p-6 rounded-xl flex flex-col justify-between hover:border-[#c0c1ff]/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wide text-[#c7c4d7]">Total Sessions</span>
                <div className="bg-[#c0c1ff]/10 p-2 rounded-lg">
                  <BarChart3 className="text-[#c0c1ff] w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-extrabold text-[#dce1fb]">142</span>
                <div className="flex items-center gap-1 text-[#ffb3ad] mt-2">
                  <Plus className="w-3 h-3" />
                  <span className="text-xs font-semibold">12% this week</span>
                </div>
              </div>
            </div>

            {/* Most Used Mode Metric */}
            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#464554]/30 p-6 rounded-xl flex flex-col justify-between hover:border-[#c0c1ff]/50 transition-colors relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ff5451]/10 rounded-full blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-sm font-semibold tracking-wide text-[#c7c4d7]">Most Used Mode</span>
                <div className="bg-[#ffb3ad]/10 p-2 rounded-lg">
                  <Flame className="text-[#ffb3ad] w-5 h-5" />
                </div>
              </div>
              <div className="relative z-10">
                <span className="text-3xl md:text-4xl font-extrabold text-[#dce1fb]">Roast</span>
                <div className="flex items-center gap-1 text-[#c7c4d7] mt-2">
                  <span className="text-xs">45 sessions</span>
                </div>
              </div>
            </div>

            {/* Top Language Metric */}
            <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#464554]/30 p-6 rounded-xl flex flex-col justify-between hover:border-[#c0c1ff]/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wide text-[#c7c4d7]">Top Language</span>
                <div className="bg-[#bec6e0]/10 p-2 rounded-lg">
                  <Code2 className="text-[#bec6e0] w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-extrabold text-[#dce1fb]">Python</span>
                <div className="flex items-center gap-1 text-[#c7c4d7] mt-2">
                  <span className="text-xs">Django / FastAPI</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Analytical Reviews Feed Block */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#dce1fb]">Recent Reviews</h3>
              <button 
                onClick={() => navigate('/history')}
                className="text-sm font-semibold text-[#c0c1ff] hover:text-[#e1e0ff] transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card item 1: Roast Content */}
              <article 
                onClick={() => navigate('/review')}
                className="bg-[#0f172a]/60 backdrop-blur-md rounded-xl overflow-hidden flex flex-col border border-[#ffb4ab]/20 hover:border-[#ffb4ab]/50 transition-colors relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#ffb4ab]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="p-4 border-b border-[#464554]/30 flex justify-between items-center bg-[#070d1f]/50">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#ffb4ab]/10 text-[#ffb4ab] font-mono text-xs rounded border border-[#ffb4ab]/20 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Roast
                    </span>
                    <span className="px-2 py-1 bg-[#23293c] text-[#c7c4d7] font-mono text-xs rounded border border-[#464554]/50">
                      React
                    </span>
                  </div>
                  <span className="text-xs text-[#c7c4d7]">2h ago</span>
                </div>
                <div className="p-4 flex-1">
                  <h4 className="text-lg font-bold text-[#dce1fb] mb-2">Authentication Hook Refactor</h4>
                  <div className="bg-black border border-[#464554]/30 p-3 rounded-lg overflow-x-auto text-xs font-mono text-[#bec6e0]/80">
                    <pre><code>{`const useAuth = () => {
  // Why is this a massive useEffect?
  const [user, setUser] = useState(null);
  ...
}`}</code></pre>
                  </div>
                </div>
              </article>

              {/* Card item 2: Data Pipeline Content */}
              <article 
                onClick={() => navigate('/review')}
                className="bg-[#0f172a]/60 backdrop-blur-md rounded-xl overflow-hidden flex flex-col border border-[#464554]/30 hover:border-[#c0c1ff]/50 transition-colors relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#c0c1ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="p-4 border-b border-[#464554]/30 flex justify-between items-center bg-[#070d1f]/50">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#c0c1ff]/10 text-[#c0c1ff] font-mono text-xs rounded border border-[#c0c1ff]/20 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" /> Analyze
                    </span>
                    <span className="px-2 py-1 bg-[#23293c] text-[#c7c4d7] font-mono text-xs rounded border border-[#464554]/50">
                      Python
                    </span>
                  </div>
                  <span className="text-xs text-[#c7c4d7]">Yesterday</span>
                </div>
                <div className="p-4 flex-1">
                  <h4 className="text-lg font-bold text-[#dce1fb] mb-2">Data Processing Pipeline</h4>
                  <div className="bg-black border border-[#464554]/30 p-3 rounded-lg overflow-x-auto text-xs font-mono text-[#bec6e0]/80">
                    <pre><code>{`def process_data(df: pd.DataFrame):
    """Optimized using vectorized ops"""
    return df.apply(lambda x: x * 2)
    # Suggestions provided for speed`}</code></pre>
                  </div>
                </div>
              </article>

              {/* Card item 3: Go Worker Pool Content */}
              <article 
                onClick={() => navigate('/review')}
                className="bg-[#0f172a]/60 backdrop-blur-md rounded-xl overflow-hidden flex flex-col border border-[#464554]/30 hover:border-[#c0c1ff]/50 transition-colors relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#c0c1ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="p-4 border-b border-[#464554]/30 flex justify-between items-center bg-[#070d1f]/50">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#c0c1ff]/10 text-[#c0c1ff] font-mono text-xs rounded border border-[#c0c1ff]/20 flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" /> Analyze
                    </span>
                    <span className="px-2 py-1 bg-[#23293c] text-[#c7c4d7] font-mono text-xs rounded border border-[#464554]/50">
                      Go
                    </span>
                  </div>
                  <span className="text-xs text-[#c7c4d7]">Oct 12</span>
                </div>
                <div className="p-4 flex-1">
                  <h4 className="text-lg font-bold text-[#dce1fb] mb-2">Concurrent Worker Pool</h4>
                  <div className="bg-black border border-[#464554]/30 p-3 rounded-lg overflow-x-auto text-xs font-mono text-[#bec6e0]/80">
                    <pre><code>{`func worker(id int, jobs <-chan int) {
    for j := range jobs {
        fmt.Println("worker", id, "started")
    }
}`}</code></pre>
                  </div>
                </div>
              </article>

            </div>
          </section>
        </div>
      </main>

      {/* Mobile Screen Floating Bottom App Bar Navigation View */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 bg-[#0c1324]/90 backdrop-blur-lg border-t border-[#464554]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] rounded-t-xl">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center justify-center text-[#c0c1ff] bg-[#8083ff]/10 rounded-xl px-4 py-1.5 shadow-[0_0_15px_rgba(192,193,255,0.2)] font-semibold transition-all duration-150"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="mt-1 text-xs">Dashboard</span>
        </button>
        
        <button 
          onClick={() => navigate('/review')}
          className="flex flex-col items-center justify-center text-[#c7c4d7] hover:text-[#c0c1ff] font-semibold transition-all duration-150"
        >
          <PlusSquare className="w-5 h-5" />
          <span className="mt-1 text-xs">New Review</span>
        </button>
        
        <button 
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center justify-center text-[#c7c4d7] hover:text-[#c0c1ff] font-semibold transition-all duration-150"
        >
          <UserCircle className="w-5 h-5" />
          <span className="mt-1 text-xs">Profile</span>
        </button>
      </nav>

    </div>
  );
};

export default Dashboard;