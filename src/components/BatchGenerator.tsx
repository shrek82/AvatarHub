import React, { useState } from 'react';
import { GeneratorConfig } from '../types/avatar';
import { 
  DICEBEAR_STYLES, 
  API_PROVIDERS, 
  buildAvatarUrl, 
  getRandomSeed 
} from '../data/avatarApis';
import { generateUniqueExportFilename } from '../utils/filename';
import { 
  Dices, 
  Copy, 
  Check, 
  Download, 
  Users, 
  MessageSquare, 
  Table, 
  Grid 
} from 'lucide-react';

interface BatchGeneratorProps {
  baseConfig: GeneratorConfig;
  onSelectAvatar: (config: GeneratorConfig) => void;
}

interface MockUser {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  message: string;
  time: string;
}

const SAMPLE_USERS: MockUser[] = [
  { id: 'usr_01', name: '陈思宇 (Alex)', role: '前端架构师', email: 'siyu.chen@tech.io', status: '在线', message: '刚把 DiceBear 的头像 API 接入到我们的微前端系统，太丝滑了！', time: '10:24' },
  { id: 'usr_02', name: '林若汐 (Serena)', role: 'UI/UX 主设', email: 'serena.lin@design.co', status: '离开', message: 'Boring Avatars 的 Beam 风格和我们的冷色系主题契合度极高。', time: '10:28' },
  { id: 'usr_03', name: '张子轩 (Zack)', role: '后端工程师', email: 'zack.zhang@cloud.net', status: '忙碌', message: '每次新注册用户如果没有上传头像，直接用 userId 生成一个 seed 头像即可。', time: '10:32' },
  { id: 'usr_04', name: 'Elena Rostova', role: 'DevOps Lead', email: 'elena@infra.org', status: '在线', message: 'RoboHash 生成的机器人头像很适合给我们的 CI/CD 构建机器人用。', time: '10:35' },
  { id: 'usr_05', name: '王嘉尔 (Lucas)', role: '产品总监', email: 'lucas.wang@corp.com', status: '在线', message: '确认一下，所有这些接口都是完全免费、不需要强制付费的吧？', time: '10:41' },
  { id: 'usr_06', name: 'Sophie Dupont', role: '全栈开发', email: 'sophie.d@studio.dev', status: '离线', message: '是的，完全开源且无速率限制，支持全球 CDN 高速缓存！', time: '10:45' },
  { id: 'usr_07', name: '何欣桐 (Chloe)', role: '运营专员', email: 'chloe.he@media.vip', status: '在线', message: '批量生成 20 个不同头像做演示原型太方便了，不用手动到处找图。', time: '10:52' },
  { id: 'usr_08', name: 'Kairo Tanaka', role: '安全工程师', email: 'kairo@security.jp', status: '在线', message: '纯 SVG 格式渲染不失真，而且不需要暴露用户的真实人脸隐私。', time: '11:03' }
];

