import { useMemo, useState } from 'react';
import type { CSSUnit, ConversionConfig } from '../../types';
import { DEFAULT_CONFIG } from '../../types';
import { convert, formatResult } from '../../utils/converter';
import { ReferenceFields } from './ReferenceFields';
import { ResultDisplay } from './ResultDisplay';
import { UnitInput } from './UnitInput';

export function ConverterPanel() {
	const [inputValue, setInputValue] = useState('16');
	const [fromUnit, setFromUnit] = useState<CSSUnit>('px');
	const [toUnit, setToUnit] = useState<CSSUnit>('rem');
	const [config, setConfig] = useState<ConversionConfig>(DEFAULT_CONFIG);

	const result = useMemo(() => {
		const num = Number.parseFloat(inputValue);
		if (Number.isNaN(num)) return '';
		return formatResult(convert(num, fromUnit, toUnit, config));
	}, [inputValue, fromUnit, toUnit, config]);

	const swapUnits = () => {
		setFromUnit(toUnit);
		setToUnit(fromUnit);
		if (result) setInputValue(result);
	};

	return (
		<section
			id='panel-converter'
			role='tabpanel'
			aria-labelledby='tab-converter'
			className='flex flex-col gap-6'>
			<div>
				<h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>
					Conversor de Unidades CSS
				</h2>
				<p className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
					Converta entre px, rem, em, vw, vh, dvh, cm e porcentagem.
				</p>
			</div>

			<div className='rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800/50'>
				<div className='flex flex-col gap-6'>
					<div className='grid gap-6 md:grid-cols-[1fr_auto_1fr]'>
						<UnitInput
							id='from-value'
							label='Valor de origem'
							value={inputValue}
							unit={fromUnit}
							onValueChange={setInputValue}
							onUnitChange={setFromUnit}
						/>

						<div className='flex items-end justify-center pb-1'>
							<button
								type='button'
								onClick={swapUnits}
								aria-label='Trocar unidades'
								className='flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-95 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-5 w-5'
									aria-hidden='true'>
									<path d='M7 16l-4-4 4-4' />
									<path d='M17 8l4 4-4 4' />
									<line
										x1='3'
										y1='12'
										x2='21'
										y2='12'
									/>
								</svg>
							</button>
						</div>

						<UnitInput
							id='to-value'
							label='Valor convertido'
							value={result}
							unit={toUnit}
							onValueChange={() => {}}
							onUnitChange={setToUnit}
							readOnly
						/>
					</div>

					<ReferenceFields
						config={config}
						onChange={setConfig}
						fromUnit={fromUnit}
						toUnit={toUnit}
					/>

					{result && (
						<ResultDisplay
							result={result}
							unit={toUnit}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
