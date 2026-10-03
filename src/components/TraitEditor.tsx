import React from 'react';
import { CustomTraitsConfig } from '../types/avatar';
import { TRAIT_PRESETS, HAIR_COLOR_CHOICES } from '../data/avatarApis';
import { 
  UserCheck, 
  Sparkles, 
  RotateCcw, 
  Smile, 
  Glasses, 
  Scissors, 
  Sun,
  Flame
} from 'lucide-react';

interface TraitEditorProps {
  traits: CustomTraitsConfig;
  onChange: (newTraits: CustomTraitsConfig) => void;
}

export const TraitEditor: React.FC<TraitEditorProps> = ({ traits, onChange }) => {
  const updateTrait = <K extends keyof CustomTraitsConfig>(
    key: K,
    val: CustomTraitsConfig[K]
  ) => {
    onChange({
      ...traits,
      [key]: val,
      enabled: true,
      presetName: undefined
    });
  };

  const handleApplyPreset = (preset: typeof TRAIT_PRESETS[0]) => {
    onChange({
      ...preset.traits,
      enabled: true
    });
  };

  const handleReset = () => {
    onChange({
      enabled: false,
      gender: 'any',
      hairLength: 'any',
      hairColor: 'any',
      skinTone: 'any',
      mood: 'any',
      glasses: 'any',
      beard: 'any',
      presetName: undefined
    });
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-5">
      {/* Header with Master Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-indigo-600" />
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
            自定义角色因子 (性别 / 发型 / 肤色 / 表情)
          </label>
        </div>

        <div className="flex items-center gap-2">
          {traits.enabled && (
            <button
              onClick={handleReset}
              className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
              title="重置所有自定义因子为随机"
            >
              <RotateCcw className="w-3 h-3" />
              <span>重置</span>
            </button>
          )}

          <button
            onClick={() => onChange({ ...traits, enabled: !traits.enabled })}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
              traits.enabled
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {traits.enabled ? '因子已生效' : '开启自定义因子'}
          </button>
        </div>
      </div>

      {traits.enabled ? (
        <div className="space-y-4 pt-1 animate-in fade-in duration-200">
          {/* Quick Preset Characters */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>一键快速套用角色模板</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {TRAIT_PRESETS.map((p) => {
                const isSelected = traits.presetName === p.name.replace(/^[^\s]+\s/, '');
                return (
                  <button
                    key={p.id}
                    onClick={() => handleApplyPreset(p)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{p.desc.split('·')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1. Gender / Tendency */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">1. 性别与气质倾向</span>
              <span className="text-[11px] text-slate-400">过滤专属发型库与面部轮廓</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'any', label: '不限随机 (Any)' },
                { id: 'female', label: '👩 女性向 (Female)' },
                { id: 'male', label: '👨 男性向 (Male)' }
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => updateTrait('gender', g.id as any)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    traits.gender === g.id
                      ? 'bg-white text-indigo-600 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Hair Length & Style */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5 text-indigo-600" />
                <span>2. 发型长度</span>
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs">
              {[
                { id: 'any', label: '不限' },
                { id: 'long', label: '长发飘逸' },
                { id: 'medium', label: '中长齐肩' },
                { id: 'short', label: '利落短发' }
              ].map(h => (
                <button
                  key={h.id}
                  onClick={() => updateTrait('hairLength', h.id as any)}
                  className={`py-1 rounded-lg transition-colors ${
                    traits.hairLength === h.id
                      ? 'bg-white text-indigo-600 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Hair Color */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>3. 专属发色 (8色系)</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {HAIR_COLOR_CHOICES.find(c => c.id === traits.hairColor)?.name || '随机'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {HAIR_COLOR_CHOICES.map(c => {
                const isSelected = traits.hairColor === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => updateTrait('hairColor', c.id)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left text-[11px] transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-950'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-slate-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Skin Tone */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>4. 肤色基调</span>
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-xl text-xs">
              {[
                { id: 'any', label: '不限' },
                { id: 'pale', label: '白皙' },
                { id: 'light', label: '自然' },
                { id: 'tan', label: '小麦' },
                { id: 'dark', label: '黝黑' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => updateTrait('skinTone', s.id as any)}
                  className={`py-1 rounded-lg transition-colors ${
                    traits.skinTone === s.id
                      ? 'bg-white text-indigo-600 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Mood / Expression */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-indigo-600" />
                <span>5. 情绪与表情神态</span>
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-xl text-xs">
              {[
                { id: 'any', label: '不限' },
                { id: 'happy', label: '微笑' },
                { id: 'cool', label: '冷酷' },
                { id: 'wink', label: '眨眼' },
                { id: 'surprised', label: '惊讶' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => updateTrait('mood', m.id as any)}
                  className={`py-1 rounded-lg transition-colors ${
                    traits.mood === m.id
                      ? 'bg-white text-indigo-600 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Eyewear & Beard */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <Glasses className="w-3.5 h-3.5 text-indigo-600" />
                <span>6. 眼镜与饰品</span>
              </span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg text-xs">
                {[
                  { id: 'any', label: '不限' },
                  { id: 'none', label: '无眼镜' },
                  { id: 'sunglasses', label: '墨镜' }
                ].map(gl => (
                  <button
                    key={gl.id}
                    onClick={() => updateTrait('glasses', gl.id as any)}
                    className={`py-1 rounded transition-colors ${
                      traits.glasses === gl.id
                        ? 'bg-white text-indigo-600 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {gl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-700">7. 胡须特征 (男士)</span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg text-xs">
                {[
                  { id: 'any', label: '不限' },
                  { id: 'none', label: '无胡须' },
                  { id: 'stubble', label: '胡茬' }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => updateTrait('beard', b.id as any)}
                    className={`py-1 rounded transition-colors ${
                      traits.beard === b.id
                        ? 'bg-white text-indigo-600 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
          目前为<strong>全随机模式</strong>。点击右上角<strong>「开启自定义因子」</strong>，即可在左侧自由固定性别（男性/女性）、发型长短、发色、肤色底色、情绪神态与墨镜胡须！
        </div>
      )}
    </div>
  );
};
