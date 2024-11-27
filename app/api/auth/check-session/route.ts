import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  if (token) {
    return NextResponse.json({ loggedIn: true });
  }
  return NextResponse.json({ loggedIn: false });
}
