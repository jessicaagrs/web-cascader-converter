import type { ConversionConfig, CSSUnit } from '../../types';
import { needsReference } from '../../utils/converter';

interface ReferenceFieldsProps {
	readonly config: ConversionConfig;
	readonly onChange: (config: ConversionConfig) => void;
	readonly fromUnit: CSSUnit;
	readonly toUnit: CSSUnit;
}

const FIELD_META: Record<string, { label: string; id: string }> = {
	rootFontSize: { label: 'Tamanho raiz (px)', id: 'ref-root' },
	parentFontSize: { label: 'Tamanho do elemento pai (px)', id: 'ref-parent' },
	viewportWidth: { label: 'Largura da viewport (px)', id: 'ref-vw' },
	viewportHeight: { label: 'Altura da viewport (px)', id: 'ref-vh' },
	referenceValue: { label: 'Valor de referência (px)', id: 'ref-pct' }
};

export function ReferenceFields({
	config,
	onChange,
	fromUnit,
	toUnit
}: ReferenceFieldsProps) {
	const refs = new Set([
		...needsReference(fromUnit),
		...needsReference(toUnit)
	]);

	if (refs.size === 0) return null;

	const handleChange = (key: keyof ConversionConfig, value: string) => {
		const num = Number.parseFloat(value);
		if (!Number.isNaN(num) && num > 0) {
			onChange({ ...config, [key]: num });
		}
	};

	return (
		<fieldset className='flex flex-wrap gap-4'>
			<legend className='mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300'>
				Valores de referência
			</legend>
			{Array.from(refs).map(key => {
				const meta = FIELD_META[key];
				return (
					<div
						key={key}
						className='flex flex-col gap-1'>
						<label
							htmlFor={meta.id}
							className='text-xs text-zinc-500 dark:text-zinc-400'>
							{meta.label}
						</label>
						<input
							id={meta.id}
							type='number'
							inputMode='decimal'
							step='any'
							min='1'
							value={config[key]}
							onChange={e => handleChange(key, e.target.value)}
							className='w-40 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
				);
			})}
		</fieldset>
	);
}
