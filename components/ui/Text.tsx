import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
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

  // Font size based on `size` prop
  const sizeStyles: React.CSSProperties = (() => {
    switch (size) {
      case 'xs':
        return { fontSize: '12px' };
      case 'sm':
        return { fontSize: '14px' };
      case 'md':
        return { fontSize: '16px' };
      case 'lg':
        return { fontSize: '20px' };
      case 'xl':
        return { fontSize: '24px' };
      case '2xl':
        return { fontSize: '32px' };
      case '3xl':
        return { fontSize: '40px' };
      case '4xl':
        return { fontSize: '64px' };
      default:
        return { fontSize: '16px' };
    }
  })();

  const weightStyles: React.CSSProperties = (() => {
    switch (weight) {
      case 'light':
        return { fontWeight: '200' };
      case 'regular':
        return { fontWeight: '500' };
      case 'bold':
        return { fontWeight: '800' };
      default:
        return { fontWeight: '500' };
    }
  })();

  return (
    <span
      style={{ ...baseStyles, ...sizeStyles, ...weightStyles }}
      className={colorClass}
    >
      {children}
    </span>
  );
}

export default Text;
