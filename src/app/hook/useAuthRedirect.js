"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../services/auth";
import { getToken } from "../utils/token";

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if(!token){
      return router.push('/');
    }
    const fetchUser = async () => {
      const dataUser = await getUser();
      if(dataUser.data.user.role == 'admin'){
        router.push("/admin/dashboard");
      }else{
        router.push("/user/dashboard");
      }
    }
    fetchUser();
  }, [router]);
};
