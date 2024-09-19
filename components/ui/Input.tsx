import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'h-10 w-full px-2 py-2',
        medium: 'h-14 w-full px-3 py-2',
        large: 'h-20 w-full px-4 py-2',
      },
      radius: {
        small: 'rounded',
        medium: 'rounded-md',
        large: 'rounded-lg',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'medium',
      radius: 'medium',
    },
  },
);
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size, radius, type, placeholder = 'placeholder', ...props },
    ref,
  ) => {
    return (
      <input
        placeholder={placeholder}
        type={type}
        className={cn(inputVariants({ size, radius, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
