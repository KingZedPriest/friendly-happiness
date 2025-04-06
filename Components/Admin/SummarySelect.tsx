"use client"

import { useState } from "react";

//Components
import CompetitionsSummaryTable from "@/Components/Admin/CompetitionsSummaryTable";
import ContestantSummaryTable from "@/Components/Admin/ContestantSummaryTable";
import EntriesSummaryTable from "@/Components/Admin/EntriesSummaryTable";
import RoundsSummaryTable from "@/Components/Admin/RoundsSummaryTable";
import VotesSummaryTable from "@/Components/Admin/VotesSummaryTable";

type SummarySelectProps = {
    users: Contestants[];
    competitions: CompetitionData[];
    rounds: SummaryRoundData[];
    entries: SummaryEntryData[];
    votes: SummaryVoteData[]
}

const SummarySelect = ({ users, competitions, rounds, entries, votes }: SummarySelectProps) => {

    const [userPage, setPage] = useState<string>("users")

    //Functions
    const togglePage = (newPage: string) => {
        setPage(newPage)
    }

    const PAGES = [{ name: "users" }, { name: "competitions" }, { name: "rounds" }, { name: "entries" }, { name: "votes" }]

    return (
        <main>
            <div className="flex flex-wrap gap-x-2">
                {PAGES.map((page) => (
                    <button key={page.name} onClick={() => togglePage(page.name)} className={`${page.name === userPage ? "bg-primaryPurple text-darkWhite" : "bg-softPurple hover:bg-primaryPurple hover:text-darkWhite"}  mb-4 px-4 md:px-6 xl:px-8 py-3 rounded-lg text-darkBlack capitalize duration-300`}>{page.name}</button>
                ))}
            </div>
            {userPage === "users" ?
                <div>
                    <h1 className="mb-4 font-semibold text-xl md:text-2xl xl:text-3xl">Users<sup className="text-xs md:text-sm xl:text-base">{users.length}</sup></h1>
                    <ContestantSummaryTable users={users} />
                </div>
                : userPage === "competitions" ?
                    <div>
                        <h1 className="mb-4 font-semibold text-xl md:text-2xl xl:text-3xl">Competitions<sup className="text-xs md:text-sm xl:text-base">{competitions.length}</sup></h1>
                        <CompetitionsSummaryTable competitions={competitions} />
                    </div>
                    : userPage === "rounds" ?
                        <div>
                            <h1 className="mb-4 font-semibold text-xl md:text-2xl xl:text-3xl">Rounds<sup className="text-xs md:text-sm xl:text-base">{rounds.length}</sup></h1>
                            <RoundsSummaryTable rounds={rounds} />
                        </div>
                        : userPage === "entries" ?
                            <div>
                                <h1 className="mb-4 font-semibold text-xl md:text-2xl xl:text-3xl">Entries<sup className="text-xs md:text-sm xl:text-base">{entries.length}</sup></h1>
                                <EntriesSummaryTable entries={entries} />
                            </div>
                            : userPage === "votes" ?
                                <div>
                                    <h1 className="mb-4 font-semibold text-xl md:text-2xl xl:text-3xl">Votes<sup className="text-xs md:text-sm xl:text-base">{votes.length}</sup></h1>
                                    <VotesSummaryTable votes={votes} />
                                </div>
                                : <div>
                                    <h1 className="mb-4 font-semibold text-xl md:text-2xl xl:text-3xl">Users<sup className="text-xs md:text-sm xl:text-base">{users.length}</sup></h1>
                                    <ContestantSummaryTable users={users} />
                                </div>
            }





        </main>
    );
}

export default SummarySelect;