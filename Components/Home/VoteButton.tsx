"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Actions
import { handleVoteSubmission } from "@/actions/server/addVote";



const VoteButton = ({ email, amount, userId, votes, customUserId, isOpen }: { email: string; amount: number; userId: string, votes: number, customUserId: string, isOpen: boolean }) => {

    const publicKey = process.env.NEXT_PUBLIC_LIVE_PUBLIC_KEY!;

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!isOpen) return;

        if (!email || !amount || !userId || !votes) {
            toast.error("Something went wrong, kindly restart the voting process");
            router.replace(`/${customUserId}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, email, amount, userId, votes, router]);

    //Functions
    const toggleLoading = () => setLoading((prev) => !prev);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePaymentSuccess = async (reference: any) => {
        toggleLoading();
        toast.message("Verifying payment...");

        const transactionId = reference.reference;
        toast.message("Adding your vote...");

        const { success, message } = await handleVoteSubmission({ amount, userId, votes, transactionId });
        toggleLoading();
        
        if (!success) {
            toast.error(message);
            return;
        }

        toast.success(message);
        router.replace(`/${customUserId}`);
    };

    return (
        <PaystackButton
            publicKey={publicKey} amount={amount * 100} email={email} currency="NGN"
            onSuccess={handlePaymentSuccess} onClose={() => toast.error("Transaction was not completed")}
            text={loading ? "Verifying..." : `Give ${votes} Votes`} className="bg-primaryPurple px-4 py-3 rounded w-full text-white"
            disabled={loading}
        />
    );
};

export default VoteButton;