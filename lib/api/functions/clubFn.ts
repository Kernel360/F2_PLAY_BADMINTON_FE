import type { components } from "@/schemas/schema.d.ts"; // generated by openapi-typescript

// Schema Obj
type Club = components["schemas"]["ClubCardResponse"];
type ClubCreate = components["schemas"]["ClubCreateRequest"];

export async function getClubs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clubs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include", // 쿠키를 포함한 요청이 필요하면 설정
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.content as Club[];
  } catch (error) {
    console.log(error);
  }
}

export async function postClubs(clubsData: ClubCreate) {
  const response = await fetch("https://api.badminton.run/v1/clubs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(clubsData),
  });

  if (!response.ok) {
    // 오류 발생 시 throw
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
