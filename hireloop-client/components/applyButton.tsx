

"use client";

import { applyToJob } from "@/lib/actions/applications";
import { getApplicationsCount } from "@/lib/api/applications";
import { getPremiumUser } from "@/lib/api/users";
import { authClient } from "@/lib/auth-client";
import { JobRow } from "@/lib/types/jobType";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ApplyButton = ({ job }: { job: JobRow }) => {
    const router = useRouter();

    const { data: session } = authClient.useSession()

    const handleApplyButton = async () => {
        const role = "seeker";

        if (!session?.user) {
            router.push(`/sign-in?redirectedTo=/browse-jobs/${job._id}`);
            return
        }

        else if (role === "seeker") {
            const totalApplied = await getApplicationsCount(`applicantId=${session?.user.id}`);
            console.log("Total Applied", totalApplied);

            const result = await getPremiumUser(session?.user.id);
            console.log("premium check", result);

            if (totalApplied.count >= 5 && !result.premium) {
                toast.error("Already applied 5 Jobs!")
                router.push(`/payment`);
                return
            }
            else {
                const applicationData = {
                    jobId: job._id,
                    applicantId: session?.user.id,
                    applicantEmail: session?.user.email
                }

                const result = await applyToJob(applicationData);
                console.log("result", result);
                if (result.insertedId) {
                    toast.success("Applied Successfully!");
                    router.push("/dashboard/seeker");
                }
            }
        }
    }

    return (
        <button onClick={handleApplyButton}
            type="button"
            className="h-10 flex-1 cursor-pointer rounded-lg bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 sm:flex-none"
        >
            Apply Now
        </button>
    );
};

export default ApplyButton;