import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { components } from "@/schemas/schema";
import Link from "next/link";
import { Text } from "../ui/Text";

type ClubsData = components["schemas"]["ClubCardResponse"];

function ClubCard(props: ClubsData) {
  const {
    club_id,
    club_name,
    club_image,
    club_member_count_by_tier: tier,
  } = props;
  return (
    <Link href={`/club/${club_id}`}>
      <Card
        className={
          "w-64 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
        }
      >
        <CardHeader className="grid gap-4 p-0">
          <img
            src={club_image || "/images/dummy-image.jpg"}
            alt="card"
            width={256}
            height={256}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="py-4 px-6 h-[80px]">
          <Text className=" font-semibold" lineClamp={2}>
            {club_name}
          </Text>
        </CardContent>
        <CardFooter className="pb-2">
          <div className="w-full flex justify-around border-t border-solid border-gray-200 py-2">
            <div className="flex items-center">
              <img
                src="/images/tier-gold.png"
                alt="tier-gold"
                width={20}
                height={20}
                className="pr-1"
              />
              <Text className="text-sm">{tier?.gold_club_member_count} 명</Text>
            </div>
            <div className="flex items-center">
              <img
                src="/images/tier-silver.png"
                alt="tier-silver"
                width={20}
                height={20}
                className="pr-1"
              />
              <Text className="text-sm">
                {tier?.silver_club_member_count} 명
              </Text>
            </div>
            <div className="flex items-center">
              <img
                src="/images/tier-bronze.png"
                alt="tier-bronze"
                width={20}
                height={20}
                className="pr-1"
              />
              <Text className="text-sm">
                {tier?.bronze_club_member_count} 명
              </Text>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ClubCard;
