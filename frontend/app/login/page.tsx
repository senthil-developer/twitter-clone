import { Metadata } from "next";
import LoginPage from "@/components/auth/login";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

const login = () => {
  return (
    <div className="max-w-7xl">
      <LoginPage />
    </div>
  );
};
export default login;
