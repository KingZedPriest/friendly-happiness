
//Actions
import getCompetitions from "@/actions/fetch/getCompetition";

//Components
import PageHeader from "@/Components/ui/SecondHeader";
import ErrorPage from "@/Components/Admin/LoadingError";
import CompetitionList from "@/Components/Admin/CompetitionList";

//Icons
import { Award } from "iconsax-react";

const page = async () => {
    const { success, competitions } = await getCompetitions();

    if (!success) {
        return <ErrorPage description="We couldn't load your competition page. Please try again." showBackButton={true} />;
    }

    return (
        <main>
            <PageHeader title="Competitions" totalCount={competitions!.length} buttonText="Create New Competition" buttonLink="/admin/competition/new" icon={Award} subText="Manage your competitions" />
            <div className="mt-10">
                <CompetitionList competitions={competitions!} />
            </div>
        </main>
    );
}

export default page;
