import { useState } from 'react';
import { useBeacon } from '@/context/BeaconContext';
import { GlowCard, GoldButton } from '@/components/UIComponents';
import { interestTags, careerGoalTags } from '@/data/mockData';
import { User, BookOpen, Heart, MapPin, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Academic Details', 'Interests', 'Location & Goals'];

const subjects10 = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'];
const subjects12Science = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'];
const subjects12Commerce = ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'];
const subjects12Arts = ['History', 'Geography', 'Political Science', 'Psychology', 'Sociology', 'English'];

export default function Profile() {
  const { profile, updateProfile } = useBeacon();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  const subjectsList = profile.class === '10' ? subjects10
    : profile.class === '12-Science' ? subjects12Science
    : profile.class === '12-Commerce' ? subjects12Commerce
    : profile.class === '12-Arts' ? subjects12Arts : subjects12Science;

  const toggleTag = (list: string[], tag: string, key: 'interests' | 'careerGoals') => {
    const updated = list.includes(tag) ? list.filter(t => t !== tag) : [...list, tag];
    updateProfile({ [key]: updated });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/assessment'); }, 1500);
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-display font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Student Profile</h1>
      <p className="text-sm mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>Complete your profile to get personalized recommendations.</p>

      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <button onClick={() => setStep(i)}
              className="flex items-center gap-2 transition-all">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all`}
                style={{
                  background: i <= step ? 'var(--gradient-gold)' : 'hsl(var(--muted))',
                  color: i <= step ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                }}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block`}
                style={{ color: i === step ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                {s}
              </span>
            </button>
            {i < STEPS.length - 1 && <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />}
          </div>
        ))}
      </div>

      {/* Step 0: Academic */}
      {step === 0 && (
        <GlowCard className="space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Academic Details</h2>
          </div>
          {[
            { label: 'Full Name', placeholder: 'Enter your full name', key: 'name', type: 'text' },
            { label: 'School Name', placeholder: 'Enter your school', key: 'school', type: 'text' },
          ].map(({ label, placeholder, key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(var(--foreground))' }}>{label}</label>
              <input type={type} placeholder={placeholder} value={(profile as any)[key]}
                onChange={e => updateProfile({ [key]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
                style={{ background: 'hsl(var(--muted))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                onFocus={e => { e.target.style.borderColor = 'hsl(var(--gold))'; e.target.style.boxShadow = '0 0 0 3px hsl(var(--gold) / 0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'hsl(var(--border))'; e.target.style.boxShadow = 'none'; }} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(var(--foreground))' }}>Class</label>
            <select value={profile.class} onChange={e => updateProfile({ class: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'hsl(var(--muted))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
              <option value="">Select Class</option>
              <option value="10">Class 10</option>
              <option value="12-Science">Class 12 - Science</option>
              <option value="12-Commerce">Class 12 - Commerce</option>
              <option value="12-Arts">Class 12 - Arts</option>
            </select>
          </div>
          {profile.class && (
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'hsl(var(--foreground))' }}>Marks (%) by Subject</label>
              <div className="grid grid-cols-2 gap-3">
                {subjectsList.map(sub => (
                  <div key={sub}>
                    <label className="block text-xs mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{sub}</label>
                    <input type="number" min="0" max="100" placeholder="0-100"
                      value={profile.marks[sub] || ''}
                      onChange={e => updateProfile({ marks: { ...profile.marks, [sub]: Number(e.target.value) } })}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: 'hsl(var(--muted))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                      onFocus={e => { e.target.style.borderColor = 'hsl(var(--gold))'; }}
                      onBlur={e => { e.target.style.borderColor = 'hsl(var(--border))'; }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <GoldButton onClick={() => setStep(1)} className="w-full text-center justify-center">Next: Interests →</GoldButton>
        </GlowCard>
      )}

      {/* Step 1: Interests */}
      {step === 1 && (
        <GlowCard className="space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Your Interests</h2>
          </div>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Select all topics that interest you:</p>
          <div className="flex flex-wrap gap-2">
            {interestTags.map(tag => {
              const sel = profile.interests.includes(tag);
              return (
                <button key={tag} onClick={() => toggleTag(profile.interests, tag, 'interests')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: sel ? 'var(--gradient-gold)' : 'hsl(var(--muted))',
                    color: sel ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                    border: sel ? '1.5px solid hsl(var(--gold))' : '1.5px solid hsl(var(--border))',
                    boxShadow: sel ? '0 0 8px hsl(var(--gold) / 0.4)' : 'none',
                  }}>
                  {tag}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
              style={{ border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>← Back</button>
            <GoldButton onClick={() => setStep(2)} className="flex-1 text-center">Next: Goals →</GoldButton>
          </div>
        </GlowCard>
      )}

      {/* Step 2: Location & Goals */}
      {step === 2 && (
        <GlowCard className="space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="font-display font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Location & Career Goals</h2>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(var(--foreground))' }}>Preferred Location</label>
            <input type="text" placeholder="e.g. New Delhi, Mumbai..." value={profile.location}
              onChange={e => updateProfile({ location: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'hsl(var(--muted))', border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              onFocus={e => { e.target.style.borderColor = 'hsl(var(--gold))'; }}
              onBlur={e => { e.target.style.borderColor = 'hsl(var(--border))'; }} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: 'hsl(var(--foreground))' }}>Career Goals (select up to 5):</p>
            <div className="flex flex-wrap gap-2">
              {careerGoalTags.map(tag => {
                const sel = profile.careerGoals.includes(tag);
                return (
                  <button key={tag} onClick={() => toggleTag(profile.careerGoals, tag, 'careerGoals')}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: sel ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--muted))',
                      color: sel ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                      border: sel ? '1.5px solid hsl(var(--primary))' : '1.5px solid hsl(var(--border))',
                    }}>
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm font-medium"
              style={{ border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>← Back</button>
            <GoldButton onClick={handleSave} className="flex-1 text-center flex items-center justify-center gap-2">
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : 'Save & Continue →'}
            </GoldButton>
          </div>
        </GlowCard>
      )}
    </div>
  );
}
