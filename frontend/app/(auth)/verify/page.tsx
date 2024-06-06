import { Metadata } from "next";
import { VerifyUser } from "./verifyPage";

export const metadata: Metadata = {
  title: "Verify",
  description: "Forget-passwordPage",
  icons: {
    icon: "/next.svg",
  },
};

const verifyPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className=""> Verify page </h1>
      <VerifyUser />
    </div>
  );
};

export default verifyPage;
