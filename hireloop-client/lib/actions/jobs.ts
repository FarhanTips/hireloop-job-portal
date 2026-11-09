import type { JobType } from "@/lib/types/jobType"

export const createJob = async (newJob: JobType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  })
  return res.json()
}
