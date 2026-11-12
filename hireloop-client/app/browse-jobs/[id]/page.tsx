import type { ReactNode } from "react"
import {
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Layers,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react"

import { getJobById } from "@/lib/api/jobs"
import type { JobRow } from "@/lib/types/jobType"
import ApplyButton from "@/components/applyButton"

interface JobDetailsPageProps {
  params: Promise<{ id: string }>
}

const companyInitials = (companyName: string) =>
  companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()

const toLines = (text: string) =>
  text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, "").trim())
    .filter(Boolean)

const formatDeadline = (deadline: string) => {
  const date = new Date(deadline)

  return Number.isNaN(date.getTime())
    ? deadline
    : new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)
}

const cardClass = "rounded-2xl border border-white/10 bg-[#0c0c10]"

function StatCard({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className={`${cardClass} p-4`}>
      <p className="flex items-center gap-2 text-[0.7rem] font-medium tracking-wide text-zinc-500 uppercase">
        <Icon className="size-4" />
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function JobSection({ title, text }: { title: string; text: string }) {
  const lines = toLines(text)

  return (
    <section className={`${cardClass} p-5 sm:p-6`}>
      <h2 className="mb-5 text-lg font-semibold text-white">{title}</h2>

      {lines.length > 1 ? (
        <ul className="space-y-3 text-sm leading-6 text-zinc-400">
          {lines.map((line) => (
            <li key={line} className="flex gap-2.5">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-400" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-zinc-400">{lines[0] ?? "—"}</p>
      )}
    </section>
  )
}

function CompanyRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-right font-medium text-zinc-200">{children}</dd>
    </div>
  )
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params;
  const job: JobRow = await getJobById(id);

  return (
    <main className="dark min-h-screen bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <header
          className={`${cardClass} flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/30 to-fuchsia-500/10 text-lg font-semibold text-violet-200"
            >
              {companyInitials(job.companyName)}
            </span>

            <div className="min-w-0">
              <h1 className="text-xl font-semibold sm:text-2xl">
                {job.jobTitle}
              </h1>

              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="text-zinc-400">{job.companyName}</span>
                <span aria-hidden className="text-zinc-600">
                  •
                </span>
                <span className="inline-flex items-center gap-1 text-zinc-500">
                  <MapPin className="size-3.5" />
                  {job.location}
                  {job.remote && " (Remote)"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Save ${job.jobTitle}`}
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Bookmark className="size-4" />
            </button>

            <ApplyButton job={job}></ApplyButton>

          </div>
        </header>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard icon={Banknote} label="Salary Range">
            <p className="text-sm font-medium">
              €{job.minSalary} – €{job.maxSalary}
            </p>
            <p className="text-xs text-zinc-500">{job.frequency}</p>
          </StatCard>

          <StatCard icon={MapPin} label="Location">
            <p className="text-sm font-medium">{job.location}</p>
            <p className="text-xs text-zinc-500">
              {job.remote ? "Remote" : "On-site"}
            </p>
          </StatCard>

          <StatCard icon={BriefcaseBusiness} label="Job Type">
            <p className="text-sm font-medium">{job.position}</p>
          </StatCard>

          <StatCard icon={Layers} label="Category">
            <p className="text-sm font-medium">{job.jobCategory}</p>
          </StatCard>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <JobSection title="Responsibilities" text={job.responsibilities} />
            <JobSection title="Requirements" text={job.requirements} />
          </div>

          <aside className={`${cardClass} p-5`}>
            <h2 className="mb-5 text-base font-semibold">Company Overview</h2>

            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/30 to-fuchsia-500/10 text-sm font-semibold text-violet-200"
              >
                {companyInitials(job.companyName)}
              </span>
              <p className="min-w-0 truncate font-medium">{job.companyName}</p>
            </div>

            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <CompanyRow label="Category">{job.jobCategory}</CompanyRow>
              <CompanyRow label="Applicants">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-3.5 text-zinc-500" />
                  {job.applicants ?? 0}
                </span>
              </CompanyRow>
              <CompanyRow label="Deadline">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-zinc-500" />
                  {formatDeadline(job.deadline)}
                </span>
              </CompanyRow>
            </dl>

          </aside>
        </div>
      </div>
    </main>
  )
}

export default JobDetailsPage
