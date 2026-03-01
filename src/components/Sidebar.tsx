import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, ClipboardList, Star, Building2, Compass, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: ClipboardList, label: 'Assessment', href: '/assessment' },
  { icon: Star, label: 'Recommendations', href: '/recommendations' },
  { icon: Building2, label: 'Colleges', href: '/colleges' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} min-h-screen relative`}
      style={{ background: 'var(--gradient-hero)', borderRight: '1px solid hsl(var(--primary) / 0.2)' }}>
      
      {/* Logo */}
      <div className={`flex items-center gap-3 p-5 border-b ${collapsed ? 'justify-center' : ''}`} style={{ borderColor: 'hsl(var(--primary) / 0.2)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-glow"
          style={{ background: 'var(--gradient-gold)' }}>
          <Compass className="w-5 h-5" style={{ color: 'hsl(var(--foreground))' }} />
        </div>
        {!collapsed && <span className="text-xl font-display font-bold gradient-text">Beacon</span>}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-6 px-2 flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = location.pathname === href;
          return (
            <Link key={href} to={href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${collapsed ? 'justify-center' : ''}`}
              style={{
                background: active ? 'hsl(var(--gold) / 0.15)' : 'transparent',
                borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                color: active ? 'hsl(var(--gold))' : 'hsl(0 0% 80%)',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'hsl(var(--primary) / 0.2)'; e.currentTarget.style.color = 'hsl(0 0% 95%)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'hsl(0 0% 80%)'; } }}>
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200`}
        style={{ background: 'hsl(var(--gold))', color: 'hsl(var(--foreground))', boxShadow: '0 0 10px hsl(var(--gold) / 0.4)' }}>
        <ChevronLeft className={`w-3 h-3 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </aside>
  );
};
