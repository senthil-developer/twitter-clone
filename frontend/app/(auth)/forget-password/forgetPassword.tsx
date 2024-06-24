"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {
            "Enter your username or email address and we'll send you a link to reset your password."
          }
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Username or Email</Label>
          <Input
            id="email"
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleInputChange}
            placeholder="Enter your username or email"
            required
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send Email"}
        </Button>
        {data && (
          <p className="text-green-500">
            Password reset email has been sent. Please check your inbox.
          </p>
        )}
        {isError && (
          <p className="text-red-500">{error?.message || "Unknown error"}</p>
        )}
      </form>
    </div>
  );
};
