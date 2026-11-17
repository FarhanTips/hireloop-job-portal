"use client"

import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/types/userType"
import { updateUserRole } from "@/lib/actions/users"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const roles = ["seeker", "recruiter", "admin"] as const

const DAY_IN_MS = 24 * 60 * 60 * 1000
// Captured once per page load so the stat stays stable across re-renders.
const loadedAt = Date.now()

const roleStyles: Record<UserRole, string> = {
  seeker: "border-zinc-500/25 bg-zinc-500/10 text-zinc-300",
  recruiter: "border-violet-500/25 bg-violet-500/10 text-violet-300",
  admin: "border-amber-500/25 bg-amber-500/10 text-amber-300",
}

// BetterAuth types role as optional, so normalize it to a mandatory value here.
const getRole = (role?: string | null): UserRole =>
  role === "admin" || role === "recruiter" ? role : "seeker"

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

interface UserManagementProps {
  users: {
    id: string
    name: string
    email: string
    role?: string | null
    createdAt: Date | string
  }[]
}

export function UserManagement({ users }: UserManagementProps) {
  const router = useRouter();
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      hint: "All platform accounts",
    },
    {
      label: "Recruiters",
      value: users.filter((user) => getRole(user.role) === "recruiter").length,
      hint: "Hiring accounts",
    },
    {
      label: "New Signups (24h)",
      value: users.filter(
        (user) => loadedAt - new Date(user.createdAt).getTime() < DAY_IN_MS
      ).length,
      hint: "Last 24 hours",
    },
  ]

  const handleRoleChange = async (userId: string, role: UserRole) => {
    // console.log("hello", userId, {role});
    const updatedRole = await updateUserRole(userId, {role});
    console.log("update user role", updatedRole);
    if (updatedRole.modifiedCount > 0){
      toast.success("Role Updated!");
      router.refresh();
    }
  }

  return (
    <div className="dark min-h-screen bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto w-full">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-zinc-500">
              <span className="text-violet-400">Admin</span> &rsaquo; User
              Management
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              User Management
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Review, filter, and manage platform access for all users.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#0c0c10] p-5"
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{stat.hint}</p>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c10]">
          <table className="w-full min-w-245 text-left text-sm">
            <thead className="bg-[#111116] text-[11px] tracking-wider text-zinc-500 uppercase">
              <tr>
                <th className="px-5 py-4 font-medium">User Name</th>
                <th className="px-5 py-4 font-medium">Email Address</th>
                <th className="px-5 py-4 font-medium">Role</th>
                <th className="px-5 py-4 font-medium">Join Date</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const role = getRole(user.role)

                return (
                  <tr
                    key={user.id}
                    className="border-t border-white/5 hover:bg-white/3"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-violet-500/20 text-xs font-semibold">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <p className="font-medium text-white">{user.name}</p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-zinc-400">{user.email}</td>

                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
                          roleStyles[role]
                        )}
                      >
                        {role}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-zinc-400">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <div className="inline-flex rounded-lg border border-white/10 bg-white/3 p-0.5">
                          {roles.map((option) => (
                            <button
                              key={option}
                              type="button"
                              title={`Make ${option}`}
                              onClick={() => handleRoleChange(user.id, option)}
                              className={cn(
                                "cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-medium capitalize",
                                role === option
                                  ? roleStyles[option]
                                  : "text-zinc-500 hover:text-zinc-200"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
