export function isCreatedAtMoreThan24HoursAgo(createdAtString: Date) {

    const createdAt = new Date(createdAtString);
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - createdAt.getTime();
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
    return differenceInMilliseconds > twentyFourHoursInMilliseconds;
}

export function formatDate(dateString: string | Date) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const timeDifference = now.getTime() - pastDate.getTime();

    const seconds = Math.floor(Math.abs(timeDifference) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Handle future dates
    if (timeDifference < 0) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(pastDate);
    }

    if (weeks >= 2) {
        return pastDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } else if (weeks >= 1) {
        return "A week ago";
    } else if (days >= 2) {
        return `${days} Days ago`;
    } else if (days >= 1) {
        return "A day ago";
    } else if (hours >= 1) {
        return `${hours} Hours ago`;
    } else if (minutes >= 1) {
        return `${minutes} minutes ago`;
    } else {
        return "Just now";
    }
}
