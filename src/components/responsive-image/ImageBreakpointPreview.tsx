import type { ResponsiveImageConfig } from '../../types';
import { buildPlaceholderDataUrl } from '../../utils/responsive-image';

interface Props {
	readonly config: ResponsiveImageConfig;
}

const MAX_PREVIEW_WIDTH = 200;

export function ImageBreakpointPreview({ config }: Props) {
	const sorted = [...new Set(config.breakpoints)].sort((a, b) => a - b);
	const aspectRatio =
		config.width > 0 && config.height > 0
			? config.width / config.height
			: 16 / 9;

	return (
		<div className='rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800/50'>
			<h3 className='mb-1 text-base font-semibold text-zinc-900 dark:text-white'>
				Pré-visualização por breakpoint
			</h3>
			<p className='mb-5 text-xs text-zinc-500 dark:text-zinc-400'>
				Representação do placeholder em cada resolução. Em produção, substitua
				pelos arquivos reais.
			</p>
			<div className='flex flex-wrap gap-5'>
				{sorted.map(bp => {
					const previewWidth = Math.min(bp, MAX_PREVIEW_WIDTH);
					const previewHeight = Math.round(previewWidth / aspectRatio);
					const placeholder = buildPlaceholderDataUrl(
						previewWidth,
						previewHeight,
						`${bp}px`
					);
					const isFallback = config.fallbackBreakpoint === bp;

					return (
						<div
							key={bp}
							className='flex flex-col gap-1.5'>
							<div className='flex items-center gap-1.5'>
								<span className='text-xs font-semibold text-zinc-700 dark:text-zinc-300'>
									{bp}px
								</span>
								{isFallback && (
									<span className='rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'>
										src
									</span>
								)}
							</div>
							<div
								className='overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700'
								style={{ width: previewWidth, height: previewHeight }}>
								<img
									src={placeholder}
									alt={`Placeholder ${bp}px`}
									width={previewWidth}
									height={previewHeight}
									className='h-full w-full object-cover'
									loading='lazy'
								/>
							</div>
							<p className='max-w-50 truncate text-center text-xs text-zinc-500 dark:text-zinc-400'>
								{config.imageName || 'image'}-{bp}.{config.fallbackFormat}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
