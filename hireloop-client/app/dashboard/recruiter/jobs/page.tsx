import Link from "next/link"
import {BriefcaseBusiness,Globe2,MapPin,MoreVertical,Plus,SquarePen,Users,} from "lucide-react"

import type { JobType } from "@/lib/types/jobType"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/components/deleteJobDialog"

// Same fields as the addJob form, plus two UI-only extras for the table.
export type JobRow = JobType & {
    _id: string,
    applicants?: number
}

// Status is not stored in JobType, so we derive it from the deadline.
const isExpired = (deadline: string) => new Date(deadline) < new Date()

const formatDeadline = (deadline: string) =>
    new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

const StatusBadge = ({ expired }: { expired: boolean }) => (
    <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs whitespace-nowrap ${expired
            ? "border-white/10 text-zinc-400"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
    >
        <span
            className={`size-1.5 rounded-full ${expired ? "bg-zinc-500" : "bg-emerald-400"
                }`}
        />
        {expired ? "Expired" : "Active"}
    </span>
)

const ManageJobsPage = async () => {
    const jobs: JobRow[] = await getJobs();

    return (
        <div className="dark min-h-screen bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
            <div className="mx-auto w-full">
                {/* Page header */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                        <p className="text-sm text-zinc-500">
                            <span className="text-violet-400">Manage Jobs</span> &rsaquo; Job
                            Listings &amp; Postings
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                            Manage Job Posts
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                            Review live listings, monitor applicants, and update job
                            details across your organization.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/recruiter/jobs/addJob"
                        className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-violet-600 to-fuchsia-500 px-5 text-sm font-semibold text-white hover:opacity-90 sm:w-auto"
                    >
                        <Plus className="size-4" />
                        New Job Post
                    </Link>
                </div>

                {/* Mobile: one card per job */}
                <div className="grid gap-4 md:hidden">
                    {jobs.map((job) => {
                        const expired = isExpired(job.deadline)

                        return (
                            <div
                                key={job._id}
                                className="rounded-2xl border border-white/10 bg-[#0c0c10] p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                                            <BriefcaseBusiness className="size-4" />
                                        </span>
                                        <div>
                                            <p className="font-medium text-white">
                                                {job.jobTitle}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {job.jobCategory}
                                            </p>
                                        </div>
                                    </div>

                                    <StatusBadge expired={expired} />
                                </div>

                                <p className="mt-4 text-sm text-zinc-200">
                                    {job.companyName}
                                </p>

                                <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                                    {job.remote ? (
                                        <Globe2 className="size-3" />
                                    ) : (
                                        <MapPin className="size-3" />
                                    )}
                                    {job.remote
                                        ? `Remote (${job.location})`
                                        : job.location}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
                                    <span>{job.position}</span>
                                    <span>
                                        €{job.minSalary} – €{job.maxSalary}{" "}
                                        {job.frequency}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="size-3.5" />
                                        {job.applicants} applicants
                                    </span>
                                    <span>
                                        Deadline {formatDeadline(job.deadline)}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="h-8 flex-1 cursor-pointer rounded-lg border border-violet-500/40 text-xs font-medium text-violet-300 hover:bg-violet-500/10"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Edit job"
                                        className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                                    >
                                        <SquarePen className="size-3.5" />
                                    </button>
                                    <DeleteJobDialog job={job}></DeleteJobDialog>
                                    <button
                                        type="button"
                                        aria-label="More options"
                                        className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:text-white"
                                    >
                                        <MoreVertical className="size-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Tablet and up: the table */}
                <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c10] md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#111116] text-[11px] tracking-wider text-zinc-500 uppercase">
                            <tr>
                                <th className="px-4 py-4 font-medium">Job Title &amp; Dept</th>
                                <th className="px-4 py-4 font-medium">
                                    Company &amp; Location
                                </th>
                                <th className="px-4 py-4 font-medium">Type</th>
                                <th className="px-4 py-4 font-medium">Compensation</th>
                                <th className="px-4 py-4 font-medium">Applicants</th>
                                <th className="px-4 py-4 font-medium">Status</th>
                                <th className="px-4 py-4 font-medium">Deadline</th>
                                <th className="px-4 py-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr
                                    key={job._id}
                                    className="border-t border-white/5 hover:bg-white/5"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                                                <BriefcaseBusiness className="size-4" />
                                            </span>
                                            <div>
                                                <p className="font-medium text-white">
                                                    {job.jobTitle}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {job.jobCategory}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        <p className="text-zinc-200">
                                            {job.companyName}
                                        </p>
                                        <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                                            {job.remote ? (
                                                <Globe2 className="size-3" />
                                            ) : (
                                                <MapPin className="size-3" />
                                            )}
                                            {job.remote
                                                ? `Remote (${job.location})`
                                                : job.location}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4 text-zinc-300">
                                        {job.position}
                                    </td>

                                    <td className="px-4 py-4 text-zinc-300">
                                        €{job.minSalary} – €{job.maxSalary}{" "}
                                        {job.frequency}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="flex items-center gap-1.5 text-zinc-300">
                                            <Users className="size-4 text-zinc-500" />
                                            {job.applicants}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <StatusBadge expired={isExpired(job.deadline)} />
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                                        {formatDeadline(job.deadline)}
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                className="h-8 cursor-pointer rounded-lg border border-violet-500/40 px-3 text-xs font-medium text-violet-300 hover:bg-violet-500/10"
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Edit job"
                                                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                                            >
                                                <SquarePen className="size-3.5" />
                                            </button>
                                            <DeleteJobDialog job={job}></DeleteJobDialog>
                                            <button
                                                type="button"
                                                aria-label="More options"
                                                className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:text-white"
                                            >
                                                <MoreVertical className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageJobsPage
