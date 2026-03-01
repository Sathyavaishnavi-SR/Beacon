import { useState } from 'react';
import { colleges } from '@/data/mockData';
import { GlowCard, GoldBadge } from '@/components/UIComponents';
import { Search, MapPin, GraduationCap, Star, Phone, Filter } from 'lucide-react';

export default function Colleges() {
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const streams = ['All', 'Science', 'Commerce', 'Arts'];
  const locations = ['All', ...Array.from(new Set(colleges.map(c => c.location)))];

  const filtered = colleges.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchStream = streamFilter === 'All' || c.stream === streamFilter;
    const matchLoc = locationFilter === 'All' || c.location === locationFilter;
    return matchSearch && matchStream && matchLoc;
  });

  const streamColors: Record<string, string> = {
    Science: 'hsl(var(--primary))',
    Commerce: 'hsl(var(--gold))',
    Arts: 'hsl(280 70% 55%)',
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>Government College Directory</h1>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Explore top government colleges across India</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            type="text"
            placeholder="Search colleges or cities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            onFocus={e => { e.target.style.borderColor = 'hsl(var(--gold))'; e.target.style.boxShadow = '0 0 0 3px hsl(var(--gold) / 0.15)'; }}
            onBlur={e => { e.target.style.borderColor = 'hsl(var(--border))'; e.target.style.boxShadow = 'none'; }} />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <select value={streamFilter} onChange={e => setStreamFilter(e.target.value)}
              className="pl-9 pr-4 py-3 rounded-xl text-sm outline-none appearance-none"
              style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
              {streams.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
              className="pl-9 pr-4 py-3 rounded-xl text-sm outline-none appearance-none"
              style={{ background: 'hsl(var(--card))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
              {locations.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Showing <span style={{ color: 'hsl(var(--gold))' }}>{filtered.length}</span> colleges
      </div>

      {/* College Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(college => (
          <GlowCard key={college.id} gold className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-base leading-tight" style={{ color: 'hsl(var(--foreground))' }}>{college.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" style={{ color: 'hsl(var(--muted-foreground))' }} />
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{college.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3.5 h-3.5" style={{ fill: 'hsl(var(--gold))', color: 'hsl(var(--gold))' }} />
                <span className="text-xs font-bold" style={{ color: 'hsl(var(--gold))' }}>{college.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: `${streamColors[college.stream]}15`, color: streamColors[college.stream], border: `1px solid ${streamColors[college.stream]}30` }}>
                {college.stream}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                Est. {college.established}
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1.5" style={{ color: 'hsl(var(--muted-foreground))' }}>DEGREES OFFERED</div>
              <div className="flex flex-wrap gap-1">
                {college.degrees.map(d => (
                  <span key={d} className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}>{d}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                <div className="font-semibold mb-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Eligibility</div>
                <div style={{ color: 'hsl(var(--foreground))' }}>{college.eligibility}</div>
              </div>
              <div className="p-2 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                <div className="font-semibold mb-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Type</div>
                <div style={{ color: 'hsl(var(--foreground))' }}>{college.type}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1.5" style={{ color: 'hsl(var(--muted-foreground))' }}>FACILITIES</div>
              <div className="flex flex-wrap gap-1">
                {college.facilities.map(f => (
                  <span key={f} className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>{f}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 mt-auto" style={{ borderTop: '1px solid hsl(var(--border))' }}>
              <Phone className="w-3 h-3" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{college.contact}</span>
            </div>
          </GlowCard>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <GraduationCap className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>No colleges found matching your search.</p>
        </div>
      )}
    </div>
  );
}
