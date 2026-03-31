import type { CSSUnit } from '../../types';
import { UNIT_LABELS } from '../../types';

interface UnitInputProps {
	readonly label: string;
	readonly value: string;
	readonly unit: CSSUnit;
	readonly onValueChange: (value: string) => void;
	readonly onUnitChange: (unit: CSSUnit) => void;
	readonly readOnly?: boolean;
	readonly id: string;
}

export function UnitInput({
	label,
	value,
	unit,
	onValueChange,
	onUnitChange,
	readOnly = false,
	id
}: UnitInputProps) {
	const units = Object.keys(UNIT_LABELS) as CSSUnit[];

	return (
		<div className='flex flex-col gap-2'>
			<label
				htmlFor={id}
				className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
				{label}
			</label>
			<div className='flex gap-2'>
				<input
					id={id}
					type='number'
					inputMode='decimal'
					step='any'
					value={value}
					onChange={e => onValueChange(e.target.value)}
					readOnly={readOnly}
					aria-label={`${label} - valor`}
					className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white ${
						readOnly ? 'cursor-default bg-zinc-50 dark:bg-zinc-800/50' : ''
					}`}
				/>
				<select
					value={unit}
					onChange={e => onUnitChange(e.target.value as CSSUnit)}
					aria-label={`${label} - unidade`}
					className='min-w-32 rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white'>
					{units.map(u => (
						<option
							key={u}
							value={u}>
							{UNIT_LABELS[u]}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
