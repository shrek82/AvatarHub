export type ApiProviderId = 
  | 'dicebear' 
  | 'boringavatars' 
  | 'multiavatar' 
  | 'robohash' 
  | 'uiavatars' 
  | 'pravatar' 
  | 'randomuser';

export type StyleCategory = 'cartoon' | 'pixel' | 'abstract' | 'minimal' | 'fun' | 'realistic' | 'robot';

export interface AvatarStyleOption {
  id: string;
  name: string;
  nameZh: string;
  category: StyleCategory;
  descriptionZh: string;
  sampleSeeds: string[];
}

export interface ApiProviderInfo {
  id: ApiProviderId;
  name: string;
  tagline: string;
  descriptionZh: string;
  website: string;
  docsUrl: string;
  isFree: boolean;
  rateLimitInfo: string;
  formatSupport: ('svg' | 'png' | 'webp' | 'jpg')[];
  license: string;
  bestFor: string;
  baseUrl: string;
  styles?: AvatarStyleOption[];
  featuresZh: string[];
  urlExample: string;
}

export interface CustomTraitsConfig {
  enabled: boolean;
  gender: 'any' | 'female' | 'male';
  hairLength: 'any' | 'long' | 'short' | 'medium';
  hairColor: string; // 'any' or hex
  skinTone: 'any' | 'pale' | 'light' | 'tan' | 'dark';
  mood: 'any' | 'happy' | 'cool' | 'wink' | 'gentle' | 'surprised';
  glasses: 'any' | 'none' | 'sunglasses' | 'reading';
  beard: 'any' | 'none' | 'stubble' | 'full';
  presetName?: string;
}

export interface GeneratorConfig {
  providerId: ApiProviderId;
  style: string;
  seed: string;
  format: 'svg' | 'png' | 'webp' | 'jpg';
  size: number;
  backgroundColor: string;
  flip: boolean;
  radius: number;
  rotate: number;
  traits?: CustomTraitsConfig;
  // Boring Avatars variant
  boringVariant: 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
  boringColors: string[];
  // RoboHash options
  roboSet: 'set1' | 'set2' | 'set3' | 'set4' | 'set5';
  roboBg: '' | 'bg1' | 'bg2';
  // UI Avatars
  uiName: string;
  uiBackground: string;
  uiColor: string;
  uiRounded: boolean;
  // Pravatar / RandomUser
  realGender: 'men' | 'women';
  photoId: number;
}

export type CodeTab = 'curl' | 'javascript' | 'react' | 'vue' | 'python' | 'nodejs';

export interface A4DensityOption {
  cols: number;
  rows: number;
  total: number;
  name: string;
  tagline: string;
}

export interface A4SheetConfig {
  styleMode: 'single' | 'mixed';
  selectedStyle: string; // when single
  selectedStyles: string[]; // when mixed
  cols: number;
  rows: number;
  avatarShape: 'circle' | 'rounded' | 'square';
  hasBorder: boolean;
  borderColor: string;
  borderOpacity: number; // 0 to 100
  borderWidth: number; // in pixels (e.g. 1, 2, 3, 4)
  borderLineStyle: 'solid' | 'dashed' | 'dotted';
  showLabels: boolean;
  sheetTitle: string;
  subtitle: string;
  avatarBgColor: string; // transparent or light
  traits?: CustomTraitsConfig;
}
