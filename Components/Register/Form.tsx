"use client";

import type React from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useRef, type DragEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";

//Components, Actions, Utils
import Input from "../ui/Input";
import Button from "../ui/Button";
import { uploadFiles } from "@/actions/server/upload";
import { checkAllField } from "@/utils/checkForm";
import { makeApiRequest } from "@/lib/apiUtils";

//Stores
import { useCompetitorFormStore } from '@/stores/useCompetitorForm';

//Icons and Images
import { Add } from "iconsax-react";
import gallery from "../../public/gallery.svg";
import noProfileImage from "../../public/noProfileImage.png";

export function Form() {

    //Store
    const { data, updateField } = useCompetitorFormStore();

    return (
        <div className='flex flex-col gap-y-5'>
            <Input type="text" placeholder='Enter your name' label='Full Name' id='fullName' value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} required />
            <Input type="email" placeholder='e.g johndoes@gmail.com' label='Email Address' id='email' value={data.emailAddress} onChange={(e) => updateField("emailAddress", e.target.value)} required />
            <Input type="tel" placeholder='080 000 00 000' label='Phone Number' id='phoneNumber' value={data.phoneNumber} onChange={(e) => updateField("phoneNumber", e.target.value)} required />
        </div>
    )
}

export function Form1() {

    //Store
    const { data, updateField } = useCompetitorFormStore();

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return toast.warning("Kindly select an image")
        updateField("profilePhoto", file)
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <main>
            <p className="mb-2 text-[#4E4955] text-[10px] md:text-xs xl:text-sm">Upload a profile photo</p>
            <div onClick={handleUploadClick} className="relative flex justify-center items-center bg-[#F2F1F3] hover:bg-gray-200 border-[#958E9F] border-2 border-dashed rounded-md w-1/2 h-44 transition-colors cursor-pointer">
                {data.profilePhoto ? (
                    <div className="relative w-full h-full">
                        <Image src={data.profilePhoto ? URL.createObjectURL(data.profilePhoto) : noProfileImage} alt="Profile preview" fill className="rounded-md object-cover" />
                        <button onClick={(e) => {
                            e.stopPropagation()
                            updateField("danceVideo", null)
                            if (fileInputRef.current) {
                                fileInputRef.current.value = ""
                            }
                        }}
                            className="top-2 right-2 absolute bg-gray-400 hover:bg-gray-300 p-1 rounded-full text-white" aria-label="Remove photo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center bg-[#958E9F] mb-2 rounded-full size-10">
                            <Add className="w-6 h-6 text-white" />
                        </div>
                    </div>
                )}

                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Upload profile photo" />
            </div>
        </main>
    )
}

export function Form2() {

    //Store
    const { data, updateField } = useCompetitorFormStore();
    const maxText = 750;

    return (
        <div>
            <label htmlFor="about" className="block text-[#4E4955] cursor-pointer">Tell us about yourself <span className="text-red-500">*</span></label>
            <textarea value={data.aboutYou} onChange={(e) => updateField("aboutYou", e.target.value)} placeholder="Write your story" required name="about" id="about" className="bg-inherit mt-2 px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple w-full h-60 placeholder:text-[#A7A1AF] duration-300 resize-none" disabled={data.aboutYou.length === maxText}></textarea>
            <span className="flex justify-end text-[#A7A1AF] text-[10px] md:text-xs xl:text-sm">{data.aboutYou.length}/{maxText}</span>
        </div>
    )
}


export function Form3() {

    //Store and states
    const { data, updateField } = useCompetitorFormStore();
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (file: File | null) => {

        setError(null)
        if (!file) return toast.error("Kindly select a video");

        //Make sure the video is not more than 50MB
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 50) {
            toast.info("Video must less than 50MB")
            return
        }

        // Check if it's a video file
        if (!file.type.startsWith("video/")) {
            toast.error("You can only upload a video")
            setError("Please upload a video file")
            return
        }

        // Create video element to check duration
        const videoEl = document.createElement("video")
        videoEl.preload = "metadata"
        videoEl.onloadedmetadata = () => {

            // Check if video is under 2 minutes
            if (videoEl.duration > 120) {
                setError("Video must be less than 2 minutes")
                return
            }
        }
        updateField("danceVideo", file)
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        handleFileChange(file)
    }

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0] || null
        handleFileChange(file)
    }

    return (
        <div>
            <p className="mb-2 text-[#958E9F] text-[10px] md:text-xs xl:text-sm">Upload dance video (Individual or Group)</p>
            <div className={`relative w-full h-80 rounded-md border-2 border-dashed ${isDragging ? "border-[#958E9F] bg-gray-300" : "bg-[#F2F1F3] border-[#B9B5C0]"
                } flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors`}
                onClick={handleBrowseClick} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                {data.danceVideo ? (
                    <div className="relative flex flex-col justify-center items-center w-full h-full">
                        <video src={URL.createObjectURL(data.danceVideo)} className="rounded max-w-full max-h-40" controls />
                        <p className="mt-2">{data.danceVideo?.name}</p>
                        <button onClick={(e) => { e.stopPropagation(); if (fileInputRef.current) { fileInputRef.current.value = "" }; updateField("danceVideo", null) }} className="mt-2 text-[10px] text-red-500 hover:text-red-700 md:text-xs xl:text-sm">
                            Remove video
                        </button>
                    </div>
                ) : (
                    <>
                        <Image src={gallery} alt="Video Icon" />
                        <p className="text-[#716A7C] text-center">
                            Drag and drop video or <span className="font-medium text-primaryPurple">Browse</span>
                        </p>
                        <p className="mt-1 text-[#958E9F] [8px]">(not more than 2 mins)</p>
                        {error && <p className="mt-2 text-red-500">{error}</p>}
                    </>
                )}

                <input type="file" ref={fileInputRef} onChange={handleInputChange} accept="video/*" className="hidden" aria-label="Upload dance video" />
            </div>
        </div>
    )
}

