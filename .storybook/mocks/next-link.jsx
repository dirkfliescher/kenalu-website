// Mock für next/link in Storybook (kein Next.js-Routing nötig)
import React from 'react';

const Link = ({ href, children, className, style, target, rel, ...props }) => {
  const hrefStr = href && typeof href === 'object' ? (href.pathname || '/') : (href || '/');
  return (
    <a href={hrefStr} className={className} style={style} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
};

export default Link;
