import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  LayoutDashboard,
  PlusSquare,
  History,
  UserCircle,
  Moon,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'review', label: 'New Review', icon: PlusSquare, path: '/review' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'profile', label: 'Profile', icon: UserCircle, path: '/profile' },
];

const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) => item.id !== 'history');

export function AppLogo({ size = 'md', onClick }) {
  const iconSize = size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';
  const textSize = size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go to home"
      className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg"
    >
      <Terminal className={`text-accent ${iconSize}`} />
      <span className={`${textSize} font-bold text-accent tracking-tight`}>Code Buddy</span>
    </button>
  );
}

function NavButton({ item, onNavigate, className = '', ...props }) {
  const Icon = item.icon;
  return (
    <button type="button" onClick={() => onNavigate(item.path)} className={className} {...props}>
      <Icon className="w-5 h-5 group-hover:text-accent transition-colors" />
      {item.label}
    </button>
  );
}

export default function AppShell({
  activeNav,
  layout = 'sidebar',
  children,
  mainClassName = '',
  headerExtra,
  showThemeToggle = false,
}) {
  const navigate = useNavigate();

  const sidebarBtnClass = (id) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all w-full text-left group border ${
      activeNav === id
        ? 'nav-active'
        : 'text-muted hover:bg-surface-hover/50 hover:text-accent border-transparent'
    }`;

  const mobileNavBtnClass = (id) =>
    `flex flex-col items-center justify-center font-semibold transition-all duration-150 min-w-[4.5rem] py-1.5 rounded-xl ${
      activeNav === id
        ? 'text-accent bg-accent-muted/10 shadow-[0_0_15px_rgba(192,193,255,0.2)]'
        : 'text-muted hover:text-accent'
    }`;

  const headerNavClass = (id) =>
    `text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors border ${
      activeNav === id
        ? 'nav-active'
        : 'text-muted hover:text-text hover:bg-surface-hover/50 border-transparent'
    }`;

  return (
    <div className="page-shell min-h-screen flex flex-col md:flex-row overflow-hidden antialiased">
      {layout === 'sidebar' && (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface/80 backdrop-blur-md border-b border-border/30 md:hidden">
          <AppLogo onClick={() => navigate('/')} />
        </header>
      )}

      {layout === 'sidebar' && (
        <aside className="relative z-10 hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-border/30 bg-surface/80 backdrop-blur-md p-8">
          <div className="mb-10">
            <AppLogo size="lg" onClick={() => navigate('/')} />
          </div>

          <nav className="flex flex-col gap-2 flex-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                onNavigate={navigate}
                className={sidebarBtnClass(item.id) + (item.id === 'profile' ? ' mt-auto' : '')}
                aria-current={activeNav === item.id ? 'page' : undefined}
              />
            ))}
          </nav>
        </aside>
      )}

      {layout === 'header' && (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-surface/80 backdrop-blur-md border-b border-border/30">
          <AppLogo onClick={() => navigate('/')} />
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.filter((i) => i.id !== 'history').map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={activeNav === item.id ? 'page' : undefined}
                className={headerNavClass(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {headerExtra}
            {showThemeToggle && (
              <button
                type="button"
                aria-label="Toggle theme"
                className="text-accent hover:bg-surface-hover/50 p-2 rounded-full transition-colors active:scale-95"
              >
                <Moon className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>
      )}

      <main
        className={`relative z-10 flex-1 w-full overflow-y-auto h-screen ${
          layout === 'sidebar'
            ? 'pt-20 pb-24 md:pt-8 md:pb-8 md:pl-[calc(16rem+2rem)] px-4 md:pr-8'
            : 'pt-16 pb-24 md:pb-4'
        } ${mainClassName}`}
      >
        {children}
      </main>

      <nav
        className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 h-20 bg-surface/90 backdrop-blur-lg border-t border-border/20 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] rounded-t-xl"
        aria-label="Mobile navigation"
      >
        {(layout === 'sidebar' ? NAV_ITEMS : MOBILE_NAV_ITEMS).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              aria-current={activeNav === item.id ? 'page' : undefined}
              className={mobileNavBtnClass(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="mt-1 text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
