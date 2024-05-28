"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

const Authenticated = () => {
  const router = useRouter();
  const path = usePathname();

  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });

  const publicRoutes = "/login" || "/signup" || "/logout";
  const protectedRoutes = "/" || "/setting" || "/search" || "/notifications";

  // if (path === publicRoutes && authUser) {
  //   router.push("/");
  // }

  // if (path === protectedRoutes && !authUser) {
  //   router.push("/login");
  // }

  return <></>;
};
export default Authenticated;
