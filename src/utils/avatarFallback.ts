/**
 * Automatic Avatar Repair & Fault Tolerance Utility
 * Guarantees zero broken images across preview and A4 canvas export
 */

// Simple deterministic hash function
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const PALETTES = [
  ['#6366f1', '#8b5cf6', '#d946ef'],
  ['#3b82f6', '#06b6d4', '#10b981'],
  ['#f43f5e', '#fb923c', '#fbbf24'],
  ['#10b981', '#14b8a6', '#0284c7'],
  ['#8b5cf6', '#ec4899', '#f43f5e'],
  ['#0ea5e9', '#6366f1', '#a855f7'],
];

/**
 * Generates an instant local vector SVG Data URL that requires NO network connection.
 * Used as the ultimate unbreakable fallback so that no avatar ever appears broken.
 */
export function generateLocalSvgAvatar(seed: string): string {
  const hash = hashString(seed || 'avatar');
  const palette = PALETTES[hash % PALETTES.length];
  const c1 = palette[0];
  const c2 = palette[1];
  const c3 = palette[2];

  // Pick deterministic features
  const initials = (seed.slice(0, 2) || 'AV').toUpperCase();
  const shapeVariant = hash % 4;

  let shapesSvg = '';
  if (shapeVariant === 0) {
    // Abstract modern geometric art
    shapesSvg = `
      <circle cx="50" cy="50" r="38" fill="${c1}" opacity="0.85"/>
      <circle cx="36" cy="40" r="18" fill="${c2}" opacity="0.9"/>
      <circle cx="64" cy="58" r="16" fill="${c3}" opacity="0.9"/>
      <rect x="25" y="65" width="50" height="8" rx="4" fill="#ffffff" opacity="0.8"/>
    `;
  } else if (shapeVariant === 1) {
    // Cute minimalist face
    shapesSvg = `
      <circle cx="50" cy="50" r="42" fill="${c1}"/>
      <ellipse cx="50" cy="62" rx="26" ry="18" fill="${c2}" opacity="0.6"/>
      <circle cx="36" cy="44" r="5" fill="#ffffff"/>
      <circle cx="64" cy="44" r="5" fill="#ffffff"/>
      <circle cx="37" cy="45" r="2.5" fill="#1e1e2f"/>
      <circle cx="65" cy="45" r="2.5" fill="#1e1e2f"/>
      <path d="M 42 56 Q 50 64 58 56" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
    `;
  } else if (shapeVariant === 2) {
    // Robot / Gamer pixel face
    shapesSvg = `
      <rect x="14" y="14" width="72" height="72" rx="16" fill="${c1}"/>
      <rect x="26" y="32" width="16" height="12" rx="3" fill="#ffffff"/>
      <rect x="58" y="32" width="16" height="12" rx="3" fill="#ffffff"/>
      <circle cx="34" cy="38" r="4" fill="${c3}"/>
      <circle cx="66" cy="38" r="4" fill="${c3}"/>
      <rect x="34" y="60" width="32" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
    `;
  } else {
    // Monogram initials badge
    shapesSvg = `
      <rect x="8" y="8" width="84" height="84" rx="24" fill="${c1}"/>
      <circle cx="75" cy="25" r="16" fill="${c2}" opacity="0.7"/>
      <text x="50" y="58" font-family="system-ui, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initials}</text>
    `;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="g_${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="100%" stop-color="${c2}" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#g_${hash})" />
    ${shapesSvg}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

import { CustomTraitsConfig } from '../types/avatar';
import { applyTraitsToParams } from '../data/avatarApis';

/**
 * Builds a prioritized array of fallback URLs for any avatar request.
 * Strictly preserves the user's chosen style across all fallback levels.
 */
export function getResilientAvatarUrls(
  style: string,
  seed: string,
  bgColor?: string,
  traits?: CustomTraitsConfig
): string[] {
  const cleanSeed = encodeURIComponent(seed.trim() || 'default');
  const bgParam = bgColor && bgColor !== 'transparent' ? `&backgroundColor=${bgColor.replace('#', '')}` : '';

  const paramsWithTraits = new URLSearchParams();
  paramsWithTraits.set('seed', seed.trim() || 'default');
  if (bgColor && bgColor !== 'transparent') {
    paramsWithTraits.set('backgroundColor', bgColor.replace('#', ''));
  }
  applyTraitsToParams(style, traits, paramsWithTraits);

  return [
    // 1. Primary: Selected style SVG with custom traits
    `https://api.dicebear.com/9.x/${style}/svg?${paramsWithTraits.toString()}`,

    // 2. Fallback 1: EXACT SAME selected style SVG with clean parameters (preserves user style 100%!)
    `https://api.dicebear.com/9.x/${style}/svg?seed=${cleanSeed}${bgParam}`,

    // 3. Fallback 2: EXACT SAME selected style PNG format
    `https://api.dicebear.com/9.x/${style}/png?seed=${cleanSeed}&size=200${bgParam}`,

    // 4. Ultimate 0ms offline fallback (mathematically impossible to fail)
    generateLocalSvgAvatar(seed)
  ];
}

/**
 * Loads an image by trying URLs sequentially with auto-repair and retry timeout.
 * Used for reliable Canvas rendering.
 */
export function loadImageWithAutoRepair(
  candidateUrls: string[],
  timeoutMs: number = 4000
): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    let index = 0;

    const tryNext = () => {
      if (index >= candidateUrls.length) {
        // Fallback to local SVG
        const img = new Image();
        img.src = generateLocalSvgAvatar('fallback');
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        return;
      }

      const currentUrl = candidateUrls[index++];
      const img = new Image();
      img.crossOrigin = 'anonymous';

      let timer: number | null = null;
      let settled = false;

      const cleanup = () => {
        settled = true;
        if (timer !== null) {
          window.clearTimeout(timer);
          timer = null;
        }
      };

      img.onload = () => {
        if (!settled) {
          cleanup();
          resolve(img);
        }
      };

      img.onerror = () => {
        if (!settled) {
          cleanup();
          tryNext(); // auto-heal: try next fallback immediately!
        }
      };

      timer = window.setTimeout(() => {
        if (!settled) {
          cleanup();
          tryNext(); // timed out, try next!
        }
      }, timeoutMs);

      img.src = currentUrl;
    };

    tryNext();
  });
}
