"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";

interface forgetData {
  verificationCode: string;
}

export const VerifyUser = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    verificationCode: "",
  });
  const queryClient = useQueryClient();

  const {
    mutate: forgetMutation,
    isError,
    data,
    error,
    isPending,
  } = useMutation<void, Error, forgetData>({
    mutationFn: async ({ verificationCode }) => {
      try {
        const res = await fetch(`/api/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verificationCode }),
        });
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!res.ok) throw new Error(data.error);

        console.log(data);
        return data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess() {
      toast.success("login Successfully");
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgetMutation({
      verificationCode: formData.verificationCode,
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
        <label className="input input-bordered rounded flex items-center gap-2 bg-slate-200 dark:bg-gray-200 text-black">
          <MdOutlineMail className="fill-black" />
          <input
            type="text"
            className="grow"
            placeholder="enter 6 digit code"
            name="verificationCode"
            onChange={handleInputChange}
            value={formData.verificationCode}
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
    </div>
  );
};
