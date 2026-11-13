

export const getApplications = async (query="") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myApplications?${query}`);
  return res.json()
}

export const getApplicationsCount = async (query="") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myApplications/count?${query}`);
  return res.json()
}
