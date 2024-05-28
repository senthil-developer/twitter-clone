import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const getServerSideUser = async (cookies: RequestCookies) => {
  const token = cookies.get("jwt")?.value;
  const meRes = await fetch(`https://api-twitter.up.railway.app/api/auth/me`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  });

  const { error } = (await meRes.json()) as any;

  return { error };
};
