import Link from "next/link";

//Actions
import getContestant from "@/actions/fetch/getContestant";
import getRandomContestants from "@/actions/fetch/getThreeContestants";

//Components
import ErrorPage from "@/Components/Admin/LoadingError";
import VotePage from "@/Components/Home/VotePage";

//Icons and Images
import RandomContestants from "@/Components/Home/RandomContestants";

//Components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";

//Icons
import { CheckCircle, XCircle, CreditCard, Calendar, Mail, Phone, FileText, Video, Hash, Receipt, User, X } from "lucide-react";

export const revalidate = 0;
const page = async ({ params }: { params: { id: string } }) => {

    const customUserId = params.id;
    const { success, user } = await getContestant(customUserId);
    const { successful, data } = await getRandomContestants();

    if (!success || user === null) {
        return (
            <ErrorPage message="Contestant Not Found" description={"We were unable to locate the contestant you are looking for."} />
        )
    }

    //Functions
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    function maskEmail(email: string) {
        const [user, domain] = email.split('@');
        const maskedUser = user[0] + '*'.repeat(user.length - 1);
        const [domainName, domainExt] = domain.split('.');
        const maskedDomain = domainName[0] + '*'.repeat(domainName.length - 1);
        return `${maskedUser}@${maskedDomain}.${domainExt}`;
    }

    function maskPhoneNumber(phone: string) {
        const last4 = phone.slice(-4);
        return `**** *** ${last4}`;
    }

    return (
        <Dialog>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex justify-between">
                    <DialogTitle className="bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-transparent text-lg md:text-xl xl:text-2xl">
                        Contestant Details
                    </DialogTitle>
                    <Link href="/"><X className="size-4 text-red-400 hover:text-red-600 duration-300" /></Link>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex md:flex-row flex-col items-start gap-6">
                        <div className="flex-shrink-0">
                            <Avatar className="shadow-lg border-4 border-purple-200 w-24 h-24">
                                <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white text-2xl">
                                    {getInitials(user.fullName)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h2 className="font-bold text-gray-900 text-xl md:text-xl lg:text-2xl xl:text-3xl">{user.fullName}</h2>
                                <p className="flex items-center gap-2 mt-1 text-gray-600">
                                    <Hash className="size-4" />
                                    {user.customUserId}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Badge className={`${user.isApproved ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white border-0 px-3 py-1`}>
                                    {user.isApproved ? (
                                        <CheckCircle className="mr-2 size-4" />
                                    ) : (
                                        <XCircle className="mr-2 size-4" />
                                    )}
                                    {user.isApproved ? "Approved" : "Pending Approval"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="gap-6 grid md:grid-cols-2">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm md:text-base xl:text-lg">
                                <User className="size-5 text-purple-600" />
                                Contact Information
                            </h3>

                            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Mail className="size-4 text-gray-500" />
                                    <span className="text-gray-700">{maskEmail(user.email)}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="size-4 text-gray-500" />
                                    <span className="text-gray-700">{maskPhoneNumber(user.phoneNumber)}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="size-4 text-gray-500" />
                                    <span className="text-gray-700">Registered: {formatDate(user.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm md:text-base xl:text-lg">
                                <Receipt className="size-5 text-purple-600" />
                                Payment Details
                            </h3>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm md:text-base xl:text-lg">
                            <FileText className="size-5 text-purple-600" />
                            Contestant Story
                        </h3>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{user.story}</p>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm md:text-base xl:text-lg">
                            <Video className="size-5 text-purple-600" />
                            Dance Video
                        </h3>
                        <div className="bg-gray-100 p-6 rounded-lg text-center">
                            <Video className="mx-auto mb-4 size-16 text-gray-400" />
                            <p className="mb-4 text-gray-600">Video file: {user.danceVideo}</p>
                            <button className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-pink-600 hover:to-pink-700">
                                Play Video
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm md:text-base xl:text-lg">
                            <CreditCard className="size-5 text-purple-600" />
                            Voting Section
                        </h3>
                        <VotePage userId={user.id} customUserId={user.customUserId} />
                    </div>

                    <section>
                        <h1 className="my-8 font-urbanist font-bold text-[#19171C] text-2xl sm:text-3xl md:text-4xl xl:text-5xl">Meet the Contestants!</h1>
                        {successful && <RandomContestants randomEntries={data!} />}
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default page;

