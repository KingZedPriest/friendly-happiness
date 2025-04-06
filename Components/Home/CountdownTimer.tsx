"use client"

import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: string | Date }) => {
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="flex gap-x-10 mt-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <section key={unit} className="flex flex-col items-center gap-y-3">
                    <div className="place-items-center grid bg-[#CEEAA585] rounded-[50%] size-10">
                        {value}
                    </div>
                    <p className="capitalize">{unit}</p>
                </section>
            ))}
        </main>
    );
};

export default CountdownTimer;