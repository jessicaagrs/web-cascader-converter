import { useClipboard } from '../../hooks/useClipboard';

interface CopyButtonProps {
	readonly text: string;
	readonly label?: string;
}

export function CopyButton({ text, label = 'Copiar' }: CopyButtonProps) {
	const { copy, copied } = useClipboard();

	return (
		<button
			type='button'
			onClick={() => copy(text)}
			aria-label={copied ? 'Copiado' : label}
			className='inline-flex items-center gap-1.5 rounded-lg border border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold tracking-wide text-white uppercase transition-all hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-95'>
			{copied ? (
				<>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='h-4 w-4'
						aria-hidden='true'>
						<polyline points='20 6 9 17 4 12' />
					</svg>
					Copiado!
				</>
			) : (
				<>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='h-4 w-4'
						aria-hidden='true'>
						<rect
							x='9'
							y='9'
							width='13'
							height='13'
							rx='2'
							ry='2'
						/>
						<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
					</svg>
					{label}
				</>
			)}
		</button>
	);
}
