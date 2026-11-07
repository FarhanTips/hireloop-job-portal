
"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


const UserInfo = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    console.log("nav bar session", session);

    if (isPending){
        return (
            <div className="text-white">Loading...</div>
        );
    }

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Signed out successfully!");
                    router.push("/sign-in"); // redirect to login page
                },
            },
        });
    }
    return (
        <div>
            {
                session?.user ?
                    <div className="flex items-center gap-4">
                        <span className="text-white">{session?.user?.name}</span>
                        <span className="hidden h-5 w-px bg-white/10 sm:block" />
                        <Button onClick={handleSignOut} variant="destructive" className=" hover:opacity-90">
                            Sign Out
                        </Button>
                    </div>
                    :
                    <div className="flex items-center gap-4">
                        <Link
                            href="/sign-in"
                            className="hidden text-sm text-zinc-400 hover:text-white sm:block"
                        >
                            Sign In
                        </Link>
                        <span className="hidden h-5 w-px bg-white/10 sm:block" />
                        <Link href="/sign-up">
                            <Button className="bg-linear-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90">
                                Get Started
                            </Button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default UserInfo;
