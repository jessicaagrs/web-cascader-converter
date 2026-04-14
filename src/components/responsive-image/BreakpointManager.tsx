import type { ResponsiveImageConfig } from '../../types';

interface Props {
	readonly config: ResponsiveImageConfig;
	readonly onChange: (config: ResponsiveImageConfig) => void;
}

export function BreakpointManager({ config, onChange }: Props) {
	const sortedBreakpoints = [...config.breakpoints].sort((a, b) => a - b);

	const addBreakpoint = () => {
		const last = sortedBreakpoints.at(-1) ?? 320;
		const next = last + 320;
		onChange({ ...config, breakpoints: [...config.breakpoints, next] });
	};

	const removeBreakpoint = (bp: number) => {
		const next = config.breakpoints.filter(b => b !== bp);
		const newFallback =
			config.fallbackBreakpoint === bp
				? (next[Math.floor(next.length / 2)] ?? next[0])
				: config.fallbackBreakpoint;
		onChange({ ...config, breakpoints: next, fallbackBreakpoint: newFallback });
	};

	const updateBreakpoint = (oldBp: number, newBp: number) => {
		if (newBp < 1) return;
		onChange({
			...config,
			breakpoints: config.breakpoints.map(b => (b === oldBp ? newBp : b)),
			fallbackBreakpoint:
				config.fallbackBreakpoint === oldBp ? newBp : config.fallbackBreakpoint
		});
	};

	return (
		<div className='rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800/50'>
			<div className='mb-5 flex items-center justify-between'>
				<h3 className='text-base font-semibold text-zinc-900 dark:text-white'>
					Breakpoints
				</h3>
				<button
					type='button'
					onClick={addBreakpoint}
					className='inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='h-3.5 w-3.5'
						aria-hidden='true'>
						<line
							x1='12'
							y1='5'
							x2='12'
							y2='19'
						/>
						<line
							x1='5'
							y1='12'
							x2='19'
							y2='12'
						/>
					</svg>
					Adicionar
				</button>
			</div>

			<div className='flex flex-col gap-3'>
				<div className='grid grid-cols-[1fr_auto_auto] items-center gap-x-3 gap-y-0 pb-1'>
					<span className='text-xs font-medium text-zinc-500 dark:text-zinc-400'>
						Largura
					</span>
					<span className='text-xs font-medium text-zinc-500 dark:text-zinc-400'>
						src padrão
					</span>
					<span className='sr-only'>Ações</span>
				</div>

				{sortedBreakpoints.map(bp => (
					<div
						key={bp}
						className='grid grid-cols-[1fr_auto_auto] items-center gap-x-3'>
						<div className='flex items-center gap-2'>
							<input
								type='number'
								min={1}
								value={bp}
								onChange={e => updateBreakpoint(bp, Number(e.target.value))}
								aria-label={`Largura do breakpoint ${bp}px`}
								className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
							/>
							<span className='shrink-0 text-xs text-zinc-500'>px</span>
						</div>

						<div className='flex justify-center'>
							<input
								type='radio'
								name='fallback-bp'
								checked={config.fallbackBreakpoint === bp}
								onChange={() => onChange({ ...config, fallbackBreakpoint: bp })}
								aria-label={`Usar ${bp}px como src padrão`}
								className='h-4 w-4 accent-blue-500'
							/>
						</div>

						<button
							type='button'
							onClick={() => removeBreakpoint(bp)}
							disabled={config.breakpoints.length <= 1}
							aria-label={`Remover breakpoint ${bp}px`}
							className='rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-950/20'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-4 w-4'
								aria-hidden='true'>
								<line
									x1='18'
									y1='6'
									x2='6'
									y2='18'
								/>
								<line
									x1='6'
									y1='6'
									x2='18'
									y2='18'
								/>
							</svg>
						</button>
					</div>
				))}
			</div>

			<p className='mt-4 text-xs text-zinc-500 dark:text-zinc-400'>
				O radio <strong>src padrão</strong> define qual breakpoint é usado no
				atributo{' '}
				<code className='rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-700'>
					src
				</code>{' '}
				do{' '}
				<code className='rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-700'>
					{'<img>'}
				</code>
				.
			</p>
		</div>
	);
}
