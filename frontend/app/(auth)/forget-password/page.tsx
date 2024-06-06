import { Metadata } from "next";
import { ForgetPassword } from "./forgetPassword";

export const metadata: Metadata = {
  title: "Forget-password",
  description: "Forget-passwordPage",
  icons: {
    icon: "/next.svg",
  },
};

const ForgetPasswordPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className=""> Forget-password page </h1>

      <ForgetPassword />
    </div>
  );
};

export default ForgetPasswordPage;
