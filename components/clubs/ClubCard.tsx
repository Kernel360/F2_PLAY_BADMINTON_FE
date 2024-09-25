import { cn } from '@/lib/utils';
import Image from 'next/image';
import DummyImage from '@/app/images/dummy-image.jpg';
import Gold from '@/app/images/tier-gold.png';
import Silver from '@/app/images/tier-silver.png';
import Bronze from '@/app/images/tier-bronze.png';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Text } from '../ui/Text';

type CardProps = React.ComponentProps<typeof Card>;

export function ClubCard({ className }: CardProps) {
  return (
    <Card
      className={cn(
        'w-64 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105',
        className,
      )}
    >
      <CardHeader className="grid gap-4 p-0">
        <Image
          src={DummyImage.src}
          alt="card image"
          width={256}
          height={256}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="py-4 px-6">
        <Text className=" font-semibold" lineClamp={2}>
          Kernel 360 프론트엔드 배드민턴 동호회 Kernel 360 프론트엔드 배드민턴
          동호회 Kernel 360 프론트엔드 배드민턴 동호회 Kernel 360 프론트엔드
          배드민턴 동호회 Kernel 360 프론트엔드 배드민턴 동호회 Kernel 360
          프론트엔드 배드민턴 동호회
        </Text>
      </CardContent>
      <CardFooter className="pb-2">
        <div className="w-full flex justify-around border-t border-solid border-gray-200 py-2">
          <div className="flex items-center">
            <Image
              src={Gold.src}
              alt="tier-gold"
              width={20}
              height={20}
              className="pr-1"
            />
            <Text className="text-sm">8 명</Text>
          </div>
          <div className="flex items-center">
            <Image
              src={Silver.src}
              alt="tier-silver"
              width={20}
              height={20}
              className="pr-1"
            />
            <Text className="text-sm">10 명</Text>
          </div>
          <div className="flex items-center">
            <Image
              src={Bronze.src}
              alt="tier-bronze"
              width={20}
              height={20}
              className="pr-1"
            />
            <Text className="text-sm">14 명</Text>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ClubCard;
