import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Cpu, 
  Server
} from 'lucide-react';

export const GuideSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
          <BookOpen className="w-3.5 h-3.5" />
          <span>开发者实践与选型指南</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          随机与自定义头像生成技术全景解析
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          深入解析为什么各大平台普遍采用基于种子（Seed）的生成式头像方案，以及在企业级产品中如何兼顾随机性、稳定性与离线容灾。
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>主流头像接口横向评测与选型矩阵</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-mono text-slate-600 uppercase">
                <th className="py-3 px-4">API 服务</th>
                <th className="py-3 px-4">艺术风格数</th>
                <th className="py-3 px-4">支持格式</th>
                <th className="py-3 px-4">速率限制</th>
                <th className="py-3 px-4">自建与离线支持</th>
                <th className="py-3 px-4">推荐业务场景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">DiceBear (9.x)</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">20+ 独立画风</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">SVG / PNG / WebP</td>
                <td className="py-3.5 px-4 text-emerald-700 font-medium">无限制 (全球CDN)</td>
                <td className="py-3.5 px-4 text-emerald-700">支持 npm 离线运行</td>
                <td className="py-3.5 px-4 text-slate-600">社交App、SaaS、二次元、极客社区（强烈推荐首选）</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Boring Avatars</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">6 种极简抽象</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">SVG</td>
                <td className="py-3.5 px-4 text-emerald-700 font-medium">无限制 (Edge 缓存)</td>
                <td className="py-3.5 px-4 text-emerald-700">支持 React/Vue 组件库</td>
                <td className="py-3.5 px-4 text-slate-600">Web3 加密钱包、Notion 风格看板、极简科技产品</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Multiavatar</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">120 亿种组合</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">SVG / PNG</td>
                <td className="py-3.5 px-4 text-amber-700 font-medium">公有 API 有轻微上限</td>
                <td className="py-3.5 px-4 text-emerald-700">支持 npm 离线</td>
                <td className="py-3.5 px-4 text-slate-600">国际化产品、多元种族文化、无状态身份认证</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">RoboHash</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">5 类 (机器人/怪兽/猫咪)</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">PNG</td>
                <td className="py-3.5 px-4 text-emerald-700 font-medium">无限制</td>
                <td className="py-3.5 px-4 text-slate-600">支持开源 Python 服务</td>
                <td className="py-3.5 px-4 text-slate-600">开发者工具、CI/CD 机器人、GitHub 风格趣味头像</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">UI Avatars</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">首字母排版</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">SVG / PNG</td>
                <td className="py-3.5 px-4 text-emerald-700 font-medium">无限制</td>
                <td className="py-3.5 px-4 text-slate-600">云端免费服务</td>
                <td className="py-3.5 px-4 text-slate-600">企业级 ERP、OA 系统、无头像默认文字兜底</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Pravatar</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">真实人物肖像库</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">JPG</td>
                <td className="py-3.5 px-4 text-emerald-700 font-medium">无限制</td>
                <td className="py-3.5 px-4 text-slate-600">仅云端调用</td>
                <td className="py-3.5 px-4 text-slate-600">电商买家秀、CRM 客户原型、团队展示页</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Core Concept: Deterministic Hashing vs Pure Randomness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>核心机制：确定性哈希 (Deterministic Hashing)</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            几乎所有优秀的现代头像接口都没有使用“每次请求服务器临时投骰子”的伪随机机制，而是采用<strong>散列算法</strong>：
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
            <li>输入同一个 Seed（如 <code className="text-indigo-700 font-mono">user_1024</code>），无论请求 100 次还是 1 年后请求，生成的眼睛、发型、肤色都严格一致。</li>
            <li>输入不同的 Seed（如 <code className="text-indigo-700 font-mono">user_1025</code>），哪怕只变动 1 位字符，生成的头像外观会有天翻地覆的差异。</li>
            <li><strong>优势：</strong> CDN 边缘节点可以 100% 缓存该图片，极大节省服务器资源，毫秒级即时加载！</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600" />
            <span>生产环境高可用保障：本地离线方案</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            如果不希望线上业务依赖外部 CDN 域名，<strong>DiceBear</strong> 与 <strong>Boring Avatars</strong> 都提供了纯 npm 包离线运行方案：
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-indigo-700 space-y-1">
            <div>npm install @dicebear/core @dicebear/collection</div>
            <div className="text-slate-400">// 纯前端或 Node 服务端直接渲染为 SVG 字符串，0 外部网络依赖！</div>
          </div>
          <p className="text-[11px] text-slate-500">
            不仅没有任何限频和停服风险，还能达到 1ms 内的内存级渲染性能。
          </p>
        </div>
      </div>

      {/* FAQ Accordion / Cards */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>开发实战高频问题解答 (FAQ)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Q: 图片接口会存在跨域 (CORS) 拦截吗？</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              不会。标准的 HTML <code className="text-indigo-700 font-mono">&lt;img src="..."&gt;</code> 标签属于跨源可嵌资源，不存在跨域限制；如果你使用 <code className="text-indigo-700 font-mono">fetch()</code> 获取原始 SVG 文本，上述主流服务（如 DiceBear）均默认返回 <code className="text-indigo-700 font-mono">Access-Control-Allow-Origin: *</code> 标头。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Q: 我应该选 SVG 还是 PNG 格式？</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              强烈推荐 <strong>SVG 格式</strong>！SVG 纯文本体积极小（通常只有 1~3 KB），在任何视网膜屏幕、高分辨率显示器或手机上缩放均保持完美清晰无锯齿。若需要接入原生 Android/iOS 的低版本图片加载器，再选择 PNG。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Q: 这些头像可以商用吗？是否侵权？</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              DiceBear 核心代码遵循 MIT 协议，其各个风格的插画版权（如 Adventurer、Avataaars、Micah）多遵循 CC0 1.0 Universal（公有领域）或 CC-BY-4.0 开源协议，免费商用无需担忧；UI Avatars 与 Boring Avatars 也均为 MIT 开源协议。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Q: 如何让新用户在注册时获得随机头像？</div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              推荐在数据库注册事务中，将头像字段初始化为接口 URL，拼接用户主键或邮箱哈希作为 seed（如 <code className="text-indigo-700 font-mono">api.dicebear.com/9.x/adventurer/svg?seed=&#123;user.id&#125;</code>），无需在注册时占用存储服务器上传头像！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
