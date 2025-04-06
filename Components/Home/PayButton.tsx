"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Utils, Actions
import { makeApiRequest } from "@/lib/apiUtils";
import { uploadFiles } from "@/actions/server/upload";


const PayButton = ({ email, amount, userDetails }: { email: string; amount: number; userDetails: CompetitorFormData }) => {

    const publicKey = process.env.NEXT_PUBLIC_LIVE_PUBLIC_KEY!;

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!email || !amount || !userDetails) {
            toast.error("Something went wrong, kindly restart your registration");
            router.replace("/register");
        }
    }, [email, amount, userDetails, router]);

    //Functions
    const toggleLoading = () => setLoading((prev) => !prev);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentSuccess = async (reference: any) => {

        toggleLoading();
        toast.message("Verifying payment...");
        const transactionId = reference.reference

        const formData = new FormData();
        const files = [
            { key: 'profilePhoto', file: userDetails.profilePhoto },
            { key: 'danceVideo', file: userDetails.danceVideo }
        ];

        files.forEach(({ key, file }) => {
            if (file) {
                formData.append(key, file);
            }
        });

        //Upload Images
        const { success, imageLinks } = await uploadFiles(formData);
        if (!success) {
            toast.error("Couldn't process , kindly try again later.")
            return
        }
        
        toast.dismiss('verify');
        toast.loading("Creating your account...", { id: 'creation' });
        await makeApiRequest("/addUser", "post", { transactionId, userDetails, imageLinks }, {
            onSuccess: () => {
                toggleLoading();
                toast.dismiss('creation');
                toast.success("Your registration was successful.");
                router.push("/")
            },
            onError: (response) => {
                toggleLoading();
                toast.dismiss('creation');
                toast.error(response.response.data.error);
                router.push("/register")
            },
        });

    };

    return (
        <PaystackButton
            publicKey={publicKey} amount={amount * 100} email={email} firstname={userDetails.fullName} currency="NGN"
            onSuccess={handlePaymentSuccess} onClose={() => toast.error("Transaction was not completed")}
            text={loading ? "Verifying..." : "Pay Now"} className="bg-primaryPurple px-4 py-3 rounded w-full text-white"
            disabled={loading}
        />
    );
};

export default PayButton;