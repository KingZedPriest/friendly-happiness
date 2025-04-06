import Image from "next/image";
import Link from "next/link";

//Images
import logo from "../../public/logoBlack.svg";
import dancerText from "../../public/dancerText.svg";
import rightDancer from "../../public/rightDancer.svg";
import leftDancer from "../../public/leftDancer.svg";

const Header = () => {
    return (
        <main>
            <section className="bg-white shadow-[0_2px_26px_0_#00000012] py-2">
                <Image src={logo} className="mx-auto w-16 sm:w-20 md:w-24 lg:w-28 2xl:w-36 xl:w-32" alt="logo" />
            </section>
            <div className="relative p-2 py-32 font-urbanist text-[#19171C] text-center bgImage">
                <div className="mx-auto px-4 md:px-6 xl:px-8 border-[#19171C] border-r-2 w-fit">
                    <h3 className="font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl">The Stage is Set. The Spotlight is Yours!</h3>
                    <p className="mt-1 text-base sm:text-lg md:text-xl xl:text-2xl">Show the world your best moves, compete with top </p>
                </div>
                <Image src={dancerText} className="z-[2] relative mx-auto mt-10" alt="Text Image" />
                <Image src={rightDancer} alt="Dancer Image" className="hidden xl:block -top-40 2xl:right-[5%] xl:right-0 absolute" />
                <Image src={leftDancer} alt="Dancer Image" className="hidden xl:block bottom-0 2xl:left-[12%] xl:left-[5%] absolute" />
                <div className="mx-auto mt-10 px-4 md:px-6 xl:px-8 border-[#19171C] border-l-2 w-fit">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl xl:text-2xl">Upload. Share. Win.</h3>
                    <p className="mt-1 text-sm sm:text-base md:text-lg xl:text-xl">Are you ready to take the challenge? </p>
                    <Link href="/register" className="block bg-primaryPurple hover:bg-softPurple mx-auto mt-2 px-16 py-2.5 rounded-[4px] w-fit font-bold text-white hover:text-darkBlack duration-300">Join Now</Link>
                </div>
            </div>
        </main>
    );
}

export default Header;