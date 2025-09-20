"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

//Utils
import { makeApiRequest } from "@/lib/apiUtils";

//Components
import Input from "../ui/Input";
import Button from "../ui/Button";

const initialState: CompetitionFormData = {
    name: "",
    startDate: "",
    endDate: "",
}

const CompetitionForm = () => {

    //States
    const router = useRouter();
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    //Functions
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const cleanedValue = typeof value === 'string' ? value.trimEnd() : value;
        setState(prev => ({ ...prev, [name]: cleanedValue }));
    }; 
    const resetForm = () => setState(initialState);
    const toggleLoading = () => setLoading((prev) => !prev);

    //OnSubmit Function
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        toggleLoading();

        await makeApiRequest("/competition", "post", state, {
            onSuccess: () => {
                toggleLoading();
                toast.success("Competition was created successfully");
                router.push(`/admin/competition`);
            },
            onError: (response) => {
                toast.error(response.response.data.log);
                toggleLoading();
                resetForm();
            },
        });

    }


    return (
        <main className="mx-auto p-2 md:p-4 xl:p-6 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] 2xl:w-[70%] xl:w-[75%]">
            <form onSubmit={onSubmit} className="flex flex-col gap-y-5">
                <Input value={state.name} type="text" id="name" name="name" placeholder="Enter competition name" label="Competition Name" onChange={handleChange} required />
                <Input value={state.startDate} type="datetime-local" name="startDate" id="startDate" label="Competition Start Date" onChange={handleChange} required />
                <Input value={state.endDate} type="datetime-local" name="endDate" id="endDate" label="Competition End Date" onChange={handleChange} required />
                <div className="mt-6">
                    <Button type="submit" text="Create" loading={loading} />
                </div>
            </form>
        </main>
    );
}

export default CompetitionForm;