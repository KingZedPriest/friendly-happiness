import Image from "next/image";
import Link from "next/link";

//Actions
import getContestant from "@/actions/fetch/getContestant";
import getRandomContestants from "@/actions/fetch/getThreeContestants";

//Components
import ErrorPage from "@/Components/Admin/LoadingError";
import VotePage from "@/Components/Home/VotePage";
import Footer from "@/Components/Home/Footer";

//Icons and Images
import { ArrowLeft } from "iconsax-react";
import logo from "../../public/logoBlack.svg";
import RandomContestants from "@/Components/Home/RandomContestants";

export const revalidate = 0;
const page = async ({ params }: { params: { id: string } }) => {

    const customUserId = params.id;
    const { success, user } = await getContestant(customUserId);
    const { successful, data } = await getRandomContestants();

    if (!success || user === null) {
        return (
            <ErrorPage message="Contestant Not Found" description={"We were unable to locate the contestant you are looking for."} />
        )
    }

    const CONTENTS = [
        { heading: "The Story Behind the Video", body: user.story },
        { heading: "How Long Have You Been a Dancer?", body: `I have been dancing for ${user.howLong} years, constantly learning, evolving, and pushing my limits to improve my craft.` },
        { heading: "What Type of Dance Do You Specialize In?", body: `I specialize in ${user.danceType}, blending unique movements to create engaging and powerful performances.` },
        { heading: "How Did You Discover Your Passion for Dance?", body: user.discover },
        { heading: "Why Should People Vote for You?", body: user.why }
    ]

    return (
        <main className="bg-white">
            <section className="bg-white shadow-[0_2px_26px_0_#00000012] py-2">
                <Image src={logo} className="mx-auto w-16 sm:w-20 md:w-24 lg:w-28 2xl:w-36 xl:w-32" alt="logo" />
            </section>
            <section className="mt-4 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20">
                <Link href="/"><ArrowLeft className="text-darkBlack" size={30} variant="Bold" /></Link>
                <div className="flex md:flex-row flex-col md:justify-center gap-5 md:gap-x-7 md:gap-y-0 2xl:gap-x-14 xl:gap-x-10 py-20">
                    <Image src={user.profilePhoto} alt={`${user.fullName} profile picture`} loading="lazy" width={400} height={200} className="rounded-lg" />
                    <div className="hidden md:block w-fit">
                        <p className="font-urbanist text-[10px] text-black md:text-xs xl:text-sm verticalText">{user.howLong} years of experience</p>
                        <div className="bg-[#A076DA] mx-auto mt-4 w-full md:w-0.5 h-0.5 md:h-40" />
                        <div className="bg-[#A076DA] mx-auto mt-8 w-full md:w-0.5 h-0.5 md:h-14" />
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <p className="font-urbanist font-bold text-[#19171C] text-xl sm:text-2xl md:text-3xl xl:text-4xl">{user.fullName}</p>
                        <p className="md:max-w-[45ch] font-semibold text-[#4E4955]">{user.aboutYou}</p>
                        <VotePage userId={user.id} customUserId={user.customUserId} />
                    </div>
                </div>
            </section>
            <section className="px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 pb-20">
                <h1 className="font-urbanist font-bold text-[#19171C] text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center">Watch Contestant&apos;s Video</h1>
                <video src={user.danceVideo} className="mx-auto" controls suppressHydrationWarning />
            </section>
            <section className="px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 pb-20">
                <h1 className="font-urbanist font-bold text-[#19171C] text-2xl sm:text-3xl md:text-4xl xl:text-5xl">Know More About this Contestant</h1>
                {CONTENTS.map((content, index) => (
                    <div key={`Contents ${index}`} className="flex flex-col gap-y-2 my-10 text-[#3C3842]">
                        <h3 className="font-urbanist font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl">{content.heading}</h3>
                        <p className="max-w-[45ch] text-sm sm:text-base md:text-lg xl:text-xl">{content.body}</p>
                    </div>
                ))}
            </section>
            <section className="px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 pb-20">
                <h1 className="my-8 font-urbanist font-bold text-[#19171C] text-2xl sm:text-3xl md:text-4xl xl:text-5xl">Meet the Contestants!</h1>
                {successful && <RandomContestants randomEntries={data!} />}
            </section>
            <Footer />
        </main>
    );
}

export default page;