import Link from "next/link"
import {ArrowLeft,CalendarCheck2,Clock3,Sparkles,Trophy,Users,} from "lucide-react"
import { getApplications } from "@/lib/api/applications"
import type { applicationType } from "@/lib/types/applicationType"
import ApplicationReviewTable from "./_components/applicationReviewTable"

interface JobRecruitDetailsPageProps {
    params: Promise<{ id: string }>
}

const JobRecruitDetailsPage = async ({ params }: JobRecruitDetailsPageProps) => {
    const { id } = await params

    const applicationsForJob: applicationType[] = await getApplications(
        `jobId=${id}`
    )

    const count = (...statuses: string[]) =>
        applicationsForJob.filter((application) =>
            statuses.includes(application.applicationStatus?.toLowerCase() ?? "")
        ).length

    const stats = [
        {
            label: "Total Applicants",
            value: applicationsForJob.length,
            icon: Users,
            tone: "text-violet-300 ring-violet-400/20",
            glow: "from-violet-500/20",
        },
        {
            label: "In Review",
            value: count("applied", "review", "pending"),
            icon: Clock3,
            tone: "text-amber-300 ring-amber-400/20",
            glow: "from-amber-500/20",
        },
        {
            label: "Interviews",
            value: count("interview", "shortlisted"),
            icon: CalendarCheck2,
            tone: "text-sky-300 ring-sky-400/20",
            glow: "from-sky-500/20",
        },
        {
            label: "Offered",
            value: count("offered", "hired"),
            icon: Trophy,
            tone: "text-emerald-300 ring-emerald-400/20",
            glow: "from-emerald-500/20",
        },
    ]

    return (
        <div className="dark relative min-h-screen overflow-hidden bg-[#08080a] px-4 py-10 text-white sm:px-6 lg:px-10">
            {/* Ambient lighting */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-48 left-1/2 h-96 w-184 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/3 -right-40 size-80 rounded-full bg-fuchsia-500/10 blur-[110px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -left-32 size-72 rounded-full bg-sky-500/10 blur-[110px]"
            />

            <div className="relative mx-auto w-full max-w-7xl">
                <Link
                    href="/dashboard/recruiter/jobs"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-violet-400/30 hover:text-violet-200"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to job posts
                </Link>

                <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <p className="flex items-center gap-2 text-sm text-zinc-500">
                            <span className="text-violet-400">Hiring Pipeline</span>
                            <span className="text-zinc-700">/</span>
                            Applicants
                        </p>

                        <h1 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight lg:text-6xl">
                            <span className="bg-linear-to-r from-white via-violet-200 to-fuchsia-300 bg-clip-text text-transparent">
                                Spot the ones 
                            </span>
                
                            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent"> who truly belong.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400">
                            Every application is a first impression. Read between the lines,
                            move quickly, and keep exceptional talent from slipping through
                            the cracks.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs text-zinc-400 backdrop-blur">
                        <Sparkles className="size-3.5 text-violet-300" />
                        Live pipeline view
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    {stats.map(({ label, value, icon: Icon, tone, glow }) => (
                        <div
                            key={label}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10]/80 p-5 backdrop-blur transition-colors hover:border-white/20"
                        >
                            <div
                                aria-hidden
                                className={`pointer-events-none absolute -top-16 -right-10 size-32 rounded-full bg-linear-to-br ${glow} to-transparent blur-2xl`}
                            />
                            <div className="relative flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                                        {label}
                                    </p>
                                    <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                                        {value}
                                    </p>
                                </div>
                                <span
                                    className={`flex size-9 items-center justify-center rounded-xl bg-white/4 ring-1 ring-inset ${tone}`}
                                >
                                    <Icon className="size-4" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <section className="mt-12">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold tracking-tight text-white">
                                Applicant pipeline
                            </h2>
                            <p className="mt-1 text-xs text-zinc-500">
                                Triage candidates and move them through your hiring stages.
                            </p>
                        </div>

                        <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-400">
                            {applicationsForJob.length}{" "}
                            {applicationsForJob.length === 1 ? "applicant" : "applicants"}
                        </span>
                    </div>

                    <ApplicationReviewTable applicationsForJob={applicationsForJob} />
                </section>
            </div>
        </div>
    )
}

export default JobRecruitDetailsPage
