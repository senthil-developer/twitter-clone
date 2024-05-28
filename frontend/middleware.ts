import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/getServerSideUser";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { error } = await getServerSideUser(cookies);

  if (!error && ["/login", "/signup"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`https://frontend-twitter.netlify.app/`);
  }

  return NextResponse.next();
}
