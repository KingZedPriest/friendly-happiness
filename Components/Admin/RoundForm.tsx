"use client"

import { useState } from "react";
import { toast } from "sonner";

//Actions
import createNewRound from "@/actions/server/newRound";

//Components
import { Badge } from "../ui/badge";
import Drawer from "../ui/Drawer";
import Input from "../ui/Input";
import Checkbox from "./Checkbox";
import Button from "../ui/Button";


const initialState: RoundFormData = {
    roundName: "",
    votingStart: "",
    votingEnd: "",
    acceptingVote: false,
}


const RoundForm = ({ competitionId }: { competitionId: string }) => {

    //Form States
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //Functions
    const toggleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    //Form Functions
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value, type } = event.target;
        const isChecked = event.target instanceof HTMLInputElement && event.target.type === "checkbox" ? event.target.checked : undefined;
        setState((prevState) => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                [name]: type === "checkbox" ? isChecked : value,
            };
        });
    }

    const resetForm = () => setState(initialState);
    const toggleLoading = () => setLoading((prev) => !prev);

    const newRound = async (newRound: RoundFormData) => {

        if (!newRound) {
            toast.error("No round details found, kindly try again!");
            return;
        }
        
        toggleLoading();
        const { success, message } = await createNewRound(competitionId, newRound.roundName, newRound.votingStart, newRound.votingEnd, newRound.acceptingVote);
        if (!success) {
            resetForm();
            toggleLoading();
            toast.error(message);
            return
        }
        resetForm();
        toggleLoading();
        toast.success(message)
    }

    return (
        <main>
            {isOpen &&
                <Drawer isOpen={isOpen} onClose={toggleOpen}>
                    <div className="flex flex-col gap-y-5">
                        <Input value={state.roundName} type="text" id="roundName" name="roundName" placeholder="Enter round name" label="Round Name" onChange={handleChange} required otherClass="capitalize" />
                        <Input value={state.votingStart} type="datetime-local" name="votingStart" id="votingStart" label="Voting Start Date" onChange={handleChange} required />
                        <Input value={state.votingEnd} type="datetime-local" name="votingEnd" id="votingEnd" label="Voting End Date" onChange={handleChange} required />
                        <Checkbox label="Accepting Vote?" checked={state.acceptingVote} name="acceptingVote" onChange={handleChange} />
                        <div className="mt-6">
                            <Button type="button" text={`Create New Round`} loading={loading} onClick={() => newRound(state)} />
                        </div>
                    </div>
                </Drawer>
            }
            <Badge variant="outline" className="cursor-pointer" onClick={() => toggleOpen()}>
                Add Round
            </Badge>
        </main>
    );
}

export default RoundForm;