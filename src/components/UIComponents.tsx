import React, { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  gold?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export const GlowCard = ({ children, className = '', gold = false, glass = false, onClick }: GlowCardProps) => (
  <div
    onClick={onClick}
    className={`glow-card ${gold ? 'glow-card-gold' : ''} ${glass ? 'glass-card' : ''} p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

export const GoldButton = ({ children, className = '', onClick, type = 'button', disabled = false }: {
  children: ReactNode; className?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn-gold px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    style={{ color: 'hsl(var(--foreground))' }}>
    {children}
  </button>
);

export const VioletOutlineButton = ({ children, className = '', onClick, style }: {
  children: ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties;
}) => (
  <button
    onClick={onClick}
    style={style}
    className={`btn-violet-outline px-6 py-3 rounded-xl text-sm ${className}`}>
    {children}
  </button>
);

export const GoldBadge = ({ children }: { children: ReactNode }) => (
  <span className="gold-badge">{children}</span>
);

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
}

export const ProgressBar = ({ value, max = 100, label, showPercent = true }: ProgressBarProps) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-2 text-sm font-medium">
          {label && <span style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</span>}
          {showPercent && <span style={{ color: 'hsl(var(--gold))' }}>{pct}%</span>}
        </div>
      )}
      <div className="h-2.5 rounded-full w-full" style={{ background: 'hsl(var(--muted))' }}>
        <div
          className="h-2.5 rounded-full transition-all duration-700 progress-gold"
          style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};
