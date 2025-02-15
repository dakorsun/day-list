import { useDayItemStore } from '~/store';
import { DayListItem } from './day-list-item';

export function DayList() {
	const items = useDayItemStore(state => state.dayItems);
	return (
		<div
			className="
			w-full
			py-[1rem]
			px-[1rem] lg:px-[2rem] xl:px-[20rem]
			grid
			grid-cols-1  xl:grid-cols-2 xl:grid-rows-3
			grid-rows-3
			gap-[1rem] xl:gap-[2rem]"
		>
			{items.map(item => (
				<DayListItem item={item} key={item.timestamp} />
			))}
		</div>
	);
}
