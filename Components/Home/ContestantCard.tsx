import Link from "next/link";

//Components and Utils
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { formatDate } from "@/utils/time";

//Icons
import { CheckCircle, Calendar } from "lucide-react";


export default function ContestantCard({ entry }: { entry: HomePageEntries }) {

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const truncateStory = (story: string, maxLength = 100) => {
        if (story.length <= maxLength) return story
        return story.slice(0, maxLength) + "..."
    }

    return (
        <Card className="group bg-white/80 shadow-lg hover:shadow-xl backdrop-blur-sm border-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative">
                <div className="relative bg-gradient-to-br from-purple-400 to-pink-400 h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <video src={entry.user.danceVideo} controls></video>
                    </div>

                    <div className="top-3 right-3 absolute flex gap-2">
                        <Badge className={"bg-green-500 hover:bg-green-600 text-white border-0"}>
                            <CheckCircle className="mr-1 w-3 h-3" /> Approved
                        </Badge>
                    </div>
                </div>

                <div className="-bottom-8 left-6 absolute">
                    <Avatar className="shadow-lg border-4 border-white size-12 md:size-14 xl:size-16">
                        <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white">
                            {getInitials(entry.user.fullName)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <CardContent className="px-6 pt-12 pb-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 text-base md:text-lg xl:text-xl transition-colors">
                            {entry.user.fullName}
                        </h3>
                        <p className="text-gray-500">ID: {entry.user.customUserId}</p>
                    </div>

                    <p className="text-[10px] text-gray-600 md:text-xs xl:text-sm leading-relaxed">{truncateStory(entry.user.story)}</p>

                    <div className="flex items-center text-[10px] text-gray-500 md:text-xs xl:text-sm">
                        <Calendar className="mr-2 size-4" />
                        Registered {formatDate(entry.user.createdAt)}
                    </div>

                    <Link  href={`/${entry.user.customUserId}`} className="flex justify-between items-center pt-2 border-gray-100 border-t">
                        <div className="flex items-center gap-4 text-gray-500 text-xs">
                            <span>Click to view details</span>
                        </div>
                        <div className="font-semibold text-purple-600 group-hover:text-purple-700 text-xs">View Profile →</div>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
