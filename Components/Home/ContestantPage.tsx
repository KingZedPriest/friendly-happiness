"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from "sonner";

//Utils
import { makeApiRequest } from "@/lib/apiUtils";

//Components
import ContestantCard from "./ContestantCard";

//Icons
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import ErrorPage from "../Admin/LoadingError";

const ContestantPage = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [fetchedEntries, setFetchedEntries] = useState<HomePageEntries[]>();
    const [fetchedMetaData, setFetchedMetaData] = useState<MetaData>()

    //Functions
    const updatePage = (newPage: number) => {

        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        // Push the new URL with updated query parameters
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {

        setLoading(true);
        setIsError(false);

        makeApiRequest(`/getEntries?page=${page}`, "get", "", {
            onSuccess: (response) => {
                const result = response.data.data;
                const metaData = response.data.meta;
                setFetchedEntries(result);
                setFetchedMetaData(metaData)
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setIsError(true);
                toast.error("Error fetching classes, Please Try Again.");
            },
        });
    }, [page]);

    return (
        <main className="mt-10 md:mt-12 xl:mt-14 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 py-20 text-[#19171C] text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl">Meet the Contestants!</h1>
            <p className="mx-auto mt-4 max-w-[60ch] font-light text-base sm:text-lg md:text-xl xl:text-2xl">These talented dancers have stepped up to the challenge! Watch their performances, show your support, and vote for your favorite. Every vote brings them closer to victory</p>
            {loading ?
                <main className="place-content-center grid h-40 text-darkBlack">
                    <p className="text-base md:text-lg xl:text-2xl animate-pulse">Loading...</p>
                </main>
                : isError ?
                    <ErrorPage />
                    : fetchedEntries?.length === 0 ?
                        <div className="place-content-center grid h-80 text-darkBlack">
                            <p className="font-urbanist font-semibold text-base md:text-lg xl:text-2xl">Contestant videos are not currently available. Please check back soon for updates.</p>
                        </div>
                        : <>
                            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
                                {fetchedEntries?.map((entry) => (
                                    <ContestantCard key={entry.user.customUserId} entry={entry} />
                                ))}
                            </div>
                            <div className="flex justify-center gap-x-10 mt-10">
                                <button onClick={() => updatePage(page - 1)} disabled={page === 1} className={` ${page === 1 ? "shadow-[0_9.92px_64.47px_0_#00000012] bg-white text-[#716A7C]" : "bg-primaryPurple text-white"}  size-16 rounded-[50%] grid place-content-center disabled:cursor-not-allowed`}>
                                    <ArrowLeft2 size={24} />
                                </button>
                                <button onClick={() => updatePage(page + 1)} disabled={page === fetchedMetaData?.totalPages} className={` ${page === fetchedMetaData?.totalPages ? "shadow-[0_9.92px_64.47px_0_#00000012] bg-white text-[#716A7C]" : "bg-primaryPurple text-white"} size-16 rounded-[50%] grid place-content-center disabled:cursor-not-allowed`}>
                                    <ArrowRight2 size={24} />
                                </button>
                            </div>
                        </>
            }
        </main>
    );
}

export default ContestantPage;