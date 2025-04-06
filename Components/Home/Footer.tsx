import Image from "next/image";
import Link from "next/link";

//Image and Icons
import logo from "../../public/logo.svg";
import { Instagram, Facebook, Copyright } from "iconsax-react";

const Footer = () => {
    return (
        <main className="flex md:flex-row flex-col md:justify-center gap-y-5 md:gap-x-10 md:gap-y-0 xl:gap-x-20 bg-[#170B28] px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 py-20 text-white">
            <Image src={logo} alt="logo" className="w-14 sm:w-16 md:w-20 xl:w-24" />
            <section className="w-fit">
                <div className="flex justify-center gap-x-5 py-5 border-[#F9F7FD] border-y w-full text-white">
                    <Link href="https://www.instagram.com/theextraordinairetalented/profilecard/?igsh=am0yaHI1djkxcmZs"><Instagram variant="Bold" /></Link>
                    <Link href="https://www.facebook.com/share/1ZEdtHJvt8/"><Facebook variant="Bold" /></Link>
                </div>
                <p className="mt-2"><Copyright className="inline" size="18" /> 2025 Goldnueltalents. All rights reserved. | <Link href="">Terms & Conditions</Link> | <Link href="">Privacy Policy</Link></p>
            </section>
        </main>
    );
}

export default Footer;



