import { CopyButton } from '../ui/CopyButton';

interface ResultDisplayProps {
	readonly result: string;
	readonly unit: string;
}

export function ResultDisplay({ result, unit }: ResultDisplayProps) {
	const displayText = `${result}${unit}`;

	return (
		<div className='flex flex-col gap-3'>
			<span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
				Resultado
			</span>
			<div className='flex items-center gap-3'>
				<output
					aria-live='polite'
					className='flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-lg text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-white'>
					{displayText}
				</output>
				<CopyButton
					text={displayText}
					label='Copiar resultado'
				/>
			</div>
		</div>
	);
}
