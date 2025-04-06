"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//Icons and Images
import { Play } from "iconsax-react";
import videoThumbnail from "../../public/videoPlay.jpg";

const ContestantCard = ({entry}: {entry : HomePageEntries}) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <main className="bg-white shadow-lg border border-black/10 rounded-2xl overflow-hidden">
            <div className="relative">
                {isPlaying ? (
                    <video src={entry.user.danceVideo} className="w-full h-[250px] object-cover" controls autoPlay onPause={() => setIsPlaying(false)} />
                ) : (
                    <div className="relative">
                        <Image src={videoThumbnail} alt="Contestant Thumbnail" width={350} height={250} className="w-full h-[250px] object-cover" />
                        {!isPlaying && <div className="absolute inset-0 bg-black/60"></div>}
                        <button className="absolute inset-0 flex justify-center items-center bg-white mx-auto my-auto rounded-full size-14" onClick={() => setIsPlaying(true)}>
                            <Play size="24" color="#C53535" variant="Bold" />
                        </button>
                    </div>
                )}
            </div>
            <div className="px-5 pb-5">
                <div className={`${isPlaying ? "-z-10" : "z-10"} bg-white -mt-8 relative p-2 rounded-full size-fit`}>
                    <Image src={entry.user.profilePhoto} alt="profile picture" width={50} height={50} className="rounded-full" />
                </div>
                <section className="flex justify-end -mt-4 w-full">
                    <div className="bg-[#73A52C] px-3 py-1 rounded-lg text-[10px] text-white md:text-xs xl:text-sm">
                        {entry.voteCount}
                    </div>
                </section>
                <div className="flex flex-col gap-y-3 text-[#19171C] text-left">
                    <h3 className="font-urbanist font-semibold text-base md:text-lg xl:text-xl">{entry.user.fullName}</h3>
                    <p>{entry.user.howLong} years dancing</p>
                    <Link href={`/${entry.user.customUserId}`} className="block bg-primaryPurple hover:bg-softPurple px-10 py-2 rounded-[4px] w-fit text-[10px] text-white hover:text-[#19171C] md:text-xs xl:text-sm duration-300">
                        Preview Now
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ContestantCard;