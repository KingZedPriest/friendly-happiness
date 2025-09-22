"use client"

import { useSearchParams, useRouter } from 'next/navigation';

//Components
import Button from "../ui/Button";

const Index1 = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    //Functions
    const updatePage = (newPage: number) => {

        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        // Push the new URL with updated query parameters
        router.push(`?${params.toString()}`);
    };

    return (
        <main className='bg-black p-4 md:p-6 xl:p-6 border border-gray-600 rounded-xl'>
            <div className="text-center">
                <p className="font-urbanist font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl">Show Your Moves & Take the Spotlight!</p>
                <p className="mx-auto mt-4 max-w-[50ch]">This is your chance to showcase your talent, compete with the best, and get votes to win exciting rewards.</p>
            </div>
            <p className="mt-8 font-urbanist font-semibold text-base sm:text-lg md:text-xl xl:text-2xl">How it works</p>
            <div className="flex flex-col gap-y-3 mt-6">
                <p>✅ Fill out the form below with your details.</p>
                <p>✅ Upload your best dance video.</p>
                <p>✅ Get your personal voting link and share it with friends & fans!</p>
                <p>✅ The contestant with the highest votes wins!</p>
            </div>
            <div className="mt-20">
                <Button type='button' text='Ready to Own the Stage? Let&apos;s get started!' onClick={() => updatePage(3)} loading={false} />
            </div>
        </main>
    );
}

export default Index1;