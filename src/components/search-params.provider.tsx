'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

type SearchParamsContextType = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(
	undefined,
);

export function SearchParamsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isOpenFromUrl = searchParams.get('expanded') === 'true';

	const [isOpen, setIsOpen] = useState(isOpenFromUrl);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (isOpen) {
			params.set('expanded', 'true');
		} else {
			params.delete('expanded');
		}
		router.replace(`?${params.toString()}`);
	}, [isOpen, router, searchParams]);

	return (
		<SearchParamsContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</SearchParamsContext.Provider>
	);
}

export function useSearchParamsContext() {
	const context = useContext(SearchParamsContext);
	if (!context) {
		throw new Error(
			'useSearchParamsContext must be used within a SearchParamsProvider',
		);
	}
	return context;
}
