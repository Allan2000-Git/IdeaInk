export const formatDate = (timestamp: number): string => {
    const currentDate: Date = new Date();
    const createdAtDate: Date = new Date(timestamp);
    const timeDifferenceMs: number = currentDate.getTime() - createdAtDate.getTime();

    if (timeDifferenceMs < 60 * 1000) {
        return 'Just now';
    } else if (timeDifferenceMs < 60 * 60 * 1000) {
      const timeDifferenceMins: number = Math.floor(timeDifferenceMs / (1000 * 60));
        return `${timeDifferenceMins} ${timeDifferenceMins === 1 ? "min" : "mins"} ago`;
    } else if (timeDifferenceMs < 24 * 60 * 60 * 1000) {
      const timeDifferenceHours: number = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        return `${timeDifferenceHours} hours ago`;
    } else {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return createdAtDate.toLocaleDateString('en-US', options);
    }
};