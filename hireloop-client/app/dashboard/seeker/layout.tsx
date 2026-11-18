

import { requireRole } from "@/lib/core/server";


const SeekerLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("seeker");
    return children;
};

export default SeekerLayout;
