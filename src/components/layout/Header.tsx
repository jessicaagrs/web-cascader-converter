import type { TabId } from '../../types';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
	readonly activeTab: TabId;
	readonly onTabChange: (tab: TabId) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
	return (
		<header className='border-b border-zinc-200 bg-white transition-colors dark:border-zinc-700 dark:bg-zinc-900'>
			<div className='mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5'>
				<div className='flex items-center justify-between'>
					<a
						href='/'
						className='flex items-center gap-2'
						aria-label='Cascader Converter - Página inicial'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-7 w-7 text-blue-500'
							aria-hidden='true'>
							<polyline points='16 18 22 12 16 6' />
							<polyline points='8 6 2 12 8 18' />
						</svg>
						<span className='text-lg font-bold text-zinc-900 dark:text-white'>
							Cascader Converter
						</span>
					</a>
					<div className='sm:hidden'>
						<ThemeToggle />
					</div>
				</div>
				<div
					className='flex items-center gap-2'
					role='tablist'
					aria-label='Seções principais'>
					<button
						type='button'
						role='tab'
						id='tab-converter'
						aria-selected={activeTab === 'converter'}
						aria-controls='panel-converter'
						onClick={() => onTabChange('converter')}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
							activeTab === 'converter'
								? 'bg-blue-500 text-white'
								: 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
						}`}>
						Conversor
					</button>
					<button
						type='button'
						role='tab'
						id='tab-fluid-type'
						aria-selected={activeTab === 'fluid-type'}
						aria-controls='panel-fluid-type'
						onClick={() => onTabChange('fluid-type')}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
							activeTab === 'fluid-type'
								? 'bg-blue-500 text-white'
								: 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
						}`}>
						Tipografia Fluida
					</button>{' '}
					<button
						type='button'
						role='tab'
						id='tab-responsive-image'
						aria-selected={activeTab === 'responsive-image'}
						aria-controls='panel-responsive-image'
						onClick={() => onTabChange('responsive-image')}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
							activeTab === 'responsive-image'
								? 'bg-blue-500 text-white'
								: 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
						}`}>
						Imagem Responsiva
					</button>{' '}
					<div className='ml-2 hidden sm:block'>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	);
}
