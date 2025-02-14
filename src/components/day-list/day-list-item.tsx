import { DayItem, DEFAULT_ITEM_NAME } from '~/store';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatSingleDigits } from '../time-board';

export function DayListItem({ item }: { item: DayItem }) {
	const time = new Date(item.timestamp);
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-weight-700">
					{item.name === DEFAULT_ITEM_NAME ? 'Current' : item.name}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<h3>From: </h3>
				<div>
					{formatSingleDigits(time.getUTCHours())}:
					{formatSingleDigits(time.getUTCMinutes())}:
					{formatSingleDigits(time.getUTCSeconds())}
				</div>
			</CardContent>
		</Card>
	);
}
