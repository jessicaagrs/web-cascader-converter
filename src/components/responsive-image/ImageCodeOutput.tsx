import { CopyButton } from '../ui/CopyButton';

interface Props {
	readonly html: string;
}

export function ImageCodeOutput({ html }: Props) {
	return (
		<div className='rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800/50'>
			<div className='mb-4 flex items-center justify-between gap-4'>
				<h3 className='text-base font-semibold text-zinc-900 dark:text-white'>
					Código gerado
				</h3>
				<CopyButton
					text={html}
					label='Copiar HTML'
				/>
			</div>
			<output
				aria-live='polite'
				aria-label='Código HTML do elemento picture gerado'
				className='block w-full overflow-x-auto rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-800/50'>
				<pre className='font-mono text-xs leading-relaxed text-zinc-900 dark:text-white'>
					{html}
				</pre>
			</output>
		</div>
	);
}
