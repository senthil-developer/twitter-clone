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
  return (
    <div className=" w-full h-full">
      <h1>Twitter</h1>
      <HomePage />
    </div>
  );
}
