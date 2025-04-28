"use client"

//Store
import { useCompetitorFormStore } from "@/stores/useCompetitorForm";

//Component
import PayButton from "../Home/PayButton";

const Index3 = () => {

    const { data } = useCompetitorFormStore();

    return (
        <main>
            <p className="font-urbanist font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl text-center">Secure your spot with just ₦1000</p>
            <div className="text-textGrey text-sm md:text-base xl:text-lg">
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