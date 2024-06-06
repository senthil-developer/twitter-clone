import { Metadata } from "next";
import LoginPage from "./loginPage";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

const login = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};
export default login;
