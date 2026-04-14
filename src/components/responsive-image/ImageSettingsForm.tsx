import type {
	ImageFallbackFormat,
	ImageFormat,
	LoadingStrategy,
	ResponsiveImageConfig
} from '../../types';

interface Props {
	readonly config: ResponsiveImageConfig;
	readonly onChange: (config: ResponsiveImageConfig) => void;
}

export function ImageSettingsForm({ config, onChange }: Props) {
	const update = <K extends keyof ResponsiveImageConfig>(
		key: K,
		value: ResponsiveImageConfig[K]
	) => {
		onChange({ ...config, [key]: value });
	};

	return (
		<div className='rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800/50'>
			<h3 className='mb-5 text-base font-semibold text-zinc-900 dark:text-white'>
				Configurações da imagem
			</h3>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-1.5'>
					<label
						htmlFor='ri-name'
						className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						Nome da imagem
					</label>
					<input
						id='ri-name'
						type='text'
						value={config.imageName}
						onChange={e => update('imageName', e.target.value.trim())}
						placeholder='hero'
						className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
					/>
					<p className='text-xs text-zinc-500 dark:text-zinc-400'>
						Ex: "hero" gera{' '}
						<code className='rounded bg-zinc-100 px-1 dark:bg-zinc-700'>
							hero-480.jpg
						</code>
						,{' '}
						<code className='rounded bg-zinc-100 px-1 dark:bg-zinc-700'>
							hero-1280.jpg
						</code>
						…
					</p>
				</div>

				<div className='flex flex-col gap-1.5'>
					<label
						htmlFor='ri-alt'
						className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						Texto alternativo (alt)
					</label>
					<input
						id='ri-alt'
						type='text'
						value={config.alt}
						onChange={e => update('alt', e.target.value)}
						placeholder='Descrição da imagem'
						className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
					/>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='ri-width'
							className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
							Largura máxima (px)
						</label>
						<input
							id='ri-width'
							type='number'
							min={1}
							value={config.width}
							onChange={e =>
								update('width', Math.max(1, Number(e.target.value)))
							}
							className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='ri-height'
							className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
							Altura máxima (px)
						</label>
						<input
							id='ri-height'
							type='number'
							min={1}
							value={config.height}
							onChange={e =>
								update('height', Math.max(1, Number(e.target.value)))
							}
							className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<span className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						Carregamento
					</span>
					<div className='flex gap-2'>
						{(['lazy', 'eager'] as LoadingStrategy[]).map(strategy => (
							<button
								key={strategy}
								type='button'
								onClick={() => update('loading', strategy)}
								className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
									config.loading === strategy
										? 'bg-blue-500 text-white'
										: 'border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700'
								}`}>
								{strategy}
							</button>
						))}
					</div>
					{config.loading === 'eager' && (
						<label className='flex cursor-pointer items-center gap-2'>
							<input
								type='checkbox'
								checked={config.useFetchPriority}
								onChange={e => update('useFetchPriority', e.target.checked)}
								className='h-4 w-4 rounded border-zinc-300 accent-blue-500'
							/>
							<span className='text-sm text-zinc-700 dark:text-zinc-300'>
								Adicionar{' '}
								<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
									fetchpriority="high"
								</code>{' '}
								<span className='text-zinc-500'>(LCP)</span>
							</span>
						</label>
					)}
				</div>

				<div className='flex flex-col gap-2'>
					<span className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						Formatos modernos{' '}
						<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
							{'<source>'}
						</code>
					</span>
					<div className='flex gap-4'>
						{(['avif', 'webp'] as ImageFormat[]).map(format => (
							<label
								key={format}
								className='flex cursor-pointer items-center gap-2'>
								<input
									type='checkbox'
									checked={config.formats.includes(format)}
									onChange={() => {
										const current = config.formats;
										const next = current.includes(format)
											? current.filter(f => f !== format)
											: [...current, format];
										update('formats', next);
									}}
									className='h-4 w-4 rounded border-zinc-300 accent-blue-500'
								/>
								<span className='text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase'>
									{format}
								</span>
							</label>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<span className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						Formato de fallback{' '}
						<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
							{'<img>'}
						</code>
					</span>
					<div className='flex gap-2'>
						{(['jpg', 'png', 'webp'] as ImageFallbackFormat[]).map(format => (
							<button
								key={format}
								type='button'
								onClick={() => update('fallbackFormat', format)}
								className={`rounded-lg px-4 py-2 text-sm font-medium uppercase transition-colors ${
									config.fallbackFormat === format
										? 'bg-blue-500 text-white'
										: 'border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700'
								}`}>
								{format}
							</button>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-1.5'>
					<label
						htmlFor='ri-sizes'
						className='text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						Atributo{' '}
						<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
							sizes
						</code>
					</label>
					<input
						id='ri-sizes'
						type='text'
						value={config.sizes}
						onChange={e => update('sizes', e.target.value)}
						className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-mono text-xs text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
					/>
					<p className='text-xs text-zinc-500 dark:text-zinc-400'>
						Indica ao browser o tamanho de exibição da imagem em cada viewport.
					</p>
				</div>
			</div>
		</div>
	);
}
