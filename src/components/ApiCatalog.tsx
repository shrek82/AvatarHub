import React, { useState } from 'react';
import { ApiProviderInfo, GeneratorConfig } from '../types/avatar';
import { API_PROVIDERS, buildAvatarUrl } from '../data/avatarApis';
import { 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Zap, 
  FileCode,
  Tag
} from 'lucide-react';

interface ApiCatalogProps {
  onSelectProvider: (providerId: string, style?: string) => void;
}

export const ApiCatalog: React.FC<ApiCatalogProps> = ({ onSelectProvider }) => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(id);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <Sparkles className="w-3.5 h-3.5" />
          <span>权威汇总与工业级选型对比</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          主流随机与自定义头像生成接口全景大典
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          整理了目前全球互联网上最可靠、高可用、完全免费且开源的头像生成 API 服务。不仅支持完全随机生成，更支持通过确定的 Seed（如用户名或 ID）实现永久一致性渲染。
        </p>
      </div>

      {/* Catalog Cards */}
      <div className="space-y-6">
        {API_PROVIDERS.map((provider: ApiProviderInfo) => {
          const isCopied = copiedEndpoint === provider.id;
          const sampleSeeds = ['Aurora', 'CyberKing', 'Molly', 'Nova'];

          return (
            <div
              key={provider.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6 hover:border-slate-300 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900">{provider.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      永久免费
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                      {provider.license}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-700 font-medium">{provider.tagline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProvider(provider.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
                  >
                    <span>在工坊调试</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={provider.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition-colors"
                  >
                    <span>官网文档</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Grid: 2 columns (Details + Live Sample) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Info & features (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {provider.descriptionZh}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      核心技术亮点：
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {provider.featuresZh.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata Chips */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>限频策略：{provider.rateLimitInfo}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-blue-500" />
                      <span>格式支持：{provider.formatSupport.join(', ').toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>最适合：{provider.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Live Mini-Sampler & Endpoint (5 cols) */}
                <div className="lg:col-span-5 rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">即时渲染实测 (4 款随机样例)</span>
                    <span className="text-[11px] text-slate-500">实时请求 CDN</span>
                  </div>

                  {/* 4 Sample Avatars */}
                  <div className="grid grid-cols-4 gap-2">
                    {sampleSeeds.map((s, idx) => {
                      const sampleConfig: GeneratorConfig = {
                        providerId: provider.id,
                        style: provider.styles ? provider.styles[idx % provider.styles.length].id : 'adventurer',
                        seed: s,
                        format: 'svg',
                        size: 96,
                        backgroundColor: 'transparent',
                        flip: false,
                        radius: 12,
                        rotate: 0,
                        boringVariant: 'beam',
                        boringColors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
                        roboSet: 'set1',
                        roboBg: '',
                        uiName: s,
                        uiBackground: 'random',
                        uiColor: 'fff',
                        uiRounded: true,
                        realGender: 'men',
                        photoId: idx + 1
                      };
                      const sampleUrl = buildAvatarUrl(sampleConfig);

                      return (
                        <div key={s} className="flex flex-col items-center p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <img
                            src={sampleUrl}
                            alt={s}
                            className="w-12 h-12 object-contain rounded-lg"
                            loading="lazy"
                          />
                          <span className="mt-1 text-[10px] font-mono text-slate-500 truncate max-w-full">
                            {s}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* URL Template Box */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>标准调用示例：</span>
                      <button
                        onClick={() => handleCopy(provider.urlExample, provider.id)}
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">已复制</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>复制地址</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-[11px] text-indigo-700 break-all select-all leading-relaxed">
                      {provider.urlExample}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
