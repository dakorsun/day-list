import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form';
import { DEFAULT_ITEM_NAME, useDayItemStore } from '~/store';
import React, { useCallback } from 'react';

const formSchema = z.object({
	name: z.string().min(2).max(20),
});

export function CheckpointForm({
	ignoreRef,
}: {
	ignoreRef: React.RefObject<HTMLFormElement>;
}) {
	const addDayItem = useDayItemStore(state => state.addDayItem);
	const updateLastItem = useDayItemStore(state => state.updateLastItem);
	const lastItem = useDayItemStore(state => state.dayItems[0]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const proceedCheckpoint = useCallback(
		(name: string) => {
			if (lastItem) {
				updateLastItem({ name, timestamp: lastItem.timestamp });
			}
			addDayItem({ name: DEFAULT_ITEM_NAME, timestamp: new Date().getTime() });
		},
		[lastItem, updateLastItem, addDayItem],
	);

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log('submit', values);
		proceedCheckpoint(values.name);
		form.resetField('name');
	}

	return (
		<Form {...form}>
			<form
				ref={ignoreRef}
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel> What were you up to?</FormLabel>
							<FormControl>
								<Input placeholder="Your stuff" {...field} />
							</FormControl>
							<FormDescription>
								Fix what you spent time on and timer will reset
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Cut</Button>
			</form>
		</Form>
	);
}