export const BatchGenerator: React.FC<BatchGeneratorProps> = ({
  baseConfig,
  onSelectAvatar,
}) => {
  const [batchCount, setBatchCount] = useState<number>(18);
  const [selectedStyle, setSelectedStyle] = useState<string>(baseConfig.style || 'adventurer');
  const [selectedProvider, setSelectedProvider] = useState<string>(baseConfig.providerId || 'dicebear');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'chat'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate seeds
  const [seeds, setSeeds] = useState<string[]>(() => 
    Array.from({ length: 24 }, () => getRandomSeed())
  );

  const handleRerollAll = () => {
    setSeeds(Array.from({ length: batchCount }, () => getRandomSeed()));
  };

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>批量随机头像矩阵与场景实测</span>
            </h2>
            <p className="text-xs text-slate-500">
              直观验证「每次都随机」与「个性化多样性」效果，支持一键切换真实业务视图。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-indigo-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>头像画廊</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-indigo-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>用户表格模拟</span>
              </button>

              <button
                onClick={() => setViewMode('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'chat'
                    ? 'bg-white text-indigo-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>群聊气泡模拟</span>
              </button>
            </div>

            <button
              onClick={handleRerollAll}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Dices className="w-4 h-4 text-amber-300 animate-spin-hover" />
              <span>🎲 全量重新摇号</span>
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500">服务提供方：</span>
            <select
              value={selectedProvider}
              onChange={e => setSelectedProvider(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              {API_PROVIDERS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            {selectedProvider === 'dicebear' && (
              <>
                <span className="text-slate-500 ml-2">风格：</span>
                <select
                  value={selectedStyle}
                  onChange={e => setSelectedStyle(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  {DICEBEAR_STYLES.map(s => (
                    <option key={s.id} value={s.id}>{s.nameZh} ({s.id})</option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">生成数量：</span>
            {[12, 18, 24].map(num => (
              <button
                key={num}
                onClick={() => {
                  setBatchCount(num);
                  setSeeds(Array.from({ length: num }, () => getRandomSeed()));
                }}
                className={`px-2.5 py-1 rounded-md border text-xs font-mono font-medium ${
                  batchCount === num
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View 1: Gallery Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {seeds.slice(0, batchCount).map((seed, idx) => {
            const itemConfig: GeneratorConfig = {
              ...baseConfig,
              providerId: selectedProvider as any,
              style: selectedStyle,
              seed: seed,
            };
            const url = buildAvatarUrl(itemConfig);
            const isCopied = copiedId === seed;

            return (
              <div
                key={`${seed}-${idx}`}
                className="group relative rounded-2xl bg-white border border-slate-200 p-4 flex flex-col items-center justify-between text-center transition-all hover:border-indigo-300 hover:shadow-md"
              >
                <div 
                  onClick={() => onSelectAvatar(itemConfig)}
                  className="cursor-pointer relative w-24 h-24 mb-3 rounded-xl bg-slate-50 p-2 flex items-center justify-center transition-transform group-hover:scale-105"
                >
                  <img
                    src={url}
                    alt={seed}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/png?')) {
                        target.src = target.src.replace('/png?', '/svg?');
                      } else if (!target.src.startsWith('data:image/svg+xml')) {
                        target.src = `https://api.dicebear.com/9.x/${selectedStyle}/svg?seed=${encodeURIComponent(seed)}`;
                      }
                    }}
                  />
                </div>

                <div className="w-full min-w-0 mb-3">
                  <div className="text-xs font-bold text-slate-900 truncate">{seed.split('_')[0]}</div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">seed={seed}</div>
                </div>

                {/* Quick actions on card */}
                <div className="flex items-center gap-1.5 w-full">
                  <button
                    onClick={() => handleCopyUrl(url, seed)}
                    className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                    title="复制头像 URL"
                  >
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{isCopied ? '已复制' : '复制URL'}</span>
                  </button>

                  <a
                    href={url}
                    download={generateUniqueExportFilename({
                      prefix: 'avatar',
                      style: selectedProvider === 'dicebear' ? selectedStyle : selectedProvider,
                      seed: seed,
                      ext: 'svg'
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
                    title="下载头像"
                  >
                    <Download className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: User Table Mock */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">SaaS / 企业用户管理表格应用示例</h3>
            <span className="text-xs text-slate-500">基于 userId 动态生成的确定性头像</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500 uppercase font-mono">
                  <th className="py-3 px-6">用户头像</th>
                  <th className="py-3 px-6">姓名</th>
                  <th className="py-3 px-6">角色</th>
                  <th className="py-3 px-6">邮箱</th>
                  <th className="py-3 px-6">状态</th>
                  <th className="py-3 px-6">用户 Seed (ID)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {SAMPLE_USERS.map((user) => {
                  const seed = user.name;
                  const itemConfig: GeneratorConfig = {
                    ...baseConfig,
                    providerId: selectedProvider as any,
                    style: selectedStyle,
                    seed: seed,
                  };
                  const url = buildAvatarUrl(itemConfig);

                  return (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-6">
                        <img
                          src={url}
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 object-cover shadow-2xs"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.src = `https://api.dicebear.com/9.x/${selectedStyle}/svg?seed=${encodeURIComponent(user.name)}`;
                          }}
                        />
                      </td>
                      <td className="py-3 px-6 font-semibold text-slate-900">{user.name}</td>
                      <td className="py-3 px-6 text-slate-600">{user.role}</td>
                      <td className="py-3 px-6 text-slate-500 font-mono">{user.email}</td>
                      <td className="py-3 px-6">
                        <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            user.status === '在线' ? 'bg-emerald-500' : user.status === '忙碌' ? 'bg-rose-500' : 'bg-slate-400'
                          }`} />
                          <span>{user.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-6 text-indigo-600 font-mono text-[11px]">{user.id}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Chat Thread Mock */}
      {viewMode === 'chat' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-bold text-slate-900 text-sm"># engineering-general 群聊消息流</span>
            </div>
            <span className="text-slate-500">8 位在线成员</span>
          </div>

          <div className="space-y-4">
            {SAMPLE_USERS.map((user) => {
              const itemConfig: GeneratorConfig = {
                ...baseConfig,
                providerId: selectedProvider as any,
                style: selectedStyle,
                seed: user.name,
              };
              const url = buildAvatarUrl(itemConfig);

              return (
                <div key={user.id} className="flex items-start gap-3 group">
                  <img
                    src={url}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 object-cover shrink-0 mt-0.5 shadow-2xs"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = `https://api.dicebear.com/9.x/${selectedStyle}/svg?seed=${encodeURIComponent(user.name)}`;
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-900">{user.name}</span>
                      <span className="text-[10px] text-slate-500">{user.role}</span>
                      <span className="text-[10px] text-slate-400 font-mono ml-auto">{user.time}</span>
                    </div>
                    <div className="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                      {user.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
