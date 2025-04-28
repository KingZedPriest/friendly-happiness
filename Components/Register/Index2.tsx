"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

//Components, Utils, Actions, Stores
import { Form, Form1, Form2, Form3, Form4, Form5, Form6 } from './Form';
import { checkCompetitorFormGroup } from '@/utils/checkForm';
import checkEmail from '@/actions/server/checkEmail';
import { useCompetitorFormStore } from '@/stores/useCompetitorForm';

//Icons
import { ArrowRight2, ArrowLeft2 } from "iconsax-react";

const Index2 = () => {

    const { data, updateField } = useCompetitorFormStore()
    const router = useRouter();
    const searchParams = useSearchParams();
    const form = parseInt(searchParams.get('form') ?? "1");

    //Functions
    const updateFormNumber = async (newPage: number) => {

        if (form === 1) {
            toast.message("Verifying email...");
            const email = data.emailAddress?.trim();
            if (!email) {
                toast.error("Kindly enter an email address");
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error("Please enter a valid email address.");
                return;
            }
            const { success, message, hasPaid } = await checkEmail(email)
            if (success && hasPaid) {
                updateField("emailAddress", "");
                toast.warning(message);
                return;
            } else if (success && !hasPaid) {
                toast.info(message);
                const params = new URLSearchParams(searchParams);
                params.set('form', "7");
                params.set('page', "4");
                router.push(`?${params.toString()}`);
                return;
            }
            toast.success("Your email was verified successfully.");
        }


        if (checkCompetitorFormGroup(form)) {
            const params = new URLSearchParams(searchParams);
            params.set('form', newPage.toString());
            router.push(`?${params.toString()}`);
        } else {
            toast.warning("Kindly fill all the needed details.")
        }

    };

    //Form length
    const formLength: number = 7;


    return (
        <main>
            <div className="text-center">
                <p className="font-urbanist font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl">Join the Dance Challenge</p>
                <p className='mx-auto mt-2 max-w-[45ch]'>Fill out the form below to submit your entry. The more votes you get, the closer you are to winning!</p>
            </div>
            <div className='flex gap-x-1 mt-8'>
                {Array.from({ length: formLength }, (_, index) => index).map((index) => (
                    <div key={`progress-${index}`} className={`${index === 0 && "rounded-l-2xl"} ${index === formLength - 1 && "rounded-r-2xl"} ${index < form ? "bg-primaryGreen" : "bg-[#FAFDF7]"} w-16 h-2.5`} />
                ))}
            </div>
            <div className='mt-8'>
                {form === 1 ? <Form />
                    : form === 2 ? <Form1 />
                        : form === 3 ? <Form2 />
                            : form === 4 ? <Form3 />
                                : form === 5 ? <Form4 />
                                    : form === 6 ? <Form5 />
                                        : form === 7 ? <Form6 />
                                            : <Form />}
            </div>
            <div className={`${form === 7 ? "hidden" : "flex justify-end items-center gap-x-5 mt-20"}`}>
                <button onClick={() => updateFormNumber(form - 1)} disabled={form === 1} className={`${form === 1 ? "bg-[#F9F7FD] shadow-[0px_6.35px_41.26px_0px_rgba(0,0,0,0.07)]" : "bg-primaryPurple"} place-content-center grid rounded-[50%] size-14 cursor-pointer`}>
                    <ArrowLeft2 className={`${form === 1 ? "text-textGrey" : "text-[#F9F7FD]"} `} />
                </button>
                <button disabled={form === 7} onClick={() => updateFormNumber(form + 1)} className={`${form === 7 ? "bg-[#F9F7FD] shadow-[0px_6.35px_41.26px_0px_rgba(0,0,0,0.07)]" : "bg-primaryPurple"} place-content-center grid rounded-[50%] size-14 cursor-pointer`}>
                    <ArrowRight2 className={`${form === 7 ? "text-textGrey" : "text-[#F9F7FD]"} `} />
                </button>
            </div>
        </main>
    );
}

export default Index2;