import React from 'react';

interface GridProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  justify?: 'start' | 'center' | 'end';
  align?: 'start' | 'center' | 'end';
}

function Grid(props: GridProps) {
  const {
    children,
    spacing = 'md',
    justify = 'start',
    align = 'start',
  } = props;

  const spacingClass =
    {
      xs: '2',
      sm: '4',
      md: '8',
      lg: '12',
      xl: '20',
    }[spacing] || 'md';

  return (
    <div
      className={`flex flex-wrap gap-${spacingClass} justify-items-${justify} align-items-${align}`}
    >
      {children}
    </div>
  );
}

export default Grid;
