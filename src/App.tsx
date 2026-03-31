import { useState } from 'react';
import { ConverterPanel } from './components/converter/ConverterPanel';
import { FluidTypePanel } from './components/fluid-type/FluidTypePanel';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import type { TabId } from './types';

export default function App() {
	const [activeTab, setActiveTab] = useState<TabId>('converter');

	return (
		<div className='flex min-h-screen flex-col bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-white'>
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-white'>
				Pular para o conteúdo principal
			</a>
			<Header
				activeTab={activeTab}
				onTabChange={setActiveTab}
			/>
			<main
				id='main-content'
				className='mx-auto w-full max-w-5xl flex-1 px-4 py-8'>
				{activeTab === 'converter' && <ConverterPanel />}
				{activeTab === 'fluid-type' && <FluidTypePanel />}
			</main>
			<Footer />
		</div>
	);
}
