export function processAndSortEntries(entries: EntriesData[], excludedUserIds: { userId: string }[]) {

    // 1. Create a Set of excluded user IDs for efficient lookup
    const excludedSet = new Set(excludedUserIds.map(item => item.userId));

    // 2. Filter out entries with excluded user IDs and remove duplicates
    const uniqueAndFilteredEntries = [];
    const seenUserIds = new Set();

    for (const entry of entries) {
        if (!excludedSet.has(entry.userId) && !seenUserIds.has(entry.userId)) {
            uniqueAndFilteredEntries.push(entry);
            seenUserIds.add(entry.userId);
        }
    }

    // 3. Sort the remaining unique entries
    uniqueAndFilteredEntries.sort((a, b) => {
        // Primary sort: by voteCount (descending)
        if (b.voteCount !== a.voteCount) {
            return b.voteCount - a.voteCount;
        }

        // Secondary sort: by user.fullName (ascending) if voteCount is 0
        if (a.voteCount === 0 && b.voteCount === 0) {
            const nameA = a.user.fullName.toUpperCase();
            const nameB = b.user.fullName.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        }

        return 0;
    });

    return uniqueAndFilteredEntries;
}