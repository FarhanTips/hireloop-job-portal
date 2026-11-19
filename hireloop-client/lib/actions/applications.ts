'use server'
import { authMutate } from "../core/server";
import { applicationType } from "../types/applicationType"

export const applyToJob = async (data: applicationType) => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}/applyJob`;
  const res = await authMutate(api, "POST", data);
  return res.json()
}


export const updateApplicationStatus = async (id:string, data: {applicationStatus: string}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
