'use client'

//Utils
import { formatDate } from '@/utils/time';


export default function VoteTable({ votes }: { votes: VoteTableData[]}) {

    return (
        <main>
            <div className="overflow-x-auto">
                <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                    <thead className="bg-gray-700 rounded-md">
                        <tr>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">IDs</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Full Name</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Vote Count</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">When?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map((vote, index) => (
                            <tr key={vote.customUserId} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>
                                <td className="px-6 py-4">
                                    <p>{vote.customUserId}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{vote.fullName}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{vote.voteCount}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{formatDate(vote.createdAt)}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}