export function Form4() {

    //Store
    const { data, updateField } = useCompetitorFormStore();
    const maxText = 1500;

    return (
        <main>
            <label htmlFor="story" className="block text-[#4E4955] cursor-pointer">The story behind the video <span className="text-red-500">*</span></label>
            <textarea value={data.story} onChange={(e) => updateField("story", e.target.value)} placeholder="Write your story" required name="story" id="story" className="bg-inherit mt-2 px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple w-full h-60 placeholder:text-[#A7A1AF] duration-300 resize-none" disabled={data.story.length === maxText}></textarea>
            <span className="flex justify-end text-[#A7A1AF] text-[10px] md:text-xs xl:text-sm">{data.story.length}/{maxText}</span>
        </main>
    )
}

export function Form5() {

    //Store
    const { data, updateField } = useCompetitorFormStore();

    return (
        <main className='flex flex-col gap-y-5'>
            <Input type="number" placeholder='Enter years' label='How long have you been a dancer?' id='howLong' value={data.howLong.toString()} onChange={(e) => updateField("howLong", parseInt(e.target.value))} required />
            <Input type="text" placeholder='e.g ballet' label='What type of dance do you specialize in?' id='danceType' value={data.danceType} onChange={(e) => updateField("danceType", e.target.value)} required />
            <div>
                <label htmlFor="discover" className="block text-[#4E4955] cursor-pointer">How did you discover your passion for dance?<span className="text-red-500">*</span></label>
                <textarea value={data.discover} onChange={(e) => updateField("discover", e.target.value)} placeholder="Enter response" required name="discover" id="discover" className="bg-inherit mt-2 px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple w-full h-40 placeholder:text-[#A7A1AF] duration-300 resize-none"></textarea>
            </div>
        </main>
    )
}

export function Form6() {
    const { data, updateField } = useCompetitorFormStore();
    const maxText = 1500;
    const router = useRouter();
    const searchParams = useSearchParams();

    const [uploadFailed, setUploadFailed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    //Next page function
    const updatePage = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', "4");
        router.push(`?${params.toString()}`);
    };

    const handleFinalRegistration = async () => {

        toast.info("Uploading Details...");
        if (!checkAllField()) {
            toast.warning("Kindly fill all the required fields.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            if (data.profilePhoto) formData.append("profilePhoto", data.profilePhoto);
            if (data.danceVideo) formData.append("danceVideo", data.danceVideo);

            const { success, imageLinks, message } = await uploadFiles(formData);

            if (!success || !imageLinks) {
                setUploadFailed(true);
                toast.error(message || "Upload failed, please try again.");
                setLoading(false);
                return;
            }
            toast.success("Your Media files was uploaded successfully.")
            await makeApiRequest("/addUser", "post", { userDetails: data, imageLinks }, {
                onSuccess: () => {
                    toast.success("Your registration was successful.");
                    updatePage();
                },
                onError: (response) => {
                    toast.error(response.response.data.error);
                    router.push("/register");
                },
            });
        } catch (error) {
            console.error("Registration Error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
    };

    return (
        <main>
            <label htmlFor="why" className="block text-[#4E4955] cursor-pointer">
                Why should people vote for you?<span className="text-red-500">*</span>
            </label>
            <textarea value={data.why} onChange={(e) => updateField("why", e.target.value)} placeholder="Sell yourself" required name="why" id="why"
                className="bg-inherit mt-2 px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple w-full h-60 placeholder:text-[#A7A1AF] duration-300 resize-none"
                disabled={data.story.length === maxText}></textarea>
            <span className="flex justify-end text-[#A7A1AF] text-[10px] md:text-xs xl:text-sm">
                {data.why.length}/{maxText}
            </span>
            <div className="space-y-4 mt-4">
                {!uploadFailed ?
                    <Button type="button" text="I'm ready to win!" loading={loading} onClick={handleFinalRegistration} />
                    :
                    <Button type="button" text="Retry Upload & Register" loading={loading} onClick={handleFinalRegistration} />
                }
            </div>
        </main>
    );
}
