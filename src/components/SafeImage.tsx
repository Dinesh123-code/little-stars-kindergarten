import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  focalPosition?: 'center' | 'top' | 'center-top' | 'bottom';
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc = DEFAULT_FALLBACK,
  focalPosition = 'center-top',
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setIsLoaded(false);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const focalClass = {
    'center': 'object-center',
    'top': 'object-top',
    'center-top': 'object-[center_30%]',
    'bottom': 'object-bottom',
  }[focalPosition] || 'object-center';

  return (
    <div className={`relative overflow-hidden bg-slate-100 w-full h-full ${containerClassName}`}>
      {/* Subtle background placeholder shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
      )}
      
      <img
        {...rest}
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover block ${focalClass} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};
