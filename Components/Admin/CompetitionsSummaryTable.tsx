"use client";

//Utils
import { formatDate } from "@/utils/time";

export default function CompetitionsSummaryTable({ competitions }: { competitions: CompetitionData[] }) {

    return (
        <main>
            <div className="overflow-x-auto">
                {competitions.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any competitions yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Name</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Start Date</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">End Date</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Is Ongoing?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Created When?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitions.map((competition, index) => (
                                <tr key={competition.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>

                                    <td className="px-6 py-4 uppercase">{competition.name}</td>
                                    <td className="px-6 py-4">{formatDate(competition.startDate)}</td>
                                    <td className="px-6 py-4">{formatDate(competition.endDate)}</td>
                                    <td>
                                        <p className={competition.isOnGoing ? "text-green-600" : "text-red-600"}>
                                            {competition.isOnGoing ? "Yes" : "No"}
                                        </p>
                                    </td>
                                    <td>{formatDate(competition.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
