"use client";

import Spinner from "@/components/Spinner";
import ClubForm from "@/components/club/ClubForm";
import { useGetClubsById } from "@/lib/api/hooks/clubHook";
import { useParams } from "next/navigation";

function ClubManage() {
  const { clubId } = useParams();

  const { data, isLoading } = useGetClubsById(clubId as string);

  if (isLoading) {
    return (
      <div className="container mx-auto  min-h-[530px] flex items-center justify-center bg-white rounded-lg space-y-6">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div>데이터를 불러오는데 실패했습니다. </div>;
  }

  return <ClubForm initialData={data} />;
}

export default ClubManage;
