
//SideBar NavItem
declare type NavItem = {
    href: string;
    icon: React.ElementType;
    currentPath: string;
    label: string;
}

//Competitor Data
declare type CompetitorFormData = {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    profilePhoto: File | null;
    aboutYou: string;
    danceVideo: File | null;
    story: string;
    howLong: number;
    danceType: string;
    discover: string;
    why: string;
};

//Admin Data
declare type Admin = {
    id: string;
    email: string;
    hashedPassword: string;
    encryptedPassword: string;
    role: "admin" | "super_admin";
    suspended: boolean;
    createdAt: Date;
}

//Dashboard Summary Box
declare type SummaryProps = {
    title: string;
    icon: React.ElementType;
    color: string;
    amount: number;
    time: DateTime | string;
}

//Dashboard Chart Data
declare type ChartProps = {
    votesToday: number;
    votesYesterday: number;
    totalUsers6Months: number;
}

//Dashboard Transaction
declare type TransactionProps = {
    fullName: string;
    createdAt: string;
    paidAmount: number;
}

//Dashboard Table
declare type VoteTableData = {
    createdAt: Date;
    customUserId: string | null;
    fullName: string | null;
    voteCount: number;
}

//Second Header
type PageHeaderProps = {
    title: string;
    totalCount: number;
    buttonText: string;
    buttonLink: string;
    icon: React.ElementType;
    subText?: string;
}

//Competition Type
type CompetitionData = {
    name: string;
    id: string;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    isOnGoing: boolean;
    isAcceptingContestants: boolean;
}

//Drawer Component
declare type DrawerProps = {
    isOpen: boolean
    onClose?: () => void
    children: ReactNode
    className?: string
}

//Competition FormData
declare type CompetitionFormData = {
    name: string;
    startDate: DateTime;
    endDate: DateTime;
    isOnGoing?: boolean;
}

//Round FormData
declare type RoundFormData = {
    roundName: string;
    votingStart: string;
    votingEnd: string;
    acceptingVote: boolean;
}

//Round Data
declare type RoundData = {
    id: string;
    createdAt: Date;
    competitionId: string;
    roundName: string;
    votingStart: Date;
    votingEnd: Date;
    totalVotes: number;
    acceptingVote: boolean;
}

//Entries Data
declare type EntriesData = {
    user: {
        fullName: string;
        customUserId: string;
        danceVideo: string;
    };
    userId: string;
    voteCount: number;
    id: string
}

//Contestants Data
declare type Contestants = {
    id: string;
    email: string;
    fullName: string;
    customUserId: string;
    phoneNumber: string;
    profilePhoto: string;
    aboutYou: string;
    story: string;
    howLong: string;
    danceType: string;
    discover: string;
    why: string;
    danceVideo: string;
    isApproved: boolean;
    hasPaid: boolean;
    transactionId: string | null;
    createdAt: Date;
}

//Meta Page Data
declare type MetaData = {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    page: number;
    total: number;
    totalPages: number;
}

//Summary Entry Data
declare type SummaryEntryData = {
    competition: {
        name: string;
    };
    Round: {
        roundName: string;
    };
    user: {
        fullName: string;
    }
    id: string;
    createdAt: Date;
    userId: string;
    competitionId: string;
    voteCount: number;
    roundId: string
}

//Summary Rounds Data
declare type SummaryRoundData = {
    competition: {
        name: string;
    };
    id: string;
    createdAt: Date;
    competitionId: string;
    roundName: string;
    votingStart: Date;
    votingEnd: Date;
    totalVotes: number;
    acceptingVote: boolean;
}

//Summary Votes Data
declare type SummaryVoteData = {
    entry: {
        user: {
            fullName: string;
            customUserId: string;
        }
    };
    id: string;
    createdAt: Date;
    entryId: string;
    amountPaid: number;
    votesGiven: number;
    transactionId: string;
}

//HomePage Entries
declare type HomePageEntries = {
    user: {
        fullName: string;
        customUserId: string;
        profilePhoto: string;
        howLong: string;
        danceVideo: string;
    };
    voteCount: number;
}