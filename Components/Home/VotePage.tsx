"use client"

import { SetStateAction, useState } from "react";
import { toast } from "sonner";

//Components
import Input from "../ui/Input";
import VoteButton from "./VoteButton";

//Icons
import { AddSquare, MinusSquare } from "iconsax-react";

const VotePage = ({ userId, customUserId }: { userId: string, customUserId: string }) => {

    const oneVoteCost: number = 50;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [votes, setVotes] = useState<number>(10);
    const [email, setEmail] = useState<string>("");
    const [amount, setAmount] = useState<number>(votes * oneVoteCost)

    //Functions
    const toggleOpen = () => setIsOpen((prev) => !prev);

    // Update vote count + sync amount
    const updateVote = (vote: number, type: "add" | "sub") => {
        setVotes((prevVotes) => {
            const newVotes = type === "add" ? prevVotes + vote : prevVotes - vote;
            if (newVotes < 10) {
                toast.warning("A minimum of 10 votes is required.");
                return prevVotes;
            }

            setAmount(newVotes * oneVoteCost);
            return newVotes;
        });
    };

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <>
            {isOpen &&
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 p-4 text-darkBlack">
                    <div className="bg-white shadow-lg p-6 rounded-2xl max-w-xl text-center">
                        <Input type="text" placeholder='e.g johndoes@gmail.com' label='Your Email Address' id='email' value={email} onChange={(e: { target: { value: SetStateAction<string>; } }) => setEmail(e.target.value)} required />
                        <div className="flex justify-between items-center my-4">
                            <div onClick={() => updateVote(1, "sub")} className={`${votes === 10 ? "text-lightGray cursor-not-allowed " : "text-green-600 cursor-pointer"} bg-darkWhite p-4 rounded-md`}>
                                <MinusSquare className={` hover:text-cyanGreen duration-300 text-4xl md:text-5xl xl:text-6xl`} />
                            </div>
                            <div>
                                <p className="font-semibold text-base md:text-lg xl:text-xl">{votes} Votes</p>
                                <p className="font-medium">₦{amount}.00</p>
                            </div>
                            <div onClick={() => updateVote(1, "add")} className="bg-darkWhite p-4 rounded-md cursor-pointer">
                                <AddSquare className={`text-green-600 text-4xl md:text-5xl xl:text-6xl hover:text-cyanGreen duration-300 `} />
                            </div>
                        </div>
                        <p className="text-gray-800 text-sm md:text-base xl:text-lg">
                            Votes are affected automatically and immediately. But if a vote is not effected immediately, then wait for 20 minutes, and it will be effected. And if you face issues, feel free to contact our instant support or Email <span className="font-semibold">support@goldnueltealents.com</span> - if you need support or have questions.
                        </p>
                        <div className="flex items-center gap-x-5 mt-6">
                            <button onClick={toggleOpen} className="px-6 py-2.5 border border-primaryPurple hover:border-purple-700 rounded-md text-primaryPurple transition-all">
                                Close
                            </button>
                            {isValidEmail(email) && (<VoteButton email={email} amount={amount} userId={userId} votes={votes} customUserId={customUserId} isOpen={true} />)}

                        </div>
                    </div>
                </div>
            }
            <main>
                <button onClick={toggleOpen} className="bg-primaryPurple hover:bg-softPurple px-7 py-4 rounded-[4px] font-medium text-[#F9F7FD] hover:text-darkBlack text-sm md:text-base xl:text-lg duration-300">Vote Now (₦50 per vote)</button>
            </main>
        </>
    );
}

export default VotePage;