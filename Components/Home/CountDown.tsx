

import CountdownTimer from "./CountdownTimer";


const CountDown = ({ votingEnd }: { votingEnd: Date }) => {
    return (
        <main className="mt-10">
            <div className="relative font-urbanist">
                <div className="relative flex md:flex-row flex-col md:justify-between md:items-center gap-y-5 md:gap-y-0 bg-[#271244] px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-24 xl:px-20 py-16 w-full bgImage1">
                    <h1 className="w-full md:w-[45%] lg:w-[48%] max-w-[13ch] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">The Countdown is On!</h1>
                    <div className="flex flex-col gap-y-3 w-full md:w-[45%] lg:w-[48%]">
                        <p className="max-w-[45ch] text-[#F9F7FD] text-sm sm:text-base md:text-lg xl:text-xl">Time is running out!  Every second counts as the competition heats up. Who will take the top spot? Keep voting, </p>
                        <CountdownTimer targetDate={votingEnd} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CountDown;