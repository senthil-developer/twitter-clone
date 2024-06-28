import HomePage from "@/compone/feed";
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
      <HomePage />
    </div>
  );
}
