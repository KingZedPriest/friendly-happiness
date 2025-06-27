//Server Actions
import getContestant from "@/actions/fetch/getContestant";
import getRandomContestants from "@/actions/fetch/getThreeContestants";

//Components
import ErrorPage from "@/Components/Admin/LoadingError";
import VotePage from "@/Components/Home/VotePage";
import RandomContestants from "@/Components/Home/RandomContestants";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

//Utils
import { formatDate } from "@/utils/time";

//Icons
import { CalendarDays, Mail, Phone, User, Video, FileText, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link";

// Helper Functions
const getInitials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

const maskEmail = (email: string) => {
    const [user, domain] = email.split("@")
    const maskedUser = user[0] + "*".repeat(user.length - 1)
    const [domainName, domainExt] = domain.split(".")
    const maskedDomain = domainName[0] + "*".repeat(domainName.length - 1)
    return `${maskedUser}@${maskedDomain}.${domainExt}`
}

const maskPhoneNumber = (phone: string) => `**** *** ${phone.slice(-4)}`

export const revalidate = 0

const page = async ({ params }: { params: { id: string } }) => {

    const { success, user } = await getContestant(params.id)
    const { successful, data } = await getRandomContestants()

    if (!success || !user) {
        return (
            <ErrorPage message="Contestant Not Found" description="We were unable to locate the contestant you are looking for." />
        )
    }

    return (
        <div className="bg-gray-100 min-h-dvh text-lightBlack">
            <div className="flex flex-col gap-y-8 mx-auto p-4 max-w-5xl">
                <div className="bg-white shadow-sm border rounded-lg">
                    <div className="bg-gradient-to-r from-[#5E2CA5] to-[#7C3AED] p-4 md:p-6 xl:p-8 rounded-t-lg">
                        <div className="flex items-start sm:items-center space-x-4">
                            <Avatar className="border-4 border-white size-16 md:size-20 xl:size-24">
                                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.fullName} />
                                <AvatarFallback className="bg-white font-bold text-[#5E2CA5] text-lg md:text-xl xl:text-2xl">
                                    {getInitials(user.fullName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-white">
                                <h1 className="mb-2 font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl">{user.fullName}</h1>
                                <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-3">
                                    <Badge variant={user.isApproved ? "default" : "destructive"} className={user.isApproved ? "bg-green-500 hover:bg-green-600 w-fit" : ""}>
                                        {user.isApproved ? (
                                            <> <CheckCircle className="mr-1 size-4" /> Approved </>
                                        ) : (
                                            <> <XCircle className="mr-1 size-4" /> Pending Approval</>
                                        )}
                                    </Badge>
                                    <span className="opacity-90 text-sm">ID: {user.customUserId}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="gap-6 grid md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-[#5E2CA5]">
                                <User className="mr-2 size-5" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail className="size-4 text-gray-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Email</p>
                                    <p className="font-medium">{maskEmail(user.email)}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center space-x-3">
                                <Phone className="size-4 text-gray-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Phone Number</p>
                                    <p className="font-medium">{maskPhoneNumber(user.phoneNumber)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-[#5E2CA5]">
                                <FileText className="mr-2 size-5" />
                                Account Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <CalendarDays className="size-4 text-gray-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Member Since</p>
                                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center space-x-3">
                                <User className="size-4 text-gray-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">System ID</p>
                                    <p className="bg-gray-100 px-2 py-1 rounded font-mono font-medium text-xs">{user.customUserId}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-[#5E2CA5]">
                            <FileText className="mr-2 size-5" />
                            Personal Story
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">{user.story}</p>
                    </CardContent>
                </Card>

                {user.danceVideo && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-[#5E2CA5]">
                                <Video className="mr-2 size-5" />
                                Dance Video
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center bg-gray-200 rounded-lg aspect-video">
                                <div className="text-center">
                                    <Video className="mx-auto mb-2 w-12 h-12 text-gray-400" />
                                    <p className="mb-4 text-gray-500">Video Preview</p>
                                    <Link href={user.danceVideo} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center bg-[#5E2CA5] hover:bg-[#4A1F85] px-4 py-2 rounded-md text-white transition-colors">
                                        <Video className="mr-2 size-4" />
                                        Watch Video
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-2">
                            <VotePage userId={user.id} customUserId={user.customUserId} />
                        </div>
                    </Card>
                )}
                <h2 className="bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 font-bold text-transparent text-lg sm:text-xl md:text-2xl xl:text-3xl text-center">
                    Meet Other Amazing Performers
                </h2>
                {
                    successful && data ? (
                        <RandomContestants randomEntries={data} />
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-gray-600">Loading more contestants...</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default page;