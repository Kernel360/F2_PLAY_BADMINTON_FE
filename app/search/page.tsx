import Spinner from "@/components/Spinner";
import SearchResult from "@/components/pages/club/SearchResult";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchResult />
    </Suspense>
  );
}

export default Page;
