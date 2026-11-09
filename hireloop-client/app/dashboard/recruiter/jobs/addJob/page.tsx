"use client"

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, ChevronDown, Globe2, MapPin, } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createJob } from "@/lib/actions/jobs"
import { JobType } from "@/lib/types/jobType"

const positions = ["Full-time", "Part-time", "Contract", "Internship"]

const labelClass = "mb-2 block text-sm font-medium text-zinc-300"
const inputClass =
    "h-11 w-full rounded-lg border border-white/10 bg-[#111116] px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
const selectClass =
    "h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#111116] px-4 pr-10 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
const textareaClass =
    "min-h-32 w-full resize-y rounded-lg border border-white/10 bg-[#111116] px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"

const AddJobsPage = () => {
    // const router = useRouter()
    const [position, setPosition] = useState("Full-time")
    const [remote, setRemote] = useState(true)

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)
        
        const newJob = {
            ...Object.fromEntries(formData.entries()),
            position,
            remote,
        } as JobType

        console.log("New job:", newJob)

        const result = await createJob(newJob);
        console.log("result", result);
        // toast.success("Job published successfully!")
        form.reset()
        setPosition("Full-time")
        setRemote(true)
        // router.push("/dashboard/recruiter/jobs")
    }

    return (
        <div className="dark min-h-screen bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
            <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
                {/* Page header */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                        <p className="text-sm text-zinc-500">
                            <span className="text-violet-400">Create New Job</span>
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                            Post a New Job
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                            Fill in the position specifications to attract qualified talent
                            across our network.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="h-10 shrink-0 cursor-pointer rounded-lg bg-linear-to-r from-violet-600 to-fuchsia-500 px-5 font-semibold text-white hover:opacity-90"
                    >
                        Publish Job
                        <ArrowRight className="size-4" />
                    </Button>
                </div>

                <div className="space-y-6">
                    {/* Basic information */}
                    <section className="rounded-2xl border border-white/10 bg-[#0c0c10] p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex size-5 items-center justify-center rounded-md border border-violet-500/30 bg-violet-500/10">
                                <span className="size-1.5 rounded-full bg-violet-400" />
                            </span>
                            <h2 className="font-medium">1. Basic Information</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="jobTitle" className={labelClass}>
                                    Job Title <span className="text-violet-400">*</span>
                                </label>
                                <input
                                    id="jobTitle"
                                    name="jobTitle"
                                    type="text"
                                    required
                                    defaultValue="Frontend Developer"
                                    placeholder="e.g. Frontend Developer"
                                    className={inputClass}
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="companyName" className={labelClass}>
                                        Company Name <span className="text-violet-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
                                        <input
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            required
                                            defaultValue="HirePulse Network"
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="jobCategory" className={labelClass}>
                                        Job Category <span className="text-violet-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="jobCategory"
                                            name="jobCategory"
                                            required
                                            defaultValue="Engineering & Tech"
                                            className={selectClass}
                                        >
                                            <option>Engineering & Tech</option>
                                            <option>Design</option>
                                            <option>Marketing</option>
                                            <option>Sales</option>
                                            <option>Finance</option>
                                            <option>Operations</option>
                                            <option>Other</option>
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-500" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className={labelClass}>
                                    Position <span className="text-violet-400">*</span>
                                </span>
                                <input type="hidden" name="position" value={position} />
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {positions.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setPosition(type)}
                                            className={`h-10 cursor-pointer rounded-lg border text-sm transition-colors ${position === type
                                                    ? "border-violet-500/60 bg-violet-500/10 text-white"
                                                    : "border-white/10 bg-transparent text-zinc-400 hover:border-white/20 hover:text-white"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Location, compensation and timeline */}
                    <section className="rounded-2xl border border-white/10 bg-[#0c0c10] p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex size-5 items-center justify-center rounded-md border border-violet-500/30 bg-violet-500/10">
                                <span className="size-1.5 rounded-full bg-violet-400" />
                            </span>
                            <h2 className="font-medium">
                                2. Location, Compensation &amp; Timeline
                            </h2>
                        </div>

                        <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#111116] p-4">
                            <div className="flex items-center gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                                    <Globe2 className="size-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        Remote Work Allowed{" "}
                                        <span className="font-normal text-zinc-500">(optional)</span>
                                    </p>
                                    <p className="mt-0.5 text-xs text-zinc-500">
                                        Enable worldwide or distributed candidate applications
                                    </p>
                                </div>
                            </div>

                            <input type="hidden" name="remote" value={remote ? "yes" : "no"} />
                            <button
                                type="button"
                                role="switch"
                                aria-checked={remote}
                                aria-label="Toggle remote work"
                                onClick={() => setRemote(!remote)}
                                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${remote ? "bg-violet-500" : "bg-zinc-700"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${remote ? "translate-x-5" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="location" className={labelClass}>
                                    Job Location <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        defaultValue="New York, USA"
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="deadline" className={labelClass}>
                                    Application Deadline <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <CalendarDays className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        required
                                        defaultValue="2025-05-30"
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-5 sm:grid-cols-3">
                            <div>
                                <label htmlFor="minSalary" className={labelClass}>
                                    Min Salary / Rate <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                                        €
                                    </span>
                                    <input
                                        id="minSalary"
                                        name="minSalary"
                                        type="number"
                                        min="0"
                                        required
                                        defaultValue="25"
                                        className={`${inputClass} pl-8`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="maxSalary" className={labelClass}>
                                    Max Salary / Rate <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500">
                                        €
                                    </span>
                                    <input
                                        id="maxSalary"
                                        name="maxSalary"
                                        type="number"
                                        min="0"
                                        required
                                        defaultValue="40"
                                        className={`${inputClass} pl-8`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="frequency" className={labelClass}>
                                    Frequency <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="frequency"
                                        name="frequency"
                                        required
                                        defaultValue="per hour"
                                        className={selectClass}
                                    >
                                        <option>per hour</option>
                                        <option>per month</option>
                                        <option>per year</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-500" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Responsibilities and requirements */}
                    <section className="rounded-2xl border border-white/10 bg-[#0c0c10] p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex size-5 items-center justify-center rounded-md border border-violet-500/30 bg-violet-500/10">
                                <span className="size-1.5 rounded-full bg-violet-400" />
                            </span>
                            <h2 className="font-medium">
                                3. Responsibilities &amp; Requirements
                            </h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="responsibilities" className={labelClass}>
                                    Key Responsibilities <span className="text-violet-400">*</span>
                                </label>
                                <textarea
                                    id="responsibilities"
                                    name="responsibilities"
                                    required
                                    defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                                    className={textareaClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="requirements" className={labelClass}>
                                    Qualifications &amp; Requirements{" "}
                                    <span className="text-violet-400">*</span>
                                </label>
                                <textarea
                                    id="requirements"
                                    name="requirements"
                                    required
                                    defaultValue={
                                        "- 3+ years of experience with React, TypeScript, and modern state architectures\n- Solid understanding of DOM performance and component-driven designs\n- Experience partnering closely with product teams and UI/UX designers"
                                    }
                                    className={textareaClass}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                    <BriefcaseBusiness className="size-3.5" />
                    The job will be published to your company profile after submission.
                </p>
            </form>
        </div>
    )
}

export default AddJobsPage
