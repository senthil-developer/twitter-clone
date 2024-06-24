import { UserProfile } from "./User";
import { User } from "@/types";

export async function generateMetadata({ params }: Props) {
  const res = await fetch(
    `${process.env.SERVER_URL}/api/users/profile/${params.username}`
  );
  const user = (await res.json()) as User;
  console.log(user);
  return {
    title: `${user.username}`,
    description: user.bio,
    openGraph: {
      images: [user.profileImg],
    },
  };
}

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
