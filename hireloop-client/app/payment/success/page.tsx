import { Check } from "lucide-react"
import { paymentVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PaymentSuccessPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
    const { session_id } = await searchParams

    if (!session_id) {
        throw new Error("Please provide a valid session_id (`cs_test_...`)")
    }
    const {
        status,
        payment_status,
        payment_intent,
        metadata,
        customer_email,
        amount_total,
        currency,
    } = await stripe.checkout.sessions.retrieve(session_id as string, {
        expand: ["line_items", "payment_intent"],
    })

    if (status === "open") {
        return redirect("/")
    }

    if (status === "complete" && payment_status === "paid") {
        console.log({
            status,
            payment_status,
            payment_intent,
            metadata,
            customer_email,
            amount_total,
        })

        const result = await paymentVerify(session_id as string)
        console.log("success result", result)

        const total = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: (currency ?? "usd").toUpperCase(),
        }).format((amount_total ?? 0) / 100)

        const paymentIntentId =
            typeof payment_intent === "string" ? payment_intent : payment_intent?.id

        return (
            <section
                id="success"
                className="flex min-h-[70vh] items-center justify-center px-4 py-16"
            >
                <div className="relative w-full max-w-md">
                    <div
                        aria-hidden
                        className="absolute -inset-1 rounded-3xl bg-linear-to-b from-emerald-500/25 via-emerald-500/5 to-transparent blur-xl"
                    />

                    <Card className="relative w-full overflow-hidden shadow-xl shadow-black/5 ring-foreground/10">
                        <div className="relative flex flex-col items-center gap-3 border-b border-dashed px-6 pt-9 pb-7 text-center">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-emerald-500/10 to-transparent"
                            />

                            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 ring-8 ring-emerald-500/10 dark:text-emerald-400">
                                <Check className="size-8" strokeWidth={3} />
                            </div>

                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 capitalize dark:text-emerald-400">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                {payment_status}
                            </span>

                            <div className="space-y-1">
                                <h1 className="font-heading text-xl font-semibold tracking-tight">
                                    Payment successful
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Thank you for your business.
                                </p>
                            </div>

                            <div className="mt-2 space-y-0.5">
                                <p className="text-3xl font-semibold tracking-tight tabular-nums">
                                    {total}
                                </p>
                                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                                    Total paid
                                </p>
                            </div>
                        </div>

                        <CardContent className="pt-5">
                            <dl className="divide-y text-sm">
                                <div className="flex items-center justify-between gap-4 py-2.5">
                                    <dt className="text-muted-foreground">Status</dt>
                                    <dd className="font-medium capitalize">{status}</dd>
                                </div>

                                <div className="flex items-center justify-between gap-4 py-2.5">
                                    <dt className="text-muted-foreground">Email</dt>
                                    <dd className="max-w-[60%] truncate font-medium">
                                        {customer_email}
                                    </dd>
                                </div>

                                <div className="flex items-center justify-between gap-4 py-2.5">
                                    <dt className="text-muted-foreground">Transaction Id</dt>
                                    <dd
                                        title={paymentIntentId}
                                        className="max-w-[60%] truncate font-mono text-xs"
                                    >
                                        {paymentIntentId ?? "—"}
                                    </dd>
                                </div>
                            </dl>
                        </CardContent>

                        <CardFooter className="flex-col items-start gap-1 text-xs leading-relaxed text-muted-foreground">
                            <p>
                                A confirmation email will be sent to{" "}
                                <span className="font-medium text-foreground">
                                    {customer_email ?? "your email address"}
                                </span>
                                .
                            </p>
                            <p>
                                Questions? Email{" "}
                                <a
                                    href="mailto:orders@example.com"
                                    className="font-medium text-foreground underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400"
                                >
                                    orders@example.com
                                </a>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        )
    }
}

export default PaymentSuccessPage
