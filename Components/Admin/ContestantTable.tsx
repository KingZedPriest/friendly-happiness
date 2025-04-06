"use client";

import { useState } from "react";
import { toast } from "sonner";

// Actions
import approvalUsers from "@/actions/server/approveUsers";
import deleteUser from "@/actions/server/deleteUser";

// Components
import Button from "../ui/Button";

// Icons
import { Trash } from "iconsax-react";

export default function ContestantTable({ users }: { users: Contestants[] }) {
    const [selectedUsers, setSelectedUsers] = useState<
        { email: string; customUserId: string; fullName: string; userId: string }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Select/Deselect users
    const handleSelect = (user: { email: string; customUserId: string; fullName: string; userId: string }) => {
        setSelectedUsers(prev =>
            prev.some(selected => selected.userId === user.userId)
                ? prev.filter(selected => selected.userId !== user.userId)
                : [...prev, user]
        );
    };

    // Handle deleting users
    const handleDelete = async (id: string) => {
        if (!id) {
            toast.error("No user was selected!");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        toast.message("Deleting Contestant...");
        setLoading(true);

        const { success, message } = await deleteUser(id);

        setLoading(false);

        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    // Approve selected users
    const handleApproval = async () => {
        if (selectedUsers.length === 0) {
            toast.error("No contestants selected!");
            return;
        }

        setLoading(true);
        toast.message("Approving Contestants...");

        const emails = selectedUsers.map(user => user.email);
        const customUserIds = selectedUsers.map(user => user.customUserId);
        const fullNames = selectedUsers.map(user => user.fullName);
        const userIds = selectedUsers.map(user => user.userId);

        const { success, message } = await approvalUsers(emails, customUserIds, fullNames, userIds);

        setLoading(false);

        if (success) {
            toast.success(message);
            setSelectedUsers([]);
        } else {
            toast.error(message);
        }
    };

    return (
        <main>
            <div className="overflow-x-auto">
                {users.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any contestant yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Select</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">IDs</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Full Name</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Email</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Entry Video</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Approved?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.some(selected => selected.userId === user.id)}
                                            onChange={() =>
                                                handleSelect({
                                                    email: user.email,
                                                    customUserId: user.customUserId,
                                                    fullName: user.fullName,
                                                    userId: user.id,
                                                })
                                            }
                                            disabled={user.isApproved}
                                            className="w-4 h-4 text-[#5E2CA5] cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4 uppercase">
                                        <p>{user.customUserId}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{user.fullName}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{user.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{user.danceVideo}</p>
                                    </td>
                                    <td>
                                        <p className={user.isApproved ? "text-green-600" : "text-red-600"}>
                                            {user.isApproved ? "Approved" : "Not Approved"}
                                        </p>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => handleDelete(user.id)} disabled={loading}>
                                            <Trash size={24} className="text-red-600" variant="Bold" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {selectedUsers.length > 0 && (
                <div className="mt-4">
                    <Button type="button" text="Approve Users" loading={loading} disabled={loading} onClick={handleApproval} />
                </div>
            )}
        </main>
    );
}
