import React, { useState, useEffect } from 'react';
import { getResilientAvatarUrls, generateLocalSvgAvatar } from '../utils/avatarFallback';
import { CustomTraitsConfig } from '../types/avatar';

interface AutoHealAvatarProps {
  styleName: string;
  seed: string;
  bgColor?: string;
  traits?: CustomTraitsConfig;
  size?: number;
  className?: string;
  imgStyle?: React.CSSProperties;
  alt?: string;
  onHealed?: (level: number) => void;
}

export const AutoHealAvatar: React.FC<AutoHealAvatarProps> = ({
  styleName,
  seed,
  bgColor,
  traits,
  size,
  className = '',
  imgStyle = {},
  alt = 'Avatar',
  onHealed,
}) => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const urls = getResilientAvatarUrls(styleName, seed, bgColor, traits);
    setCandidates(urls);
    setCurrentIndex(0);
    setHasError(false);
  }, [styleName, seed, bgColor, traits]);

  const handleError = () => {
    if (currentIndex + 1 < candidates.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (onHealed) {
        onHealed(nextIdx);
      }
    } else {
      setHasError(true);
    }
  };

  const currentSrc = candidates[currentIndex] || generateLocalSvgAvatar(seed);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={imgStyle}
      loading="lazy"
      onError={handleError}
    />
  );
};
