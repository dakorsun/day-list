'use client';

import React, { useState, useEffect } from 'react';
import { DEFAULT_ITEM_NAME, useDayItemStore } from '~/store';

function formatSingleDigits(digits: number): string {
	return digits < 10 ? `0${digits}` : `${digits}`;
}

function Counter({
	now,
	ignoreRef,
}: {
	now: Date;
	ignoreRef: React.RefObject<HTMLDivElement>;
}) {
	const lastItem = useDayItemStore(state =>
		state.dayItems ? state.dayItems[0] : null,
	);
	const hasHydrated = useDayItemStore(state => state._hasHydrated);
	const setDayItems = useDayItemStore(state => state.setDayItems);

	if (!hasHydrated) {
		return <div className="cursor-pointer text-muted-foreground">Loading</div>;
	}

	if (!lastItem) {
		function addNewDayItem() {
			if (setDayItems) {
				setDayItems([
					{ name: DEFAULT_ITEM_NAME, timestamp: new Date().getTime() },
				]);
			}
		}
		return (
			<div
				ref={ignoreRef}
				className="cursor-pointer text-chart-1"
				onClick={addNewDayItem}
			>
				Start Tracking
			</div>
		);
	}

	const tracker = new Date(now.getTime() - lastItem.timestamp);

	return (
		<div>
			{formatSingleDigits(tracker.getUTCHours())}:
			{formatSingleDigits(tracker.getUTCMinutes())}:
			{formatSingleDigits(tracker.getUTCSeconds())}
		</div>
	);
}

export function TimeBoard({
	ignoreRef,
}: {
	ignoreRef: React.RefObject<HTMLDivElement>;
}) {
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

	useEffect(() => {
		const updateTime = () => {
			setCurrentDate(new Date());
		};

		const interval = setInterval(updateTime, 500);

		return () => clearInterval(interval);
	});

	return (
		<div
			className="
        flex flex-row justify-between
        font-bold
        cursor-pointer
        "
		>
			<span>
				{formatSingleDigits(currentDate.getHours())}:
				{formatSingleDigits(currentDate.getMinutes())}
			</span>
			|
			<Counter now={currentDate} ignoreRef={ignoreRef} />
		</div>
	);
}
