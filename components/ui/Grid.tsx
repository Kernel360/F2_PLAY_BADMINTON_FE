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
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-8',
      lg: 'gap-12',
      xl: 'gap-20',
    }[spacing] || 'gap-8';

  const justifyClass =
    {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    }[justify] || 'justify-start';

  const alignClass =
    {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    }[align] || 'items-start';

  return (
    <div
      className={`flex flex-wrap w-full h-dvh ${spacingClass} ${justifyClass} ${alignClass}`}
    >
      {children}
    </div>
  );
}

export default Grid;
