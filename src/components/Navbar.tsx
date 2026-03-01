import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Colleges', href: '/colleges' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname !== '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ background: 'hsl(var(--primary-deep) / 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid hsl(var(--primary) / 0.2)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow"
            style={{ background: 'var(--gradient-gold)' }}>
            <Compass className="w-5 h-5" style={{ color: 'hsl(var(--foreground))' }} />
          </div>
          <span className="text-xl font-display font-bold gradient-text">Beacon</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!isDashboard && navLinks.map(link => (
            <a key={link.label} href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'hsl(0 0% 85%)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'hsl(var(--gold))')}
              onMouseLeave={e => (e.currentTarget.style.color = 'hsl(0 0% 85%)')}>
              {link.label}
            </a>
          ))}
          <Link to="/dashboard"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 btn-gold"
            style={{ color: 'hsl(var(--foreground))' }}>
            {isDashboard ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-4" style={{ borderTop: '1px solid hsl(var(--primary) / 0.2)', paddingTop: '1rem' }}>
          {!isDashboard && navLinks.map(link => (
            <a key={link.label} href={link.href} className="text-sm font-medium" style={{ color: 'hsl(0 0% 85%)' }} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link to="/dashboard" className="px-4 py-2 rounded-lg text-sm font-semibold text-center btn-gold" style={{ color: 'hsl(var(--foreground))' }} onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};
