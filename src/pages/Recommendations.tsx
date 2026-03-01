import { useBeacon } from '@/context/BeaconContext';
import { streamRecommendations } from '@/data/mockData';
import { GlowCard, GoldBadge, GoldButton, ProgressBar } from '@/components/UIComponents';
import { ArrowRight, ChevronDown, ChevronUp, Star, Briefcase, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Recommendations() {
  const { assessment } = useBeacon();
  const [openDeg, setOpenDeg] = useState(false);
  const [openCar, setOpenCar] = useState(false);

  if (!assessment.completed) {
    return (
      <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-96 text-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'hsl(var(--accent))' }}>
          <Star className="w-10 h-10" style={{ color: 'hsl(var(--primary))' }} />
        </div>
        <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>No Recommendations Yet</h2>
        <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>Complete the aptitude assessment to get personalized recommendations.</p>
        <Link to="/assessment"><GoldButton>Take Assessment Now →</GoldButton></Link>
      </div>
    );
  }

  const stream = assessment.recommendedStream as keyof typeof streamRecommendations;
  const data = streamRecommendations[stream] || streamRecommendations.Science;

  const streamColors = { Science: 'hsl(var(--primary))', Commerce: 'hsl(var(--gold))', Arts: 'hsl(280 70% 55%)' };
  const color = streamColors[stream] || 'hsl(var(--primary))';

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>Your Recommendations</h1>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Based on your aptitude profile and interests</p>
      </div>

      {/* Main Recommendation */}
      <GlowCard gold>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>RECOMMENDED STREAM</div>
            <div className="text-4xl font-display font-bold mb-1" style={{ color }}>
              {stream}
            </div>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {data.description}
            </p>
          </div>
          <div className="text-center p-4 rounded-2xl" style={{ background: `${color}15`, border: `1.5px solid ${color}40` }}>
            <div className="text-3xl font-display font-bold" style={{ color }}>{assessment.confidence}%</div>
            <div className="text-xs font-semibold mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Match Score</div>
            <GoldBadge>Top Match</GoldBadge>
          </div>
        </div>
      </GlowCard>

      {/* Score Breakdown */}
      <GlowCard>
        <h2 className="font-display font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Aptitude Breakdown</h2>
        <div className="space-y-4">
          <ProgressBar value={assessment.logical} label="Logical Reasoning" />
          <ProgressBar value={assessment.numerical} label="Numerical Ability" />
          <ProgressBar value={assessment.verbal} label="Verbal Ability" />
          <ProgressBar value={assessment.interest} label="Interest Alignment" />
        </div>
      </GlowCard>

      {/* Career Pathway: Stream → Degree → Career */}
      <GlowCard>
        <h2 className="font-display font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Your Career Pathway</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {[
            { label: 'Stream', value: stream, icon: Star, color },
            { label: 'Degree', value: data.degrees[0], icon: GraduationCap, color: 'hsl(var(--gold))' },
            { label: 'Career', value: data.careers[0], icon: Briefcase, color: 'hsl(280 70% 55%)' },
          ].map(({ label, value, icon: Icon, color: c }, i) => (
            <div key={label} className="flex sm:flex-col items-center gap-3 flex-1 w-full">
              <div className="p-4 rounded-2xl text-center flex-1 w-full"
                style={{ background: `${c}10`, border: `1.5px solid ${c}30` }}>
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: c }} />
                <div className="text-xs font-semibold mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</div>
                <div className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>{value}</div>
              </div>
              {i < 2 && <ArrowRight className="w-4 h-4 hidden sm:block flex-shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />}
            </div>
          ))}
        </div>
      </GlowCard>

      {/* Degrees */}
      <GlowCard>
        <button className="w-full flex items-center justify-between" onClick={() => setOpenDeg(!openDeg)}>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" style={{ color: 'hsl(var(--gold))' }} />
            <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Suggested Degree Programs</h2>
          </div>
          {openDeg ? <ChevronUp className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />}
        </button>
        {openDeg && (
          <div className="mt-4 space-y-2">
            {data.degrees.map(d => (
              <div key={d} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'hsl(var(--accent) / 0.5)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--gold))' }} />
                <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>{d}</span>
              </div>
            ))}
          </div>
        )}
      </GlowCard>

      {/* Careers */}
      <GlowCard>
        <button className="w-full flex items-center justify-between" onClick={() => setOpenCar(!openCar)}>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Career Paths</h2>
          </div>
          {openCar ? <ChevronUp className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />}
        </button>
        {openCar && (
          <div className="mt-4 grid sm:grid-cols-2 gap-2">
            {data.careers.map(c => (
              <div key={c} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'hsl(var(--accent) / 0.5)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>{c}</span>
              </div>
            ))}
          </div>
        )}
      </GlowCard>

      <Link to="/colleges">
        <GoldButton className="w-full text-center text-base py-4">Explore Matching Colleges →</GoldButton>
      </Link>
    </div>
  );
}
