import { useCallback, useRef, useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export function useClipboard(resetDelay = 2000) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	const copy = useCallback(
		async (text: string) => {
			const ok = await copyToClipboard(text);
			if (ok) {
				setCopied(true);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
			}
			return ok;
		},
		[resetDelay]
	);

	return { copy, copied } as const;
}
