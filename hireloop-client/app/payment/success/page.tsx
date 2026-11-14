

import { paymentVerify } from '@/lib/actions/payments';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation'

interface PaymentSuccessPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }
    const {
        status,
        payment_status,
        payment_intent,
        metadata,
        customer_email,
    } = await stripe.checkout.sessions.retrieve(session_id as string, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete' && payment_status === "paid") {
        console.log({ status, payment_status, payment_intent, metadata, customer_email });

        const result = await paymentVerify(session_id as string);
        console.log("success result", result);

        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to{' '}. If you have any questions, please email{' '}
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }
}

export default PaymentSuccessPage;
