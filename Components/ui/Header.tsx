"use client"

import { usePathname } from "next/navigation";

//Icons
import { ArrowRight2 } from "iconsax-react";

//Utils
import { formatSubheading } from "@/utils/format";

//Components
// import HeaderSearch from "./HeaderSearch";
import HeaderSub from "./HeaderSub";

const Header = ({ role }: { role: string }) => {

    const pathName = usePathname()
    const updatedPathname = pathName.replace(/^\/admin\//, "");



    return (
        <main className="bg-lightBlack px-3 md:px-4 xl:px-6 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-1 md:gap-x-2 xl:gap-x-3 text-slate-400">
                    <p>Main Menu</p>
                    <p><ArrowRight2 size="18" /></p>
                    <p className="font-semibold text-lightGray capitalize">{decodeURIComponent(updatedPathname)}</p>
                </div>
                <HeaderSub role={role} />
            </div>
            <div className="flex justify-between mt-6">
                <div className="flex flex-col gap-y-3 w-full">
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-1 sm:gap-y-0">
                        <p className="font-semibold text-xl md:text-2xl xl:text-3xl capitalize">{decodeURIComponent(updatedPathname)}</p>
                    </div>
                    <p>{formatSubheading(updatedPathname)}</p>
                </div>
            </div>
        </main>
    );
}

export default Header;