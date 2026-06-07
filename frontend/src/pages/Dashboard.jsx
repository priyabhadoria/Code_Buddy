import { useNavigate } from 'react-router-dom';
import {
  Plus,
  BarChart3,
  Flame,
  Code2,
  ArrowRight,
  Brain,
  TrendingUp,
  FileCode2,
} from 'lucide-react';
import AppShell from '../components/AppShell';

const RECENT_REVIEWS = [
  {
    id: 1,
    title: 'Authentication Hook Refactor',
    mode: 'roast',
    language: 'React',
    time: '2h ago',
    snippet: `const useAuth = () => {
  // Why is this a massive useEffect?
  const [user, setUser] = useState(null);
  ...
}`,
  },
  {
    id: 2,
    title: 'Data Processing Pipeline',
    mode: 'analyze',
    language: 'Python',
    time: 'Yesterday',
    snippet: `def process_data(df: pd.DataFrame):
    """Optimized using vectorized ops"""
    return df.apply(lambda x: x * 2)
    # Suggestions provided for speed`,
  },
  {
    id: 3,
    title: 'Concurrent Worker Pool',
    mode: 'analyze',
    language: 'Go',
    time: 'Oct 12',
    snippet: `func worker(id int, jobs <-chan int) {
    for j := range jobs {
        fmt.Println("worker", id, "started")
    }
}`,
  },
];

const MODE_STYLES = {
  roast: {
    border: 'border-roast/20 hover:border-roast/50',
    hover: 'bg-roast/5',
    badge: 'bg-roast/10 text-roast border-roast/20',
    icon: Flame,
    label: 'Roast',
  },
  analyze: {
    border: 'border-border/30 hover:border-accent/50',
    hover: 'bg-accent/5',
    badge: 'bg-accent-muted/10 text-accent border-accent/20',
    icon: Brain,
    label: 'Analyze',
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const hasReviews = RECENT_REVIEWS.length > 0;

  return (
    <AppShell activeNav="dashboard" layout="sidebar">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-text mb-1 tracking-tight">
              Overview
            </h2>
            <p className="text-lg text-muted">Your recent activity and AI code reviews.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/review')}
            className="btn-cta text-sm px-6 py-3 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Start New Review
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Overview metrics">
          <div className="card p-6 flex flex-col justify-between hover:border-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold tracking-wide text-muted">Total Sessions</span>
              <div className="bg-accent/10 p-2 rounded-lg">
                <BarChart3 className="text-accent w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-text">142</span>
              <div className="flex items-center gap-1 text-roast-muted mt-2">
                <TrendingUp className="w-3 h-3" aria-hidden="true" />
                <span className="text-xs font-semibold">12% this week</span>
              </div>
            </div>
          </div>

          <div className="card p-6 flex flex-col justify-between hover:border-accent/50 transition-colors relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ff5451]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-sm font-semibold tracking-wide text-muted">Most Used Mode</span>
              <div className="bg-roast/10 p-2 rounded-lg">
                <Flame className="text-roast w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="relative z-10">
              <span className="text-3xl md:text-4xl font-extrabold text-text">Roast</span>
              <p className="text-xs text-muted mt-2">45 sessions</p>
            </div>
          </div>

          <div className="card p-6 flex flex-col justify-between hover:border-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold tracking-wide text-muted">Top Language</span>
              <div className="bg-code/10 p-2 rounded-lg">
                <Code2 className="text-code w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-text">Python</span>
              <p className="text-xs text-muted mt-2">Django / FastAPI</p>
            </div>
          </div>
        </section>

        <section aria-label="Recent reviews">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-text">Recent Reviews</h3>
            {hasReviews && (
              <button
                type="button"
                onClick={() => navigate('/history')}
                className="text-sm font-semibold text-accent hover:text-[#e1e0ff] transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {!hasReviews ? (
            <div className="card p-10 md:p-14 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                <FileCode2 className="w-7 h-7 text-accent" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-bold text-text mb-2">No reviews yet</h4>
              <p className="text-sm text-muted max-w-sm mx-auto mb-6">
                Paste your first snippet and get AI feedback in seconds.
              </p>
              <button type="button" onClick={() => navigate('/review')} className="btn-cta text-sm px-6 py-3 inline-flex items-center gap-2">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Start New Review
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECENT_REVIEWS.map((review) => {
                const styles = MODE_STYLES[review.mode];
                const ModeIcon = styles.icon;
                return (
                  <article
                    key={review.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate('/review')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate('/review');
                      }
                    }}
                    className={`card-interactive overflow-hidden flex flex-col border ${styles.border} relative group cursor-pointer hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50`}
                  >
                    <div className={`absolute inset-0 ${styles.hover} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                    <div className="p-4 border-b border-border/30 flex justify-between items-center bg-void/50">
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-2 py-1 font-mono text-xs rounded border flex items-center gap-1 ${styles.badge}`}>
                          <ModeIcon className="w-3.5 h-3.5" aria-hidden="true" />
                          {styles.label}
                        </span>
                        <span className="px-2 py-1 bg-border-subtle text-muted font-mono text-xs rounded border border-border/50">
                          {review.language}
                        </span>
                      </div>
                      <time className="text-xs text-muted">{review.time}</time>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="text-lg font-bold text-text mb-2">{review.title}</h4>
                      <div className="bg-surface-code border border-border/30 p-3 rounded-lg overflow-hidden text-xs font-mono text-code/80 flex-1">
                        <pre className="line-clamp-4 whitespace-pre-wrap">
                          <code>{review.snippet}</code>
                        </pre>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
};

export default Dashboard;
