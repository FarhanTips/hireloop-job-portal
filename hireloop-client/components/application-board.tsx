import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"

import { getJobById } from "@/lib/api/jobs"
import type { applicationType } from "@/lib/types/applicationType"
import type { JobRow } from "@/lib/types/jobType"

interface ApplicationBoardProps {
  applications: applicationType[]
}

const ApplicationBoard = async ({ applications }: ApplicationBoardProps) => {
  const jobs: JobRow[] = await Promise.all(
    applications.map((application) => getJobById(application.jobId))
  )

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c10]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#111116] text-[11px] tracking-wider text-zinc-500 uppercase">
          <tr>
            <th className="px-4 py-4 font-medium">Job Title</th>
            <th className="px-4 py-4 font-medium">Company</th>
            <th className="px-4 py-4 text-right font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr
                key={applications[index]._id ?? applications[index].jobId}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                      <BriefcaseBusiness className="size-4" />
                    </span>
                    <div>
                      <p className="font-medium text-white">{job.jobTitle}</p>
                      <p className="text-xs text-zinc-500">
                        {job.position} &bull;{" "}
                        {job.remote ? "Remote" : "Onsite"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-zinc-300">{job.companyName}</td>

                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/browse-jobs/${applications[index].jobId}`}
                    className="text-sm font-medium text-violet-300 hover:text-violet-200"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-12 text-center text-sm text-zinc-500"
              >
                You have not applied to any jobs yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ApplicationBoard
