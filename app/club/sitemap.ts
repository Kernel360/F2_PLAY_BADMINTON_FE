import { getClubs } from "@/lib/api/functions/clubFn";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const allClubs = await getClubs({
      pageParam: 0,
      size: 50000,
      sort: "clubId",
    });

    if (!allClubs?.data?.content) {
      return [];
    }

    return allClubs.data?.content?.map((content) => ({
      url: `https://www.badminton.run/club/${content.club_token}`,
      lastModified: content.modified_at,
      changeFrequency: "yearly",
      priority: 1,
      images: [content.club_image],
    }));
  } catch (err) {
    console.log(err);
  }
  return [];
}
