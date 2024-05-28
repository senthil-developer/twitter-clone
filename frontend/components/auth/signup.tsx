"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import XSvg from "@/components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface SignUpData {
  username: string;
  password: string;
  fullName: string;
  email: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const {
    mutate: signUpMutation,
    isError,
    isPending,
    error,
  } = useMutation<void, Error, SignUpData>({
    mutationFn: async ({ username, email, password, fullName }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, fullName }),
        });

        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!res.ok) throw new Error("Something went wrong");

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Signup successful");
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation({
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      email: formData.email,
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className=" lg:w-2/3 dark:fill-white fill-black" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
          method="POST"
        >
          <XSvg className="w-24 lg:hidden dark:fill-white fill-black" />
          <h1 className="text-4xl font-extrabold ">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2 bg-slate-200 dark:bg-gray-200 text-black">
            <MdOutlineMail className="fill-black" />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1 bg-slate-200 dark:bg-gray-200 text-black">
              <FaUser className="fill-black" />
              <input
                type="text"
                className="grow "
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1 bg-slate-200 dark:bg-gray-200 text-black">
              <MdDriveFileRenameOutline className="fill-black" />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2 bg-slate-200 dark:bg-gray-200 text-black">
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
            {isPending ? "Loading..." : "Sign up"}
          </button>
          {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className=" text-lg">Already have an account?</p>
          <Link href="/login">
            <button className="btn rounded-full btn-primary btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
