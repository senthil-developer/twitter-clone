import LogOutUser from "@/components/auth/logout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logout",
  description: "LogoutPage",
};

const LogoutPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LogOutUser />
    </div>
  );
};

export default LogoutPage;
