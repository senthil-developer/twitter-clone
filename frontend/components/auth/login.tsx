"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import XSvg from "@/components/svgs/X";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginData {
  usernameOrEmail: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isError,
    data,
    error,
    isPending,
  } = useMutation<void, Error, LoginData>({
    // Provide types for useMutation
    mutationFn: async ({ usernameOrEmail, password }) => {
      try {
        const res = await fetch(`/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({ usernameOrEmail, password }),
        });
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!res.ok) throw new Error(data.error);

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Login Successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      router.push("/");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation({
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex  items-center  justify-center">
        <XSvg className="lg:w-2/3 dark:fill-white fill-black" />
      </div>
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
          <button className="btn rounded-full btn-primary">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4 lg:w-2/3">
          <p className=" text-lg">{"Don't"} have an account?</p>
          <Link href="/signup">
            <button className="btn rounded-full btn-primary btn-outline ">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
