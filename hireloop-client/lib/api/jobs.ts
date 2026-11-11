


export const getJobs = async (query="") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?${query}`);
  return res.json()
}
