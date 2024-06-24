"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password and confirm it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" method="POST">
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {isError && (
            <div className="text-red-500 text-sm">{error.message}</div>
          )}
          <Button
            type="submit"
            className="w-full disabled:cursor-progress cursor-wait"
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
