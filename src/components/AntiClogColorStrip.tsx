import React from 'react';

export interface ChannelDef {
  label: string;
  r: number;
  g: number;
  b: number;
}

export const CMYK_CHANNELS: ChannelDef[] = [
  { label: '黑 K', r: 0, g: 0, b: 0 },
  { label: '青 C', r: 0, g: 160, b: 233 },
  { label: '品红 M', r: 228, g: 0, b: 127 },
  { label: '黄 Y', r: 255, g: 230, b: 0 },
];

// 10-step gradient factors from 100% solid down to faint tone (matching reference photo)
export const GRADIENT_FACTORS = [1.0, 0.88, 0.76, 0.64, 0.52, 0.40, 0.30, 0.20, 0.12, 0.06];

export function getStepRgb(r: number, g: number, b: number, factor: number): string {
  const nr = Math.round(r * factor + 255 * (1 - factor));
  const ng = Math.round(g * factor + 255 * (1 - factor));
  const nb = Math.round(b * factor + 255 * (1 - factor));
  return `rgb(${nr}, ${ng}, ${nb})`;
}

export const AntiClogColorStrip: React.FC = () => {
  return (
    <div 
      className="w-full mb-4 px-2 py-2 bg-white flex flex-col gap-2 font-sans select-none"
      style={{
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {CMYK_CHANNELS.map((ch) => (
        <div key={ch.label} className="flex items-center gap-3 sm:gap-4 w-full">
          {/* Channel Label: 黑 K / 青 C / 品红 M / 黄 Y */}
          <span className="w-12 sm:w-16 text-xs sm:text-sm font-bold text-slate-900 tracking-wide shrink-0 text-left font-sans">
            {ch.label}
          </span>

          {/* 10-Step Seamless Color Bars without percentage numbers and without borders */}
          <div className="flex-1 grid grid-cols-10 h-5 sm:h-7 overflow-hidden">
            {GRADIENT_FACTORS.map((factor, idx) => (
              <div
                key={idx}
                className="w-full h-full"
                style={{
                  backgroundColor: getStepRgb(ch.r, ch.g, ch.b, factor),
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
