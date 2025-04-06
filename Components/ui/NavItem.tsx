import Link from "next/link";


const NavItem = ({ href, icon: Icon, currentPath, label }: NavItem) => {
    const isActive = currentPath === href;
    const baseClasses = "text-textGrey hover:text-primaryPurple duration-300";
    const activeClasses = "text-darkBlack";

    return (
        <Link href={href} className={`${isActive && "p-2 rounded-[2rem] bg-darkWhite text-darkBlack"} flex gap-x-1 items-center text-textGrey w-auto duration-300`}>
            <Icon size="24" className={isActive ? activeClasses : baseClasses} variant={isActive ? "Bold" : "Outline"} />
            {isActive && <p className="font-semibold">{label}</p>}
        </Link>
    );
};

export default NavItem;