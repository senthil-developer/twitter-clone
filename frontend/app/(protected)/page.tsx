import HomePage from "@/compone/feed";
import { getServerSideUser } from "@/lib/getServerSideUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "twitter",
  description: "AppPage",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function Home() {
  // const { user } = getServerSideUser() as any;
  // const meRes = await fetch(`https://twitter-c-g4em.onrender.com/api/auth/me`, {
  //   method: "GET",
  //   credentials: "include",
  // });

  // const user = (await meRes.json()) as any;
  // console.log("server side auth", user);

  return (
    <div className=" w-full h-full">
      <h1>Twitter</h1>
      <HomePage />
    </div>
  );
}
