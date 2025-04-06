"use client";

//Utils
import { formatDate } from "@/utils/time";

export default function RoundsSummaryTable({ rounds }: { rounds: SummaryRoundData[] }) {

    return (
        <main>
            <div className="overflow-x-auto">
                {rounds.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any rounds yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Round Name</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Competition</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Start Date</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">End Date</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Total Votes</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Accepting Vote?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Created When?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rounds.map((round, index) => (
                                <tr key={round.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>

                                    <td className="px-6 py-4 uppercase">{round.roundName}</td>
                                    <td className="px-6 py-4">{round.competition.name}</td>
                                    <td className="px-6 py-4">{formatDate(round.votingStart)}</td>
                                    <td className="px-6 py-4">{formatDate(round.votingEnd)}</td>
                                    <td className="px-6 py-4">{round.totalVotes}</td>
                                    <td>
                                        <p className={round.acceptingVote ? "text-green-600" : "text-red-600"}>
                                            {round.acceptingVote ? "Yes" : "No"}
                                        </p>
                                    </td>
                                    <td>{formatDate(round.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
