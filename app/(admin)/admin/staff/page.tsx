
//Actions
import getAdmins from "@/actions/fetch/getAdmins";

//Components
import PageHeader from "@/Components/ui/SecondHeader";
import ErrorPage from "@/Components/Admin/LoadingError";
import StaffTable from "@/Components/Admin/StaffTable";

//Icons
import { Android } from "iconsax-react";


const page = async () => {

    const { success, admins } = await getAdmins();

    if (!success) {
        <ErrorPage description="We couldn't load your staff page. Please try again." />
    }

    const newAdmin = admins?.filter((admin) => admin.email !== "developer@admin.com")

    return (
        <main>
            <PageHeader title="Staff" totalCount={newAdmin!.length} buttonText="Create New Staff" buttonLink="/admin/staff/new" icon={Android} subText="Manage Your Staff" />
            <StaffTable admins={newAdmin!} />
        </main>
    );
}

export default page;