const ErrorText = ({ message }: { message: string }) => {
    return (
        <p className="mx-auto mt-1 max-w-[50ch] text-red-400 dark:text-red-400 text-xs lg:text-sm text-center">{message}</p>
    );
}

export default ErrorText;