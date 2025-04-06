'use client'

import { ChartCircle } from "iconsax-react";


export default function LoadingPage() {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 p-6 h-screen text-white text-center">
            <ChartCircle size={40} color="#4F46E5" className="mb-4 animate-spin" />
            <p className="font-semibold text-lg">Loading, please wait...</p>
        </div>
    );
}
