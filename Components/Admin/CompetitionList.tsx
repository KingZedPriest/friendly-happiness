"use client"

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

//Utils and Actions
import { formatDate } from "@/utils/time";
import editCompetition from "@/actions/server/editCompetition";

//Components
import Drawer from "../ui/Drawer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Checkbox from "./Checkbox";

//Icons
import { Calendar, Clock, PlayCircle, Edit2 } from "iconsax-react";

type FormData = Omit<CompetitionData, 'createdAt'>;
const initialState: FormData = {
    id: "",
    name: "",
    startDate: new Date,
    endDate: new Date,
    isOnGoing: false,
    isAcceptingContestants: false,
}

const CompetitionList = ({ competitions }: { competitions: CompetitionData[] }) => {

    //Form States
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //Functions
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
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

    const handleEditClick = (competition: CompetitionData) => {

        setState({
            id: competition.id,
            name: competition.name,
            startDate: competition.startDate,
            endDate: competition.endDate,
            isOnGoing: competition.isOnGoing,
            isAcceptingContestants: competition.isAcceptingContestants
        });
        toggleOpen();
    };

    const handleCompetitionEdit = async (competition: FormData) => {

        if (!competition) {
            toast.error("No competition details found, kindly try again later!");
            return;
        }

        toggleLoading();
        const { success, message } = await editCompetition(competition);
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
        <>
            {isOpen &&
                <Drawer isOpen={isOpen} onClose={toggleOpen}>
                    <div className="flex flex-col gap-y-5">
                        <Input value={state.name} type="text" id="name" name="name" placeholder="Enter competition name" label="Competition Name" onChange={handleChange} required otherClass="capitalize" />
                        <Input type="datetime-local" name="startDate" id="startDate" label="Competition Start Date" onChange={handleChange} required />
                        <Input type="datetime-local" name="endDate" id="endDate" label="Competition End Date" onChange={handleChange} required />
                        <Checkbox name={"isOnGoing"} label="Is currently ongoing" checked={state.isOnGoing!} onChange={handleChange} />
                        <Checkbox name={"isAcceptingContestants"} label="Is accepting contestants" checked={state.isAcceptingContestants!} onChange={handleChange} />
                        <div className="mt-6">
                            <Button type="button" text={`Edit ${state.name}`} loading={loading} onClick={() => handleCompetitionEdit(state)} />
                        </div>
                    </div>
                </Drawer>
            }
            <ul className="bg-gray-900 p-4 rounded-lg divide-y divide-gray-700 text-white">
                {competitions.map((competition) => (
                    <li key={competition.id} className="mb-4 sm:p-3 md:p-4 xl:p-5">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg md:text-xl xl:text-2xl capitalize">{competition.name}</h3>
                            <div className="flex gap-x-2">
                                <Link href={`/admin/competition/${competition.name}`} className="flex items-center gap-2 bg-primaryPurple hover:bg-softPurple p-2 rounded-md">
                                    <PlayCircle size={16} /> View
                                </Link>
                                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 p-2 rounded-md" onClick={() => handleEditClick(competition)}>
                                    <Edit2 size={16} /> Edit
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="flex items-center gap-1 text-gray-400">
                                <Calendar size={24} /> Start Date: <span className="font-semibold text-darkWhite">{formatDate(competition.startDate)}</span>
                            </p>
                            <p className="flex items-center gap-1 mt-2 text-gray-400">
                                <Clock size={24} /> End Date: <span className="font-semibold text-darkWhite">{formatDate(competition.endDate)}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CompetitionList;
