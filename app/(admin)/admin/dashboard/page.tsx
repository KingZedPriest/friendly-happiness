import Link from "next/link";

//Actions and Utils
import getCurrentUser from "@/actions/fetch/currentUser";
import getAdmin from "@/actions/fetch/getAdmin";
import { formatDate } from "@/utils/time";

//Components
import SummaryBox from "@/Components/Admin/SummaryBox";
import Chart from "@/Components/Admin/Chart";
import getDashboardStats from "@/actions/fetch/getDashboardStats";
import VoteTable from "@/Components/Admin/VoteTable";
import ErrorPage from "@/Components/Admin/LoadingError";

//Icon
import { Award, Ticket, DocumentUpload, User, ArrowDown2 } from "iconsax-react";
import TransactionDetails from "@/Components/Admin/TransactionDetails";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
const page = async () => {

    const accessTokenUser = await getCurrentUser();
    const currentAdmin = await getAdmin(accessTokenUser.id);
    const { success, totalCompetitions, totalUsers, totalVotes, totalAcceptedEntries, lastCompetitionTimestamp, lastUserTimestamp, lastVoteTimestamp, lastAcceptedEntryTimestamp, totalVotesYesterday, totalVotesToday, totalUsersLastSixMonths, lastSixVotes, lastTenVotes } = await getDashboardStats();

    if (!success) {
        <ErrorPage description="We couldn't load your dashboard. Please try again." />
    }

    const summaryItems = [
        { title: "Total Competition", icon: Award, color: "bg-[#516fff]/20 text-[#516fff]", amount: totalCompetitions, time: lastCompetitionTimestamp },
        { title: "Total Accepted Entries", icon: Ticket, color: "bg-[#f98838]/20 text-[#f98838]", amount: totalAcceptedEntries, time: lastAcceptedEntryTimestamp },
        { title: "Total Votes", icon: DocumentUpload, color: "bg-[#9879f4]/20 text-[#9879f4]", amount: totalVotes, time: lastVoteTimestamp },
        { title: "Total Users", icon: User, color: "bg-[#f48fc7]/20 text-[#f48fc7]", amount: totalUsers, time: lastUserTimestamp }
    ]

    return (
        <main>
            <div className="flex flex-wrap gap-5">
                {summaryItems.map((item, index) => (
                    <SummaryBox key={`summary-${index}`} title={item.title} icon={item.icon} color={item.color} amount={item.amount!} time={item.time} />
                ))}
            </div>
            <div className="flex lg:flex-row flex-col gap-5 mt-10">
                <div className="p-4 border border-slate-800 rounded-xl w-full lg:w-[60%]">
                    <p className="pb-2 border-slate-800 border-b font-semibold text-darkWhite text-sm md:text-base xl:text-lg">Today Transaction</p>
                    <Chart votesToday={totalVotesToday!} votesYesterday={totalVotesYesterday!} totalUsers6Months={totalUsersLastSixMonths!} />
                </div>
                <div className="p-4 border border-slate-800 rounded-xl w-full lg:w-[40%]">
                    <div className="flex justify-between items-center pb-2 border-slate-800 border-b">
                        <p className="font-semibold text-darkWhite text-sm md:text-base xl:text-lg">Transaction History</p>
                        <p className="text-[10px] md:text-xs xl:text-sm">Last 6 (Six)</p>
                    </div>
                    <div className="flex flex-col mt-5">
                        {lastSixVotes!.length > 0 ? lastSixVotes!.map((vote, index) => (
                            <TransactionDetails key={`Vote-${index}`} fullName={vote.entry.user.fullName ?? "No Name"} createdAt={formatDate(vote.createdAt)} paidAmount={vote.amountPaid} />
                        ))
                            : <p className="mx-auto">No Vote Yet</p>
                        }
                        {currentAdmin.role === "super_admin" &&
                            <div className="flex justify-center items-center gap-x-3 bg-lightBlack mt-5 p-4 rounded-xl hover:text-softPurple duration-300 cursor-pointer">
                                <Link href="/summary">View All Transactions</Link>
                                <ArrowDown2 size="20" />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="mt-10 p-4 border border-slate-800 rounded-xl">
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-1 pb-2 border-slate-800 border-b">
                    <p className="font-semibold text-darkWhite text-sm md:text-base xl:text-lg">Latest Votes<span className="sm:hidden ml-6 text-[10px] md:text-xs xl:text-sm">Last 10 (Ten)</span></p>
                    <p className="hidden sm:block text-[10px] md:text-xs xl:text-sm">Last 10 (Ten)</p>
                </div>
                <div className="mt-5">
                    <VoteTable votes={lastTenVotes!} />
                </div>
            </div>
        </main>
    );
}

export default page;