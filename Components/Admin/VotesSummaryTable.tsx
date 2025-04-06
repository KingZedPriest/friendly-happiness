"use client";

//Utils
import { formatDate } from "@/utils/time";

export default function VotesSummaryTable({ votes }: { votes: SummaryVoteData[] }) {

    return (
        <main>
            <div className="overflow-x-auto">
                {votes.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any votes yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Contestant Name</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Contestant ID</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Amount Paid</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Votes Given</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Transaction ID</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Done When?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {votes.map((vote, index) => (
                                <tr key={vote.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>

                                    <td className="px-6 py-4 uppercase">{vote.entry.user.fullName}</td>
                                    <td className="px-6 py-4">{vote.entry.user.customUserId}</td>
                                    <td className="px-6 py-4">{vote.amountPaid}</td>
                                    <td className="px-6 py-4">{vote.votesGiven}</td>
                                    <td className="px-6 py-4">{vote.transactionId}</td>
                                    <td>{formatDate(vote.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
