import React, { useState } from 'react';
import { 
  GeneratorConfig, 
  AvatarStyleOption 
} from '../types/avatar';
import { 
  DICEBEAR_STYLES, 
  BORING_VARIANTS, 
  COLOR_PALETTES, 
  API_PROVIDERS, 
  buildAvatarUrl, 
  getRandomSeed 
} from '../data/avatarApis';
import { TraitEditor } from './TraitEditor';
import { generateUniqueExportFilename } from '../utils/filename';
import { 
  Dices, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Code2, 
  RefreshCw, 
  Sliders, 
  Palette, 
  Sparkles,
  Info
} from 'lucide-react';

interface PlaygroundProps {
  config: GeneratorConfig;
  setConfig: React.Dispatch<React.SetStateAction<GeneratorConfig>>;
  onOpenCode: () => void;
  onOpenAi: () => void;
  onGoToA4: () => void;
}

export const Playground: React.FC<PlaygroundProps> = ({
  config,
  setConfig,
  onOpenCode,
  onOpenAi,
  onGoToA4,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [recentSeeds, setRecentSeeds] = useState<string[]>(() => [
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
  ]);

  const currentUrl = buildAvatarUrl(config);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleRandomSeed = () => {
    const nextSeed = getRandomSeed();
    setIsImgLoading(true);
    setConfig(prev => ({ ...prev, seed: nextSeed }));
  };

  const handleRerollGrid = () => {
    setRecentSeeds([
      getRandomSeed(),
      getRandomSeed(),
      getRandomSeed(),
      getRandomSeed(),
      getRandomSeed(),
      getRandomSeed(),
      getRandomSeed(),
      getRandomSeed(),
    ]);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const ext = config.format === 'png' ? 'png' : config.format === 'jpg' ? 'jpg' : 'svg';
      link.download = generateUniqueExportFilename({
        prefix: 'avatar',
        style: config.providerId === 'dicebear' ? config.style : config.providerId,
        seed: config.seed,
        ext: ext
      });
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(currentUrl, '_blank');
    }
  };

  const filteredDicebearStyles = DICEBEAR_STYLES.filter(s => {
    const matchCategory = styleFilter === 'all' || s.category === styleFilter;
    const matchSearch = !searchQuery.trim() || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.nameZh.includes(searchQuery) ||
      s.id.includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const currentProviderInfo = API_PROVIDERS.find(p => p.id === config.providerId) || API_PROVIDERS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>每次随机的核心原理：传入不同 Seed（时间戳、随机字符或用户ID）</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            随机与自定义头像生成工作台
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            支持 DiceBear、Boring Avatars、Multiavatar、RoboHash、UI Avatars 等主流开源服务。无需后端自建，一行 HTTP URL 即可在前端、移动端或后台即时生成海量个性化头像。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onGoToA4}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            <span>🖨️ 导出A4平铺图片</span>
          </button>

          <button
            onClick={handleRandomSeed}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 active:scale-95"
          >
            <Dices className="w-4 h-4 text-amber-300 animate-spin-hover" />
            <span>🎲 随机生成一个</span>
          </button>

          <button
            onClick={onOpenAi}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium transition-all"
          >
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span>AI灵感描述</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel + Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. API Provider Selection */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. 选择头像 API 服务商
              </label>
              <span className="text-xs font-medium text-indigo-600">
                当前：{currentProviderInfo.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {API_PROVIDERS.map((provider) => {
                const isSelected = config.providerId === provider.id;
                return (
                  <button
                    key={provider.id}
                    onClick={() => {
                      setConfig(prev => ({
                        ...prev,
                        providerId: provider.id,
                        style: provider.id === 'dicebear' ? (prev.style || 'adventurer') : prev.style
                      }));
                    }}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-slate-900">{provider.name}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-normal">
                      {provider.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Style & Category Picker */}
          {config.providerId === 'dicebear' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    2. 选择 DiceBear 艺术风格 (共 {DICEBEAR_STYLES.length} 款)
                  </label>
                  <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    已显示 {filteredDicebearStyles.length} 款
                  </span>
                </div>

                {/* Search box */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="🔍 搜索风格 (如: 像素, 水彩, 机器人)..."
                    className="w-full sm:w-56 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 overflow-x-auto max-w-full">
                {[
                  { id: 'all', label: '全部' },
                  { id: 'cartoon', label: '🎨 卡通立绘' },
                  { id: 'pixel', label: '👾 8-Bit像素' },
                  { id: 'robot', label: '🤖 机械科幻' },
                  { id: 'minimal', label: '📝 Notion极简' },
                  { id: 'fun', label: '🤪 搞怪表情' },
                  { id: 'abstract', label: '🔷 抽象几何' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStyleFilter(tab.id)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                      styleFilter === tab.id
                        ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Style Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {filteredDicebearStyles.map((style: AvatarStyleOption) => {
                  const isActive = config.style === style.id;
                  const previewUrl = `https://api.dicebear.com/9.x/${style.id}/svg?seed=Demo&size=40`;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setConfig(prev => ({ ...prev, style: style.id }))}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <img
                        src={previewUrl}
                        alt={style.name}
                        className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-0.5 shrink-0 object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">{style.nameZh}</div>
                        <div className="text-[10px] font-mono text-slate-500 truncate">{style.id}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {config.providerId === 'boringavatars' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. 选择 Boring Avatars 几何流派
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BORING_VARIANTS.map(v => {
                  const isActive = config.boringVariant === v.id;
                  const sampleUrl = `https://source.boringavatars.com/${v.id}/48/Demo?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setConfig(prev => ({ ...prev, boringVariant: v.id as any }))}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <img 
                        src={sampleUrl} 
                        alt={v.name} 
                        className="w-10 h-10 rounded-full shrink-0 shadow-xs"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 capitalize">{v.id}</div>
                        <div className="text-[10px] text-slate-500 truncate">{v.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Color Palettes for Boring Avatars */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="text-xs font-medium text-slate-700">主题调色板 (注入品牌色)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PALETTES.map((palette, idx) => (
                    <button
                      key={idx}
                      onClick={() => setConfig(prev => ({ ...prev, boringColors: palette.colors }))}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 transition-colors"
                    >
                      <span className="text-xs text-slate-700">{palette.name}</span>
                      <div className="flex -space-x-1">
                        {palette.colors.map((c, i) => (
                          <div 
                            key={i} 
                            className="w-3.5 h-3.5 rounded-full border border-white" 
                            style={{ backgroundColor: c }} 
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {config.providerId === 'robohash' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. 选择 RoboHash 角色类型
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'set1', name: '经典机械机甲', desc: '复古机器人零部件' },
                  { id: 'set2', name: '呆萌小怪兽', desc: '大眼外星怪物' },
                  { id: 'set3', name: '机甲头像框', desc: '工业科幻头部' },
                  { id: 'set4', name: '可爱卡通猫咪', desc: '萌系Kitten猫脸' },
                  { id: 'set5', name: '美漫人类肖像', desc: '美式连环画风格' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setConfig(prev => ({ ...prev, roboSet: r.id as any }))}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      config.roboSet === r.id
                        ? 'bg-indigo-50 border-indigo-500 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{r.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {config.providerId === 'uiavatars' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. UI Avatars 首字母与文字定制
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-600">显示名称 (中文或英文)</span>
                  <input
                    type="text"
                    value={config.uiName}
                    onChange={e => setConfig(prev => ({ ...prev, uiName: e.target.value }))}
                    placeholder="如: 张三, John Doe, Admin"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. Custom Traits & Factors Editor */}
          <TraitEditor
            traits={config.traits || {
              enabled: false,
              gender: 'any',
              hairLength: 'any',
              hairColor: 'any',
              skinTone: 'any',
              mood: 'any',
              glasses: 'any',
              beard: 'any',
            }}
            onChange={(newTraits) => setConfig(prev => ({ ...prev, traits: newTraits }))}
          />

          {/* 4. Seed Parameter: The Heart of Randomness */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  4. 随机种子 (Seed)
                </label>
              </div>
              <span className="text-[11px] text-slate-500">
                相同的 Seed 生成相同头像，不同的 Seed 生成完全不同的头像
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={config.seed}
                onChange={(e) => setConfig(prev => ({ ...prev, seed: e.target.value }))}
                placeholder="输入任意字符串、用户名、手机号、UUID..."
                className="flex-1 px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
              <button
                onClick={handleRandomSeed}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shrink-0 active:scale-95"
                title="重新生成随机种子"
              >
                <Dices className="w-4 h-4 text-amber-300" />
                <span>换个Seed</span>
              </button>
            </div>

            {/* Quick Seed Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-slate-500 text-[11px]">快捷种子：</span>
              {[
                'CyberPunk', 
                'Alice_2026', 
                'Bob_Coder', 
                '0x89FE4C', 
                'PixelHero',
                'Zack',
                'Molly'
              ].map(s => (
                <button
                  key={s}
                  onClick={() => setConfig(prev => ({ ...prev, seed: s }))}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Fine-Tuning: Format, Size, Background, Radius */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-600" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                5. 外观与格式微调
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Output format */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-600">图片格式</span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {['svg', 'png', 'webp'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setConfig(prev => ({ ...prev, format: fmt as any }))}
                      className={`flex-1 py-1 text-xs uppercase font-mono font-medium rounded transition-colors ${
                        config.format === fmt
                          ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar shape/radius */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-600">头像形状 (Radius)</span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {[
                    { val: 0, label: '直角' },
                    { val: 16, label: '圆角' },
                    { val: 50, label: '全圆' },
                  ].map(r => (
                    <button
                      key={r.val}
                      onClick={() => setConfig(prev => ({ ...prev, radius: r.val }))}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                        config.radius === r.val
                          ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color preset */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-600">底色预设</span>
                <div className="flex items-center gap-1.5 pt-1">
                  {[
                    { name: '透明', color: 'transparent' },
                    { name: '淡蓝', color: 'b6e3f4' },
                    { name: '淡紫', color: 'c0aede' },
                    { name: '淡黄', color: 'ffd5dc' },
                    { name: '深色', color: '1e293b' },
                  ].map(bg => (
                    <button
                      key={bg.color}
                      onClick={() => setConfig(prev => ({ ...prev, backgroundColor: bg.color }))}
                      className={`w-6 h-6 rounded-full border transition-transform ${
                        config.backgroundColor === bg.color
                          ? 'scale-110 border-indigo-600 ring-2 ring-indigo-500/30'
                          : 'border-slate-300 opacity-80 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: bg.color === 'transparent' ? '#ffffff' : `#${bg.color}`,
                        backgroundImage: bg.color === 'transparent' ? 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)' : undefined,
                        backgroundSize: '8px 8px'
                      }}
                      title={bg.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Flip & Size slider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-700">
                  <span>头像渲染尺寸</span>
                  <span className="font-mono text-indigo-600 font-semibold">{config.size}px</span>
                </div>
                <input
                  type="range"
                  min="64"
                  max="384"
                  step="32"
                  value={config.size}
                  onChange={e => setConfig(prev => ({ ...prev, size: Number(e.target.value) }))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between pt-4 sm:pt-2">
                <span className="text-xs text-slate-700">水平镜像翻转 (Flip)</span>
                <button
                  onClick={() => setConfig(prev => ({ ...prev, flip: !prev.flip }))}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    config.flip
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {config.flip ? '已开启' : '关闭'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live High-Def Preview + URL & Integration (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-20">
          {/* Main Visualizer Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-md flex flex-col items-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900">{currentProviderInfo.name}</span>
                {config.providerId === 'dicebear' && (
                  <span className="text-indigo-600 font-mono">/ {config.style}</span>
                )}
              </div>
              <span className="font-mono text-[11px] text-slate-500 uppercase">
                {config.format} · {config.size}x{config.size}
              </span>
            </div>

            {/* Avatar Stage */}
            <div className="relative my-6 flex items-center justify-center">
              <div 
                className="relative p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderRadius: config.radius === 50 ? '9999px' : config.radius > 0 ? `${config.radius}px` : '16px'
                }}
              >
                <img
                  key={currentUrl}
                  src={currentUrl}
                  alt={`Avatar for ${config.seed}`}
                  style={{
                    width: `${Math.min(config.size, 240)}px`,
                    height: `${Math.min(config.size, 240)}px`,
                    borderRadius: config.radius === 50 ? '9999px' : config.radius > 0 ? `${config.radius}px` : '12px'
                  }}
                  className="object-contain transition-opacity duration-300"
                  onLoad={() => setIsImgLoading(false)}
                  onError={(e) => {
                    setIsImgLoading(false);
                    const target = e.currentTarget;
                    // Auto-repair: try fallback SVG without extra query parameters on the SAME style
                    if (target.src.includes('/png?')) {
                      target.src = target.src.replace('/png?', '/svg?');
                    } else if (!target.src.startsWith('data:image/svg+xml')) {
                      target.src = `https://api.dicebear.com/9.x/${config.style}/svg?seed=${encodeURIComponent(config.seed)}`;
                    }
                  }}
                />

                {isImgLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl backdrop-blur-xs">
                    <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Seed indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-slate-400">Seed:</span>
              <span className="text-indigo-600 font-bold max-w-[180px] truncate">{config.seed}</span>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-3 gap-2 w-full mt-6">
              <button
                onClick={handleRandomSeed}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                <Dices className="w-4 h-4 text-amber-300" />
                <span>换个种子</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>下载文件</span>
              </button>

              <button
                onClick={onOpenCode}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-all active:scale-95"
              >
                <Code2 className="w-4 h-4 text-indigo-600" />
                <span>调用代码</span>
              </button>
            </div>

            {/* Direct API Endpoint Display & Copy */}
            <div className="w-full mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>实时请求接口直链：</span>
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  {copiedUrl ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">已复制直链</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制直链</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative group">
                <div className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-indigo-700 break-all select-all leading-relaxed">
                  {currentUrl}
                </div>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-2 top-2 p-1 rounded-md bg-white text-slate-500 hover:text-slate-900 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="在新标签页直接查看"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Instant Multi-Seed Comparison Strip */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <span>同款风格随机 8 连预览</span>
                <span className="text-[11px] text-slate-400 font-normal">(点击任意头像快速应用)</span>
              </div>
              <button
                onClick={handleRerollGrid}
                className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium"
                title="重新生成一批随机种子"
              >
                <RefreshCw className="w-3 h-3" />
                <span>换一批</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {recentSeeds.map((seedItem) => {
                const itemConfig = { ...config, seed: seedItem };
                const sampleUrl = buildAvatarUrl(itemConfig);
                const isCurrent = config.seed === seedItem;

                return (
                  <button
                    key={seedItem}
                    onClick={() => {
                      setIsImgLoading(true);
                      setConfig(prev => ({ ...prev, seed: seedItem }));
                    }}
                    className={`group relative flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={sampleUrl}
                      alt={seedItem}
                      className="w-12 h-12 object-contain rounded-lg transition-transform group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.includes('/png?')) {
                          target.src = target.src.replace('/png?', '/svg?');
                        } else if (!target.src.startsWith('data:image/svg+xml')) {
                          target.src = `https://api.dicebear.com/9.x/${config.style}/svg?seed=${encodeURIComponent(seedItem)}`;
                        }
                      }}
                    />
                    <span className="mt-1 text-[10px] font-mono text-slate-500 truncate max-w-full">
                      {seedItem.split('_')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Tip Card */}
          <div className="rounded-xl bg-indigo-50/80 border border-indigo-100 p-3.5 flex items-start gap-2.5 text-xs text-indigo-900">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong className="text-indigo-950">工程实践建议：</strong> 如果需要「每次访问都随机」，在前端生成不同的随机字符串；如果希望「每个用户有专属头像且固定」，将用户的 <code className="text-amber-800 font-mono">user_id</code> 作为 <code className="text-amber-800 font-mono">seed</code> 即可！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
