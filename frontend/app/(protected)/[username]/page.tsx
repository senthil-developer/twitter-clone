import { Metadata } from "next";
import { UserProfile } from "./User";

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
  return <UserProfile username={params.username} />;
};

export default ProfilePage;
