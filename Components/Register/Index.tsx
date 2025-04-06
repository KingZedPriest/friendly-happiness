"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

//Components
import Button from '../ui/Button';

//Actions
import checkCompetition from '@/actions/server/checkCompetition';

const Index = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    //Functions
    const updatePage = async (newPage: number) => {
        
        toast.loading("Checking competition availability", { id: "available" })
        const { success } = await checkCompetition();
        toast.dismiss("available")
        if (!success) {
            toast.error("Sorry, but contestant registration is now closed.");
            return
        }
        toast.success("Competition is still active")
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        // Push the new URL with updated query parameters
        router.push(`?${params.toString()}`);
    };

    return (
        <main>
            <div className='text-center'>
                <p className='font-urbanist font-light text-lg sm:text-xl md:text-2xl xl:text-3xl'>Welcome to</p>
                <p className='mt-1 font-oleo text-primaryPurple text-xl sm:text-2xl md:text-3xl xl:text-4xl'>The Extraordinaire Talented.</p>
            </div>
            <p className='mt-8 font-bold text-sm md:text-base xl:text-lg'>Modalities of the contest</p>
            <ul className='flex flex-col gap-y-5 mt-8 list-disc list-inside'>
                <li>This contest is fully sponsored and organized by The Extraordinaire Talented. A platform created to give visibility and appreciate extraordinary young talents and set them for global recognition.</li>
                <li>This is an Online Talent Contest, with its modus operandi similar to talent contest like Big Brother Naija (BBN), America Got Talent show and others alike.</li>
                <li>Registration to participate in The Extraordinaire Talented contest is N1000 only.</li>
                <li>Like in every contests, The Extraordinaire Talented contest prize for its winners are:</li>
                <div>
                    <li>- <span className='font-bold'>Champion:</span> N500,000 cash prize  + iPhone 12</li>
                    <li>- <span className='font-bold'>1st runner up:</span> N100,000 cash prize </li>
                    <li>- <span className='font-bold'>2nd runner up:</span> N50,000 cash prize</li>
                    <li className='mt-6'>Winners of The Extraordinaire Talented contest are selected by simply majority voting system</li>
                    <li className="mt-6">The voting system entails a transparent form of anyone visiting a contestant voting link and then voting for them. 1 vote is N50 (Fifty Naira only). And anyone can vote for a contestant as many times as possible.</li>
                    <li className='mt-6'>Payment made as vote on any Contestant (while in contest and afterwards) would NOT BE REFUNDED.</li>
                    <li className="mt-6">In the policy of enjoining transparency, Live updates on scores of each contestant are made public and available on the Contest&apos;s website via (website link) coupled with a personalized mails and text messages forwarded to each contestant daily.</li>
                    <li className="mt-6">Participation in The Extraordinaire Talented contest is completely voluntary and contestant can discontinue at anytime, with the caveat of votes counted, being lost and not refundable.</li>
                    <li className='mt-6'>Our contest constitutes a COMPETITION and not an INVESTMENT opportunity. We strongly discourage taking extreme measures for the purpose of participation or winning the contest. Participants assumes all risks</li>
                    <li className="mt-6">The organizers of The Extraordinaire Talented contest acts in good faith and in accordance with the Laws of the Federal Republic of Nigeria.</li>
                </div>
            </ul>
            <Button type='button' text='I agree, Let&apos;s go' onClick={() => updatePage(2)} loading={false} />
        </main>
    );
}

export default Index;