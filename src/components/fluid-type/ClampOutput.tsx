import type { ClampResult } from '../../types';
import { CopyButton } from '../ui/CopyButton';

interface ClampOutputProps {
	readonly fontClamp: ClampResult;
	readonly lineHeightClamp: ClampResult;
}

export function ClampOutput({ fontClamp, lineHeightClamp }: ClampOutputProps) {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-3'>
				<h3 className='text-lg font-semibold text-zinc-900 dark:text-white'>
					Clamp do tamanho da fonte
				</h3>
				<output
					aria-live='polite'
					aria-label='Valor clamp do tamanho da fonte'
					className='rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-white'>
					font-size: {fontClamp.value};
				</output>
				<CopyButton
					text={`font-size: ${fontClamp.value};`}
					label='Copiar tamanho do texto'
				/>
			</div>

			<div className='flex flex-col gap-3'>
				<h3 className='text-lg font-semibold text-zinc-900 dark:text-white'>
					Clamp da altura de linha
				</h3>
				<output
					aria-live='polite'
					aria-label='Valor clamp da altura de linha'
					className='rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-white'>
					 line-height: {lineHeightClamp.value};
				</output>
				<CopyButton
					text={`line-height: ${lineHeightClamp.value};`}
					label='Copiar altura da linha'
				/>
			</div>
		</div>
	);
}
