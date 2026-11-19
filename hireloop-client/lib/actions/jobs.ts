'use server';
import type { JobType } from "@/lib/types/jobType"
import { authMutate } from "../core/server";

export const createJob = async (newJob: JobType) => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}/add-job`;
  const res = await authMutate(api, "POST", newJob);
  return res.json()
}

export const deleteJob = async (jobId: string) =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`,{
    method: "DELETE"
  })

  return res.json();
}
