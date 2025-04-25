// File: components/Home/PayButton.tsx
"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Actions
import { uploadFiles } from "@/actions/server/upload";

//Utils
import { makeApiRequest } from "@/lib/apiUtils";

const PayButton = ({ email, amount, userDetails }: { email: string; amount: number; userDetails: CompetitorFormData }) => {
    const publicKey = process.env.NEXT_PUBLIC_LIVE_PUBLIC_KEY!;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [imageLinks, setImageLinks] = useState<string[] | null>(null);
    const [paymentRef, setPaymentRef] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (!email || !amount || !userDetails) {
            toast.error("Something went wrong, kindly restart your registration");
            router.replace("/register");
        }
    }, [email, amount, userDetails, router]);

    const handleUpload = async () => {
        const formData = new FormData();
        if (userDetails.profilePhoto) {
            formData.append("profilePhoto", userDetails.profilePhoto);
        }
        if (userDetails.danceVideo) {
            formData.append("danceVideo", userDetails.danceVideo);
        }

        const { success, imageLinks } = await uploadFiles(formData);
        if (!success || !imageLinks) throw new Error("Upload failed");
        return imageLinks;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentSuccess = async (reference: any) => {
        setLoading(true);
        toast.success("Payment successful. Uploading media...");

        try {
            const links = await handleUpload();
            setImageLinks(links);
            setPaymentRef(reference.reference);
            setPaymentSuccess(true);
            toast.success("Media uploaded. Click 'Complete Registration' to finish.");
            setLoading(false);
        } catch (error) {
            console.log("Image Upload Error", error)
            toast.error("Upload failed. Please refresh and try again.");
            setLoading(false);
        }
    };

    const handleFinalRegistration = async () => {
        if (!paymentRef || !imageLinks) {
            toast.error("Missing data. Please try again.");
            return;
        }

        setLoading(true);
        toast.message("Verifying and creating your account...");
        await makeApiRequest("/addUser", "post", {
            transactionId: paymentRef,
            userDetails,
            imageLinks,
        }, {
            onSuccess: () => {
                toast.success("Your registration was successful.");
                router.push("/");
            },
            onError: (response) => {
                toast.error(response.response.data.error);
                router.push("/register");
            },
        });
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            {!paymentSuccess && (
                <PaystackButton publicKey={publicKey} amount={amount * 100} email={email} firstname={userDetails.fullName} currency="NGN"
                    onSuccess={handlePaymentSuccess}
                    onClose={() => toast.error("Transaction was not completed")}
                    text={loading ? "Processing..." : "Pay Now"} className="bg-primaryPurple disabled:bg-gray-600 px-4 py-3 rounded w-full text-white" disabled={loading} />
            )}

            {paymentRef && imageLinks && (
                <button onClick={handleFinalRegistration} className="bg-green-600 disabled:bg-gray-600 px-4 py-3 rounded w-full font-semibold text-white" disabled={loading}>
                    {loading ? "Submitting..." : "Complete Registration"}
                </button>
            )}
        </div>
    );
};

export default PayButton;
