import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete } from './autocomplete';

const formSchema = z.object({
	name: z.string().min(2).max(20),
});

export function CheckpointForm({
	ignoreRef,
	ignoreAutocompleteRef,
}: {
	ignoreRef: React.RefObject<HTMLFormElement>;
	ignoreAutocompleteRef: React.RefObject<HTMLDivElement>;
}) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<string>('');
	const items = useDayItemStore(state => state.dayItems);
	const addDayItem = useDayItemStore(state => state.addDayItem);
	const updateLastItem = useDayItemStore(state => state.updateLastItem);
	const lastItem = useDayItemStore(state => state.dayItems[0]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [itemsMap, options] = useMemo(() => {
		const itemsMap = items
			? items.reduce<Map<string, number>>((acc, item) => {
					const currentNum = acc.get(item.name) ?? 0;
					acc.set(item.name, currentNum + 1);
					return acc;
				}, new Map())
			: new Map<string, number>();

		const options = [...itemsMap.entries()]
			.sort((a, b) => {
				return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
			})
			.filter(
				item => item[0] !== DEFAULT_ITEM_NAME && item[0].includes(searchValue),
			)
			.map(item => ({ value: item[0], label: item[0] }));
		console.log(options);
		return [itemsMap, options];
	}, [items, searchValue]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	useEffect(() => {
		form.setValue('name', selectedValue);
	}, [selectedValue, form]);

	useEffect(() => {
		if (searchValue) {
			form.setValue('name', searchValue);
		}
	}, [searchValue, form]);

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
					render={() => (
						<FormItem>
							<FormLabel> What were you up to?</FormLabel>
							<FormControl>
								<AutoComplete
									ignoreRef={ignoreAutocompleteRef}
									placeholder="Your stuff"
									items={options}
									emptyMessage="No such writes"
									isLoading={false}
									selectedValue={selectedValue}
									onSelectedValueChange={setSelectedValue}
									searchValue={searchValue}
									onSearchValueChange={setSearchValue}
								/>
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
