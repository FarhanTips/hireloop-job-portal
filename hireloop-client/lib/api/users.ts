'use server'
import { headers } from "next/headers";
import { auth } from "../auth";


export const getPremiumUser = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/premium-user/${userId}`);
  return res.json()
}



export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name", // The field to sort by.
      sortDirection: "desc", // The direction to sort by.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  return users;
}
