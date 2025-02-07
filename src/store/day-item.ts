import { z } from "zod";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const dayItemSchema = z.object({
    timestamp: z.number(),
    name: z.string()
})

export type DayItem = z.infer<typeof dayItemSchema>

const dayItemsDataSchema = z.object({ dayItems: z.array(dayItemSchema) })

const dayItemsStoreSchema = dayItemsDataSchema.and(z.object({
    setDayItems: z.function().args(dayItemsDataSchema.shape.dayItems),
    addDayItem: z.function().args(dayItemSchema)
}))
// type DayItemsStore = z.infer<typeof dayItemsStoreSchema>

export const useDayItemStore = create<z.infer<typeof dayItemsStoreSchema>>(combine(
    { dayItems: [] as DayItem[] },
    (set) => ({
        setDayItems: (dayItems: DayItem[]) => {
            set(() => {
                return { dayItems }
            })
        },
        addDayItem: (dayItem: DayItem) => {
            set(state => {
                const newItems = [...state.dayItems]
                newItems.unshift(dayItem)
                return { dayItems: newItems }
            })
        }
    }))
)
