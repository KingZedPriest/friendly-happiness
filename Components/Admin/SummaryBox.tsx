import { formatDate, isCreatedAtMoreThan24HoursAgo } from "@/utils/time";

//Icons
import { Clock } from "iconsax-react";

const SummaryBox = ({ title, icon: Icon, color, amount, time }: SummaryProps) => {
    return (
        <main className="flex flex-col gap-y-3 bg-lightBlack p-4 border border-slate-800 rounded-xl w-[24%] min-w-[18rem]">
            <div className="flex justify-between items-center">
                <p>{title}</p>
                <Icon size="30" className={`${color} p-1`} />
            </div>
            <p className="font-semibold text-white text-xl md:text-2xl xl:text-3xl">{amount}</p>
            <div className="flex items-center gap-x-1">
                {time ? <><Clock size="18" className={isCreatedAtMoreThan24HoursAgo(time) ? "text-textOrange" : "text-cyanGreen"} variant="Bold" />
                <p>{formatDate(time)}</p></>
                : <><Clock size={18} className="text-redPink" variant="Bold" /> <p>No Action Yet.</p></>}
            </div>
        </main>
    );
}

export default SummaryBox;