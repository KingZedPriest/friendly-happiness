"use client"

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import Index from '@/Components/Register/Index';
import Index1 from '@/Components/Register/Index1';
import Index2 from '@/Components/Register/Index2';
import Index3 from "@/Components/Register/Index3";

import logo from "../../public/logo.svg";

const Register = () => {

    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    return (
        <main>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
                <video src="https://extraordinairetalents.s3.af-south-1.amazonaws.com/heroSection.mp4" autoPlay loop muted style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover' }} />
            </div>
            <div className='top-10 left-4 md:left-6 xl:left-8 absolute'>
                <Image src={logo} alt='Logo' className='w-10 sm:w-12 md:w-14 lg:w-16 xl:w-20' />
            </div>

            <div className='bottom-10 left-4 md:left-6 xl:left-8 absolute place-content-center grid bg-[#FFFFFF29] px-4 md:px-6 xl:px-8 border border-white rounded-lg h-12'>
                <p className='font-oleo'>One Stage. One Shot. One Champion!</p>
            </div>

            <section className='relative w-full h-dvh'>
                <div className='top-[10%] left-1/2 lg:left-[40%] 2xl:left-[60%] xl:left-[50%] absolute bg-[#F9F7FD] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 rounded-lg w-80 sm:w-[26rem] md:w-[30rem] lg:w-[34rem] 2xl:w-[40rem] xl:w-[38rem] min-w-80 max-h-[80%] overflow-y-auto text-textGrey -translate-x-1/2 lg:-translate-x-0'>
                    {{
                        1: <Index />,
                        2: <Index1 />,
                        3: <Index2 />,
                        4: <Index3 />
                    }[page] ?? <Index />}
                </div>
            </section>
        </main>
    );
};

export default Register;
