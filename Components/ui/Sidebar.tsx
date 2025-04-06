"use client"

import { usePathname } from "next/navigation";

//Components
import SideItem from "./SidebarItem";

//Icons
import { Home, Android, Award, Calendar, Math, Logout } from "iconsax-react";


const navItems = [
    { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { name: "Competition", icon: Award, href: "/admin/competition" },
    { name: "Contestants", icon: Calendar, href: "/admin/contestants" },
    { name: "Summary", icon: Math, href: "/admin/summary", role: "super_admin" },
    { name: "Staff", icon: Android, href: "/admin/staff", role: "super_admin" },
]

const logoutItem = { href: "/admin/logout", icon: Logout, label: "Logout" };


const Sidebar = ({ role }: { role: string }) => {

    const currentPath = usePathname();

    // Filter navItems based on role
    const filteredNavItems = navItems.filter(item => !item.role || item.role === role);

    return (
        <main className="hidden lg:fixed lg:flex flex-col bg-lightBlack px-10 py-6 w-[20rem] h-dvh text-lightGray">
            <div className="flex flex-col flex-grow gap-y-8 mt-20">
                {filteredNavItems.map((item, index) => (
                    <SideItem key={`items-${index}`} currentPath={currentPath} href={item.href} icon={item.icon} label={item.name} />
                ))}
            </div>
            <div className="mt-8">
                <SideItem currentPath={currentPath} href={logoutItem.href} icon={logoutItem.icon} label={logoutItem.label} />
            </div>
        </main>
    );
}

export default Sidebar;