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
        setImageLinks(imageLinks);
    };
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentSuccess = async (reference: any) => {
        if (!imageLinks) {
            toast.error("Media not uploaded yet");
            return;
        }

        setLoading(true);
        toast.message("Verifying payment...");
        await makeApiRequest("/addUser", "post", {
            transactionId: reference.reference,
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

    useEffect(() => {
        handleUpload().catch(() => {
            toast.error("Upload failed, please refresh and try again");
        });
    }, []);

    return (
        <PaystackButton
            publicKey={publicKey}
            amount={amount * 100}
            email={email}
            firstname={userDetails.fullName}
            currency="NGN"
            onSuccess={handlePaymentSuccess}
            onClose={() => toast.error("Transaction was not completed")}
            text={loading ? "Verifying..." : "Pay Now"}
            className="bg-primaryPurple px-4 py-3 rounded w-full text-white"
            disabled={loading || !imageLinks}
        />
    );
};

export default PayButton;