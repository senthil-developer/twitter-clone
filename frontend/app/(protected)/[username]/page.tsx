import { Metadata } from "next";
import { UserProfile } from "./User";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "ProfilePage",
};

interface Props {
  params: {
    username: string;
  };
}

const ProfilePage = ({ params }: Props) => {
  console.log(
    decodeURIComponent(params.username.replace(/ /g, "").replace(/-/g, " "))
  );

  // redirect(decodeURIComponent(params.username.trim().replace(/ /g, "")));
  return <UserProfile username={params.username} />;
};

export default ProfilePage;
