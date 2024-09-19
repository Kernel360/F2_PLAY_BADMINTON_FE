import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-full px-2 py-2',
        md: 'h-4 w-full px-2 py-3',
        lg: 'h-5 w-full px-2 py-4',
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
  },
);
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
      <div className="relative w-full">
        {icon && (
          <span
            className={cn('absolute inset-y-0 left-0 flex items-center pl-2')}
          >
            {icon}
          </span>
        )}{' '}
        <input
          placeholder={placeholder}
          type={type}
          className={cn(inputVariants({ size, radius, className }), {
            'pl-8': icon,
          })}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
