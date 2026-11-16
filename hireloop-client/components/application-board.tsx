import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness, Inbox } from "lucide-react"

import { getJobById } from "@/lib/api/jobs"
import type { applicationType } from "@/lib/types/applicationType"
import type { JobRow } from "@/lib/types/jobType"

interface ApplicationBoardProps {
  applications: applicationType[]
}

const statusTone = (status?: string) => {
  const key = status?.toLowerCase() ?? ""

  if (["hired", "accepted", "shortlisted", "offer"].includes(key)) {
    return "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20"
  }

  if (["rejected", "declined", "withdrawn"].includes(key)) {
    return "bg-rose-500/10 text-rose-300 ring-rose-400/20"
  }

  if (["pending", "in review", "reviewing"].includes(key)) {
    return "bg-amber-500/10 text-amber-300 ring-amber-400/20"
  }

  if (["applied", "submitted"].includes(key)) {
    return "bg-sky-500/10 text-sky-300 ring-sky-400/20"
  }

  return "bg-violet-500/10 text-violet-300 ring-violet-400/20"
}

const ApplicationBoard = async ({ applications }: ApplicationBoardProps) => {
  const jobs: JobRow[] = await Promise.all(
    applications.map((application) => getJobById(application.jobId))
  )

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b10]/80 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl"
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-6 py-4 text-[11px] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                Job Title
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                Company
              </th>
              <th className="px-6 py-4 text-[11px] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                Application Status
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr
                  key={applications[index]._id ?? applications[index].jobId}
                  className="group transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3.5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/10 text-violet-300 ring-1 ring-white/10 ring-inset transition-colors duration-200 group-hover:text-violet-200">
                        <BriefcaseBusiness className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white transition-colors duration-200 group-hover:text-violet-100">
                          {job.jobTitle}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {job.position} &bull; {job.remote ? "Remote" : "Onsite"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-zinc-300">{job.companyName}</span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusTone(applications[index].applicationStatus)}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {applications[index].applicationStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      href={`/browse-jobs/${applications[index].jobId}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200"
                    >
                      Details
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-16">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/5 text-violet-300 ring-1 ring-white/10 ring-inset">
                      <Inbox className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        No applications yet
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        You have not applied to any jobs yet.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApplicationBoard
