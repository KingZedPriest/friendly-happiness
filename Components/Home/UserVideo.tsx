"use client";

import { useState } from "react";
import { Play } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";

const UserVideo = ({ videoSrc }: { videoSrc: string }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <div className="relative mt-10 w-full h-full">
            <video src={videoSrc} className="w-full h-full object-cover" controls autoPlay={isPlaying} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    >
                        <button
                            className="flex justify-center items-center bg-white shadow-lg p-4 rounded-full"
                            onClick={() => setIsPlaying(true)}
                        >
                            <Play size="32" color="#C53535" variant="Bold" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default UserVideo;
