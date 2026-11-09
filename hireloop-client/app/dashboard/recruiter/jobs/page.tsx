import Link from "next/link"
import {
    BriefcaseBusiness,
    Globe2,
    MapPin,
    MoreVertical,
    Plus,
    SquarePen,
    Trash2,
    Users,
} from "lucide-react"

import type { JobType } from "@/lib/types/jobType"

// Same fields as the addJob form, plus two UI-only extras for the table.
type JobRow = JobType & { id: number; applicants: number }

const dummyJobs: JobRow[] = [
    {
        id: 1,
        jobTitle: "Frontend Developer",
        companyName: "HirePulse Network",
        jobCategory: "Engineering & Tech",
        position: "Full-time",
        remote: true,
        location: "New York, USA",
        minSalary: "25",
        maxSalary: "40",
        frequency: "per hour",
        deadline: "2026-12-30",
        applicants: 34,
        responsibilities: "Build responsive interfaces with React and TypeScript.",
        requirements: "3+ years with React, TypeScript and modern state tools.",
    },
    {
        id: 2,
        jobTitle: "Senior Product Designer",
        companyName: "HirePulse Labs",
        jobCategory: "Design",
        position: "Full-time",
        remote: false,
        location: "London, UK",
        minSalary: "45",
        maxSalary: "60",
        frequency: "per hour",
        deadline: "2027-01-14",
        applicants: 18,
        responsibilities: "Own the design system and end-to-end product flows.",
        requirements: "Strong Figma skills and a portfolio of shipped products.",
    },
    {
        id: 3,
        jobTitle: "DevOps Specialist",
        companyName: "HirePulse Platform",
        jobCategory: "Engineering & Tech",
        position: "Full-time",
        remote: false,
        location: "Berlin, Germany",
        minSalary: "40",
        maxSalary: "55",
        frequency: "per hour",
        deadline: "2026-12-10",
        applicants: 12,
        responsibilities: "Maintain CI/CD pipelines and cloud infrastructure.",
        requirements: "Experience with Docker, Kubernetes and Terraform.",
    },
    {
        id: 4,
        jobTitle: "Product Marketing Lead",
        companyName: "HirePulse Network",
        jobCategory: "Marketing",
        position: "Contract",
        remote: true,
        location: "EU/UK",
        minSalary: "2000",
        maxSalary: "3000",
        frequency: "per month",
        deadline: "2027-02-01",
        applicants: 27,
        responsibilities: "Plan launches and run campaigns across channels.",
        requirements: "4+ years in B2B marketing with measurable results.",
    },
    {
        id: 5,
        jobTitle: "QA Automation Engineer",
        companyName: "HirePulse Platform",
        jobCategory: "Operations",
        position: "Part-time",
        remote: false,
        location: "Dublin, Ireland",
        minSalary: "20",
        maxSalary: "30",
        frequency: "per hour",
        deadline: "2026-09-15",
        applicants: 8,
        responsibilities: "Write and maintain end-to-end test suites.",
        requirements: "Experience with Playwright or Cypress.",
    },
]

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

const ManageJobsPage = () => {
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
                    {dummyJobs.map((job) => {
                        const expired = isExpired(job.deadline)

                        return (
                            <div
                                key={job.id}
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
                                    <button
                                        type="button"
                                        aria-label="Delete job"
                                        className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </button>
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
                            {dummyJobs.map((job) => (
                                <tr
                                    key={job.id}
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
                                            <button
                                                type="button"
                                                aria-label="Delete job"
                                                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
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
