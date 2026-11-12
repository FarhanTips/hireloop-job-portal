

import { applicationType } from "../types/applicationType"

export const applyToJob = async (data: applicationType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applyJob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
