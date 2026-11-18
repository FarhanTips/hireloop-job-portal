import { requireRole } from "@/lib/core/server";


const RecruiterLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("recruiter");
    return children;
};

export default RecruiterLayout;
