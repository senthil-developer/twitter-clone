export const getServerSideUser = async () => {
  const meRes = await fetch(`https://api-twitter.up.railway.app/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const user = (await meRes.json()) as any;
  console.log("server side auth", user);

  return { user };
};
