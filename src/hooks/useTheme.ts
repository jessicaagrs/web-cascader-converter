import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
	const stored = localStorage.getItem('cascader-theme') as Theme | null;
	if (stored === 'light' || stored === 'dark') return stored;
	return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('cascader-theme', theme);
	}, [theme]);

	const toggle = useCallback(() => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
	}, []);

	return { theme, toggle } as const;
}
