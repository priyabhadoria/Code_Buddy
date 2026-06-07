import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronDown,
  Copy,
  AlignLeft,
  Flame,
  Bot,
  User,
  Lightbulb,
  Send,
  BrainCircuit,
  ShieldAlert,
  Check,
  Code2,
  MessageSquare,
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LANGUAGES = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++'];

const DEFAULT_CODE = `// Example implementation of a generic sorting algorithm
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
const sortedArray = quickSort(unsortedArray);`;

const DEMO_MESSAGES = [
  {
    role: 'assistant',
    content:
      "I'm ready to review your code. Paste it in the editor, pick a review mode, and click the action button — or ask me a question.",
  },
  {
    role: 'user',
    content: 'Can you review the quicksort implementation I just pasted?',
  },
  {
    role: 'assistant',
    content: 'performance-review',
  },
];

const ReviewInterface = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [currentMode, setCurrentMode] = useState('standard');
  const [leftPanelWidth, setLeftPanelWidth] = useState(55);
  const [codeSnippet, setCodeSnippet] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('TypeScript');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobilePanel, setMobilePanel] = useState('code');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [isReviewing, setIsReviewing] = useState(false);

  const mainContainerRef = useRef(null);
  const isResizingRef = useRef(false);
  const chatEndRef = useRef(null);
  const langMenuRef = useRef(null);

  const lineCount = Math.max(codeSnippet.split('\n').length, 1);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, mobilePanel]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const getModeStyles = () => {
    const ctaBtn = 'btn-cta text-xs font-semibold px-4 py-1.5 rounded-full';

    switch (currentMode) {
      case 'roast':
        return {
          panelClass: 'panel-roast',
          aiName: 'Code Buddy Destroyer',
          aiStatus: 'Roast Mode Engaged',
          aiColorClass: 'text-red-400',
          aiIconBg: 'bg-red-500/20',
          actionBtnClass:
            'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] text-xs font-semibold px-4 py-1.5 rounded-full disabled:opacity-60',
          actionText: 'Roast Code',
        };
      case 'strict':
        return {
          panelClass: '',
          aiName: 'Code Buddy Auditor',
          aiStatus: 'Strict Review Mode',
          aiColorClass: 'text-roast-muted',
          aiIconBg: 'bg-roast/20',
          actionBtnClass: ctaBtn,
          actionText: 'Review Code',
        };
      case 'explain':
        return {
          panelClass: '',
          aiName: 'Code Buddy Teacher',
          aiStatus: 'Exploratory Breakdowns',
          aiColorClass: 'text-emerald-400',
          aiIconBg: 'bg-emerald-500/20',
          actionBtnClass: ctaBtn,
          actionText: 'Review Code',
        };
      default:
        return {
          panelClass: '',
          aiName: 'Code Buddy Assistant',
          aiStatus: 'Standard Review Mode',
          aiColorClass: 'text-accent',
          aiIconBg: 'bg-accent/20',
          actionBtnClass: ctaBtn,
          actionText: 'Review Code',
        };
    }
  };

  const ui = getModeStyles();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setCodeSnippet(text);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSendMessage = useCallback(() => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setChatInput('');
    setIsReviewing(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            currentMode === 'roast'
              ? "Your code works, but it's giving 'copy-pasted from Stack Overflow at 2 AM' energy. Consider refactoring for clarity."
              : 'Thanks for your question! Connect the backend API to get live AI responses.',
        },
      ]);
      setIsReviewing(false);
    }, 1200);
  }, [chatInput, currentMode]);

  const handleReview = () => {
    if (!codeSnippet.trim()) return;
    setIsReviewing(true);
    if (!isDesktop) setMobilePanel('review');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: `Please ${ui.actionText.toLowerCase()} my ${language} code.` },
        {
          role: 'assistant',
          content: 'performance-review',
        },
      ]);
      setIsReviewing(false);
    }, 1500);
  };

  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderAssistantContent = (content) => {
    if (content === 'performance-review') {
      return (
        <>
          <p className="text-sm text-text">
            Looking at your <code className="text-accent bg-black/30 px-1 rounded">quickSort</code>{' '}
            implementation, it&apos;s functionally correct and easy to read. However, there are a few
            performance considerations:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted space-y-1">
            <li>
              It creates multiple new arrays on every recursive call via{' '}
              <code className="text-accent/80">filter</code> and the spread operator, leading to high
              memory overhead.
            </li>
            <li>
              For a truly efficient quicksort, perform the sorting in-place by swapping elements.
            </li>
          </ul>
          <div className="mt-2 bg-void p-2 rounded border border-border/30 flex items-center gap-2">
            <Lightbulb className="text-accent w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-text">
              Consider an in-place partition scheme (like Hoare or Lomuto) for production use.
            </span>
          </div>
        </>
      );
    }
    return <p className="text-sm text-text">{content}</p>;
  };

  const chatPanel = (
    <section className={`panel flex flex-col h-full flex-1 relative min-h-0 ${ui.panelClass}`}>
      <div className="panel-header p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full ${ui.aiIconBg} flex items-center justify-center ${ui.aiColorClass} transition-all duration-300`}
          >
            <Bot className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className={`font-bold text-base transition-colors duration-300 ${ui.aiColorClass}`}>
              {ui.aiName}
            </h2>
            <p className="text-xs text-muted">{ui.aiStatus}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-surface-chat min-h-0" role="log" aria-live="polite">
        {messages.map((msg, i) =>
          msg.role === 'user' ? (
            <div key={i} className="flex gap-3 max-w-[90%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-muted flex-shrink-0 mt-1">
                <User className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="bubble-user p-3 rounded-lg rounded-tr-none shadow-sm">
                <p className="text-sm text-text">{msg.content}</p>
              </div>
            </div>
          ) : (
            <div key={i} className="flex gap-3 max-w-[90%]">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="bubble-assistant p-3 rounded-lg rounded-tl-none shadow-sm flex flex-col gap-2">
                {renderAssistantContent(msg.content)}
              </div>
            </div>
          )
        )}
        {isReviewing && (
          <div className="flex gap-3 max-w-[90%]">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
              <Bot className="w-4 h-4 animate-pulse" aria-hidden="true" />
            </div>
            <div className="bubble-assistant p-3 rounded-lg rounded-tl-none">
              <p className="text-sm text-muted animate-pulse">Analyzing your code…</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="panel-header p-4 shrink-0">
        <div className="input-field relative flex items-center">
          <textarea
            className="w-full bg-transparent border-none py-3 pl-4 pr-12 text-sm text-text placeholder:text-subtle resize-none focus:outline-none focus:ring-0"
            placeholder="Ask a question or request a review…"
            rows={1}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleChatKeyDown}
            aria-label="Chat message"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!chatInput.trim() || isReviewing}
            aria-label="Send message"
            className="absolute right-2 p-2 text-accent hover:bg-accent/10 rounded-md transition-colors flex items-center justify-center disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 px-1 gap-2 flex-wrap">
          <span className="text-[11px] text-muted">Enter to send · Shift+Enter for new line</span>
          <button
            type="button"
            onClick={handleReview}
            disabled={!codeSnippet.trim() || isReviewing}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 active:scale-95 ${ui.actionBtnClass}`}
          >
            {isReviewing ? 'Reviewing…' : ui.actionText}
          </button>
        </div>
      </div>
    </section>
  );

  const codePanel = (
    <section
      className="panel flex flex-col h-full relative min-h-0"
      style={isDesktop ? { flex: `0 0 ${leftPanelWidth}%` } : undefined}
    >
      <div className="panel-header flex items-center justify-between p-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-1.5 px-1" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-border/50" />
            <div className="w-3 h-3 rounded-full bg-border/50" />
            <div className="w-3 h-3 rounded-full bg-border/50" />
          </div>

          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              aria-haspopup="listbox"
              aria-expanded={showLangMenu}
              className="flex items-center gap-2 text-muted hover:text-text transition-colors font-semibold text-xs px-2 py-1 rounded-lg bg-surface-input hover:bg-surface-hover border border-border/40"
            >
              <span>{language}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangMenu && (
              <ul
                role="listbox"
                className="absolute top-full left-0 mt-1 z-20 bg-surface-overlay border border-border/30 rounded-lg shadow-xl py-1 min-w-[140px]"
              >
                {LANGUAGES.map((lang) => (
                  <li key={lang}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={language === lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-surface-hover transition-colors ${
                        language === lang ? 'text-accent font-semibold' : 'text-muted'
                      }`}
                    >
                      {lang}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handlePaste}
            className="hidden sm:block px-2 py-1 rounded-lg text-xs text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            Paste
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setCodeSnippet((c) => c.trim())}
            aria-label="Format code"
            className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-surface-code overflow-auto flex min-h-0 font-mono text-sm leading-relaxed">
        <div
          className="flex flex-col text-right pr-4 pl-3 py-4 border-r border-border/30 select-none text-subtle min-w-[2.5rem] shrink-0"
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <span key={i + 1} className="leading-relaxed">
              {i + 1}
            </span>
          ))}
        </div>
        <textarea
          className="px-4 py-4 font-mono text-sm w-full overflow-x-auto bg-transparent border-none text-code focus:ring-0 resize-none focus:outline-none leading-relaxed"
          spellCheck={false}
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          placeholder="// Paste your code here…"
          aria-label="Code editor"
        />
      </div>

      <div className="panel-header p-3 flex flex-col sm:flex-row gap-2 justify-between items-center shrink-0">
        <span className="text-xs font-semibold tracking-wide text-muted">Review Mode</span>
        <div
          className="flex flex-wrap gap-1 bg-surface p-1 rounded-lg border border-border/20"
          role="radiogroup"
          aria-label="Review mode"
        >
          {[
            { id: 'standard', label: 'Standard', icon: null, title: 'Balanced feedback' },
            { id: 'strict', label: 'Strict', icon: ShieldAlert, title: 'Security & best practices' },
            { id: 'explain', label: 'Explain', icon: BrainCircuit, title: 'Line-by-line breakdown' },
            { id: 'roast', label: 'Roast', icon: Flame, title: 'Humorous but constructive', color: 'hover:text-red-400' },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                title={mode.title}
                onClick={() => setCurrentMode(mode.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                  isActive
                    ? mode.id === 'roast'
                      ? 'mode-pill-active-roast'
                      : 'mode-pill-active'
                    : `text-muted hover:text-text ${mode.color || ''}`
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );

  return (
    <AppShell
      activeNav="review"
      layout="header"
      showThemeToggle
      mainClassName="flex flex-col !overflow-hidden !pb-24 md:!pb-2 px-0"
    >
        {!isDesktop && (
          <div className="flex gap-1 p-2 shrink-0" role="tablist" aria-label="Editor panels">
            <button
              type="button"
              role="tab"
              aria-selected={mobilePanel === 'code'}
              onClick={() => setMobilePanel('code')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mobilePanel === 'code'
                  ? 'nav-active'
                  : 'text-muted hover:text-text hover:bg-surface-hover/50 border border-transparent'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Code
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobilePanel === 'review'}
              onClick={() => setMobilePanel('review')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mobilePanel === 'review'
                  ? 'nav-active'
                  : 'text-muted hover:text-text hover:bg-surface-hover/50 border border-transparent'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Review
            </button>
          </div>
        )}

        <div
          ref={mainContainerRef}
          className="flex-1 flex overflow-hidden p-2 gap-2 max-w-[1280px] mx-auto w-full relative min-h-0"
        >
          {(!isDesktop && mobilePanel === 'review') ? null : codePanel}

          {isDesktop && (
            <div
              className="hidden md:block w-1.5 shrink-0 hover:bg-accent active:bg-accent-indigo cursor-col-resize transition-colors duration-200 -mx-1 px-1"
              onMouseDown={handleMouseDown}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panels"
            />
          )}

          {isDesktop ? chatPanel : mobilePanel === 'review' && chatPanel}
        </div>
    </AppShell>
  );
};

export default ReviewInterface;
