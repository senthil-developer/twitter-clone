import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const getServerSideUser = async (cookies: RequestCookies) => {
  const jwt = cookies.get("jwt");
  const meRes = await fetch(`https://api-twitter.up.railway.app/api/auth/me`, {
    headers: {
      Authorization: `Jwt ${jwt?.value}`,
    },
  });

  const user = (await meRes.json()) as any;
  console.log("server side auth", user);

  return { user };
};
