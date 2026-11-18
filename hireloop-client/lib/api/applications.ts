
import { authFetch } from "../core/server";


export const getApplications = async (query="") => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}/myApplications?${query}`;
  const res = await authFetch(api);
  // const res = await fetch(api)
  return res.json()
}

export const getApplicationsCount = async (query="") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myApplications/count?${query}`);
  return res.json()
}
