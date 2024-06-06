"use client";

import XSvg from "@/components/svgs/X";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";

interface forgetData {
  usernameOrEmail: string;
}

interface Data {
  message: string;
}
export const ForgetPassword = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
  });

  const {
    mutate: forgetMutation,
    isError,
    data,
    error,
    isPending,
  } = useMutation<Data, Error, forgetData>({
    mutationFn: async ({ usernameOrEmail }) => {
      try {
        const res = await fetch(`/api/auth/forget-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usernameOrEmail }),
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
      toast.success("Check your email for the reset link");
      router.push("/reset-password");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgetMutation({
      usernameOrEmail: formData.usernameOrEmail,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <form
        className="mx-auto md:mx-20 flex gap-4 flex-col"
        onSubmit={handleSubmit}
        method="POST"
      >
        <XSvg className="w-24 lg:hidden dark:fill-white fill-black" />
        <h1 className="text-4xl font-extrabold ">{"Let's"} go.</h1>
        <label className="input input-bordered rounded flex items-center gap-2 bg-slate-200 dark:bg-gray-200 text-black">
          <MdOutlineMail className="fill-black" />
          <input
            type="text"
            className="grow"
            placeholder="username  or email"
            name="usernameOrEmail"
            onChange={handleInputChange}
            value={formData.usernameOrEmail}
          />
        </label>

        <button className="btn rounded-full btn-primary">
          {isPending ? "Loading..." : "Login"}
        </button>
        {isError && <p className="text-red-500">{error?.message}</p>}
      </form>
      <div className="flex flex-col gap-2 mt-4 lg:w-2/3">
        <p className=" text-lg">{"Don't"} have an account?</p>
        <Link href="/signup">
          <button className="btn rounded-full btn-secondary btn-outline ">
            Sign up
          </button>
        </Link>
      </div>
      <div>{data ? <p>{data?.message}</p> : null}</div>
    </div>
  );
};
