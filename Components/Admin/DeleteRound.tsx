"use client"

import { toast } from "sonner";

//Actions
import deleteRound from "@/actions/server/deleteRound";

//Icons
import { Trash } from "iconsax-react";

const DeleteRound = ({ roundId, competitionName }: { roundId: string, competitionName: string }) => {

    const handleDelete = async (roundId: string, competitionName: string) => {

        if(!roundId || !competitionName){
            toast.error("Deletion details not found, kindly try again later!");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this round?");
        if (!confirmDelete) return;

        toast.info("Deleting Round...")

        const { success, message } = await deleteRound(roundId, competitionName)
        if (!success) {
            toast.error(message)
            return
        }
        toast.success(message)
    }

    return (
        <Trash className="size-5 md:size-6 xl:size-7 text-red-600 cursor-pointer" variant="Bold" onClick={() => handleDelete(roundId, competitionName)} />
    );
}

export default DeleteRound;