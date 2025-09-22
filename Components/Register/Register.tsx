"use client"

import { useSearchParams } from 'next/navigation';

//Components
import Index from '@/Components/Register/Index';
import Index1 from '@/Components/Register/Index1';
import Index2 from '@/Components/Register/Index2';
import Index3 from "@/Components/Register/Index3";

const Register = () => {

    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    return (
        <main className="flex justify-center items-center bg-black-gradient p-2 min-h-dvh">
            {{
                1: <Index />,
                2: <Index1 />,
                3: <Index2 />,
                4: <Index3 />
            }[page] ?? <Index />}
        </main>
    );
};

export default Register;
