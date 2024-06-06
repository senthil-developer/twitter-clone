"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const CreateAccount = ({ verify }: { verify: string }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { isError, data, error, isSuccess } = useQuery({
    queryKey: ["createAccount"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/auth/create-account?verify=${verify}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!res.ok) throw new Error(data.error);

        if (isSuccess) {
          toast.success("Account created successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          return router.push("/");
        }

        console.log(data);
        return data;
      } catch (err) {
        throw err;
      }
    },
    retry: false,
  });

  return (
    <div>
      <div className="flex-1 flex flex-col justify-center items-center ">
        {isError && <p className="text-red-500">{error?.message}</p>}
      </div>
      <div className="flex-1">
        {data && (
          <>
            <p>account created successfully </p>
            <Link href="/" className="btn btn-primary">
              Go to homepage
            </Link>
            if you are not redirected automatically
          </>
        )}
      </div>
    </div>
  );
};
