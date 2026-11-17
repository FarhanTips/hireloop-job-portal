

export const updateUserRole = async (id:string, data: {role: "seeker" | "recruiter" | "admin"}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role-update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
