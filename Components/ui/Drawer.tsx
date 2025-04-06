
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { Add } from "iconsax-react"


export default function Drawer({ isOpen, onClose, children, className = "" }: DrawerProps) {

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="z-40 fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[95vh] overflow-y-auto border border-red-950 bg-darkBlack p-6 ${className}`}>
                        <button onClick={onClose} className="top-6 right-2 absolute p-1 text-white transition-colors" aria-label="Close drawer">
                            <Add className="rotate-45" size={24} />
                        </button>
                        <div className="bg-darkBlack mt-10">
                            {children}
                        </div>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    )
}

