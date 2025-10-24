export const getTimeDifference = (createdAt) => {
    if (!createdAt) return "No date";

    const diffInMs = new Date() - new Date(createdAt);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const diffInMinutes = Math.floor((diffInMs / (1000 * 60)) % 60);

    if (diffInDays > 0) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
    } else {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
    }
};