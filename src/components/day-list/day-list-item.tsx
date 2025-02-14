import { DayItem } from '~/store';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function DayListItem({ item }: { item: DayItem }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{item.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{item.timestamp}</p>
			</CardContent>
		</Card>
	);
}
