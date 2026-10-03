/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GeneratorConfig } from './types/avatar';
import { getRandomSeed, DICEBEAR_STYLES } from './data/avatarApis';
import { Header } from './components/Header';
import { A4SheetExporter } from './components/A4SheetExporter';
import { Playground } from './components/Playground';
import { BatchGenerator } from './components/BatchGenerator';
import { ApiCatalog } from './components/ApiCatalog';
import { CodeExportView } from './components/CodeExportView';
import { GuideSection } from './components/GuideSection';
import { AiAvatarModal } from './components/AiAvatarModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'a4' | 'playground' | 'catalog' | 'batch' | 'code' | 'guide'>('a4');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Core avatar generation configuration
  const [config, setConfig] = useState<GeneratorConfig>({
    providerId: 'dicebear',
    style: 'adventurer',
    seed: 'Felix',
    format: 'svg',
    size: 200,
    backgroundColor: 'transparent',
    flip: false,
    radius: 50,
    rotate: 0,
    boringVariant: 'beam',
    boringColors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    roboSet: 'set1',
    roboBg: '',
    uiName: 'Alex Morgan',
    uiBackground: 'random',
    uiColor: 'fff',
    uiRounded: true,
    realGender: 'men',
    photoId: 12
  });

  // Global one-click randomize handler
  const handleGlobalRandomize = () => {
    const nextSeed = getRandomSeed();
    const randomDicebearStyle = DICEBEAR_STYLES[Math.floor(Math.random() * DICEBEAR_STYLES.length)].id;
    
    setConfig(prev => ({
      ...prev,
      seed: nextSeed,
      style: prev.providerId === 'dicebear' ? randomDicebearStyle : prev.style
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* 3-Zone Clean Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onGlobalRandomize={handleGlobalRandomize}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'a4' && (
          <A4SheetExporter />
        )}

        {activeTab === 'playground' && (
          <Playground
            config={config}
            setConfig={setConfig}
            onOpenCode={() => setActiveTab('code')}
            onOpenAi={() => setIsAiModalOpen(true)}
            onGoToA4={() => setActiveTab('a4')}
          />
        )}

        {activeTab === 'batch' && (
          <BatchGenerator
            baseConfig={config}
            onSelectAvatar={(newConfig) => {
              setConfig(newConfig);
              setActiveTab('playground');
            }}
          />
        )}

        {activeTab === 'catalog' && (
          <ApiCatalog
            onSelectProvider={(pId, sId) => {
              setConfig(prev => ({
                ...prev,
                providerId: pId as any,
                style: sId || prev.style,
                seed: getRandomSeed()
              }));
              setActiveTab('playground');
            }}
          />
        )}

        {activeTab === 'code' && (
          <CodeExportView config={config} />
        )}

        {activeTab === 'guide' && (
          <GuideSection />
        )}
      </main>

      {/* AI Inspiration Modal */}
      <AiAvatarModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyConfig={(patch) => {
          setConfig(prev => ({ ...prev, ...patch }));
          setActiveTab('playground');
        }}
      />

      {/* Clean Unboxed Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">AvatarHub</span>
            <span>·</span>
            <span>随机与自定义头像生成接口工作台</span>
            <span>·</span>
            <span>支持 A4 画报贴纸导出 / DiceBear / Boring Avatars / RoboHash</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setActiveTab('a4')}
              className="hover:text-indigo-600 transition-colors"
            >
              A4平铺导出
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-indigo-600 transition-colors"
            >
              选型与接入指南
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-indigo-600 transition-colors"
            >
              代码模板
            </button>
            <span>·</span>
            <a
              href="https://dicebear.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              DiceBear 官网
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
