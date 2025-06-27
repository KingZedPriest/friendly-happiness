//Components
import ContestantCard from "./ContestantCard";

const RandomContestants = ({ randomEntries }: { randomEntries: HomePageEntries[] }) => {
    return (
        <main>
            {randomEntries.length === 0 ?
                <div className="place-content-center grid h-80 text-darkBlack">
                    <p className="font-urbanist font-semibold text-base md:text-lg xl:text-2xl">Contestant videos are not currently available. Please check back soon for updates.</p>
                </div> :
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
                    {randomEntries.map((entry) => (
                        <ContestantCard key={entry.user.customUserId} entry={entry} />
                    ))}
                </div>
            }
        </main>
    );
}

export default RandomContestants;