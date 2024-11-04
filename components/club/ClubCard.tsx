import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { components } from "@/schemas/schema";
import Link from "next/link";
import { Text } from "../ui/Text";

type ClubsData = components["schemas"]["ClubCardResponse"];

function ClubCard(props: ClubsData) {
  const {
    club_token,
    club_name,
    club_image,
    club_description,
    club_member_count_by_tier: tier,
  } = props;

  return (
    <Link href={`/club/${club_token}`} className="block">
      <Card className=" max-w-md h-fit rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-100 bg-white">
        <CardHeader className="p-0">
          <img
            src={club_image || "/images/dummy-image.jpg"}
            alt={club_name}
            className="w-full h-44 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="px-5 py-4 flex flex-col justify-between h-[150px]">
          <h1 className="text-center font-semibold text-gray-900 mb-1 line-clamp-1">
            {club_name}
          </h1>
          <p className="text-sm text-gray-600 mb-4 text-center line-clamp-2">
            {club_description}
          </p>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center">
              <img
                src="/images/tier-gold.png"
                alt="tier-gold"
                className="w-5 h-5 mr-1"
              />
              <Text className="text-xs text-gray-700 font-semibold">
                {tier?.gold_club_member_count}명
              </Text>
            </div>
            <div className="flex items-center">
              <img
                src="/images/tier-silver.png"
                alt="tier-silver"
                className="w-5 h-5 mr-1"
              />
              <Text className="text-xs text-gray-700 font-semibold">
                {tier?.silver_club_member_count}명
              </Text>
            </div>
            <div className="flex items-center">
              <img
                src="/images/tier-bronze.png"
                alt="tier-bronze"
                className="w-5 h-5 mr-1"
              />
              <Text className="text-xs text-gray-700 font-semibold">
                {tier?.bronze_club_member_count}명
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ClubCard;
