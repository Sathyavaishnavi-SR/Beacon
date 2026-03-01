import { Link } from 'react-router-dom';
import { Brain, Map, BookOpen, Building2, ArrowRight, ChevronDown } from 'lucide-react';
import heroIllustration from '@/assets/hero-illustration.png';
import { GoldButton, VioletOutlineButton, GlowCard } from '@/components/UIComponents';
import { useEffect, useRef } from 'react';

// Floating particles background
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 8,
    gold: i % 3 === 0,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            background: p.gold ? 'hsl(var(--gold) / 0.7)' : 'hsl(var(--primary-glow) / 0.5)',
            boxShadow: p.gold ? '0 0 6px hsl(var(--gold) / 0.8)' : '0 0 6px hsl(var(--primary-glow) / 0.6)',
            animation: `particle-rise ${p.duration}s ${p.delay}s linear infinite`,
          }} />
      ))}
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" style={{ background: 'hsl(var(--primary) / 0.08)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full" style={{ background: 'hsl(var(--gold) / 0.06)', filter: 'blur(80px)' }} />
    </div>
  );
};

const features = [
  { icon: Brain, title: 'AI-Based Aptitude Assessment', desc: 'Scientifically designed MCQ test covering logical, numerical, verbal, and interest mapping domains.' },
  { icon: Map, title: 'Personalized Stream Recommendations', desc: 'Get data-driven stream recommendations (Science/Commerce/Arts) based on your unique aptitude profile.' },
  { icon: ArrowRight, title: 'Career Path Mapping', desc: 'Visualize your journey from stream selection to degree programs to rewarding career options.' },
  { icon: Building2, title: 'Government College Directory', desc: 'Explore top government colleges with filters by stream, location, eligibility, and facilities.' },
];

const steps = [
  { num: '01', title: 'Create Your Profile', desc: 'Fill in your academic details, subjects, marks, and personal interests.' },
  { num: '02', title: 'Take Aptitude Assessment', desc: 'Complete our scientifically designed 16-question assessment.' },
  { num: '03', title: 'Get Stream Recommendation', desc: 'Receive AI-powered recommendation with confidence scoring.' },
  { num: '04', title: 'Explore Colleges & Careers', desc: 'Discover the best government colleges and career paths for your stream.' },
];

export default function Landing() {
  return (
    <div style={{ background: 'var(--gradient-surface)' }}>
      {/* Hero */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">
        <Particles />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
              style={{ background: 'hsl(var(--gold) / 0.15)', border: '1px solid hsl(var(--gold) / 0.3)', color: 'hsl(var(--gold))' }}>
              🎓 Class 10 & 12 Career Guidance Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6" style={{ color: 'hsl(0 0% 100%)' }}>
              Beacon —{' '}
              <span className="gradient-text text-glow-gold block">Illuminating Your</span>
              Academic & Career Path
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'hsl(0 0% 75%)' }}>
              AI-driven personalized career & education guidance for confident decision-making. Find your perfect stream, degree, and career path today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/assessment">
                <GoldButton className="text-base px-8 py-4 rounded-2xl flex items-center gap-2">
                  Start Free Assessment <ArrowRight className="w-4 h-4" />
                </GoldButton>
              </Link>
              <Link to="/colleges">
              <button className="text-base px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-300"
                  style={{ borderColor: 'hsl(0 0% 60%)', color: 'hsl(0 0% 85%)', background: 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'hsl(0 0% 100% / 0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                  Explore Government Colleges
                </button>
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {[['10K+', 'Students Guided'], ['50+', 'Career Paths'], ['200+', 'Colleges Listed']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-display font-bold gradient-text">{n}</div>
                  <div className="text-xs" style={{ color: 'hsl(0 0% 60%)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <div className="relative animate-float-slow">
              <div className="absolute inset-0 rounded-3xl" style={{ background: 'hsl(var(--primary) / 0.15)', filter: 'blur(40px)', transform: 'scale(1.1)' }} />
              <img src={heroIllustration} alt="Beacon career guidance illustration" className="relative rounded-3xl w-full max-w-md shadow-2xl" style={{ border: '1px solid hsl(var(--primary) / 0.3)' }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6" style={{ color: 'hsl(var(--gold) / 0.6)' }} />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              Everything You Need to{' '}
              <span className="gradient-text-violet">Choose Right</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Beacon combines AI-powered assessment with comprehensive college data to guide every student.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <GlowCard key={title} gold className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--primary))' }}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: 'hsl(var(--accent) / 0.3)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'hsl(var(--gold) / 0.15)', color: 'hsl(var(--gold-dark))' }}>
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              How <span className="gradient-text">Beacon Works</span>
            </h2>
          </div>
          <div className="relative">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex gap-6 pb-10 last:pb-0">
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, hsl(var(--gold)), hsl(var(--primary)))' }} />
                )}
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm z-10"
                  style={{ background: 'var(--gradient-gold)', color: 'hsl(var(--foreground))', boxShadow: '0 0 16px hsl(var(--gold) / 0.5)' }}>
                  {step.num}
                </div>
                <div className="pt-2 pb-2">
                  <h3 className="font-display font-semibold text-lg mb-1" style={{ color: 'hsl(var(--foreground))' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/assessment">
              <GoldButton className="text-base px-10 py-4 rounded-2xl">
                Begin Your Journey →
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6" style={{ background: 'hsl(var(--primary-deep))', color: 'hsl(0 0% 85%)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-gold)' }}>
                <BookOpen className="w-5 h-5" style={{ color: 'hsl(var(--foreground))' }} />
              </div>
              <span className="text-xl font-display font-bold gradient-text">Beacon</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(0 0% 60%)' }}>
              Illuminating academic and career paths for Class 10 & 12 students across India through AI-powered, personalized guidance.
            </p>
            <div className="text-xs px-3 py-2 rounded-lg" style={{ background: 'hsl(var(--gold) / 0.1)', border: '1px solid hsl(var(--gold) / 0.2)', color: 'hsl(var(--gold-light))' }}>
              🏛️ Designed for Government Collaboration & Institutional Deployment
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 gradient-text">Platform</h4>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'hsl(0 0% 60%)' }}>
              <Link to="/assessment" className="hover:text-gold-light transition-colors">Start Assessment</Link>
              <Link to="/colleges" className="hover:text-gold-light transition-colors">College Directory</Link>
              <Link to="/recommendations" className="hover:text-gold-light transition-colors">Recommendations</Link>
              <Link to="/profile" className="hover:text-gold-light transition-colors">Student Profile</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 gradient-text">Contact</h4>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'hsl(0 0% 60%)' }}>
              <span>📧 hello@beacon.edu.in</span>
              <span>📞 1800-XXX-XXXX (Toll Free)</span>
              <span>🏢 New Delhi, India</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6" style={{ borderTop: '1px solid hsl(var(--primary) / 0.3)' }}>
          <p className="text-xs text-center" style={{ color: 'hsl(0 0% 45%)' }}>
            © 2024 Beacon — AI Career Guidance Platform. All rights reserved. | Built for India's Students.
          </p>
        </div>
      </footer>
    </div>
  );
}
