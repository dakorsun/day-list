'use client'

import { useState, useEffect } from "react";
import { useDayItemStore } from "~/store";

function formatSingleDigits(digits: number): string {
    return digits < 10 ? `0${digits}` : `${digits}`
}

function Counter({ now }: { now: Date }) {

    const lastItem = useDayItemStore(state => state.dayItems[0])
    const addDayItem = useDayItemStore(state => state.addDayItem)

    if (!lastItem) {
        function addNewDayItem() {
            addDayItem({ name: 'unknown', timestamp: new Date().getTime() })
        }
        return <div className="cursor-pointer text-amber-400" onClick={addNewDayItem}>Start Tracking</div>
    } else {
        const newDate = new Date(now.getTime() - lastItem.timestamp)

        return (<span>{formatSingleDigits(newDate.getUTCHours())}:{formatSingleDigits(newDate.getUTCMinutes())}:{formatSingleDigits(newDate.getUTCSeconds())}</span>)
    }

}

export function TimeBoard() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())

    useEffect(() => {
        const updateTime = () => {
            setCurrentDate(new Date());
        };

        const interval = setInterval(updateTime, 500);

        return () => clearInterval(interval);
    });

    return <div className="
        flex flex-row justify-between 
        font-bold
        ">
        <span>{formatSingleDigits(currentDate.getHours())}:{formatSingleDigits(currentDate.getMinutes())}</span>
        |
        <Counter now={currentDate} />
    </div>

}
