import { computeFluidValue } from '../../utils/fluid-type';

interface FluidPreviewProps {
	readonly minFontSize: number;
	readonly maxFontSize: number;
	readonly minLineHeight: number;
	readonly maxLineHeight: number;
	readonly minViewport: number;
	readonly maxViewport: number;
	readonly simulatedWidth: number;
	readonly onWidthChange: (width: number) => void;
}

export function FluidPreview({
	minFontSize,
	maxFontSize,
	minLineHeight,
	maxLineHeight,
	minViewport,
	maxViewport,
	simulatedWidth,
	onWidthChange
}: FluidPreviewProps) {
	const fontSize = computeFluidValue(
		minFontSize,
		maxFontSize,
		minViewport,
		maxViewport,
		simulatedWidth
	);
	const lineHeight = computeFluidValue(
		minLineHeight,
		maxLineHeight,
		minViewport,
		maxViewport,
		simulatedWidth
	);

	return (
		<div className='flex flex-col gap-4'>
			<div>
				<label
					htmlFor='preview-slider'
					className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
					Pré visualização
				</label>
				<div
					className='mt-2 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-800/50'
					style={{ maxWidth: `${simulatedWidth}px` }}>
					<p
						style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
						className='text-zinc-900 dark:text-white'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='preview-slider'
					className='text-xs text-zinc-500 dark:text-zinc-400'>
					Tamanho da tela simulada:
				</label>
				<input
					id='preview-slider'
					type='range'
					min={minViewport}
					max={maxViewport}
					value={simulatedWidth}
					onChange={e => onWidthChange(Number(e.target.value))}
					aria-valuemin={minViewport}
					aria-valuemax={maxViewport}
					aria-valuenow={simulatedWidth}
					aria-valuetext={`${simulatedWidth}px`}
					className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-blue-500 dark:bg-zinc-700'
				/>
				<span className='text-sm font-medium text-zinc-900 dark:text-white'>
					{simulatedWidth}px
				</span>
			</div>

			<div className='overflow-hidden rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-800/50'>
				<p
					style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
					className='text-zinc-900 dark:text-white'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
		</div>
	);
}
