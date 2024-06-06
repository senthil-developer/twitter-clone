"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdPassword } from "react-icons/md";

interface resetData {
  password: string;
  confirmPassword: string;
}

interface Data {
  message: string;
}

export const ResetPassword = ({ verify }: { verify: string }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const {
    mutate: resetPasswordMutation,
    isError,
    data,
    error,
    isPending,
  } = useMutation<Data, Error, resetData>({
    mutationFn: async ({ password, confirmPassword }) => {
      try {
        const res = await fetch(`/api/auth/reset-password?verify=${verify}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        });
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!res.ok) throw new Error(data.error);

        return data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess() {
      toast.success("Your Password Reset Successfully & now login");
      router.push("/login");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation({
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="flex-1 flex flex-col justify-center items-center ">
        <form
          className="mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
          method="POST"
        >
          <label className=" input input-bordered rounded flex items-center gap-2 bg-slate-200 dark:bg-gray-200 text-black">
            <MdPassword className="fill-black" />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>

          <label className=" input input-bordered rounded flex items-center gap-2 bg-slate-200 dark:bg-gray-200 text-black">
            <MdPassword className="fill-black" />
            <input
              type="password"
              className="grow"
              placeholder="confirmPassword"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </label>
          <button className="btn rounded-full btn-primary">
            {isPending ? "Loading..." : "Reset Your Password"}
          </button>
          {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4 lg:w-2/3">
          <Link href={"/login"} className="underline">
            back to login
          </Link>
          <p className=" text-lg">{"Don't"} have an account?</p>
          <Link href="/signup">
            <button className="btn rounded-full btn-secondary btn-outline ">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1">{data && <p>{data?.message}</p>}</div>
    </div>
  );
};
