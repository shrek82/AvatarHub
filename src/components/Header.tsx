import React from 'react';
import { Sparkles, Dices, Layers, BookOpen, Code2, Users, Compass, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  activeTab: 'a4' | 'playground' | 'catalog' | 'batch' | 'code' | 'guide';
  setActiveTab: (tab: 'a4' | 'playground' | 'catalog' | 'batch' | 'code' | 'guide') => void;
  onGlobalRandomize: () => void;
  onOpenAiModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onGlobalRandomize,
  onOpenAiModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/85 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-indigo-500 shadow-md shadow-indigo-600/15">
            <span className="text-xl">🎭</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">AvatarHub</span>
              <span className="text-xs text-indigo-600 font-mono font-semibold">v2.1</span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">随机头像生成与 A4 画报导出</p>
          </div>
        </div>

        {/* Zone 2: Navigation tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80">
          <button
            onClick={() => setActiveTab('a4')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'a4'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
            <span>A4平铺导出</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'playground'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>生成工坊</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'batch'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>批量矩阵</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>接口全景</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>调用代码</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>选型指南</span>
          </button>
        </nav>

        {/* Zone 3: Primary quick actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onGlobalRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all shadow-xs active:scale-95"
            title="一键随机换一个头像"
          >
            <Dices className="w-3.5 h-3.5 text-indigo-600 animate-spin-hover" />
            <span className="hidden sm:inline">随机换一个</span>
          </button>

          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI灵感配方</span>
          </button>
        </div>
      </div>
    </header>
  );
};
