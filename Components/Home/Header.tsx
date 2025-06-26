import Image from "next/image";
import Link from "next/link";

//Images
import logo from "../../public/logoBlack.svg";
import heroImage from "../../public/heroSection.svg";

const Header = () => {
    return (
        <main>
            <nav className="flex justify-between items-center bg-white shadow-[0_2px_26px_0_#00000012] px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 py-4">
                <Image src={logo} className="size-14 md:size-16 xl:size-20" alt="logo" />
                <Link href="/register" className="bg-primaryPurple hover:bg-softPurple px-16 py-3 rounded-[4px] font-bold text-white hover:text-darkBlack text-sm md:text-base xl:text-lg duration-300">Join Now</Link>
            </nav>
            <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-10 bg-[url('../../public/background.svg')] bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 py-16 md:py-24 xl:py-32">
                <div className="lg:w-[45%] xl:w-[48%] font-urbanist">
                    <h1 className="max-w-[20ch] font-extrabold text-[#19171C] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-10">The Stage is set. The <span className="text-primaryPurple">Spotlight</span> is yours!</h1>
                    <p className="mt-4 max-w-[40ch] text-[#2B282F] text-base md:text-lg xl:text-xl">Upload your fiercest moves, earn votes from the crowd, and rise to the top. This is your moment to dance, shine, and win it all!</p>
                    <div className="flex items-center gap-5 mt-10">
                        <Link href="/register" className="bg-primaryPurple hover:bg-softPurple px-16 py-3 rounded-[4px] font-bold text-white hover:text-darkBlack duration-300">Join Now</Link>
                        <hr className="bg-[#2B282F] w-[1px] h-10" />
                        <p className="text-[#2B282F] tracking-widest">Every Vote <br /> Counts</p>
                    </div>
                </div>
                <div className="lg:w-[45%] xl:w-[48%]">
                    <Image src={heroImage} alt="Hero Section" />
                </div>
            </div>
        </main>
    );
}

export default Header;