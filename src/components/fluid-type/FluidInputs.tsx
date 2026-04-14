import type { FluidTypeConfig, LineHeightFactor } from '../../types';

interface FluidInputsProps {
	readonly config: FluidTypeConfig;
	readonly onChange: (config: FluidTypeConfig) => void;
	readonly minLineHeight: number;
	readonly maxLineHeight: number;
}

const FONT_FIELDS: {
	key: keyof FluidTypeConfig;
	label: string;
	id: string;
}[] = [
	{
		key: 'minFontSize',
		label: 'Tamanho mínimo da fonte (px)',
		id: 'ft-min-font'
	},
	{
		key: 'maxFontSize',
		label: 'Tamanho máximo da fonte (px)',
		id: 'ft-max-font'
	}
];

const VIEWPORT_FIELDS: {
	key: keyof FluidTypeConfig;
	label: string;
	id: string;
}[] = [
	{
		key: 'minViewport',
		label: 'Tamanho mínimo da tela (px)',
		id: 'ft-min-vw'
	},
	{
		key: 'maxViewport',
		label: 'Tamanho máximo da tela (px)',
		id: 'ft-max-vw'
	}
];

const LINE_HEIGHT_OPTIONS: {
	value: LineHeightFactor;
	label: string;
	offsetLabel: string;
	factorLabel: string;
	helperText: string;
}[] = [
	{
		value: 1.5,
		label: 'Espaçado',
		offsetLabel: '8px',
		factorLabel: '1.5',
		helperText: 'Mais respiro entre as linhas.'
	},
	{
		value: 1.3,
		label: 'Compacto',
		offsetLabel: '4px',
		factorLabel: '1.3',
		helperText: 'Menor espaçamento entre as linhas.'
	}
];

export function FluidInputs({
	config,
	onChange,
	minLineHeight,
	maxLineHeight
}: FluidInputsProps) {
	const handleChange = (key: keyof FluidTypeConfig, value: string) => {
		const num = Number.parseFloat(value);
		if (!Number.isNaN(num) && num >= 0) {
			onChange({ ...config, [key]: num });
		}
	};

	const offsetLabel = config.lineHeightFactor === 1.5 ? '8px' : '4px';
	const currentFormula =
		config.lineHeightMode === 'offset'
			? `fonte + ${offsetLabel}`
			: `fonte × ${config.lineHeightFactor}`;

	return (
		<div className='flex flex-col gap-6'>
			<fieldset className='flex flex-col gap-3'>
				<legend className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
					Tamanho da fonte
				</legend>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{FONT_FIELDS.map(field => (
						<div
							key={field.key}
							className='flex flex-col gap-1'>
							<label
								htmlFor={field.id}
								className='text-xs text-zinc-500 dark:text-zinc-400'>
								{field.label}
							</label>
							<input
								id={field.id}
								type='number'
								inputMode='decimal'
								step='any'
								min='0'
								value={config[field.key]}
								onChange={e => handleChange(field.key, e.target.value)}
								className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
							/>
						</div>
					))}
				</div>
			</fieldset>

			<fieldset className='flex flex-col gap-3'>
				<legend className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
					Altura de linha
				</legend>
				<div className='flex flex-col gap-4'>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						{LINE_HEIGHT_OPTIONS.map(option => {
							const isSelected = config.lineHeightFactor === option.value;
							const isOffset = isSelected && config.lineHeightMode === 'offset';
							const isFactor = isSelected && config.lineHeightMode === 'factor';

							return (
								<div
									key={option.value}
									className={`rounded-xl border p-4 transition-colors ${
										isSelected
											? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
											: 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/40'
									}`}>
									<div className='flex items-start justify-between gap-3'>
										<div>
											<p className='text-sm font-semibold text-zinc-900 dark:text-white'>
												{option.label}
											</p>
											<p className='text-xs text-zinc-500 dark:text-zinc-400'>
												{option.helperText}
											</p>
										</div>
										<span className='rounded-full bg-white px-2 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'>
											{isSelected ? 'Selecionado' : 'Disponível'}
										</span>
									</div>

									<div className='mt-3 flex flex-wrap gap-2'>
										<button
											type='button'
											onClick={() =>
												onChange({
													...config,
													lineHeightFactor: option.value,
													lineHeightMode: 'offset'
												})
											}
											aria-pressed={isOffset}
											className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
												isOffset
													? 'bg-blue-500 text-white'
													: 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
											}`}>
											{option.offsetLabel} (padrão)
										</button>
										<button
											type='button'
											onClick={() =>
												onChange({
													...config,
													lineHeightFactor: option.value,
													lineHeightMode: 'factor'
												})
											}
											aria-pressed={isFactor}
											className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
												isFactor
													? 'bg-blue-500 text-white'
													: 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
											}`}>
											{option.factorLabel}
										</button>
									</div>
								</div>
							);
						})}
					</div>

					<p className='text-xs text-zinc-500 dark:text-zinc-400'>
						Cálculo atual: <strong>{currentFormula}</strong>
					</p>

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<div className='flex flex-col gap-1'>
							<span className='text-xs text-zinc-500 dark:text-zinc-400'>
								Altura de linha mínima (px)
							</span>
							<span className='w-full rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'>
								{minLineHeight}px
							</span>
						</div>
						<div className='flex flex-col gap-1'>
							<span className='text-xs text-zinc-500 dark:text-zinc-400'>
								Altura de linha máxima (px)
							</span>
							<span className='w-full rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'>
								{maxLineHeight}px
							</span>
						</div>
					</div>
				</div>
			</fieldset>

			<fieldset className='flex flex-col gap-3'>
				<legend className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
					Viewport
				</legend>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{VIEWPORT_FIELDS.map(field => (
						<div
							key={field.key}
							className='flex flex-col gap-1'>
							<label
								htmlFor={field.id}
								className='text-xs text-zinc-500 dark:text-zinc-400'>
								{field.label}
							</label>
							<input
								id={field.id}
								type='number'
								inputMode='decimal'
								step='any'
								min='0'
								value={config[field.key]}
								onChange={e => handleChange(field.key, e.target.value)}
								className='w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
							/>
						</div>
					))}
				</div>
			</fieldset>
		</div>
	);
}
