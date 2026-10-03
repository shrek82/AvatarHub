import { ApiProviderInfo, GeneratorConfig, AvatarStyleOption } from '../types/avatar';

export const DICEBEAR_STYLES: AvatarStyleOption[] = [
  // 1. 卡通与动漫立绘 (Cartoon)
  {
    id: 'adventurer',
    name: 'Adventurer',
    nameZh: 'RPG冒险者立绘',
    category: 'cartoon',
    descriptionZh: '精美细致的奇幻RPG冒险者立绘，发型服饰配件丰富多元。',
    sampleSeeds: ['Felix', 'Aria', 'Leo', 'Nova', 'Zack']
  },
  {
    id: 'adventurer-neutral',
    name: 'Adventurer Neutral',
    nameZh: '冒险者中性特写',
    category: 'cartoon',
    descriptionZh: '轻巧聚焦面部的冒险者头像框，适合作为小尺寸头像。',
    sampleSeeds: ['Aria', 'Milo', 'Ember', 'Robin', 'Rowan']
  },
  {
    id: 'lorelei',
    name: 'Lorelei',
    nameZh: '唯美水彩人物',
    category: 'cartoon',
    descriptionZh: '优雅柔和的水彩感韩系/日系唯美插画，面容温润精致。',
    sampleSeeds: ['Molly', 'Sophie', 'Oliver', 'Elena', 'Lucas']
  },
  {
    id: 'lorelei-neutral',
    name: 'Lorelei Neutral',
    nameZh: '唯美水彩中性',
    category: 'cartoon',
    descriptionZh: '无性别限定的水彩插画五官特写，柔美治愈。',
    sampleSeeds: ['Eden', 'Morgan', 'Sage', 'Jordan', 'Taylor']
  },
  {
    id: 'avataaars',
    name: 'Avataaars',
    nameZh: '经典扁平人像',
    category: 'cartoon',
    descriptionZh: '全球最流行的通用扁平插画肖像，配件与表情极其丰富。',
    sampleSeeds: ['Alexander', 'Chloe', 'Daniel', 'Emma', 'George']
  },
  {
    id: 'avataaars-neutral',
    name: 'Avataaars Neutral',
    nameZh: '扁平人像中性',
    category: 'cartoon',
    descriptionZh: '免胡须极简款扁平人像，线条干净，通用百搭。',
    sampleSeeds: ['Sam', 'Charlie', 'Riley', 'Avery', 'Parker']
  },
  {
    id: 'open-peeps',
    name: 'Open Peeps',
    nameZh: '开放手绘人像',
    category: 'cartoon',
    descriptionZh: 'Pablo Stanley 打造的手绘黑白手绘风格矢量插画库。',
    sampleSeeds: ['Stanley', 'Maya', 'Owen', 'Penny', 'Quinn']
  },
  {
    id: 'personas',
    name: 'Personas',
    nameZh: '现代波普人物',
    category: 'cartoon',
    descriptionZh: '波普艺术色彩与几何色块拼贴人物，辨识度极高。',
    sampleSeeds: ['Vibrant', 'Pop', 'Metro', 'Urban', 'Chic']
  },
  {
    id: 'dylan',
    name: 'Dylan',
    nameZh: '美漫潮流涂鸦',
    category: 'cartoon',
    descriptionZh: '美漫风格街头潮酷人物，充满滑板潮流与艺术张力。',
    sampleSeeds: ['Skater', 'Hipster', 'Rider', 'DJ', 'Graffiti']
  },
  {
    id: 'big-ears',
    name: 'Big Ears',
    nameZh: '大耳朵萌宝',
    category: 'cartoon',
    descriptionZh: '圆滚滚大耳朵卡通小人，非常适合年轻化社区与儿童产品。',
    sampleSeeds: ['Bunny', 'Pip', 'Mimi', 'Toby', 'Toto']
  },
  {
    id: 'big-ears-neutral',
    name: 'Big Ears Neutral',
    nameZh: '大耳朵轻巧版',
    category: 'cartoon',
    descriptionZh: '萌系大耳朵面部中性特写，小尺寸显示极为可爱。',
    sampleSeeds: ['Kiki', 'Lulu', 'Coco', 'Fifi', 'Nana']
  },
  {
    id: 'croodles',
    name: 'Croodles',
    nameZh: '随性小涂鸦',
    category: 'cartoon',
    descriptionZh: '随心所欲的童趣手绘风格，线条轻松治愈。',
    sampleSeeds: ['Doodle', 'Scribble', 'Sketch', 'Crayon', 'Chalk']
  },
  {
    id: 'croodles-neutral',
    name: 'Croodles Neutral',
    nameZh: '随性涂鸦中性',
    category: 'cartoon',
    descriptionZh: '极简手绘五官线条，专为自由随性风格定制。',
    sampleSeeds: ['Zen', 'Ink', 'Line', 'Dot', 'Dash']
  },
  {
    id: 'miniavs',
    name: 'Miniavs',
    nameZh: '迷你微缩人像',
    category: 'cartoon',
    descriptionZh: 'Q版微缩像素质感小人，细节丰富，俏皮灵动。',
    sampleSeeds: ['Mini1', 'Chibi', 'Pocket', 'Tiny', 'Micro']
  },

  // 2. 8-Bit 像素与游戏 (Pixel)
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    nameZh: '8-Bit 像素经典',
    category: 'pixel',
    descriptionZh: '怀旧红白机风格的像素小人，游戏、Web3与极客社区之选。',
    sampleSeeds: ['Retro', 'Arcade', 'Mario', 'Zelda', 'PixelKing']
  },
  {
    id: 'pixel-art-neutral',
    name: 'Pixel Art Neutral',
    nameZh: '8-Bit 像素中性',
    category: 'pixel',
    descriptionZh: '像素点阵五官特写，充满复古电子游戏氛围。',
    sampleSeeds: ['Nerd', 'Bit8', 'Chiptune', 'Voxel', 'Quest']
  },

  // 3. 机器人与科幻机甲 (Robot)
  {
    id: 'bottts',
    name: 'Bottts',
    nameZh: '机械装配机器人',
    category: 'robot',
    descriptionZh: '零件可随意组装的复古机械铁皮机器人，充满极客范。',
    sampleSeeds: ['Bender', 'Cyber', 'R2D2', 'WallE', 'Jarvis']
  },
  {
    id: 'bottts-neutral',
    name: 'Bottts Neutral',
    nameZh: '机器人头部特写',
    category: 'robot',
    descriptionZh: '科幻电子头部雷达与天线特写，非常适合技术 Bot。',
    sampleSeeds: ['Optimus', 'Alpha', 'Gundam', 'Spark', 'Volt']
  },

  // 4. 极简与效率素描 (Minimal)
  {
    id: 'notionists',
    name: 'Notionists',
    nameZh: 'Notion 极简素描',
    category: 'minimal',
    descriptionZh: '经典黑白线条与手绘素描感，专为知识库与工作效率产品设计。',
    sampleSeeds: ['Worker', 'Planner', 'Thinker', 'Coder', 'Writer']
  },
  {
    id: 'notionists-neutral',
    name: 'Notionists Neutral',
    nameZh: 'Notion 素描中性',
    category: 'minimal',
    descriptionZh: '纯黑白手绘人物头部，极简文青质感。',
    sampleSeeds: ['Focus', 'Notes', 'Task', 'Idea', 'Draft']
  },
  {
    id: 'micah',
    name: 'Micah',
    nameZh: '极简轻奢插画',
    category: 'minimal',
    descriptionZh: 'Linear、Notion 等现代极简 SaaS 极其青睐的高级文艺插画。',
    sampleSeeds: ['Harper', 'Isaac', 'Jasmine', 'Kevin', 'Luna']
  },

  // 5. 趣味与搞怪表情 (Fun)
  {
    id: 'fun-emoji',
    name: 'Fun Emoji',
    nameZh: '搞怪3D表情包',
    category: 'fun',
    descriptionZh: '生动夸张的 Emoji 微笑/吐舌/流泪表情，趣味社交首选。',
    sampleSeeds: ['Laugh', 'Wink', 'Cheeky', 'Joy', 'Cool']
  },
  {
    id: 'big-smile',
    name: 'Big Smile',
    nameZh: '咧嘴灿烂大笑',
    category: 'fun',
    descriptionZh: '大白牙与开怀大笑的纯真表情，正能量满满。',
    sampleSeeds: ['Grin', 'Cheer', 'Sunny', 'Beaming', 'Glad']
  },
  {
    id: 'thumbs',
    name: 'Thumbs',
    nameZh: '萌萌大拇指',
    category: 'fun',
    descriptionZh: '拟人化的大拇指软萌生物，呆萌可爱且治愈度拉满。',
    sampleSeeds: ['Happy', 'Bubbly', 'Chubby', 'Tiny', 'Blob']
  },

  // 6. 抽象几何与现代艺术 (Abstract)
  {
    id: 'shapes',
    name: 'Shapes',
    nameZh: '孟菲斯抽象几何',
    category: 'abstract',
    descriptionZh: '纯几何抽象图层叠加，充满现代数字艺术感。',
    sampleSeeds: ['Geo1', 'Matrix', 'Nexus', 'Vertex', 'Polygon']
  },
  {
    id: 'rings',
    name: 'Rings',
    nameZh: '炫彩光环轨道',
    category: 'abstract',
    descriptionZh: '同心彩环散发渐变光晕，充满科技感与神秘感。',
    sampleSeeds: ['Orbit', 'Cosmos', 'Halo', 'Eclipse', 'Aurora']
  },
  {
    id: 'identicon',
    name: 'Identicon',
    nameZh: '对称散列方块',
    category: 'abstract',
    descriptionZh: '类似 GitHub 经典基于 Hash 的 5x5 对称方块，纯算法确定性。',
    sampleSeeds: ['0x8f2c', 'github', 'commit', 'hash42', 'crypto']
  },
  {
    id: 'glass',
    name: 'Glass',
    nameZh: '现代毛玻璃流光',
    category: 'abstract',
    descriptionZh: '透光拟物半透明毛玻璃质感色块，极富质感。',
    sampleSeeds: ['Frost', 'Aero', 'Crystal', 'Glaze', 'Prism']
  },
  {
    id: 'icons',
    name: 'Icons',
    nameZh: '扁平线性图标',
    category: 'abstract',
    descriptionZh: '极简单色矢量功能图标，适合系统通用兜底。',
    sampleSeeds: ['Settings', 'Profile', 'User', 'Shield', 'Badge']
  },
  {
    id: 'initials',
    name: 'Initials',
    nameZh: '纯色首字母徽章',
    category: 'abstract',
    descriptionZh: '干净利落的首字母排版色块，企业管理系统首选。',
    sampleSeeds: ['Adam', 'Beta', 'Charlie', 'Delta', 'Echo']
  }
];

