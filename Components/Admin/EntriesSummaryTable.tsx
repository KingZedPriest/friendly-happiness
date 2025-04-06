"use client";

//Utils
import { formatDate } from "@/utils/time";

export default function EntriesSummaryTable({ entries }: { entries: SummaryEntryData[] }) {

    return (
        <main>
            <div className="overflow-x-auto">
                {entries.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any entries yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">User Name</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Competition</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Round</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Vote Count</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Created When?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={entry.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>

                                    <td className="px-6 py-4 uppercase">{entry.user.fullName}</td>
                                    <td className="px-6 py-4">{entry.competition.name}</td>
                                    <td className="px-6 py-4">{entry.Round.roundName}</td>
                                    <td className="px-6 py-4">{entry.voteCount}</td>
                                    <td>{formatDate(entry.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
