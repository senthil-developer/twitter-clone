"use client";

import { FormEvent, useEffect, useState } from "react";
import { MouseEvent } from "react";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function LogOutUser() {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutate,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${url}/api/auth/logout`, {
          method: "POST",
        });

        const data = await res.json();
        console.log(data);
        if (data.error) throw new Error(data.error);
        if (!res.ok) throw new Error(data.error);

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logout Successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutMutate();
  };

  return (
    <div className="">
      <button
        type="submit"
        className="w-full px-4 py-2  bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Logout
      </button>
      {isError && <p className="text-red-500">{error?.message}</p>}
    </div>
  );
}
