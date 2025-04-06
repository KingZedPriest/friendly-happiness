"use client";

import { useState } from "react";

//Components
import { Badge } from "../ui/badge";
import Drawer from "../ui/Drawer";
import ViewEntriesTable from "./ViewEntriesTable";


const ViewEntries = ({ entries, competitionName }: { entries: EntriesData[], competitionName: string }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Toggle Drawer
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <main>
            {isOpen && (
                <Drawer isOpen={isOpen} onClose={toggleOpen}>
                    <ViewEntriesTable entries={entries} competitionName={competitionName} />
                </Drawer>
            )}
            <Badge variant="outline" className="cursor-pointer" onClick={toggleOpen}>
                View Entries
            </Badge>
        </main>
    );
}

export default ViewEntries;