import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

const UnauthorizedPage = () => {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-md rounded-3xl border border-indigo-200/70 bg-linear-to-br from-indigo-50 via-white to-violet-100 p-8 text-center shadow-[0_12px_40px_rgba(79,70,229,0.10)] dark:border-indigo-800/60 dark:from-slate-900 dark:via-indigo-950 dark:to-violet-950">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-300">
                    <Lock className="size-8" />
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Unauthorized
                </h1>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                    You don&apos;t have permission to access this page. Please sign in with the
                    right account or head back home.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                        nativeButton={false}
                        render={<Link href="/" />}
                        variant="outline"
                        className="cursor-pointer"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedPage
