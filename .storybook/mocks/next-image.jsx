// Mock für next/image in Storybook
// Rendert ein normales <img>-Tag ohne Next.js-Optimierung
import React from 'react';

const Image = ({
  src,
  alt = '',
  width,
  height,
  fill,
  style,
  className,
  priority,
  quality,
  placeholder,
  blurDataURL,
  sizes,
  onLoad,
  onError,
  ...props
}) => {
  const imgStyle = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }
    : style;

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={imgStyle}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default Image;
