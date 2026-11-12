

"use client";

import { authClient } from "@/lib/auth-client";
import { JobRow } from "@/lib/types/jobType";
import { useRouter } from "next/navigation";

const ApplyButton = ({job}: {job: JobRow}) => {
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const handleApplyButton = async () => {
        if (!session?.user) {
            router.push(`/sign-in?redirectedTo=/browse-jobs/${job._id}`);
            return
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