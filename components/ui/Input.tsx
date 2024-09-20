import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 w-full px-2',
      md: 'h-10 w-full px-2',
      lg: 'h-12 w-full px-2',
    },
    radius: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      round: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
  },
});
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      radius,
      type,
      placeholder = 'placeholder',
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'flex flex-row border border-solid items-center',
          inputVariants({ size, radius }),
        )}
      >
        {icon && (
          <span className={cn('inset-y-0 left-0 flex items-center')}>
            {icon}
          </span>
        )}{' '}
        <input
          placeholder={placeholder}
          type={type}
          className={cn('outline-none bg-background', inputVariants({ size }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
