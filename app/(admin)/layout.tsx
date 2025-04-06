import { permanentRedirect } from "next/navigation";

//Actions
import getCurrentUser from "@/actions/fetch/currentUser";
import getAdmin from "@/actions/fetch/getAdmin";

//Components
import SideBar from "@/Components/ui/Sidebar";
import Header from "@/Components/ui/Header";
import DownBar from "@/Components/ui/Downbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const userDetails = await getCurrentUser();
    const currentAdmin = await getAdmin(userDetails.id);

    //If suspended, redirect to the suspended page
    if (currentAdmin.suspended) {
        permanentRedirect("/unauthorised")
    }


    return (
        <main className="bg-darkBlack min-h-dvh overflow-y-auto text-lightGray scroll-smooth" suppressHydrationWarning>
            <SideBar role={currentAdmin.role} />
            <section className="mb-20 lg:mb-0 mainWidth">
                <Header role={currentAdmin.role} />
                <div className="p-2 sm:p-3 md:p-4 2xl:p-6 xl:p-4">
                    {children}
                </div>
            </section>
            <DownBar role={currentAdmin.role} />
        </main>

    )
}