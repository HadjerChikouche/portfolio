'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlueprintOverlay from './BlueprintOverlay';

const EASE = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = 'design-studio';

const ACCENTS = [
  { name: 'Ember', value: '#E85D04' },
  { name: 'Cobalt', value: '#2D5BFF' },
  { name: 'Pine', value: '#1F7A4D' },
  { name: 'Rose', value: '#D6336C' },
  { name: 'Iris', value: '#6D5BFF' },
] as const;

type ThemeKey = 'system' | 'paper' | 'ink';

const THEMES: Record<ThemeKey, Record<string, string> | null> = {
  system: null,
  paper: { background: '#FAFAF8', foreground: '#111110', muted: '#6B6B63', border: '#E8E5DF' },
  ink: { background: '#111110', foreground: '#FAFAF8', muted: '#9A9A92', border: '#2A2A27' },
};

const SCALE_MIN = 85;
const SCALE_MAX = 120;
const SCALE_STEP = 5;
const SCALE_DEFAULT = 100;

type State = { accent: string; theme: ThemeKey; scale: number };
const DEFAULT_STATE: State = { accent: ACCENTS[0].value, theme: 'system', scale: SCALE_DEFAULT };

/** Push the current token state onto the document root as inline CSS variables. */
function applyTokens(state: State) {
  const root = document.documentElement;

  if (state.accent !== DEFAULT_STATE.accent) root.style.setProperty('--color-accent', state.accent);
  else root.style.removeProperty('--color-accent');

  const themeVars = THEMES[state.theme];
  (['background', 'foreground', 'muted', 'border'] as const).forEach((key) => {
    const value = themeVars?.[key];
    if (value) root.style.setProperty(`--color-${key}`, value);
    else root.style.removeProperty(`--color-${key}`);
  });

  if (state.scale !== SCALE_DEFAULT) root.style.fontSize = `${(16 * state.scale) / 100}px`;
  else root.style.fontSize = '';
}

export default function DesignStudio() {
  const t = useTranslations('studio');
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load any persisted token choices once, on mount.
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  // Apply + persist whenever the token state changes (after the initial load).
  useEffect(() => {
    if (!mounted) return;
    applyTokens(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [state, mounted]);

  // Global shortcuts: G toggles the grid anywhere, Escape backs out.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'SELECT' ||
          el.isContentEditable)
      ) {
        return;
      }
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        setBlueprint((b) => !b);
      } else if (e.key === 'Escape') {
        if (open) {
          setOpen(false);
          launcherRef.current?.focus();
        } else if (blueprint) {
          setBlueprint(false);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, blueprint]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const reset = useCallback(() => setState(DEFAULT_STATE), []);
  const isDefault =
    state.accent === DEFAULT_STATE.accent &&
    state.theme === DEFAULT_STATE.theme &&
    state.scale === DEFAULT_STATE.scale;

  // Avoid SSR/client markup divergence — render nothing until mounted.
  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>{blueprint && <BlueprintOverlay />}</AnimatePresence>

      {/* Launcher */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t('close') : t('open')}
        aria-expanded={open}
        aria-controls="design-studio-panel"
        data-hide-cursor
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        className="fixed bottom-6 right-6 z-[60] grid place-items-center w-11 h-11 border border-border bg-background/90 backdrop-blur-md text-foreground hover:text-accent hover:border-accent transition-colors"
      >
        {open ? <X size={16} strokeWidth={1.5} /> : <SlidersHorizontal size={16} strokeWidth={1.5} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="design-studio-panel"
            role="dialog"
            aria-label={t('title')}
            tabIndex={-1}
            data-hide-cursor
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-20 right-6 z-[60] w-72 max-w-[calc(100vw-3rem)] border border-border bg-background p-5 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.18)] focus:outline-none"
          >
            <header className="mb-4">
              <h2 className="font-display font-700 text-sm tracking-wide">{t('title')}</h2>
              <p className="text-muted text-xs leading-relaxed mt-1">{t('subtitle')}</p>
            </header>

            {/* Blueprint toggle */}
            <Field label={t('blueprint')}>
              <button
                type="button"
                role="switch"
                aria-checked={blueprint}
                onClick={() => setBlueprint((b) => !b)}
                className="flex w-full items-center justify-between gap-3 group"
              >
                <span className="text-xs text-foreground">
                  {t('showGrid')} <kbd className="text-muted font-mono">G</kbd>
                </span>
                <span
                  className={cn(
                    'relative h-4 w-7 shrink-0 rounded-full border transition-colors',
                    blueprint ? 'border-accent bg-accent' : 'border-border bg-transparent'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all',
                      blueprint ? 'left-3 bg-background' : 'left-0.5 bg-muted'
                    )}
                  />
                </span>
              </button>
            </Field>

            {/* Accent */}
            <Field label={t('accent')}>
              <div className="flex items-center gap-2.5">
                {ACCENTS.map((a) => {
                  const selected = state.accent === a.value;
                  return (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, accent: a.value }))}
                      aria-label={a.name}
                      aria-pressed={selected}
                      title={a.name}
                      className={cn(
                        'h-5 w-5 rounded-full transition-transform hover:scale-110',
                        selected && 'ring-2 ring-offset-2 ring-foreground ring-offset-background'
                      )}
                      style={{ background: a.value }}
                    />
                  );
                })}
              </div>
            </Field>

            {/* Theme */}
            <Field label={t('theme')}>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
                  const selected = state.theme === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, theme: key }))}
                      aria-pressed={selected}
                      className={cn(
                        'border px-2 py-1.5 text-[11px] uppercase tracking-widest transition-colors',
                        selected
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border text-muted hover:text-foreground'
                      )}
                    >
                      {t(`theme_${key}`)}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Base scale */}
            <Field label={`${t('scale')} · ${state.scale}%`}>
              <input
                type="range"
                min={SCALE_MIN}
                max={SCALE_MAX}
                step={SCALE_STEP}
                value={state.scale}
                onChange={(e) => setState((s) => ({ ...s, scale: Number(e.target.value) }))}
                aria-label={t('scale')}
                className="w-full accent-accent cursor-pointer"
              />
            </Field>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-muted text-[11px] leading-snug pr-2">{t('hint')}</span>
              <button
                type="button"
                onClick={reset}
                disabled={isDefault}
                className="shrink-0 text-[11px] uppercase tracking-widest text-foreground hover:text-accent transition-colors disabled:opacity-30 disabled:hover:text-foreground"
              >
                {t('reset')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-[10px] uppercase tracking-widest text-muted">{label}</p>
      {children}
    </div>
  );
}
