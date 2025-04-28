"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Actions
import updatePaymentStatus from "@/actions/server/updatePaymentStatus";

//Icons
import { Copy } from "iconsax-react";


const PayButton = ({ email, amount }: { email: string; amount: number; }) => {

    const publicKey = process.env.NEXT_PUBLIC_LIVE_PUBLIC_KEY!;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentRef, setPaymentRef] = useState<string | null>(null);

    useEffect(() => {
        if (!email || !amount) {
            toast.error("Something went wrong, kindly restart your registration");
            router.replace("/register");
        }
    }, [email, amount, router]);


    //Copy function
    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(paymentRef!);
            toast.info('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy text to clipboard.');
        }
    };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentSuccess = async (reference: any) => {
        setLoading(true);
        toast.success("Payment successful. Updating Profile...");

        try {
            setPaymentRef(reference.reference);
            const { success, message } = await updatePaymentStatus(email, paymentRef!);
            if (!success) {
                toast.error("Couldn't update profile. Kindly contact admin with your payment reference number.");
                return;
            }
            toast.success(message);
            setLoading(false);
        } catch (error) {
            console.log("Payment Finalizing error", error);
            toast.error("Couldn't update profile. Kindly contact admin with your payment reference number.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <PaystackButton publicKey={publicKey} amount={amount * 100} email={email} currency="NGN"
                onSuccess={handlePaymentSuccess}
                onClose={() => toast.error("Transaction was not completed")}
                text={loading ? "Processing..." : "Pay Now"} className="bg-primaryPurple disabled:bg-gray-600 px-4 py-3 rounded w-full text-white" disabled={loading} />

            {paymentRef !== null ?
                (<div className="flex items-center gap-x-2 py-4">
                    <p>Your Payment Reference Number: <span className="font-semibold">{paymentRef}</span></p>
                    <Copy size={24} onClick={handleCopyToClipboard} />
                </div>
                ) :
                (<ul className="list-disc">
                    <li>Please complete your payment within the next 24 hours to avoid automatic account deletion.</li>
                    <li>Failure to pay within the stipulated timeframe will result in the deletion of your account, and you will need to restart the registration process from the beginning.</li>
                    <li>If you are unable to make the payment at this time, you can leave this page and return later.</li>
                    <li>Upon your return, simply enter your registered email address. You will be automatically redirected to this payment page to complete your transaction.</li>
                </ul>
                )}
        </div>
    );
};

export default PayButton;
