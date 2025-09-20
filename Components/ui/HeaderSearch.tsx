/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

//Libs and Utils
import { makeApiRequest } from "@/lib/apiUtils";

//Components


//Icons
import { ChartCircle, SearchNormal1 } from "iconsax-react";

const HeaderSearch = () => {

    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<object | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        setLoading(true)

        if (searchText.trim() === "") {
            setSearchResults(null)
            return
        }
        try {
            makeApiRequest(`/search?name=${encodeURIComponent(searchText)}`, "get", "", {
                onSuccess: (response) => {
                    setSearchResults(response.data.data);
                    setIsDialogOpen(true);
                    setLoading(false)
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    console.log('Search Error:', error);
                    setLoading(false)
                    toast.warning("Search Error, kindly try again later.")
                },
            });
        } catch (error) {
            console.log('Search error:', error)
            toast.error("Search Error, kindly try again later.")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <>
            <main className="flex items-center gap-x-1 px-3 border border-softPurple rounded-[2rem]">
                <SearchNormal1 size="24" variant={searchText.length !== 0 ? "Bold" : "Outline"} />
                <input type="search" className="bg-inherit px-2 py-3 focus:border-none rounded-[2rem] focus:outline-none w-full text-lightGray placeholder:text-xs md:placeholder:text-sm" placeholder="Search for a Contestant" onChange={handleChange} onKeyDown={handleKeyPress} value={searchText} />
                {loading ? <ChartCircle size="14" color="#FF8A65" className="ml-2 animate-spin" /> : <button onClick={handleSearch} className="ml-2 text-[10px] md:text-xs xl:text-sm">Search</button>}
            </main>
        </>
    )
}

export default HeaderSearch