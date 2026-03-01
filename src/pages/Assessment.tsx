import { useState } from 'react';
import { useBeacon } from '@/context/BeaconContext';
import { assessmentQuestions, streamRecommendations } from '@/data/mockData';
import { GlowCard, GoldButton, ProgressBar } from '@/components/UIComponents';
import { ChevronLeft, ChevronRight, CheckCircle, Brain, TrendingUp, MessageSquare, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categoryIcons: Record<string, React.ElementType> = {
  logical: Brain,
  numerical: TrendingUp,
  verbal: MessageSquare,
  interest: Heart,
};
const categoryColors: Record<string, string> = {
  logical: 'hsl(var(--primary))',
  numerical: 'hsl(var(--gold))',
  verbal: 'hsl(280 70% 55%)',
  interest: 'hsl(345 80% 55%)',
};

function computeResults(answers: Record<number, number>) {
  const cats = { logical: 0, numerical: 0, verbal: 0, interest: 0 };
  const totals = { logical: 0, numerical: 0, verbal: 0, interest: 0 };
  assessmentQuestions.forEach(q => {
    const cat = q.category as keyof typeof cats;
    totals[cat]++;
    if (q.answer >= 0 && answers[q.id] === q.answer) cats[cat]++;
  });
  const logical = Math.round((cats.logical / totals.logical) * 100);
  const numerical = Math.round((cats.numerical / totals.numerical) * 100);
  const verbal = Math.round((cats.verbal / totals.verbal) * 100);
  // Map interest to stream
  const interestAnswers = assessmentQuestions.filter(q => q.category === 'interest').map(q => answers[q.id]);
  const sciCount = interestAnswers.filter(a => a === 0 || a === 2).length;
  const artCount = interestAnswers.filter(a => a === 1 || a === 3).length;
  const comCount = interestAnswers.filter(a => a === 2).length;
  const interest = Math.round(((sciCount + artCount) / 4) * 100);

  let stream = 'Science';
  let max = sciCount;
  if (artCount > max) { stream = 'Arts'; max = artCount; }
  if (logical + numerical > 150) stream = 'Science';
  if (verbal > 75 && artCount >= 2) stream = 'Arts';
  const confidence = Math.round(((logical + numerical + verbal) / 3 * 0.6 + (max / 4) * 100 * 0.4));

  return { logical, numerical, verbal, interest, recommendedStream: stream, confidence: Math.min(95, Math.max(60, confidence)) };
}

export default function Assessment() {
  const { updateAssessment } = useBeacon();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof computeResults> | null>(null);

  const q = assessmentQuestions[current];
  const progress = ((current + 1) / assessmentQuestions.length) * 100;
  const answered = Object.keys(answers).length;
  const Icon = categoryIcons[q.category];

  const handleSelect = (idx: number) => setAnswers(prev => ({ ...prev, [q.id]: idx }));

  const handleSubmit = () => {
    const res = computeResults(answers);
    setResults(res);
    updateAssessment({ ...res, completed: true });
    setSubmitted(true);
    setShowConfirm(false);
  };

  if (submitted && results) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--gradient-gold)', boxShadow: '0 0 30px hsl(var(--gold) / 0.5)' }}>
            <CheckCircle className="w-10 h-10" style={{ color: 'hsl(var(--foreground))' }} />
          </div>
          <h1 className="text-2xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>Assessment Complete!</h1>
          <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Here's your performance breakdown</p>
        </div>
        <GlowCard gold>
          <div className="text-center mb-6 p-4 rounded-xl" style={{ background: 'var(--gradient-hero)' }}>
            <div className="text-4xl font-display font-bold gradient-text">{results.recommendedStream}</div>
            <div className="text-xs mt-1" style={{ color: 'hsl(0 0% 70%)' }}>Recommended Stream</div>
            <div className="mt-3 inline-block px-4 py-1 rounded-full text-sm font-bold" style={{ background: 'var(--gradient-gold)', color: 'hsl(var(--foreground))' }}>
              {results.confidence}% Confidence Match
            </div>
          </div>
          <div className="space-y-4">
            <ProgressBar value={results.logical} label="Logical Reasoning" />
            <ProgressBar value={results.numerical} label="Numerical Ability" />
            <ProgressBar value={results.verbal} label="Verbal Ability" />
            <ProgressBar value={results.interest} label="Interest Mapping" />
          </div>
        </GlowCard>
        <GoldButton onClick={() => navigate('/recommendations')} className="w-full text-center text-base py-4">
          View Full Recommendations →
        </GoldButton>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>Aptitude Assessment</h1>
          <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Question {current + 1} of {assessmentQuestions.length}</p>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Answered</div>
          <div className="font-bold" style={{ color: 'hsl(var(--gold))' }}>{answered}/{assessmentQuestions.length}</div>
        </div>
      </div>

      <div className="mb-6">
        <ProgressBar value={progress} showPercent={false} />
      </div>

      <GlowCard className="mb-6">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${categoryColors[q.category]}20` }}>
            <Icon className="w-4 h-4" style={{ color: categoryColors[q.category] }} />
          </div>
          <span className="text-xs font-semibold capitalize px-2 py-0.5 rounded-full"
            style={{ background: `${categoryColors[q.category]}15`, color: categoryColors[q.category] }}>
            {q.category.replace('_', ' ')}
          </span>
        </div>

        <h2 className="text-base font-semibold mb-6 leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i;
            return (
              <button key={i} onClick={() => handleSelect(i)}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: selected ? 'hsl(var(--gold) / 0.12)' : 'hsl(var(--muted))',
                  border: selected ? '1.5px solid hsl(var(--gold))' : '1.5px solid hsl(var(--border))',
                  color: selected ? 'hsl(var(--foreground))' : 'hsl(var(--foreground) / 0.8)',
                  boxShadow: selected ? '0 0 12px hsl(var(--gold) / 0.2)' : 'none',
                }}>
                <span className="inline-block w-6 h-6 rounded-full text-xs font-bold mr-3 text-center leading-6"
                  style={{ background: selected ? 'var(--gradient-gold)' : 'hsl(var(--border))', color: selected ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                  {['A', 'B', 'C', 'D'][i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </GlowCard>

      <div className="flex gap-3">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
          style={{ border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <div className="flex-1" />
        {current < assessmentQuestions.length - 1 ? (
          <button onClick={() => setCurrent(c => Math.min(assessmentQuestions.length - 1, c + 1))}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all btn-gold"
            style={{ color: 'hsl(var(--foreground))' }}>
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <GoldButton onClick={() => setShowConfirm(true)}>Submit Assessment</GoldButton>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(var(--foreground) / 0.5)', backdropFilter: 'blur(8px)' }}>
          <GlowCard gold className="max-w-sm w-full text-center">
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'hsl(var(--foreground))' }}>Submit Assessment?</h3>
            <p className="text-sm mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              You've answered <strong style={{ color: 'hsl(var(--gold))' }}>{answered}</strong> out of {assessmentQuestions.length} questions.
            </p>
            {answered < assessmentQuestions.length && (
              <p className="text-xs mb-4 p-2 rounded-lg" style={{ background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }}>
                {assessmentQuestions.length - answered} questions unanswered. You can still submit.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ border: '1.5px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>Cancel</button>
              <GoldButton onClick={handleSubmit} className="flex-1 text-center">Confirm & Submit</GoldButton>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  );
}
