"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Actions
import updatePaymentStatus from "@/actions/server/updatePaymentStatus";

//Components
import { Badge } from "../ui/badge";

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

    //Constants
    const RULES = ["Please complete your payment within the next 24 hours to avoid automatic account deletion", "Failure to pay within the stipulated timeframe will result in the deletion of your account, and you will need to restart the registration process from the beginning", "If you are unable to make the payment at this time, you can leave this page and return later", "Upon your return, simply enter your registered email address. You will be automatically redirected to this payment page to complete your transaction"]

    //Copy function
    const handleCopyToClipboard = async () => {
        try {
            if (paymentRef !== null) {
                await navigator.clipboard.writeText(paymentRef);
                toast.info(`${paymentRef} was copied to clipboard!`);
            } else {
                toast.error("Your Payment Ref is Undefined")
            }
        } catch (err) {
            console.log('Failed to copy text: ', err);
            toast.error('Failed to copy text to clipboard.');
        }
    };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentSuccess = async (reference: any) => {
        setLoading(true);
        toast.success("Payment successful. Updating Profile...");

        try {
            setPaymentRef(reference.reference);
            const { success, message } = await updatePaymentStatus(email, reference.reference);
            if (!success) {
                toast.error("Couldn't update profile. Kindly contact admin with your payment reference number.");
                return;
            }
            toast.success(message);
            setLoading(false);
            router.push("/")
        } catch (error) {
            console.log("Payment Finalizing error", error);
            toast.error("Couldn't update profile. Kindly contact admin with your payment reference number.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {paymentRef !== null ?
                (<div className="flex items-center gap-x-2 py-4">
                    <p>Your Payment Reference Number: <span className="font-semibold">{paymentRef}</span></p>
                    <Copy size={24} onClick={handleCopyToClipboard} className="cursor-pointer" />
                </div>
                ) :
                (<div className="my-4">
                    <p className="font-semibold text-lg sm:text-xl">Instructions</p>
                    <div className='flex flex-col gap-y-3 mt-2'>
                        {RULES.map((rule, index) => (
                            <>
                                <div className="flex items-start gap-2">
                                    <Badge variant="outline" className="bg-inherit mt-0.5 text-neutral-300">
                                        {index + 1}
                                    </Badge>
                                    <p>{rule}</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>)}

            {paymentRef === null && <PaystackButton publicKey={publicKey} amount={amount * 100} email={email} currency="NGN"
                onSuccess={handlePaymentSuccess}
                onClose={() => toast.error("Transaction was not completed")}
                text={loading ? "Processing..." : "Pay Now"} className="bg-primaryPurple disabled:bg-gray-600 px-4 py-3 rounded w-full text-white" disabled={loading} />}
        </div>
    );
};

export default PayButton;
