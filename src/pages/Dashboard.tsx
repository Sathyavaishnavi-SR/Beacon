import { Link } from 'react-router-dom';
import { useBeacon } from '@/context/BeaconContext';
import { GlowCard, GoldButton, ProgressBar, GoldBadge } from '@/components/UIComponents';
import { User, ClipboardList, Star, Building2, Bell, TrendingUp, MapPin, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const notifications = [
  { text: 'Your aptitude assessment is ready', time: '2 mins ago', icon: ClipboardList },
  { text: 'New colleges added in your location', time: '1 hour ago', icon: Building2 },
  { text: 'Complete your profile for better recommendations', time: '3 hours ago', icon: User },
];

export default function Dashboard() {
  const { profile, assessment } = useBeacon();

  const cards = [
    { icon: User, label: 'Profile', value: profile.name ? `${profile.name}` : 'Incomplete', sub: profile.class ? `Class ${profile.class}` : 'Add your details', to: '/profile', color: 'hsl(var(--primary))' },
    { icon: ClipboardList, label: 'Assessment', value: assessment.completed ? 'Completed' : 'Not Started', sub: assessment.completed ? `Score: ${Math.round((assessment.logical + assessment.numerical + assessment.verbal) / 3)}%` : 'Take the test', to: '/assessment', color: 'hsl(var(--gold))' },
    { icon: Star, label: 'Recommendation', value: assessment.recommendedStream || 'Pending', sub: assessment.completed ? `${assessment.confidence}% confidence` : 'Complete assessment first', to: '/recommendations', color: 'hsl(280 70% 55%)' },
    { icon: Building2, label: 'Colleges', value: '8 Nearby', sub: 'Government colleges', to: '/colleges', color: 'hsl(var(--primary))' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>
          Welcome back{profile.name ? `, ${profile.name}` : ''}! 👋
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Here's an overview of your career guidance journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ icon: Icon, label, value, sub, to, color }) => (
          <Link key={label} to={to}>
            <GlowCard gold className="flex flex-col gap-3 hover:shadow-glow-gold transition-all h-full">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <ArrowRight className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
              </div>
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</div>
                <div className="font-display font-bold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{sub}</div>
              </div>
            </GlowCard>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Assessment Progress */}
        <GlowCard className="md:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>
              Assessment Progress
            </h2>
            <TrendingUp className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
          </div>
          {assessment.completed ? (
            <div className="space-y-4">
              <ProgressBar value={assessment.logical} label="Logical Reasoning" />
              <ProgressBar value={assessment.numerical} label="Numerical Ability" />
              <ProgressBar value={assessment.verbal} label="Verbal Ability" />
              <ProgressBar value={assessment.interest} label="Interest Mapping" />
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'hsl(var(--accent))' }}>
                <ClipboardList className="w-8 h-8" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                You haven't taken the aptitude assessment yet. Start now to get personalized recommendations!
              </p>
              <Link to="/assessment">
                <GoldButton>Start Assessment</GoldButton>
              </Link>
            </div>
          )}
        </GlowCard>

        {/* Notifications */}
        <GlowCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>
              Notifications
            </h2>
            <Bell className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
          </div>
          <div className="space-y-3">
            {notifications.map(({ text, time, icon: Icon }) => (
              <div key={text} className="flex gap-3 items-start p-3 rounded-xl" style={{ background: 'hsl(var(--accent) / 0.5)' }}>
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                <div>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>{text}</p>
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>

      {/* Recommendations preview & Colleges */}
      {assessment.completed && (
        <div className="grid md:grid-cols-2 gap-6">
          <GlowCard gold>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Your Recommendation</h2>
              <GoldBadge>{assessment.confidence}% Match</GoldBadge>
            </div>
            <div className="p-4 rounded-xl mb-4 text-center" style={{ background: 'var(--gradient-hero)' }}>
              <div className="text-3xl font-display font-bold gradient-text">{assessment.recommendedStream}</div>
              <div className="text-xs mt-1" style={{ color: 'hsl(0 0% 70%)' }}>Recommended Stream</div>
            </div>
            <Link to="/recommendations">
              <GoldButton className="w-full justify-center text-center">View Full Recommendation →</GoldButton>
            </Link>
          </GlowCard>
          <GlowCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Nearby Colleges</h2>
              <MapPin className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            </div>
            <div className="space-y-3">
              {['IIT Delhi', 'Delhi University', 'AIIMS New Delhi'].map(c => (
                <div key={c} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'hsl(var(--accent) / 0.4)' }}>
                  <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>{c}</span>
                  <CheckCircle className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
                </div>
              ))}
            </div>
            <Link to="/colleges" className="block mt-4">
              <button className="w-full text-sm font-medium py-2 rounded-lg transition-colors"
                style={{ color: 'hsl(var(--primary))', background: 'hsl(var(--accent))' }}>
                View All Colleges →
              </button>
            </Link>
          </GlowCard>
        </div>
      )}
    </div>
  );
}
