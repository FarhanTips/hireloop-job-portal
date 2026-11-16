"use client"

import { updateApplicationStatus } from "@/lib/actions/applications"
import { applicationType } from "@/lib/types/applicationType"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface ApplicationReviewTableProps {
    applicationsForJob: applicationType[]
}

const statusOptions = [
    "Applied",
    "Review",
    "Interview",
    "Shortlisted",
    "Rejected",
    "Offered",
]

const ApplicationReviewTable = ({ applicationsForJob }: ApplicationReviewTableProps) => {
    const router = useRouter();

    const handleStatusChange = async (applicationId: string, applicationStatus: string) => {
        const updateResult = await updateApplicationStatus(applicationId, { applicationStatus });
        console.log("updateResult", updateResult);

        if (updateResult.modifiedCount > 0) {
            toast.success("Application Status Updated!");
            router.refresh();
        }
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c10]">
            <table className="w-full text-left text-sm">
                <thead className="bg-[#111116] text-[11px] tracking-wider text-zinc-500 uppercase">
                    <tr>
                        <th className="px-4 py-4 font-medium">Applicant</th>
                        <th className="px-4 py-4 font-medium">Application Status</th>
                        <th className="px-4 py-4 font-medium">Update Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applicationsForJob.length > 0 ? (
                        applicationsForJob.map((application) => (
                            <tr
                                key={application._id ?? application.jobId}
                                className="border-t border-white/5 hover:bg-white/5"
                            >
                                <td className="px-4 py-4 text-zinc-200">
                                    {application.applicantEmail}
                                </td>

                                <td className="px-4 py-4">
                                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                                        {application.applicationStatus}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <select
                                        defaultValue={application.applicationStatus}
                                        onChange={(event) =>
                                            handleStatusChange(
                                                application._id ?? "",
                                                event.target.value
                                            )
                                        }
                                        className="cursor-pointer rounded-lg border border-white/10 bg-[#0c0c10] px-3 py-2 text-sm text-zinc-200 outline-none focus:border-violet-500/50"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-4 py-12 text-center text-sm text-zinc-500"
                            >
                                No applications for this job yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ApplicationReviewTable
