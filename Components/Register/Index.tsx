"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

//Actions
import checkCompetition from '@/actions/server/checkCompetition';

//Components
import Button from '../ui/Button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

//Icons
import { Award, Cup, MedalStar } from 'iconsax-react';

const Index = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const RULES = ["This contest is fully sponsored and organized by The Extraordinaire Talented. A platform created to give visibility and appreciate extraordinary young talents and set them for global recognition.", "This is an Online Talent Contest, with its modus operandi similar to talent contest like Big Brother Naija (BBN), America Got Talent show and others alike.", "Registration to participate in The Extraordinaire Talented contest is N1000 only.", "Champion: N500,000 cash prize  + iPhone 12", "1st runner up: N100,000 cash prize", "2nd runner up: N50,000 cash prize", "Winners of The Extraordinaire Talented contest are selected by simply majority voting system", "The voting system entails a transparent form of anyone visiting a contestant voting link and then voting for them. 1 vote is N50 (Fifty Naira only). And anyone can vote for a contestant as many times as possible.", "Payment made as vote on any Contestant (while in contest and afterwards) would NOT BE REFUNDED.", "In the policy of enjoining transparency, Live updates on scores of each contestant are made public and available on the Contest&apos;s website via (website link) coupled with a personalized mails and text messages forwarded to each contestant daily.", "Participation in The Extraordinaire Talented contest is completely voluntary and contestant can discontinue at anytime, with the caveat of votes counted, being lost and not refundable.", "Our contest constitutes a COMPETITION and not an INVESTMENT opportunity. We strongly discourage taking extreme measures for the purpose of participation or winning the contest. Participants assumes all risks", "The organizers of The Extraordinaire Talented contest acts in good faith and in accordance with the Laws of the Federal Republic of Nigeria."]

    //Functions
    const updatePage = async (newPage: number) => {

        toast.message("Checking competition availability")
        const { success } = await checkCompetition();
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
        <main className='mx-auto max-w-4xl'>
            <p className='mt-4 font-oleo text-white-100 text-xl sm:text-2xl md:text-3xl xl:text-4xl text-center'>The <span className='text-primaryPurple'>Extraordinaire</span> Talented.</p>
            <p className='text-[11px] md:text-xs xl:text-sm text-center'>Join Nigeria&apos;s premier online talent competition and showcase your extraordinary abilities to the world</p>
            <section className='gap-5 grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 mt-10'>
                <Card className="bg-white border-primaryPurple/50 text-black text-center">
                    <CardContent className="pt-6">
                        <Cup variant='Bold' className="mx-auto mb-2 size-8 text-primaryPurple" />
                        <h3 className="font-semibold text-base md:text-lg">Champion</h3>
                        <p className="font-bold text-primaryPurple text-xl md:text-2xl">₦500,000</p>
                        <p className="font-urbanist font-semibold text-black">+ iPhone 12</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-primaryPurple/50 text-black text-center">
                    <CardContent className="pt-6">
                        <MedalStar variant='Bold' className="mx-auto mb-2 size-8 text-primaryPurple" />
                        <h3 className="font-semibold text-base md:text-lg">1st Runner Up</h3>
                        <p className="font-bold text-primaryPurple text-xl md:text-2xl">₦100,000</p>
                        <p className="font-urbanist font-semibold text-black">Cash Prize</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-primaryPurple/50 text-black text-center">
                    <CardContent className="pt-6">
                        <Award variant='Bold' className="mx-auto mb-2 size-8 text-primaryPurple" />
                        <h3 className="font-semibold text-base md:text-lg">2nd Runner Up</h3>
                        <p className="font-bold text-primaryPurple text-xl md:text-2xl">₦50,000</p>
                        <p className="font-urbanist font-semibold text-black">Cash Prize</p>
                    </CardContent>
                </Card>
            </section>
            <section className='mt-10'>
                <Card className='bg-white border-primaryPurple/50 text-black'>
                    <CardTitle className="mt-2 p-4 font-urbanist text-lg md:text-xl xl:text-2xl tracking-[1px]">Modalities of the Contest</CardTitle>
                    <CardContent>
                        <div className='flex flex-col gap-y-3'>
                            {RULES.map((rule, index) => (
                                <>
                                    <div className="flex items-start gap-2">
                                        <Badge variant="outline" className="bg-inherit mt-0.5 text-black">
                                            {index + 1}
                                        </Badge>
                                        <p>{rule}</p>
                                    </div>
                                </>
                            ))}
                        </div>
                        <Button type='button' text='I agree, Let&apos;s go' onClick={() => updatePage(2)} loading={false} classNames='mt-6' />
                        <p className="mt-4 text-[11px] text-red-600 md:text-xs xl:text-sm text-center">
                            By clicking register, you agree to pay the registration fee and participate in the competition.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}

export default Index;