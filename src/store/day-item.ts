import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const DAY_ITEM_STORE = 'DAY_ITEM_STORE';
export const DEFAULT_ITEM_NAME = 'UNKNOWN';

export const dayItemSchema = z.object({
	timestamp: z.number(),
	name: z.string(),
});

export type DayItem = z.infer<typeof dayItemSchema>;

const dayItemsDataSchema = z.object({
	dayItems: z.array(dayItemSchema),
	_hasHydrated: z.boolean(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dayItemsStoreSchema = dayItemsDataSchema.extend({
	setDayItems: z
		.function()
		.args(dayItemsDataSchema.shape.dayItems)
		.returns(z.void()),
	addDayItem: z.function().args(dayItemSchema).returns(z.void()),
	updateLastItem: z.function().args(dayItemSchema).returns(z.void()),
	setHasHydrated: z.function().args(z.boolean()).returns(z.void()),
});
type DayItemsStore = z.infer<typeof dayItemsStoreSchema>;

export const useDayItemStore = create(
	persist<DayItemsStore>(
		(set, get) => ({
			dayItems: [],
			_hasHydrated: false,
			setDayItems: (dayItems: DayItem[]) => {
				set({ dayItems });
			},
			addDayItem: (dayItem: DayItem) => {
				const newItems = [...get().dayItems];
				newItems.unshift(dayItem);
				set({ dayItems: newItems });
			},
			updateLastItem: (dayItem: DayItem) => {
				const newItems = [...get().dayItems];
				if (newItems.length < 1) throw new Error('Items list is empty');
				newItems[0] = dayItem;
				set({ dayItems: newItems });
			},
			setHasHydrated: state => {
				set({
					_hasHydrated: state,
				});
			},
		}),
		{
			name: DAY_ITEM_STORE,
			onRehydrateStorage: state => {
				return () => state.setHasHydrated(true);
			},
		},
	),
);
