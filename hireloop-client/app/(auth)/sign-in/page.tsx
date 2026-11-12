"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { SyntheticEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify"

export default function LogInPage() {

    const router = useRouter();

    const searchParams = useSearchParams();
    const redirectedTo = searchParams.get("redirectedTo") ?? "/";

    const handleLogIn = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user: Record<string, string> = {};

        formData.forEach((value, key) => {
            user[key] = value.toString();
        });

        console.log("data from form", user)

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        console.log("data", data);
        console.log("error", error);

        if (error) {
            toast.error(error.message ?? "Something went wrong!");
            return;
        }

        toast.success("Logged in successfully!");
        router.push(redirectedTo);
    };

    // const handleGoogleSignIn = async () => {
    //     const { error } = await authClient.signIn.social({
    //         provider: "google",
    //         callbackURL: "/",
    //         errorCallbackURL: "/sign-up",
    //     });
    //     console.log("Cgheck rror", error);
    //     if (error) {
    //         toast.error(error.message ?? "Something went wrong!");
    //     }
    // };

    return (
        <div className="mx-auto my-10 flex w-full max-w-md flex-col gap-6 px-4 sm:my-16 sm:px-0">

            <Card className="overflow-hidden rounded-3xl border border-indigo-200/70 bg-linear-to-br from-indigo-50 via-white to-violet-100 shadow-[0_12px_40px_rgba(79,70,229,0.10)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(79,70,229,0.16)] dark:border-indigo-800/60 dark:bg-linear-to-br dark:from-slate-900 dark:via-indigo-950 dark:to-violet-950 dark:shadow-black/30">

                <CardHeader className="space-y-2 pb-6 pt-8 text-center">
                    <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                        Log In to Your Account
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-5 pb-8 sm:px-8">
                    <form onSubmit={handleLogIn}>
                        <FieldGroup>
                            <Field>
                                <Button className="w-full cursor-pointer border-indigo-200 bg-white/70 transition-colors hover:bg-indigo-50 dark:border-indigo-700 dark:bg-slate-900/50 dark:hover:bg-indigo-900/50" variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-transparent">
                                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 font-semibold text-indigo-600 dark:border-indigo-800 dark:bg-slate-800 dark:text-indigo-300 text-xs sm:text-sm">
                                    Or continue with
                                </span>
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input id="password" type="password" name="password" placeholder="password" required minLength={6} />
                            </Field>

                            <Field>
                                <Button type="submit" className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-violet-600 font-bold text-white shadow-md transition-all hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-400 dark:hover:to-violet-400">
                                    Sign In
                                </Button>
                                <FieldDescription className="text-center text-slate-600 dark:text-slate-400">
                                    Don&apos;t have an account? <Link href="sign-up" className="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">Sign Up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center text-slate-600 dark:text-slate-400">
                <Link href="/" className="font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-300">
                    ⬅︎ Go to homepage
                </Link>
            </FieldDescription>
        </div>
    )
}
