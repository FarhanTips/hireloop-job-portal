'use server';
import { authMutate } from "../core/server";


export const updateUserRole = async (id:string, data: {role: "seeker" | "recruiter" | "admin"}) => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}/user/role-update/${id}`;
  const res = await authMutate(api, "PATCH", data);
  return res.json()
}
