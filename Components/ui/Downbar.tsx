"use client";

import { usePathname } from "next/navigation";

//Components
import NavItem from "./NavItem";

//Icons
import { Home, Android, Award, Calendar, Math } from "iconsax-react";


const navItems = [
  { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { name: "Competition", icon: Award, href: "/admin/competition" },
  { name: "Contestants", icon: Calendar, href: "/admin/contestants" },
  { name: "Summary", icon: Math, href: "/admin/summary", role: "super_admin" },
  { name: "Staff", icon: Android, href: "/admin/staff", role: "super_admin" },
]

const DownBar = ({ role }: { role: string }) => {
  const currentPath = usePathname();

  // Filter navItems based on role
  const filteredNavItems = navItems.filter(item => !item.role || item.role === role);

  return (
    <main className="lg:hidden bottom-0 left-0 fixed bg-darkWhite p-2 w-full">
      <div className="flex justify-between items-center bg-darkBlack p-2 rounded-[2rem]">
        {filteredNavItems.map((item) => (
          <NavItem key={item.name} currentPath={currentPath} href={item.href} icon={item.icon} label={item.name} />
        ))}
      </div>
    </main>
  );
};

export default DownBar;
