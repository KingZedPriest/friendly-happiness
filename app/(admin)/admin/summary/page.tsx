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

    const users = data?.users || [];
    const competitions = data?.competitions || [];
    const entries = data?.entries || [];
    const rounds = data?.rounds || [];
    const votes = data?.votes || [];

    const totalDocs = users.length + competitions.length + entries.length + rounds.length + votes.length

    return (
        <main>
            <PageHeader title="Summary" totalCount={totalDocs} buttonText="Head to Dashboard" buttonLink="/admin/dashboard" icon={ClipboardTick} subText="Detailed Summary" />
            <SummarySelect users={users} competitions={competitions} rounds={rounds} entries={entries} votes={votes} />
        </main>
    );
}

export default page;