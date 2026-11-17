export type UserRole = "seeker" | "recruiter" | "admin"

export interface UserRow {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date | string
}
