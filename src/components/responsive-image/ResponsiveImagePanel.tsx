import { useMemo, useState } from 'react';
import type { ResponsiveImageConfig } from '../../types';
import { DEFAULT_RESPONSIVE_IMAGE_CONFIG } from '../../types';
import { generatePictureHTML } from '../../utils/responsive-image';
import { BreakpointManager } from './BreakpointManager';
import { ImageBreakpointPreview } from './ImageBreakpointPreview';
import { ImageCodeOutput } from './ImageCodeOutput';
import { ImageSettingsForm } from './ImageSettingsForm';

export function ResponsiveImagePanel() {
	const [config, setConfig] = useState<ResponsiveImageConfig>(
		DEFAULT_RESPONSIVE_IMAGE_CONFIG
	);

	const html = useMemo(() => generatePictureHTML(config), [config]);

	return (
		<section
			id='panel-responsive-image'
			role='tabpanel'
			aria-labelledby='tab-responsive-image'
			className='flex flex-col gap-6'>
			<div>
				<h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>
					Imagem Responsiva
				</h2>
				<p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
					Gere o elemento{' '}
					<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
						{'<picture>'}
					</code>{' '}
					com{' '}
					<code className='rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-700'>
						srcset
					</code>
					, formatos modernos e breakpoints para imagens responsivas otimizadas.
				</p>
			</div>

			<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
				<ImageSettingsForm
					config={config}
					onChange={setConfig}
				/>
				<BreakpointManager
					config={config}
					onChange={setConfig}
				/>
			</div>

			<ImageBreakpointPreview config={config} />

			<ImageCodeOutput html={html} />
		</section>
	);
}
