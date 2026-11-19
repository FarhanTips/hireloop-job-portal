// 'use server'
import { authFetch } from "../core/server";


export const getPremiumUser = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/premium-user/${userId}`);
  return res.json()
}



export const getUsers = async () => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}/users`;
  const res = await authFetch(api);
  return res.json();
}
