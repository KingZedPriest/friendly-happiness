//Actions
import getSummary from "@/actions/fetch/getSummary";

//Components

import ErrorPage from "@/Components/Admin/LoadingError";
import PageHeader from "@/Components/ui/SecondHeader";
import SummarySelect from "@/Components/Admin/SummarySelect";

//Icons
import { ClipboardTick } from "iconsax-react";

const page = async () => {

    const { success, data } = await getSummary();

    if (!success && data === null) {
        <ErrorPage description="We couldn't load your summary page. Please try again." />
    }

    const totalDocs = (data?.users.length || 0) + (data?.competitions.length || 0) + (data?.entries.length || 0) + (data?.rounds.length || 0) + (data?.votes.length || 0)

    return (
        <main>
            <PageHeader title="Summary" totalCount={totalDocs} buttonText="Head to Dashboard" buttonLink="/admin/dashboard" icon={ClipboardTick} subText="Detailed Summary" />
            <SummarySelect users={data!.users} competitions={data!.competitions} rounds={data!.rounds} entries={data!.entries} votes={data!.votes} />
        </main>
    );
}

export default page;