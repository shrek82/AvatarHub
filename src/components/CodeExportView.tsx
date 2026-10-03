import React, { useState } from 'react';
import { GeneratorConfig, CodeTab } from '../types/avatar';
import { generateCodeSnippet, buildAvatarUrl } from '../data/avatarApis';
import { 
  Code2, 
  Copy, 
  Check, 
  HelpCircle
} from 'lucide-react';

interface CodeExportViewProps {
  config: GeneratorConfig;
}

const TABS: { id: CodeTab; label: string; icon: string }[] = [
  { id: 'curl', label: 'cURL / Shell', icon: '💻' },
  { id: 'javascript', label: 'JavaScript (浏览器)', icon: '⚡' },
  { id: 'react', label: 'React 组件', icon: '⚛️' },
  { id: 'vue', label: 'Vue 3 组件', icon: '💚' },
  { id: 'python', label: 'Python (requests)', icon: '🐍' },
  { id: 'nodejs', label: 'Node.js (后端保存)', icon: '🟢' },
];

export const CodeExportView: React.FC<CodeExportViewProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<CodeTab>('javascript');
  const [copied, setCopied] = useState(false);

  const snippet = generateCodeSnippet(config, activeTab);
  const currentUrl = buildAvatarUrl(config);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <Code2 className="w-3.5 h-3.5" />
            <span>开箱即用的多语言集成模板</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            动态生成与调用代码
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            已根据当前工坊配置（{config.providerId} / {config.style || config.boringVariant || config.roboSet}）自动生成。
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>已复制完整代码</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>一键复制此代码</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 overflow-x-auto shadow-2xs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Code Container */}
      <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-slate-400 text-[11px]">
              {activeTab === 'react' ? 'RandomAvatar.tsx' : activeTab === 'vue' ? 'RandomAvatar.vue' : activeTab === 'python' ? 'get_avatar.py' : activeTab === 'nodejs' ? 'download.mjs' : 'index.js'}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? '已复制' : '复制代码'}</span>
          </button>
        </div>

        <pre className="p-5 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto leading-relaxed select-all">
          {snippet}
        </pre>
      </div>

      {/* Randomness Engineering Guide Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>核心实现秘籍：怎样实现「每次都随机」与「缓存防坑」？</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">1</span>
              <span>为什么每次请求必须换不同的 seed？</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              绝大多数头像 API 采用<strong>确定性哈希算法 (Deterministic Hash)</strong>。这意味着如果传入相同的 seed，返回的图像 100% 绝对一致。这非常有利于做全球 CDN 缓存。若要「每次都随机」，只需将 seed 设为随机字符串，例如：
            </p>
            <code className="block p-2 rounded bg-white border border-slate-200 text-indigo-700 font-mono text-[11px]">
              const randomSeed = Math.random().toString(36).slice(2, 9);
            </code>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">2</span>
              <span>浏览器或 CDN 缓存导致头像不刷新怎么办？</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              如果同一个用户需要重新随机换一个头像，除了在 seed 后面加上时间戳（如 <code className="text-amber-800 font-mono">seed_&#123;Date.now()&#125;</code>），也可以在 URL 末尾附加时间戳参数破除缓存：
            </p>
            <code className="block p-2 rounded bg-white border border-slate-200 text-indigo-700 font-mono text-[11px]">
              const bustUrl = `${'{url}'}&_t=${'{Date.now()}'}`;
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
