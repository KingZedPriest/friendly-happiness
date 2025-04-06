// Prevent the Enter key from submitting the form
export const disableEnterKey = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
};