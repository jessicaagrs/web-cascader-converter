import { useMemo, useState } from 'react';
import type { FluidTypeConfig } from '../../types';
import { DEFAULT_FLUID_CONFIG } from '../../types';
import { calculateClamp, calculateLineHeightPx } from '../../utils/fluid-type';
import { ClampOutput } from './ClampOutput';
import { FluidInputs } from './FluidInputs';
import { FluidPreview } from './FluidPreview';

export function FluidTypePanel() {
	const [config, setConfig] = useState<FluidTypeConfig>(DEFAULT_FLUID_CONFIG);
	const [simulatedWidth, setSimulatedWidth] = useState(800);

	const minLineHeight = calculateLineHeightPx(
		config.minFontSize,
		config.lineHeightFactor,
		config.lineHeightMode
	);
	const maxLineHeight = calculateLineHeightPx(
		config.maxFontSize,
		config.lineHeightFactor,
		config.lineHeightMode
	);

	const fontClamp = useMemo(
		() =>
			calculateClamp(
				config.minFontSize,
				config.maxFontSize,
				config.minViewport,
				config.maxViewport
			),
		[
			config.minFontSize,
			config.maxFontSize,
			config.minViewport,
			config.maxViewport
		]
	);

	const lineHeightClamp = useMemo(
		() =>
			calculateClamp(
				minLineHeight,
				maxLineHeight,
				config.minViewport,
				config.maxViewport
			),
		[minLineHeight, maxLineHeight, config.minViewport, config.maxViewport]
	);

	return (
		<section
			id='panel-fluid-type'
			role='tabpanel'
			aria-labelledby='tab-fluid-type'
			className='flex flex-col gap-6'>
			<div>
				<h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>
					Tipografia Fluida
				</h2>
				<p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
					Calcule valores{' '}
					<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
						clamp()
					</code>{' '}
					para tamanho de fonte e altura de linha responsivos. Base do elemento
					raiz: 16px.
				</p>
			</div>

			<div className='rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800/50'>
				<div className='flex flex-col gap-8'>
					<FluidInputs
						config={config}
						onChange={setConfig}
						minLineHeight={minLineHeight}
						maxLineHeight={maxLineHeight}
					/>

					<FluidPreview
						minFontSize={config.minFontSize}
						maxFontSize={config.maxFontSize}
						minLineHeight={minLineHeight}
						maxLineHeight={maxLineHeight}
						minViewport={config.minViewport}
						maxViewport={config.maxViewport}
						simulatedWidth={simulatedWidth}
						onWidthChange={setSimulatedWidth}
					/>

					<ClampOutput
						fontClamp={fontClamp}
						lineHeightClamp={lineHeightClamp}
					/>
				</div>
			</div>
		</section>
	);
}
