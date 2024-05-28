import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setting",
  description: "SettingPage",
};

const SettingPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className=""> Setting page </h1>
    </div>
  );
};

export default SettingPage;
