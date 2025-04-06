"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

// Utils
import { makeApiRequest } from "@/lib/apiUtils";
import { processAndSortEntries } from "@/utils/sort";

// Components
import { Badge } from "../ui/badge";
import Drawer from "../ui/Drawer";
import EntriesTable from "./EntriesTable";
import ErrorPage from "./LoadingError";

const AddEntries = ({ entries, roundId, competitionName, competitionId }: { entries: EntriesData[], roundId: string, competitionName: string, competitionId: string }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [availableEntries, setAvailableEntries] = useState<EntriesData[]>();

    // Toggle Drawer
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {

        if (!isOpen) return;

        setLoading(true);
        setIsError(false);

        makeApiRequest(`/getRound?id=${roundId}`, "get", "", {
            onSuccess: (response) => {
                const sortedResult = processAndSortEntries(entries, response.data.data.entries);
                setAvailableEntries(sortedResult);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setIsError(true);
                toast.error("Error fetching classes, Please Try Again.");
            },
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, roundId]);

    return (
        <main>
            {isOpen && (
                <Drawer isOpen={isOpen} onClose={toggleOpen}>
                    {loading ? (
                        <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                            <p className="text-base md:text-lg xl:text-2xl animate-pulse">Loading...</p>
                        </main>
                    ) : isError ? (
                        <ErrorPage />
                    ) : availableEntries?.length === 0 ?
                        <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                            <p className="text-base md:text-lg xl:text-2xl">No available contestants to add.</p>
                        </main>
                        : (
                            <EntriesTable entries={availableEntries!} roundId={roundId} competitionName={competitionName} competitionId={competitionId} />
                        )}
                </Drawer>
            )}
            <Badge variant="outline" className="cursor-pointer" onClick={toggleOpen}>
                Add Entries
            </Badge>
        </main>
    );
};

export default AddEntries;
