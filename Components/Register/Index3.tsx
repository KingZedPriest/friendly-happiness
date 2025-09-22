"use client"
import dynamic from "next/dynamic";

//Store
import { useCompetitorFormStore } from "@/stores/useCompetitorForm";

//Component
const PayButton = dynamic(() => import("../Home/PayButton"), { ssr: false });

const Index3 = () => {

    const { data } = useCompetitorFormStore();

    return (
        <main className='bg-black p-4 md:p-6 xl:p-6 border border-gray-600 rounded-xl max-w-4xl'>
            <p className="font-urbanist font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl text-center">Secure your spot with just ₦1000</p>
            <div className="text-neutral-300 text-sm md:text-base xl:text-lg">
                <p className="my-8 max-w-[50ch]">Lock in your spot with a ₦1,000 registration fee, showcase your best moves, and compete for the top spot!</p>
                <p>Share your voting link, and let the world decide! 🌍🔥</p>
            </div>
            <div className="mt-10">
                <PayButton email={data.emailAddress} amount={1000} />
            </div>
        </main>
    );
}

export default Index3;