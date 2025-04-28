"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from "sonner";

//Utils
import { makeApiRequest } from "@/lib/apiUtils";

//Components
import PageHeader from "@/Components/ui/SecondHeader";
import ErrorPage from "@/Components/Admin/LoadingError";
import ContestantTable from "@/Components/Admin/ContestantTable";

//Icons
import { UserTag } from "iconsax-react";


const Page = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    const [fetchedUser, setFetchedUsers] = useState<Contestants[]>();
    const [fetchedMetaData, setFetchedMetaData] = useState<MetaData>()
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

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

        makeApiRequest(`/getContestants?page=${page}`, "get", "", {
            onSuccess: (response) => {
                const result = response.data.data;
                const metaData = response.data.meta;
                setFetchedUsers(result);
                setFetchedMetaData(metaData)
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setIsError(true);
                toast.error("Error fetching contestants, Please Try Again.");
            },
        });
    }, [page]);

    return (
        <>
            {loading ?
                <main className="place-content-center grid bg-slate-900 h-dvh text-darkWhite">
                    <p className="text-base md:text-lg xl:text-2xl animate-pulse">Loading...</p>
                </main>
                : isError ?
                    <ErrorPage />
                    : <main>
                        <PageHeader title="Contestants" totalCount={fetchedMetaData?.total ?? 0} buttonText="Head to Dashboard" buttonLink="/admin/dashboard" icon={UserTag} subText="Manage your contestants" />
                        <div>
                            {fetchedUser && <ContestantTable users={fetchedUser} />}
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                            <button onClick={() => updatePage(page - 1)} disabled={page === 1} className="disabled:opacity-50 px-3 py-1 border rounded disabled:cursor-not-allowed">
                                Prev
                            </button>

                            {[...Array(fetchedMetaData?.totalPages)].map((_, index) => (
                                <button key={index} onClick={() => updatePage(index + 1)} className={`px-3 py-1 border rounded ${page === index + 1 ? "bg-blue-500 text-white" : ""}`}>
                                    {index + 1}
                                </button>
                            ))}

                            <button onClick={() => updatePage(page + 1)} disabled={page === fetchedMetaData?.totalPages} className="disabled:opacity-50 px-3 py-1 border rounded disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </main>
            }
        </>

    );
}

export default Page;