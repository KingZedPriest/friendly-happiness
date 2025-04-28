"use client";

//Utils
import { formatDate } from "@/utils/time";

export default function ContestantSummaryTable({ users }: { users: Contestants[] }) {
   
    return (
        <main>
            <div className="overflow-x-auto">
                {users.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any contestants yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">IDs</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Full Name</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Email</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Phone Number</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Entry Video</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Approved?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Has Paid?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">TransactionID</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">How Long?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Profile Picture</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Dance Type</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Created When?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>
                                    
                                    <td className="px-6 py-4 uppercase">{user.customUserId}</td>
                                    <td className="px-6 py-4">{user.fullName}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.phoneNumber}</td>
                                    <td className="px-6 py-4">{user.danceVideo}</td>
                                    <td>
                                        <p className={user.isApproved ? "text-green-600" : "text-red-600"}>
                                            {user.isApproved ? "Approved" : "Not Approved"}
                                        </p>
                                    </td>
                                    <td className="text-center">
                                        <p className={user.hasPaid ? "text-green-600" : "text-red-600"}>
                                            {user.hasPaid ? "Paid" : "Not Paid"}
                                        </p>
                                    </td>
                                    <td className="text-center">{user.transactionId ? user.transactionId : "Null"}</td>
                                    <td className="text-center">{user.howLong}</td>
                                    <td>{user.profilePhoto}</td>
                                    <td className="text-center">{user.danceType}</td>
                                    <td>{formatDate(user.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
