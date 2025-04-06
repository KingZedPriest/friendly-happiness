import Link from "next/link";

//Icons
import { Shield } from "lucide-react";


export default function UnauthorizedPage() {
    return (
        <div className="flex justify-center items-center bg-darkWhite min-h-dvh">
            <div className="text-center">
                <Shield className="mx-auto mb-4 w-16 h-16 text-darkBlack" />
                <h1 className="mb-4 font-bold text-darkBlack text-2xl md:text-3xl xl:text-4xl">Unauthorized Access</h1>
                <p className="mb-8 text-gray-500 text-xl">Sorry, you don&apos;t have permission to access this page.</p>
                <div>
                    <Link className="bg-primaryPurple hover:bg-softPurple px-8 py-3 rounded-lg duration-300" href="/">Go to Homepage</Link>
                </div>
            </div>
        </div>
    )
}

