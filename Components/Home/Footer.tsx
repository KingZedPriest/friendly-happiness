import Image from "next/image";
import Link from "next/link";

//Images
import logo from "../../public/logo.svg";

//Icons
import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 py-8 text-white">
            <div className="mx-auto px-6 container">
                <div className="flex md:flex-row flex-col justify-between items-center gap-6">
                    <div className="flex items-center space-x-3">
                        <Image src={logo} alt="logo" className="w-10 sm:w-12 md:w-14 xl:w-16" />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="https://www.instagram.com/theextraordinairetalented/profilecard/?igsh=am0yaHI1djkxcmZs" target="_blank" rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full hover:scale-110 transition-all duration-300" aria-label="Follow us on Instagram">
                            <Instagram className="size-5" />
                        </Link>
                        <Link href="https://www.facebook.com/share/1ZEdtHJvt8/" target="_blank" rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full hover:scale-110 transition-all duration-300" aria-label="Follow us on Facebook">
                            <Facebook className="size-5" />
                        </Link>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-purple-200">
                            © {new Date().getFullYear()} Goldnuel Talents. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}