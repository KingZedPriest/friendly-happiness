"use client"

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

//Actions
import deleteCompetition from "@/actions/server/deleteCompetion";

//Icons
import { Refresh, Trash } from "iconsax-react";


const DeleteCompetition = ({ competitionId }: { competitionId: string }) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    //Functions
    const toggleLoading = () => setLoading((prev) => !prev);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this competition? This will also delete the rounds, entries and votes.");
        if (!confirmDelete) return;

        toggleLoading();
        toast.message("Deleting Competition...");
        const { success, message } = await deleteCompetition(competitionId);
        if (!success) {
            toast.error(message);
            toggleLoading();
            return;
        }
        toast.success(message);
        router.push("/admin/competition")
    }

    return (
        <main>
            {loading ? <Refresh className="text-blue-600 cursor-not-allowed" />
                : <Trash variant="Bold" className="text-red-400 hover:text-red-600 duration-300 cursor-pointer" onClick={handleDelete} />
            }

        </main>
    );
}

export default DeleteCompetition;