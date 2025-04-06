'use client'

import { useState } from 'react';
import { toast } from 'sonner';

// Actions
import createNewEntries from '@/actions/server/addEntries';

// Components
import Button from '../ui/Button';

export default function EntriesTable({ entries, roundId, competitionName, competitionId }: { entries: EntriesData[], roundId: string, competitionName: string, competitionId: string }) {

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Select/Deselect users
    const handleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Add selected users to the round
    const handleAddition = async () => {

        if (selectedIds.length === 0) {
            toast.error("No contestants selected!");
            return;
        }

        toast.message("Adding Contestant(s)...")
        setLoading(true);

        const { success, message } = await createNewEntries(selectedIds, competitionId, roundId, competitionName);

        setLoading(false);

        if (success) {
            toast.success(message);
            setSelectedIds([]);
        } else {
            toast.error(message);
        }
    };

    return (
        <main>
            <div className="overflow-x-auto">
                <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                    <thead className="bg-gray-700 rounded-md">
                        <tr>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Select</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">IDs</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Full Name</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Vote Count</th>
                            <th className="px-6 py-3 font-medium text-xs text-left uppercase">Entry Video</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries && entries.length > 0 && entries.map((entry, index) => (
                            <tr key={entry.userId} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(entry.userId)}
                                        onChange={() => handleSelect(entry.userId)}
                                        className="w-4 h-4 text-primaryPurple cursor-pointer"
                                    />
                                </td>
                                <td className="px-6 py-4 uppercase">
                                    <p>{entry.user.customUserId}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{entry.user.fullName}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{entry.voteCount}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{entry.user.danceVideo}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedIds.length > 0 && (
                <div className='mt-4'>
                    <Button type="button" text="Add Users to Round" loading={loading} disabled={loading} onClick={handleAddition} />
                </div>
            )}
        </main>
    );
}
