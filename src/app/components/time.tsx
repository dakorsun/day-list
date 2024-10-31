'use client'

import { useState, useEffect, useMemo } from "react";

function formatSingleDigits(digits: number): string {
    return digits < 10 ? `0${digits}` : `${digits}`
}

interface TimeProps {
    startingMilliseconds: number | null
}

export function TimeComponent({ startingMilliseconds }: TimeProps) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const tracker = useMemo<Date>(() => {
        if (!startingMilliseconds) {
            return new Date(0)
        }
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
        flex flex-row justify-between 
        font-bold
        ">
        <span>{formatSingleDigits(currentDate.getHours())}:{formatSingleDigits(currentDate.getMinutes())}</span>
        |
        <span>{formatSingleDigits(tracker.getUTCHours())}:{formatSingleDigits(tracker.getUTCMinutes())}:{formatSingleDigits(tracker.getUTCSeconds())}</span>
    </div>

}
