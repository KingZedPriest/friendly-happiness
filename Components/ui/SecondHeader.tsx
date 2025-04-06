import Link from "next/link";

//Icons
import { Add } from "iconsax-react";


export default function PageHeader({ title, totalCount, buttonText, buttonLink, icon: Icon, subText }: PageHeaderProps) {
    return (
        <div className="flex sm:flex-row flex-col sm:justify-between gap-y-2 mb-6 p-3 md:p-4 xl:p-5 rounded-xl text-darkWhite">
            <div className="flex items-center gap-x-2">
                <div className="place-content-center grid bg-softPurple p-2 rounded-lg size-12">
                    <Icon size={24} className="text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-lg md:text-xl xl:text-2xl">{title}<sup>{totalCount}</sup></h1>
                    <p className="text-gray-400">{subText}</p>
                </div>
            </div>
            <Link href={buttonLink} className="flex items-center gap-x-1 bg-green-600 hover:bg-green-800 shadow px-4 py-3 rounded-lg text-white text-sm md:text-base xl:text-lg">
                <Add size={20} variant="Bold" />
                {buttonText}
            </Link>
        </div>
    );
}
