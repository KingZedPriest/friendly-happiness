'use client'

import { Refresh, ArrowLeft } from "iconsax-react";
import { useRouter } from "next/navigation";

type ErrorPageProps = {
    message?: string;
    description?: string;
    showBackButton?: boolean;
}

export default function ErrorPage({ message = "Something went wrong!", description = "We couldn't load the page. Please try again.", showBackButton = false }: ErrorPageProps) {

    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 p-6 h-screen text-white text-center">
            <h1 className="font-bold text-xl md:text-2xl xl:text-3xl">{message}</h1>
            <p className="mt-2 text-gray-400">{description}</p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 shadow px-5 py-2 rounded-lg text-white">
                    <Refresh size={18} />
                    Reload Page
                </button>

                {showBackButton && (
                    <button onClick={() => router.back()} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 shadow px-5 py-2 rounded-lg text-white">
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
}
