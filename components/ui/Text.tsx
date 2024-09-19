import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  weight?: 'light' | 'regular' | 'bold';
  underline?: boolean;
  block?: boolean;
  transform?: 'capitalize' | 'uppercase' | 'lowercase';
  align?: 'left' | 'center' | 'right';
  lineClamp?: number;
  color?: 'primary' | 'black' | 'gray' | 'white';
  inherit?: boolean;
}

function Text({
  children,
  size = 'md',
  weight = 'regular',
  underline = false,
  block = false,
  transform,
  align,
  lineClamp,
  color = 'black',
  inherit = false,
}: TextProps): JSX.Element {
  // 말줄임 설정 위한 코드
  let displayStyle: string = 'inline';
  if (lineClamp) {
    displayStyle = '-webkit-box';
  } else if (block) {
    displayStyle = 'block';
  }

  const colorClass =
    {
      primary: 'text-primary', // #007BFF
      black: 'text-black',
      gray: 'text-gray-500',
      white: 'text-white',
    }[color] || 'text-black'; // 기본값

  const sizeClass =
    {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-xl',
      xl: 'text-3xl',
      xxl: 'text-5xl',
      xxxl: 'text-6xl',
    }[size] || 'text-md';

  const weightClass =
    {
      light: 'font-extralight',
      regular: 'font-medium',
      bold: 'font-extrabold',
    }[weight] || 'text-md';

  const baseStyles: React.CSSProperties = {
    display: displayStyle,
    textDecoration: underline ? 'underline' : 'none',
    textTransform: transform,
    textAlign: align,
    color: inherit ? 'inherit' : color || 'black',
    WebkitLineClamp: lineClamp,
    overflow: lineClamp ? 'hidden' : 'visible',
    WebkitBoxOrient: lineClamp ? 'vertical' : undefined,
  };

  return (
    <span
      style={{ ...baseStyles }}
      className={[colorClass, sizeClass, weightClass].join(' ')}
    >
      {children}
    </span>
  );
}

export default Text;
