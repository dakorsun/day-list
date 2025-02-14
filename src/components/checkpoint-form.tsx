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

const formSchema = z.object({
	name: z.string().min(2).max(20),
});

export function CheckpointForm({
	onCheckpoint,
}: {
	onCheckpoint: (chekpoint: string) => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log('submit', values);
		onCheckpoint(values.name);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
