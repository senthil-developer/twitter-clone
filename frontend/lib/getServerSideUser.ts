export const getServerSideUser = async () => {
  const meRes = await fetch(`http://localhost:8000/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const user = (await meRes.json()) as any;
  console.log("server side auth", user);

  return { user };
};
