import { Metadata } from "next";
import { CreateAccount } from "./createAccount";
import Link from "next/link";

export const metadata: Metadata = {
  title: "create account",
  description: "create account Page",
  icons: {
    icon: "/next.svg",
  },
};

const createAccountPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const verify = searchParams.verify as string;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {verify ? (
        <CreateAccount verify={verify} />
      ) : (
        <>
          <div className="max-w-7xl mx-auto h-full flex flex-col gap-2 items-center justify-center">
            <h1 className="text-4xl font-extrabold">{"Verify your account"}</h1>
            <p className="text-lg">
              {"Check your email for activate your account"}
            </p>
            <p className="text-lg">
              {"If you don't see an email from us, check your spam folder"}
            </p>
            <p className="text-lg">
              {"If you still can't find it,"}{" "}
              <Link
                href={"mailto:twitter.acc.app@gmail.com"}
                className="bg-sky-300 rounded-md shadow-sm shadow-primary"
                target="_blank"
              >
                contact us
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default createAccountPage;
