
//Actions
import fetchCompetition from "@/actions/fetch/fetchCompetition";

//Utils
import { formatDate } from "@/utils/time";

//Components
import ErrorPage from "@/Components/Admin/LoadingError";
import { Badge } from "@/Components/ui/badge";
import RoundForm from "@/Components/Admin/RoundForm";
import DeleteRound from "@/Components/Admin/DeleteRound";
import AddEntries from "@/Components/Admin/AddEntries";
import ViewEntries from "@/Components/Admin/ViewEntries";

//Icons
import { Calendar, Cup } from "iconsax-react";
import EditRound from "@/Components/Admin/EditRound";
import DeleteCompetition from "@/Components/Admin/DeleteCompetition";


const page = async ({ params }: { params: { id: string } }) => {

    const name = params.id;
    const { success, competition } = await fetchCompetition(decodeURIComponent(name));

    if (!success || competition === null) {
        return (
            <ErrorPage message="Competition Not Found" description={"The requested competition does not exist"} />
        )
    }

    return (
        <main className="p-2 sm:p-4 md:p-6 xl:p-8">
            <div className="bg-slate-900 shadow-lg p-4 rounded-lg">
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-x-2 gap-y-2">
                    <h1 className="flex items-center gap-2 font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl capitalize">
                        <Cup className="w-7 h-7 text-yellow-500" />
                        {competition!.name}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant={competition!.isOnGoing ? "default" : "destructive"}>
                            {competition!.isOnGoing ? "Ongoing" : "Ended"}
                        </Badge>
                        <Badge variant={competition!.isAcceptingContestants ? "default" : "destructive"}>
                            {competition!.isAcceptingContestants ? "Accepting" : "Closed"}
                        </Badge>
                        <RoundForm competitionId={competition!.id} />
                        <DeleteCompetition competitionId={competition!.id} />
                    </div>
                </div>
                <p className="flex gap-1 mt-4 text-gray-400">
                    <Calendar className="size-4 md:size-5" />
                    {formatDate(competition!.startDate)} - {formatDate(competition!.endDate)}
                </p>
            </div>

            <section className="mt-6">
                <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">Rounds</h2>
                <div className="space-y-4 mt-4">
                    {competition!.rounds.length > 0 ? (
                        competition!.rounds.map((round) => (
                            <div key={round.id} className="bg-slate-800 shadow p-4 rounded-lg">
                                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-2">
                                    <h3 className="font-bold text-base md:text-lg xl:text-xl capitalize">Round: {round.roundName}</h3>
                                    <div className="flex gap-x-2">
                                        <Badge variant={round.acceptingVote ? "default" : "destructive"}>
                                            {round.acceptingVote ? "Accepting" : "Not Accepting"}
                                        </Badge>
                                        <EditRound round={round} competitionName={competition!.name} />
                                        <DeleteRound roundId={round.id} competitionName={competition!.name} />
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-400">
                                    Voting: {formatDate(round.votingStart)} - {formatDate(round.votingEnd)}
                                </p>
                                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-2 mt-2">
                                    <div className="flex gap-x-3">
                                        <p>Total Votes: <span className="font-semibold">{round.totalVotes}</span></p>
                                        <p>Total Entries: <span className="font-semibold">{round.entries.length}</span></p>
                                        <p>Total Competition Entries: <span className="font-semibold">{competition!.entries.length}</span></p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <ViewEntries entries={round.entries} competitionName={competition!.name} />
                                        <AddEntries entries={competition!.entries} roundId={round.id} competitionName={competition!.name} competitionId={competition!.id} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No rounds available for this competition.</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default page;