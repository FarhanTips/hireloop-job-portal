

export const getPremiumUser = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/premium-user/${userId}`);
  return res.json()
}

