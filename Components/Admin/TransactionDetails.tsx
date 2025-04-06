import Link from "next/link";

//Icons
import { TickCircle } from "iconsax-react";

const TransactionDetails = ({ fullName, createdAt, paidAmount }: TransactionProps) => {
    return (
        <Link href={`/summary`} className="flex justify-between items-center py-2.5 border-slate-800 border-b">
            <div className="flex items-center gap-x-2">
                <TickCircle size="40" className="bg-green-800 p-2 rounded-full text-green-100" />
                <div className="flex flex-col gap-y-1">
                    <p className="font-semibold :text-white text-xs lg:text-xs md:text-sm xl:text-base">Vote for {fullName}</p>
                    <p className="text-[10px] md:text-xs xl:text-sm">{createdAt}</p>
                </div>
            </div>
            <div>
                <p className="font-semibold text-white text-xs lg:text-xs md:text-sm xl:text-base">+₦{paidAmount}</p>
                <p className='inline-flex bg-green-800 px-2 rounded-full font-semibold text-[10px] text-green-100 md:text-xs leading-5'>Success</p>
            </div>
        </Link>
    );
}

export default TransactionDetails;