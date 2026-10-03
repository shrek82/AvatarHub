import React, { useState } from 'react';
import { Sparkles, X, Wand2, ArrowRight } from 'lucide-react';
import { GeneratorConfig } from '../types/avatar';
import { buildAvatarUrl } from '../data/avatarApis';

interface AiAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyConfig: (newConfig: Partial<GeneratorConfig>) => void;
}

interface AiRecommendation {
  title: string;
  providerId: 'dicebear' | 'boringavatars' | 'robohash' | 'uiavatars';
  style: string;
  seed: string;
  backgroundColor: string;
  radius: number;
  reasoning: string;
}

const PRESET_PROMPTS = [
  '戴墨镜的复古蒸汽朋克机械机器人',
  '日系治愈水彩长发女插画师',
  'Notion 风格黑白极简效率专家',
  '8-bit 怀旧红白机像素风勇士',
  'Web3 赛博霓虹流体大理石',
  '呆萌可爱爱吐舌头搞怪表情包',
  '酷炫外星小怪兽极客程序员'
];

export const AiAvatarModal: React.FC<AiAvatarModalProps> = ({
  isOpen,
  onClose,
  onApplyConfig,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null);

  if (!isOpen) return null;

  const handleGenerate = (textPrompt: string) => {
    const input = (textPrompt || prompt).trim();
    if (!input) return;

    setIsGenerating(true);

    setTimeout(() => {
      let rec: AiRecommendation;
      const lower = input.toLowerCase();

      if (lower.includes('机器') || lower.includes('赛博') || lower.includes('机甲') || lower.includes('蒸汽朋克')) {
        rec = {
          title: '复古赛博机械机甲',
          providerId: 'dicebear',
          style: 'bottts',
          seed: `Cyber_${Math.random().toString(36).slice(2, 6)}`,
          backgroundColor: 'b6e3f4',
          radius: 16,
          reasoning: '基于复古零部件装配的机械风格，极具极客与未来感。'
        };
      } else if (lower.includes('像素') || lower.includes('游戏') || lower.includes('8-bit') || lower.includes('怀旧') || lower.includes('勇士')) {
        rec = {
          title: '8-Bit 像素复古英雄',
          providerId: 'dicebear',
          style: 'pixel-art',
          seed: `Hero_${Math.random().toString(36).slice(2, 6)}`,
          backgroundColor: 'transparent',
          radius: 0,
          reasoning: '8-bit 红白机时代经典点阵画风，自带复古游戏氛围。'
        };
      } else if (lower.includes('notion') || lower.includes('极简') || lower.includes('黑白') || lower.includes('效率') || lower.includes('笔记')) {
        rec = {
          title: 'Notion 极简手绘学者',
          providerId: 'dicebear',
          style: 'notionists',
          seed: `Scholar_${Math.random().toString(36).slice(2, 6)}`,
          backgroundColor: 'transparent',
          radius: 50,
          reasoning: '纯黑白手绘素描质感，是知识库与高效办公产品的绝佳搭档。'
        };
      } else if (lower.includes('治愈') || lower.includes('水彩') || lower.includes('女') || lower.includes('唯美') || lower.includes('韩系') || lower.includes('日系')) {
        rec = {
          title: 'Lorelei 治愈水彩立绘',
          providerId: 'dicebear',
          style: 'lorelei',
          seed: `Aria_${Math.random().toString(36).slice(2, 6)}`,
          backgroundColor: 'ffd5dc',
          radius: 50,
          reasoning: '柔和细腻的水彩人物立绘，面部细节温润生动。'
        };
      } else if (lower.includes('web3') || lower.includes('流体') || lower.includes('大理石') || lower.includes('几何') || lower.includes('抽象') || lower.includes('钱包')) {
        rec = {
          title: 'Boring Avatars 艺术流体',
          providerId: 'boringavatars',
          style: 'marble',
          seed: `0x${Math.random().toString(36).slice(2, 8)}`,
          backgroundColor: 'transparent',
          radius: 50,
          reasoning: '流体渐变与大理石纹理，完全不涉及真实面孔，加密钱包首选。'
        };
      } else if (lower.includes('怪兽') || lower.includes('猫咪') || lower.includes('外星')) {
        rec = {
          title: 'RoboHash 呆萌小精灵',
          providerId: 'robohash',
          style: 'set2',
          seed: `Monster_${Math.random().toString(36).slice(2, 6)}`,
          backgroundColor: 'transparent',
          radius: 16,
          reasoning: '外星呆萌怪物设计，充满童趣与怪诞魅力。'
        };
      } else {
        rec = {
          title: 'Adventurer 冒险者插画',
          providerId: 'dicebear',
          style: 'adventurer',
          seed: `Explorer_${Math.random().toString(36).slice(2, 6)}`,
          backgroundColor: 'c0aede',
          radius: 50,
          reasoning: '根据你的自然语言意图综合匹配的精美 RPG 冒险家立绘。'
        };
      }

      setRecommendation(rec);
      setIsGenerating(false);
    }, 450);
  };

  const handleApply = () => {
    if (!recommendation) return;
    onApplyConfig({
      providerId: recommendation.providerId,
      style: recommendation.style,
      seed: recommendation.seed,
      backgroundColor: recommendation.backgroundColor,
      radius: recommendation.radius,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 头像灵感与配方合成</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">用自然语言描述想要的头像感觉</h3>
          <p className="text-xs text-slate-500">
            输入任意角色性格、场景或视觉流派，AI 将为你精准匹配最适接口、最佳艺术风格与专属 Seed 种子。
          </p>
        </div>

        {/* Input box */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：戴墨镜的复古蒸汽朋克机械猫咪、治愈系水彩戴眼镜的程序员女生..."
              className="w-full px-3.5 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none shadow-inner"
            />
          </div>

          {/* Quick preset pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px]">灵感示例：</span>
            {PRESET_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPrompt(p);
                  handleGenerate(p);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleGenerate(prompt)}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            <Wand2 className="w-4 h-4 text-amber-300" />
            <span>{isGenerating ? 'AI 正在解析视觉要素...' : '生成智能匹配方案'}</span>
          </button>
        </div>

        {/* Recommendation Result Card */}
        {recommendation && (
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-indigo-900 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI 推荐配方：{recommendation.title}</span>
              </span>
              <span className="font-mono text-indigo-600 text-[11px]">
                {recommendation.providerId} / {recommendation.style}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Preview image */}
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center shadow-2xs">
                <img
                  src={buildAvatarUrl({
                    providerId: recommendation.providerId,
                    style: recommendation.style,
                    seed: recommendation.seed,
                    format: 'svg',
                    size: 96,
                    backgroundColor: recommendation.backgroundColor,
                    flip: false,
                    radius: recommendation.radius,
                    rotate: 0,
                    boringVariant: 'marble',
                    boringColors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
                    roboSet: 'set2',
                    roboBg: '',
                    uiName: recommendation.seed,
                    uiBackground: 'random',
                    uiColor: 'fff',
                    uiRounded: true,
                    realGender: 'men',
                    photoId: 1
                  })}
                  alt="AI Result"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {recommendation.reasoning}
                </p>
                <div className="text-[11px] font-mono text-indigo-800">
                  Seed: <span className="font-bold">{recommendation.seed}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>应用此配方到工坊并体验</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
