import React from 'react';

interface IconButtonProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'sm' | 'md' | 'lg' | 'round';
  color?: 'gray' | 'purple' | 'blue' | 'red' | 'transparent';
}

function IconButton(props: IconButtonProps) {
  const { children, size = 'md', radius = 'md', color = 'gray' } = props;

  const sizeClass =
    {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-16 h-16',
    }[size] || 'w-10 h-10';

  const radiusClass =
    {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      round: 'rounded-full',
    }[radius] || 'rounded-md';

  const colorClass =
    {
      gray: 'bg-gray-500',
      purple: 'bg-purple-500',
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      transparent: 'bg-transparent',
    }[color] || 'gray';

  return (
    <button
      type="button"
      className={`flex justify-center items-center ${sizeClass} ${radiusClass} ${colorClass}`}
    >
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </button>
  );
}

export default IconButton;
