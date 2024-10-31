'use client'

import { useState, useEffect, useMemo } from "react";

interface TimeProps {
    startingMilliseconds: number
}

export function TimeComponent({ startingMilliseconds }: TimeProps) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const tracker = useMemo<Date>(() => {
        return new Date(currentDate.getTime() - startingMilliseconds)
    }, [currentDate, startingMilliseconds])

    useEffect(() => {
        const updateTime = () => {
            const date = new Date()
            setCurrentDate(date);
        };

        updateTime();
        const timer = setInterval(updateTime, 500);

        return () => clearInterval(timer);
    }, []);

    return <div className="
        w-1/4
        flex flex-row justify-between 
        font-bold text-5xl
        ">
        <span>{currentDate.getHours()}:{currentDate.getMinutes()}</span>
        |
        <span>{tracker.getUTCHours()}:{tracker.getUTCHours()}:{tracker.getUTCSeconds()}</span>
    </div>

}
