import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/getServerSideUser";

export async function middleware(req: NextRequest) {
  // const { nextUrl } = req;
  // const { user } = await getServerSideUser();

  // if (user && ["/login", "/signup"].includes(nextUrl.pathname)) {
  //   return NextResponse.redirect(`/`);
  // }

  return NextResponse.next();
}
