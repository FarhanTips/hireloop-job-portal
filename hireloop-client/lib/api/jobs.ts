


export const getJobs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
  return res.json()
}
