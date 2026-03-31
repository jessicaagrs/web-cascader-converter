import type { FluidTypeConfig } from '../../types';

interface FluidInputsProps {
	readonly config: FluidTypeConfig;
	readonly onChange: (config: FluidTypeConfig) => void;
}

const FIELDS: {
	key: keyof FluidTypeConfig;
	label: string;
	id: string;
	group: string;
}[] = [
	{
		key: 'minFontSize',
		label: 'Tamanho mínimo da fonte (px)',
		id: 'ft-min-font',
		group: 'font'
	},
	{
		key: 'maxFontSize',
		label: 'Tamanho máximo da fonte (px)',
		id: 'ft-max-font',
		group: 'font'
	},
	{
		key: 'minLineHeight',
		label: 'Tamanho mínimo da altura de linha (px)',
		id: 'ft-min-lh',
		group: 'line'
	},
	{
		key: 'maxLineHeight',
		label: 'Tamanho máximo da altura de linha (px)',
		id: 'ft-max-lh',
		group: 'line'
	},
	{
		key: 'minViewport',
		label: 'Tamanho mínimo da tela (px)',
		id: 'ft-min-vw',
		group: 'vp'
	},
	{
		key: 'maxViewport',
		label: 'Tamanho máximo da tela (px)',
		id: 'ft-max-vw',
		group: 'vp'
	}
];

export function FluidInputs({ config, onChange }: FluidInputsProps) {
	const handleChange = (key: keyof FluidTypeConfig, value: string) => {
		const num = Number.parseFloat(value);
		if (!Number.isNaN(num) && num >= 0) {
			onChange({ ...config, [key]: num });
		}
	};

	const groups = [
		{
			title: 'Tamanho da fonte',
			fields: FIELDS.filter(f => f.group === 'font')
		},
		{
			title: 'Altura de linha',
			fields: FIELDS.filter(f => f.group === 'line')
		},
		{ title: 'Viewport', fields: FIELDS.filter(f => f.group === 'vp') }
	];

	return (
		<div className='flex flex-col gap-6'>
			{groups.map(group => (
				<fieldset
					key={group.title}
					className='flex flex-col gap-3'>
					<legend className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
						{group.title}
					</legend>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						{group.fields.map(field => (
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
			))}
		</div>
	);
}
