import { Check, Sparkles } from "lucide-react"

const proFeatures = [
    "Unlimited job applications",
    "Priority listing for recruiters",
    "See who viewed your profile",
    "Early access to new job posts",
    "Resume review tips and insights",
    "Cancel anytime, no hidden fees",
]


interface PaymentPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

const PaymentPage = async ({ searchParams }: PaymentPageProps) => {
    const { canceled } = await searchParams;

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }
    return (
        <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f14] px-4 py-16 text-white">
            {/* Soft background glow */}
            <div className="absolute -top-40 left-1/2 -z-10 size-150 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
            <div className="absolute -bottom-40 right-0 -z-10 size-100 rounded-full bg-violet-500/10 blur-[120px]" />

            <div className="w-full max-w-sm rounded-3xl bg-linear-to-b from-white/20 via-white/5 to-transparent p-px shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                <div className="rounded-[calc(1.5rem-1px)] bg-[#15171d] p-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-widest text-zinc-300">
                        <Sparkles className="size-3 text-orange-500" />
                        PRO PLAN
                    </div>

                    <h1 className="mt-4 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                        HireLoopPro
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        Everything you need to land your next role.
                    </p>

                    {/* Price */}
                    <div className="mt-7 flex items-end gap-1.5">
                        <span className="text-5xl font-bold tracking-tight">$20</span>
                    </div>

                    <div className="my-6 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

                    {/* Features */}
                    <ul className="space-y-3.5 text-sm text-zinc-300">
                        {proFeatures.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                                <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-400/30">
                                    <Check className="size-3 text-indigo-300" />
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <form action="/api/checkout_sessions" method="POST">
                        <section>
                            <button type="submit" role="link" 
                            className="mt-8 w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.9)] transition hover:brightness-110 active:scale-[0.99]">
                                Pay $20
                            </button>
                        </section>
                    </form>

                    <p className="mt-4 text-center text-[11px] text-zinc-500">
                        Secure payment · Cancel anytime
                    </p>
                </div>
            </div>
        </main>
    )
}

export default PaymentPage
