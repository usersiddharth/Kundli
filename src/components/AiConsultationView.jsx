import React, { useState } from 'react';
import { CONSULTATION_TOPICS, generateAstrologicalInsight } from '../engine/aiConsultation.js';
import {
  Sparkles,
  MessageSquare,
  Briefcase,
  Heart,
  Coins,
  Activity,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  X,
} from 'lucide-react';

const iconMap = {
  Briefcase,
  Heart,
  Coins,
  Activity,
  GraduationCap,
  Sparkles,
};

export default function AiConsultationView({ kundliData, t, lang }) {
  const [selectedTopic, setSelectedTopic] = useState('career');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState(null);

  if (!kundliData) return null;

  const currentInsight = generateAstrologicalInsight(selectedTopic, kundliData, lang);

  const handleAskCustom = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    // Synthesis based on topic keywords
    let matchTopic = 'career';
    const qLower = customQuestion.toLowerCase();
    if (
      qLower.includes('marriage') ||
      qLower.includes('spouse') ||
      qLower.includes('love') ||
      qLower.includes('લગ્ન')
    )
      matchTopic = 'marriage';
    else if (
      qLower.includes('money') ||
      qLower.includes('wealth') ||
      qLower.includes('finance') ||
      qLower.includes('ધન') ||
      qLower.includes('પૈસા')
    )
      matchTopic = 'wealth';
    else if (
      qLower.includes('health') ||
      qLower.includes('illness') ||
      qLower.includes('સ્વાસ્થ્ય') ||
      qLower.includes('બીમારી')
    )
      matchTopic = 'health';
    else if (
      qLower.includes('study') ||
      qLower.includes('exam') ||
      qLower.includes('education') ||
      qLower.includes('વિદ્યા')
    )
      matchTopic = 'education';
    else if (
      qLower.includes('spirit') ||
      qLower.includes('god') ||
      qLower.includes('moksha') ||
      qLower.includes('ધર્મ') ||
      qLower.includes('મોક્ષ')
    )
      matchTopic = 'spirituality';

    const insight = generateAstrologicalInsight(matchTopic, kundliData, lang);
    setCustomAnswer(insight);
  };

  return (
    <div className="rounded-xl border border-[#e6dfd3] bg-[#fcfbf7] p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6dfd3] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#2c2825] font-serif flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#b85d19]" /> AI Astrologer (જ્યોતિષ પરામર્શ &
            માર્ગદર્શન)
          </h2>
          <p className="text-xs text-[#736a60]">
            Interactive personalized astrological guidance synthesizing all houses, lords, and
            planetary strengths
          </p>
        </div>
      </div>

      {/* Topic Selection Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {CONSULTATION_TOPICS.map((topic) => {
          const Icon = iconMap[topic.icon] || Sparkles;
          const isSelected = selectedTopic === topic.id;

          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic.id);
                setCustomAnswer(null);
              }}
              className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center text-xs transition shadow-2xs space-y-2 ${
                isSelected
                  ? 'border-[#b85d19] bg-[#2c2825] text-[#f4ebd9] shadow-sm ring-2 ring-[#b85d19]/20'
                  : 'border-[#e6dfd3] bg-[#fffdfa] text-[#2c2825] hover:bg-[#f5efe6]'
              }`}
            >
              <Icon className={`h-5 w-5 ${isSelected ? 'text-[#f4ebd9]' : 'text-[#b85d19]'}`} />
              <span className="font-semibold">{topic.title[lang] || topic.title.en}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Consultation Insights Card */}
      {currentInsight && (
        <div className="rounded-xl border border-[#e6dfd3] bg-[#fffdfa] p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6dfd3] pb-3">
            <h3 className="font-serif text-lg font-bold text-[#2c2825] flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#285e20]" />
              Astrological Synthesis: {currentInsight.topic}
            </h3>
            <span className="rounded-full bg-[#f5efe6] px-3 py-1 font-mono text-xs text-[#544d44]">
              {currentInsight.keyInfluencers}
            </span>
          </div>

          <p className="text-sm text-[#2c2825] leading-relaxed">
            {currentInsight.summary[lang] || currentInsight.summary.en}
          </p>

          <div className="rounded-xl border border-[#c1dec4] bg-[#e0edd8]/40 p-4 text-xs space-y-1">
            <span className="font-serif font-bold text-sm text-[#285e20] block">
              💡 Auspicious Astrological Guidance:
            </span>
            <p className="text-[#2c2825] leading-relaxed">
              {currentInsight.actionPlan[lang] || currentInsight.actionPlan.en}
            </p>
          </div>
        </div>
      )}

      {/* Custom Question Query Form */}
      <div className="rounded-xl border border-[#e6dfd3] bg-[#f5efe6]/40 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-sm font-semibold text-[#2c2825] flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-[#b85d19]" /> Ask a Specific Question to AI
            Astrologer
          </h4>
          {(customQuestion || customAnswer) && (
            <button
              type="button"
              onClick={() => {
                setCustomQuestion('');
                setCustomAnswer(null);
              }}
              title="Clear Question & Answer"
              className="text-xs font-medium text-[#736a60] hover:text-[#802020] flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        <form onSubmit={handleAskCustom} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="e.g. When will my financial growth stabilize? or How is my health?"
              className="w-full rounded-lg border border-[#e6dfd3] bg-[#fffdfa] pl-3.5 pr-8 py-2 text-xs text-[#2c2825] focus:border-[#b85d19] focus:outline-none"
            />
            {customQuestion && (
              <button
                type="button"
                onClick={() => setCustomQuestion('')}
                title="Clear input"
                className="absolute right-2 top-2 h-4 w-4 flex items-center justify-center text-[#736a60] hover:text-[#2c2825]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-[#2c2825] px-4 py-2 text-xs font-medium text-[#f4ebd9] hover:bg-[#423c38] transition shadow-xs cursor-pointer"
          >
            <span>Consult</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {customAnswer && (
          <div className="mt-3 rounded-lg border border-[#e6dfd3] bg-[#fffdfa] p-4 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#b85d19] block">
                Answer for "{customQuestion}":
              </span>
              <button
                type="button"
                onClick={() => setCustomAnswer(null)}
                className="text-[#736a60] hover:text-[#802020] text-[10px]"
              >
                Dismiss
              </button>
            </div>
            <p className="text-[#2c2825] leading-relaxed">
              {customAnswer.summary[lang] || customAnswer.summary.en}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