export const BORING_VARIANTS = [
  { id: 'beam', name: 'Beam (表情圆脸)', desc: '带微表情的柔和几何头像，极简耐看' },
  { id: 'marble', name: 'Marble (大理石纹理)', desc: '流体液体渐变与大理石纹理，艺术感浓厚' },
  { id: 'pixel', name: 'Pixel (色彩像素阵列)', desc: '抽象几何像素点阵，Web3钱包同款' },
  { id: 'sunset', name: 'Sunset (日落光晕)', desc: '自然暖光与深邃暮色，静谧舒适' },
  { id: 'ring', name: 'Ring (同心圆环)', desc: '多重彩色同心环，现代主义几何设计' },
  { id: 'bauhaus', name: 'Bauhaus (包豪斯构图)', desc: '向现代主义设计先驱致敬的硬朗几何切片' }
];

export const COLOR_PALETTES = [
  { name: '极光霓虹', colors: ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'] },
  { name: '现代莫兰迪', colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'] },
  { name: '柔和马卡龙', colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'] },
  { name: '暗夜赛博', colors: ['#0f051d', '#5b2a86', '#7785ac', '#ff6b6b', '#ffd166'] },
  { name: '清新抹茶', colors: ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429'] }
];

export const API_PROVIDERS: ApiProviderInfo[] = [
  {
    id: 'dicebear',
    name: 'DiceBear API',
    tagline: '全网功能最丰富、生态最广的开源矢量头像服务',
    descriptionZh: '提供 20+ 款高质量独立艺术家设计的头像风格。支持 SVG/PNG/WebP，每个 style 都有数十项可定制属性（发型、眼睛、背景、配饰、颜色、旋转缩放）。全球 CDN 托管，永久免费且开源。',
    website: 'https://dicebear.com',
    docsUrl: 'https://www.dicebear.com/how-to-use/http-api/',
    isFree: true,
    rateLimitInfo: '无速率限制，全球 CDN 高速缓存',
    formatSupport: ['svg', 'png', 'webp', 'jpg'],
    license: 'CC0 / MIT / Apache 2.0 (完全开源免费)',
    bestFor: '社交产品、SaaS 应用、游戏公会、论坛与企业员工系统',
    baseUrl: 'https://api.dicebear.com/9.x',
    styles: DICEBEAR_STYLES,
    featuresZh: [
      '20+ 种各异艺术流派（像素、Notion黑白风、日漫RPG、机械机器人等）',
      '支持任意 Seed：输入用户名、邮箱、随机数即可生成固定且独特的头像',
      '支持指定背景色 palette，如 backgroundColor=b6e3f4,c0aede',
      '纯矢量 SVG 输出，放大到 4K 依然丝滑锐利；也可输出 PNG 与 WebP',
      '支持 npm 本地离线安装调用（无需向外部发起任何网络请求）'
    ],
    urlExample: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Aria&backgroundColor=b6e3f4'
  },
  {
    id: 'boringavatars',
    name: 'Boring Avatars',
    tagline: '极具美感的极简抽象/渐变/几何头像服务',
    descriptionZh: '专为现代 Web 设计打造的 SVG 头像生成服务。提供 Beam、Marble、Pixel、Sunset、Ring、Bauhaus 六种极具设计品味的变体，支持自定义 5 色调色板。',
    website: 'https://boringavatars.com',
    docsUrl: 'https://github.com/boringdesigners/boring-avatars',
    isFree: true,
    rateLimitInfo: '无严格限制，基于 Vercel Edge 边缘节点',
    formatSupport: ['svg'],
    license: 'MIT (完全开源)',
    bestFor: 'Web3 加密钱包、SaaS 仪表盘、极简设计型工具、数据看板',
    baseUrl: 'https://source.boringavatars.com',
    featuresZh: [
      '6 种极简抽象艺术流派（微表情 Beam、流体大理石 Marble、光晕 Sunset 等）',
      '完美适配自定义品牌主色调，支持通过 colors= 参数注入 hex 数组',
      '完全不暴露真实人像隐私，适合注重安全与合规的现代应用',
      '纯 SVG 矢量结构，轻量级，支持 React/Vue 组件化直接嵌入'
    ],
    urlExample: 'https://source.boringavatars.com/beam/120/Stefan?colors=264653,2a9d8f,e9c46a,f4a261,e76f51'
  },
  {
    id: 'multiavatar',
    name: 'Multiavatar API',
    tagline: '120 亿种多元文化独特人像生成算法',
    descriptionZh: '通过独特的生成式算法，将不同种族、性别、文化特征无缝融合，提供高达 120 亿种绝对不重复的多元化现代扁平矢量人像。',
    website: 'https://multiavatar.com',
    docsUrl: 'https://multiavatar.com',
    isFree: true,
    rateLimitInfo: '免费版每天几千次调用，支持开源库本地运行',
    formatSupport: ['svg', 'png'],
    license: '免费非商业，商业授权可自建 npm',
    bestFor: '国际化应用、跨国团队、游戏玩家、元宇宙虚拟身份',
    baseUrl: 'https://api.multiavatar.com',
    featuresZh: [
      '高达 120 亿种面部组合，数学上几乎不可能发生碰撞重复',
      '融合全球各民族特征（服饰、肤色、发型、配饰）',
      '极简 API 规则：只需在 URL 拼接 /{seed}.svg 即可',
      '支持本地 npm 安装（@multiavatar/multiavatar）实现 0 延迟离线自建'
    ],
    urlExample: 'https://api.multiavatar.com/CyberKnight.svg'
  },
  {
    id: 'robohash',
    name: 'RoboHash API',
    tagline: '经典极客机器人、萌怪兽与猫咪头像',
    descriptionZh: '老牌且极其稳定的头像散列算法服务。任何文本字符串都会被哈希为专属的复古机器人、外星小怪兽、小猫咪或漫画人物。',
    website: 'https://robohash.org',
    docsUrl: 'https://robohash.org',
    isFree: true,
    rateLimitInfo: '永久免费，无速率限制',
    formatSupport: ['png'],
    license: 'CC-BY-3.0',
    bestFor: '开发者工具、技术论坛、CI/CD 机器人展示、极客玩具',
    baseUrl: 'https://robohash.org',
    featuresZh: [
      '5 大主题类别：经典机器人(set1)、怪物(set2)、呆萌机甲(set3)、猫咪(set4)、人类(set5)',
      '支持叠加随机背景或透明背景（bgset=bg1 / bg2）',
      '支持自定义分辨率（如 200x200、300x300）',
      '老牌高可用，GitHub 与诸多开源项目常用其作为用户测试头像'
    ],
    urlExample: 'https://robohash.org/developer42.png?set=set1&size=200x200'
  },
  {
    id: 'uiavatars',
    name: 'UI Avatars API',
    tagline: '姓名字母与首字母缩写头像终极方案',
    descriptionZh: '在用户未上传头像时，提取用户姓名首字母（如 "John Doe" -> "JD"）生成干净现代的排版头像。企业 OA、CRM、后台管理系统的行业标准。',
    website: 'https://ui-avatars.com',
    docsUrl: 'https://ui-avatars.com',
    isFree: true,
    rateLimitInfo: '永久免费，高承载 CDN',
    formatSupport: ['svg', 'png'],
    license: 'MIT',
    bestFor: '企业后台管理系统、协作工具、邮件系统默认无头像兜底',
    baseUrl: 'https://ui-avatars.com/api',
    featuresZh: [
      '自动提取中英文首字母（如“张三”显示“张”，“John Doe”显示“JD”）',
      '支持 background=random 自动为不同用户分配协调背景色',
      '支持 rounded=true 全圆头像与 bold=true 加粗字体',
      '体积极小（几个字节），加载速度飞快，容灾首选'
    ],
    urlExample: 'https://ui-avatars.com/api/?name=Alex+Morgan&background=random&color=fff&size=128&rounded=true'
  },
  {
    id: 'pravatar',
    name: 'Pravatar / RandomUser',
    tagline: '真实人类摄影肖像照片 API',
    descriptionZh: '如果你的原型界面或演示系统需要真实人类的面容摄影（如电商评价、社交圈、团队介绍），Pravatar 与 RandomUser 是绝佳选择。',
    website: 'https://pravatar.cc',
    docsUrl: 'https://pravatar.cc',
    isFree: true,
    rateLimitInfo: '免费公开可用',
    formatSupport: ['jpg'],
    license: '免费用于演示与开发',
    bestFor: '设计原型、CRM 演示数据、电商评论区真实人像模拟',
    baseUrl: 'https://i.pravatar.cc',
    featuresZh: [
      '100% 真实摄影棚级人像照片',
      '支持基于种子 u={seed} 的确定性返回',
      '支持自由设定像素尺寸（如 /300）',
      '即插即用，无需任何密钥'
    ],
    urlExample: 'https://i.pravatar.cc/300?u=user_demo_123'
  }
];

export const TRAIT_PRESETS = [
  {
    id: 'anime_girl',
    name: '🌸 元气少女',
    desc: '女性向 · 柔粉/浅栗长发 · 白皙透亮 · 治愈微笑',
    traits: {
      enabled: true,
      gender: 'female' as const,
      hairLength: 'long' as const,
      hairColor: 'e066a3',
      skinTone: 'pale' as const,
      mood: 'happy' as const,
      glasses: 'none' as const,
      beard: 'none' as const,
      presetName: '元气少女'
    }
  },
  {
    id: 'geek_coder',
    name: '💻 极客程序员',
    desc: '男性向 · 利落黑发短发 · 佩戴眼镜 · 专注神态',
    traits: {
      enabled: true,
      gender: 'male' as const,
      hairLength: 'short' as const,
      hairColor: '0e0e0e',
      skinTone: 'light' as const,
      mood: 'cool' as const,
      glasses: 'reading' as const,
      beard: 'none' as const,
      presetName: '极客程序员'
    }
  },
  {
    id: 'business_elite',
    name: '👔 商务精英',
    desc: '男女适宜 · 深色干练发型 · 自然肤色 · 自信微笑',
    traits: {
      enabled: true,
      gender: 'any' as const,
      hairLength: 'medium' as const,
      hairColor: '4a3728',
      skinTone: 'light' as const,
      mood: 'happy' as const,
      glasses: 'none' as const,
      beard: 'none' as const,
      presetName: '商务精英'
    }
  },
  {
    id: 'cyber_rebel',
    name: '⚡ 赛博潮人',
    desc: '潮流酷感 · 赛博靛蓝/赤红 · 佩戴墨镜 · 小麦健康色',
    traits: {
      enabled: true,
      gender: 'any' as const,
      hairLength: 'short' as const,
      hairColor: '476793',
      skinTone: 'tan' as const,
      mood: 'cool' as const,
      glasses: 'sunglasses' as const,
      beard: 'stubble' as const,
      presetName: '赛博潮人'
    }
  },
  {
    id: 'fantasy_hero',
    name: '🧙 奇幻勇士',
    desc: '白金发色 · 坚毅神态 · 冒险者立绘',
    traits: {
      enabled: true,
      gender: 'male' as const,
      hairLength: 'medium' as const,
      hairColor: 'e2ba87',
      skinTone: 'light' as const,
      mood: 'happy' as const,
      glasses: 'none' as const,
      beard: 'none' as const,
      presetName: '奇幻勇士'
    }
  }
];

export const HAIR_COLOR_CHOICES = [
  { id: 'any', name: '随机发色', hex: '#64748b' },
  { id: '0e0e0e', name: '乌黑', hex: '#18181b' },
  { id: '4a3728', name: '深褐', hex: '#582f14' },
  { id: 'e2ba87', name: '金发', hex: '#e2ba87' },
  { id: 'b84742', name: '赤红', hex: '#b84742' },
  { id: '476793', name: '靛蓝', hex: '#3b82f6' },
  { id: 'e066a3', name: '樱粉', hex: '#ec4899' },
  { id: 'd4d4d8', name: '银白', hex: '#d4d4d8' },
];

export function applyTraitsToParams(
  style: string,
  traits: GeneratorConfig['traits'],
  params: URLSearchParams
) {
  if (!traits || !traits.enabled) return;

  const s = style.toLowerCase();

  // 1. AVATAAARS and AVATAAARS-NEUTRAL
  if (s === 'avataaars' || s === 'avataaars-neutral') {
    if (traits.gender === 'female' || traits.hairLength === 'long') {
      params.set('top', 'longHairBob,longHairBun,longHairCurly,longHairCurvy,longHairMia,longHairStraight,longHairStraight2');
      params.set('facialHairProbability', '0');
    } else if (traits.gender === 'male' || traits.hairLength === 'short') {
      params.set('top', 'shortHairDreads01,shortHairDreads02,shortHairShortCurly,shortHairShortFlat,shortHairShortRound,shortHairShortWaved,shortHairSides,shortHairTheCaesar');
    }

    // Avataaars hair color uses enum names: auburn, black, blonde, brown, pastelPink, platinum, red, silverGray
    const avataaarsHairColorMap: Record<string, string> = {
      '0e0e0e': 'black',
      '4a3728': 'brown',
      'e2ba87': 'blonde',
      'b84742': 'red',
      '476793': 'black',
      'e066a3': 'pastelPink',
      'd4d4d8': 'silverGray',
    };
    if (traits.hairColor && traits.hairColor !== 'any') {
      const mapped = avataaarsHairColorMap[traits.hairColor] || 'brown';
      params.set('hairColor', mapped);
    }

    // Avataaars skinColor uses enum names: tanned, yellow, pale, light, brown, darkBrown, black
    if (traits.skinTone === 'pale') {
      params.set('skinColor', 'pale');
    } else if (traits.skinTone === 'light') {
      params.set('skinColor', 'light');
    } else if (traits.skinTone === 'tan') {
      params.set('skinColor', 'tanned');
    } else if (traits.skinTone === 'dark') {
      params.set('skinColor', 'darkBrown');
    }

    // Accessories / Glasses
    if (traits.glasses === 'none') {
      params.set('accessoriesProbability', '0');
    } else if (traits.glasses === 'sunglasses') {
      params.set('accessories', 'sunglasses,wayfarers');
      params.set('accessoriesProbability', '100');
    } else if (traits.glasses === 'reading') {
      params.set('accessories', 'round,prescription01,prescription02');
      params.set('accessoriesProbability', '100');
    }

    // Beard
    if (traits.beard === 'none') {
      params.set('facialHairProbability', '0');
    } else if (traits.beard === 'stubble') {
      params.set('facialHair', 'beardLight,moustacheFancy');
      params.set('facialHairProbability', '100');
    } else if (traits.beard === 'full') {
      params.set('facialHair', 'beardMedium,beardMajestic');
      params.set('facialHairProbability', '100');
    }

    // Mood
    if (traits.mood === 'happy') {
      params.set('mouth', 'smile,twinkle');
      params.set('eyes', 'happy,default');
    } else if (traits.mood === 'cool') {
      params.set('mouth', 'default,serious');
      params.set('eyes', 'default');
    } else if (traits.mood === 'wink') {
      params.set('eyes', 'wink');
      params.set('mouth', 'smile');
    } else if (traits.mood === 'surprised') {
      params.set('mouth', 'disbelief,scream');
      params.set('eyes', 'surprised');
    }
    return;
  }

  // 2. ADVENTURER and ADVENTURER-NEUTRAL
  if (s === 'adventurer' || s === 'adventurer-neutral') {
    if (traits.gender === 'female' || traits.hairLength === 'long') {
      params.set('hair', 'long01,long02,long03,long04,long05,long06,long07,long08,long09,long10');
      params.set('featuresProbability', '0');
    } else if (traits.gender === 'male' || traits.hairLength === 'short') {
      params.set('hair', 'short01,short02,short03,short04,short05,short06,short07,short08');
    }

    if (traits.hairColor && traits.hairColor !== 'any') {
      params.set('hairColor', traits.hairColor.replace('#', ''));
    }

    if (traits.skinTone === 'pale') {
      params.set('skinColor', 'f8d9d6,fbebe8');
    } else if (traits.skinTone === 'light') {
      params.set('skinColor', 'f2d3b1,ecac76');
    } else if (traits.skinTone === 'tan') {
      params.set('skinColor', 'd08b5b,ae5d29');
    } else if (traits.skinTone === 'dark') {
      params.set('skinColor', '823600,612400');
    }

    if (traits.glasses === 'none') {
      params.set('glassesProbability', '0');
    } else if (traits.glasses === 'sunglasses' || traits.glasses === 'reading') {
      params.set('glassesProbability', '100');
    }

    if (traits.mood === 'happy') {
      params.set('mouth', 'variant01,variant02,variant03');
    } else if (traits.mood === 'cool') {
      params.set('eyes', 'variant02,variant03');
    } else if (traits.mood === 'wink') {
      params.set('eyes', 'variant05,variant06');
    } else if (traits.mood === 'surprised') {
      params.set('mouth', 'variant07,variant08');
    }
    return;
  }

  // 3. LORELEI and LORELEI-NEUTRAL
  if (s === 'lorelei' || s === 'lorelei-neutral') {
    if (traits.gender === 'female' || traits.hairLength === 'long') {
      params.set('hair', 'straight,curly,wavy');
    }
    if (traits.hairColor && traits.hairColor !== 'any') {
      params.set('hairColor', traits.hairColor.replace('#', ''));
    }
    if (traits.glasses === 'none') {
      params.set('glassesProbability', '0');
    } else if (traits.glasses !== 'any') {
      params.set('glassesProbability', '100');
    }
    if (traits.mood === 'happy') {
      params.set('mouth', 'happy01,happy02,happy03');
    } else if (traits.mood === 'cool') {
      params.set('mouth', 'serious01,serious02');
    }
    return;
  }

  // 4. MICAH
  if (s === 'micah') {
    if (traits.gender === 'female' || traits.hairLength === 'long') {
      params.set('hair', 'full,pixie');
      params.set('facialHairProbability', '0');
    } else if (traits.gender === 'male' || traits.hairLength === 'short') {
      params.set('hair', 'fonze,mrClean,mrT');
    }
    if (traits.hairColor && traits.hairColor !== 'any') {
      params.set('hairColor', traits.hairColor.replace('#', ''));
    }
    if (traits.glasses === 'none') {
      params.set('glassesProbability', '0');
    } else if (traits.glasses !== 'any') {
      params.set('glassesProbability', '100');
    }
    if (traits.beard === 'none') {
      params.set('facialHairProbability', '0');
    } else if (traits.beard !== 'any') {
      params.set('facialHairProbability', '100');
    }
    return;
  }

  // 5. OPEN-PEEPS
  if (s === 'open-peeps') {
    if (traits.gender === 'female' || traits.hairLength === 'long') {
      params.set('head', 'bun,curly,long,medium1,mediumBangs1,mediumStraight');
      params.set('facialHair', '');
    } else if (traits.gender === 'male' || traits.hairLength === 'short') {
      params.set('head', 'flatTop,short1,short2,short3,short4,short5');
    }
    if (traits.mood === 'happy') {
      params.set('face', 'smile,smileBig,smileLOL,smileTeeth');
    } else if (traits.mood === 'cool') {
      params.set('face', 'calm,serious');
    }
    return;
  }

  // 6. PERSONAS
  if (s === 'personas') {
    if (traits.skinTone === 'pale' || traits.skinTone === 'light') {
      params.set('skinColor', 'f2d3b1,f8d9d6');
    } else if (traits.skinTone === 'tan' || traits.skinTone === 'dark') {
      params.set('skinColor', 'd08b5b,823600');
    }
    return;
  }

  // 7. BIG-EARS and BIG-EARS-NEUTRAL
  if (s === 'big-ears' || s === 'big-ears-neutral') {
    if (traits.hairColor && traits.hairColor !== 'any') {
      params.set('hairColor', traits.hairColor.replace('#', ''));
    }
    if (traits.skinTone === 'pale' || traits.skinTone === 'light') {
      params.set('skinColor', 'f8d9d6,f2d3b1');
    } else if (traits.skinTone === 'tan' || traits.skinTone === 'dark') {
      params.set('skinColor', 'd08b5b,823600');
    }
    return;
  }

  // 8. BIG-SMILE
  if (s === 'big-smile') {
    if (traits.hairColor && traits.hairColor !== 'any') {
      params.set('hairColor', traits.hairColor.replace('#', ''));
    }
    if (traits.skinTone === 'pale' || traits.skinTone === 'light') {
      params.set('skinColor', 'f8d9d6,f2d3b1');
    }
    return;
  }
}

export function buildAvatarUrl(config: GeneratorConfig): string {
  const seed = config.seed.trim() || 'default_seed';

  switch (config.providerId) {
    case 'dicebear': {
      const format = config.format || 'svg';
      const params = new URLSearchParams();
      params.set('seed', seed);
      if (config.backgroundColor && config.backgroundColor !== 'transparent') {
        const cleanBg = config.backgroundColor.replace('#', '');
        params.set('backgroundColor', cleanBg);
      }
      if (config.radius > 0) {
        params.set('radius', config.radius.toString());
      }
      if (config.flip) {
        params.set('flip', 'true');
      }
      if (config.rotate !== 0) {
        params.set('rotate', config.rotate.toString());
      }
      if (config.size && format !== 'svg') {
        params.set('size', config.size.toString());
      }

      // Rich Custom Factor / Trait Injection strictly mapped per style schema
      applyTraitsToParams(config.style, config.traits, params);

      return `https://api.dicebear.com/9.x/${config.style}/${format}?${params.toString()}`;
    }

    case 'boringavatars': {
      const colors = config.boringColors.map(c => c.replace('#', '')).join(',');
      const size = config.size || 120;
      return `https://source.boringavatars.com/${config.boringVariant}/${size}/${encodeURIComponent(seed)}?colors=${colors}`;
    }

    case 'multiavatar': {
      const format = config.format === 'png' ? 'png' : 'svg';
      return `https://api.multiavatar.com/${encodeURIComponent(seed)}.${format}`;
    }

    case 'robohash': {
      const size = config.size || 200;
      const params = new URLSearchParams();
      params.set('set', config.roboSet || 'set1');
      if (config.roboBg) {
        params.set('bgset', config.roboBg);
      }
      params.set('size', `${size}x${size}`);
      return `https://robohash.org/${encodeURIComponent(seed)}.png?${params.toString()}`;
    }

    case 'uiavatars': {
      const name = config.uiName || seed;
      const params = new URLSearchParams();
      params.set('name', name);
      params.set('background', config.uiBackground || 'random');
      params.set('color', config.uiColor || 'fff');
      params.set('size', (config.size || 128).toString());
      params.set('rounded', config.uiRounded ? 'true' : 'false');
      params.set('bold', 'true');
      return `https://ui-avatars.com/api/?${params.toString()}`;
    }

    case 'pravatar': {
      const size = config.size || 300;
      return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
    }

    case 'randomuser': {
      const gender = config.realGender || 'men';
      const id = (Math.abs(hashString(seed)) % 99) + 1;
      return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
    }

    default:
      return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;
  }
}

// Simple deterministic hash for seeds
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export const RANDOM_WORD_SEEDS = [
  'Aurora', 'Breeze', 'Cosmo', 'Draco', 'Echo', 'Frost', 'Galaxy', 'Horizon',
  'Iris', 'Jasper', 'Kairo', 'Lyra', 'Meteor', 'Nebula', 'Orion', 'Phoenix',
  'Quantum', 'Riptide', 'Starlight', 'Titan', 'Umbra', 'Vortex', 'Zephyr',
  'CyberPanda', 'NeonTiger', 'PixelFalcon', 'StarOtter', 'QuantumFox',
  'XiaoMing', 'LiHua', 'ZhiHu', 'Bilibili', 'GeekCoder'
];

export function getRandomSeed(): string {
  const index = Math.floor(Math.random() * RANDOM_WORD_SEEDS.length);
  const randomSuffix = Math.floor(Math.random() * 900 + 100);
  return `${RANDOM_WORD_SEEDS[index]}_${randomSuffix}`;
}

export function generateCodeSnippet(config: GeneratorConfig, language: string): string {
  const url = buildAvatarUrl(config);

  switch (language) {
    case 'curl':
      return `# 使用 cURL 直接下载头像到本地
curl -o avatar.${config.format === 'png' ? 'png' : config.format === 'jpg' ? 'jpg' : 'svg'} \\
  "${url}"`;

    case 'javascript':
      return `// 纯前端原生 JavaScript 动态生成随机头像
function getRandomAvatarUrl(usernameOrSeed = null) {
  // 每次随机只需生成不同 seed（如时间戳或随机数）
  const seed = usernameOrSeed || Math.random().toString(36).substring(2, 9);
  
  // 当前配置的 API 请求地址
  return "${url}".replace(/seed=[^&]*/, 'seed=' + encodeURIComponent(seed));
}

// 示例：给 img 元素赋值
const avatarImg = document.createElement('img');
avatarImg.src = getRandomAvatarUrl();
document.body.appendChild(avatarImg);`;

    case 'react':
      return `import React, { useState } from 'react';

interface AvatarProps {
  userId?: string;
  size?: number;
}

export const RandomAvatar: React.FC<AvatarProps> = ({ 
  userId, 
  size = ${config.size} 
}) => {
  // 如果提供了固定 userId，则该用户每次展示同一个专属头像；
  // 如果没提供，每次刷新或点击都生成新头像！
  const [currentSeed, setCurrentSeed] = useState(
    () => userId || Math.random().toString(36).slice(2, 8)
  );

  const reRoll = () => {
    setCurrentSeed(Math.random().toString(36).slice(2, 8));
  };

  const avatarUrl = \`${url}\`.replace(/seed=[^&]*/, \`seed=\${currentSeed}\`);

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <img
        src={avatarUrl}
        alt="Avatar"
        width={size}
        height={size}
        className="rounded-full shadow-md object-cover transition-transform hover:scale-105"
        loading="lazy"
      />
      <button 
        onClick={reRoll}
        className="text-xs text-indigo-400 hover:underline"
      >
        🎲 换一个
      </button>
    </div>
  );
};`;

    case 'vue':
      return `<template>
  <div class="avatar-wrapper">
    <img 
      :src="avatarUrl" 
      :alt="seed" 
      :width="size" 
      :height="size" 
      class="avatar-img"
    />
    <button @click="refreshAvatar" class="reroll-btn">
      随机换一个
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  initialSeed: { type: String, default: '' },
  size: { type: Number, default: ${config.size} }
});

const seed = ref(props.initialSeed || Math.random().toString(36).slice(2, 8));

const avatarUrl = computed(() => {
  const base = "${url}";
  return base.replace(/seed=[^&]*/, \`seed=\${encodeURIComponent(seed.value)}\`);
});

const refreshAvatar = () => {
  seed.value = Math.random().toString(36).slice(2, 8);
};
</script>`;

    case 'python':
      return `import requests
import uuid

def get_random_avatar_url(seed: str = None) -> str:
    """生成随机头像 URL"""
    if not seed:
        seed = str(uuid.uuid4())[:8]
    
    # 动态将 seed 填入 API
    return f"${url}".replace("seed=${encodeURIComponent(config.seed)}", f"seed={seed}")

# 演示：下载头像保存到本地
seed_name = "user_42"
url = get_random_avatar_url(seed_name)
response = requests.get(url, timeout=10)

if response.status_code == 200:
    ext = "${config.format}"
    with open(f"avatar_{seed_name}.{ext}", "wb") as f:
        f.write(response.content)
    print(f"成功保存头像到 avatar_{seed_name}.{ext}")`;

    case 'nodejs':
      return `import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import crypto from 'node:crypto';

async function downloadRandomAvatar(outputPath) {
  // 生成完全随机的 seed
  const randomSeed = crypto.randomBytes(4).toString('hex');
  const targetUrl = "${url}".replace(
    /seed=[^&]*/, 
    \`seed=\${randomSeed}\`
  );

  console.log(\`正在请求头像: \${targetUrl}\`);
  const response = await fetch(targetUrl);
  if (!response.ok) throw new Error(\`下载失败: \${response.statusText}\`);

  // 将头像流式写入本地文件
  const fileStream = fs.createWriteStream(outputPath);
  await pipeline(response.body, fileStream);
  console.log(\`头像已保存至: \${outputPath}\`);
}

downloadRandomAvatar('./random_avatar.${config.format}');`;

    default:
      return url;
  }
}
