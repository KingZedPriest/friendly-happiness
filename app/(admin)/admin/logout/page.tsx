"use client"

import Link from 'next/link';

//Import Needed Server Actions
import { logOut } from '@/actions/server/logOut';

//Import needed icons
import { LogoutCurve } from "iconsax-react";


const page = () => {
    return ( 
        <main className="top-0 left-0 z-10 fixed flex justify-center items-center bg-black/80 w-full h-dvh">
            <div className="relative bg-white p-4 md:p-8 rounded-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[15rem]">
                <div className="flex flex-col justify-center items-center gap-y-5 xl:gap-y-3 text-center">
                    <LogoutCurve size="50" color="#D70015" variant="Bulk"/>
                    <div>
                        <p className="font-semibold text-[#020100] text-[16px] md:text-[20px] xl:text-[24px]">Logging out</p>
                        <p className="font-medium text-[#8E8E93] text-sm md:text-base xl:text-lg">Are you sure you want to log out?</p>
                    </div>
                    <form action={logOut} className='flex justify-between w-full'>
                        <Link href='/admin/dashboard' className='bg-primaryPurple hover:bg-softPurple px-4 md:px-6 xl:px-8 py-3 rounded-md text-darkWhite hover:text-darkBlack duration-300'>Go home</Link>
                        <button type="submit" className="bg-[#D70015] hover:bg-white px-4 md:px-6 xl:px-8 py-3 border border-[#D70015] rounded-md text-white hover:text-[#D70015] duration-500 cursor-pointer">Yes</button>
                    </form>
                    
                </div>
            </div>
        </main>
     );
}
 
export default page;