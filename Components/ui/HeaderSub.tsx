"use client"

import { useState } from "react"
import Link from "next/link";

//Components
import DateInText from "./CurrentDate";

//Icons
import { Award, Category2, UserAdd, Logout } from "iconsax-react";



const HeaderSub = ({ role }: { role: string }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const baseClasses = "z-[5] absolute w-40 md:w-48 xl:w-56 top-10 bg-darkBlack right-2 sm:right-3 md:right-4 p-2 md:p-4 xl:p-6 rounded-xl flex flex-col duration-300"

    //Functions
    const toggleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <main>
            <Category2 size="24" variant="Bold" className={`${isOpen ? "text-primaryPurple" : ""} cursor-pointer hover:text-softPurple duration-300`} onClick={toggleOpen} />
            <div className={`${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"} ${baseClasses}`}>
                <div onClick={() => setIsOpen(false)} className="flex items-center gap-x-2 py-3 hover:text-softPurple hover:translate-x-2 duration-300">
                    <Award size="24" variant="Bold" />
                    <Link href="/admin/competition/new" className="font-semibold">Create New Competition</Link>
                </div>
                {role === "super_admin" &&
                    <div onClick={() => setIsOpen(false)} className="flex items-center gap-x-2 py-3 hover:text-softPurple hover:translate-x-2 duration-300">
                        <UserAdd size="24" variant="Bold" />
                        <Link href="/admin/staff/new" className="font-semibold">Create New Staff</Link>
                    </div>
                }
                <div onClick={() => setIsOpen(false)} className="flex items-center gap-x-2 py-3 hover:text-red-600 hover:translate-x-2 duration-300">
                    <Logout size="24" variant="Bold" />
                    <Link href="/admin/logout" className="font-semibold">Logout</Link>
                </div>
                <DateInText />
            </div>
            <div className={`${isOpen ? "fixed z-[4] inset-0 bg-black/10" : "hidden"} `} onClick={() => setIsOpen(false)}></div>
        </main>
    );
}

export default HeaderSub;