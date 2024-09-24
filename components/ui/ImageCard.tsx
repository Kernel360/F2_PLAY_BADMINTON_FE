import * as React from 'react';

import { cn } from '@/lib/utils';

import Image from './Image';
import { Text } from './Text';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  src: string;
}

interface CardImageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  size?: { width: number; height: number };
}

interface CardDescriptionContentProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const ImageCardCover = React.forwardRef<HTMLDivElement, CardImageContentProps>(
  ({ className, src, size = { width: 240, height: 240 }, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pb-2 flex justify-center', className)}
        {...props}
      >
        <Image
          src={src}
          alt="card image"
          width={size.width}
          height={size.height}
        />
      </div>
    );
  },
);
ImageCardCover.displayName = 'ImageCardCover';

function ImageCardDescription({ children }: CardDescriptionContentProps) {
  return (
    <div className="w-full">
      <Text lineClamp={1}>{children}</Text>
    </div>
  );
}
ImageCardDescription.displayName = 'ImageCardDescription';

const ImageCard = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, src, size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-44 ', // small size
      md: 'w-64 ', // medium size (default)
      lg: 'w-80 ', // large size
    };

    // Card 크기에 맞게 이미지의 크기 조정
    const cardSizes = {
      sm: { width: 160 - 12, height: 160 - 12 }, // 패딩을 고려하여 크기 조정
      md: { width: 240 - 12, height: 240 - 12 }, // 패딩을 고려하여 크기 조정
      lg: { width: 320 - 12, height: 320 - 12 }, // 패딩을 고려하여 크기 조정
    };

    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const paddingBClasses = {
      sm: 'pb-1',
      md: 'pb-3',
      lg: 'pb-5',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer', // 패딩 추가
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <div className={cn('flex-col', paddingClasses[size])}>
          <ImageCardCover
            src={src}
            size={cardSizes[size]}
            className={paddingBClasses[size]}
          />
          {children}
        </div>
      </div>
    );
  },
);

ImageCard.displayName = 'ImageCard';

export { ImageCard, ImageCardCover, ImageCardDescription };
