import { useDayItemStore } from '~/store';
import { DayListItem } from './day-list-item';

export function DayList() {
	const items = useDayItemStore(state => state.dayItems);
	return (
		<div className="grid grid-cols-3 grid-rows-3 gap-4">
			{items.map(item => (
				<DayListItem item={item} key={item.timestamp} />
			))}
		</div>
	);
}
