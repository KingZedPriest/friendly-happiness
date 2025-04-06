"use client"

import { useState } from "react";
import { toast } from "sonner";

//Actions
import editRound from "@/actions/server/editRound";

//Components
import { Badge } from "../ui/badge";
import Drawer from "../ui/Drawer";
import Input from "../ui/Input";
import Checkbox from "./Checkbox";
import Button from "../ui/Button";

const EditRound = ({ round, competitionName }: { round: RoundData, competitionName: string }) => {

    //Form States
    const [state, setState] = useState<RoundData>(round);
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

    const toggleLoading = () => setLoading((prev) => !prev);

    const handleEditRound = async (data: RoundData, competitionName: string) => {
        toggleLoading();
        const { success, message } = await editRound({ data, competitionName });
        if (!success) {
            toggleLoading();
            toast.error(message);
            return
        }
        toggleLoading();
        toggleOpen();
        toast.success(message)
    }


    return (
        <main>
            {isOpen &&
                <Drawer isOpen={isOpen} onClose={toggleOpen}>
                    <div className="flex flex-col gap-y-5">
                        <Input value={state.roundName} type="text" id="roundName" name="roundName" placeholder="Enter round name" label="Round Name" onChange={handleChange} required otherClass="capitalize" />
                        <Input type="datetime-local" name="votingStart" id="votingStart" label="Voting Start Date" onChange={handleChange} required />
                        <Input type="datetime-local" name="votingEnd" id="votingEnd" label="Voting End Date" onChange={handleChange} required />
                        <Checkbox label="Accepting Vote?" checked={state.acceptingVote} onChange={handleChange} name="acceptingVote" />
                        <div className="mt-6">
                            <Button type="button" text={`Edit ${round.roundName}`} loading={loading} onClick={() => handleEditRound(state, competitionName)} />
                        </div>
                    </div>
                </Drawer>
            }
            <Badge variant="outline" className="cursor-pointer" onClick={toggleOpen}>
                Edit Round
            </Badge>
        </main>
    );
}

export default EditRound;