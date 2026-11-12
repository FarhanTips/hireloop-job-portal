


export const getJobs = async (query="") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?${query}`);
  return res.json()
}

export const getJobById = async (jobId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`);
  return res.json()
}
