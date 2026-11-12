import type { ReactNode } from "react"
import { Banknote, Bookmark, Building2, Clock, Globe2, MapPin, type LucideIcon, } from "lucide-react"

import type { JobRow } from "@/lib/types/jobType"
import Link from "next/link"

interface JobCardProps {
  job: JobRow
}

const companyInitials = (companyName: string) =>
  companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

function JobBadge({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#111116] px-2.5 py-1 text-xs text-zinc-300">
      <Icon className="size-3.5 text-zinc-500" />
      {children}
    </span>
  )
}

/** A job summary card in the public job board list. */
export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/browse-jobs/${job._id}`}>
      <article className="rounded-2xl border border-white/10 bg-[#0c0c10] p-4 transition-colors hover:border-white/20 sm:p-5">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/30 to-fuchsia-500/10 text-sm font-semibold text-violet-200"
          >
            {companyInitials(job.companyName)}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-white sm:text-lg">
              {job.jobTitle}
            </h3>

            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 sm:text-sm">
              <span className="text-zinc-400">{job.companyName}</span>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {job.location}
                {job.remote && " (Remote)"}
              </span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <JobBadge icon={Banknote}>
                €{job.minSalary} – €{job.maxSalary} {job.frequency}
              </JobBadge>
              <JobBadge icon={Clock}>{job.position}</JobBadge>
              <JobBadge icon={job.remote ? Globe2 : Building2}>
                {job.remote ? "Remote" : "On-site"}
              </JobBadge>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Save ${job.jobTitle}`}
            className="-mt-1 -mr-1 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-white/5 hover:text-white"
          >
            <Bookmark className="size-4" />
          </button>
        </div>
      </article>
    </Link>
  )
}
