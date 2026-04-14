import type {
	ImageFallbackFormat,
	ImageFormat,
	ResponsiveImageConfig
} from '../types';

const MIME_TYPES: Record<ImageFormat, string> = {
	avif: 'image/avif',
	webp: 'image/webp'
};

function buildSrcset(
	imageName: string,
	breakpoints: number[],
	format: ImageFormat | ImageFallbackFormat
): string {
	return breakpoints
		.map(bp => `${imageName}-${bp}.${format} ${bp}w`)
		.join(', ');
}

function buildSourceElement(
	imageName: string,
	breakpoints: number[],
	format: ImageFormat
): string {
	return [
		`  <source`,
		`    type="${MIME_TYPES[format]}"`,
		`    srcset="${buildSrcset(imageName, breakpoints, format)}"`,
		`  />`
	].join('\n');
}

function buildLoadingAttr(
	loading: ResponsiveImageConfig['loading'],
	useFetchPriority: boolean
): string {
	if (loading === 'eager' && useFetchPriority)
		return `    fetchpriority="high"`;
	return `    loading="${loading}"`;
}

export function generatePictureHTML(config: ResponsiveImageConfig): string {
	const {
		imageName,
		alt,
		loading,
		useFetchPriority,
		width,
		height,
		breakpoints,
		formats,
		fallbackFormat,
		fallbackBreakpoint,
		sizes
	} = config;

	const sortedBreakpoints = [...new Set(breakpoints)].sort((a, b) => a - b);

	const sourceElements = formats
		.map(format => buildSourceElement(imageName, sortedBreakpoints, format))
		.join('\n');

	const fallbackSrcset = buildSrcset(
		imageName,
		sortedBreakpoints,
		fallbackFormat
	);
	const fallbackSrc = `${imageName}-${fallbackBreakpoint}.${fallbackFormat}`;

	const imgElement = [
		`  <img`,
		`    src="${fallbackSrc}"`,
		`    srcset="${fallbackSrcset}"`,
		`    sizes="${sizes}"`,
		`    alt="${alt}"`,
		buildLoadingAttr(loading, useFetchPriority),
		`    width="${width}"`,
		`    height="${height}"`,
		`  />`
	].join('\n');

	const parts = ['<picture>'];
	if (sourceElements) parts.push(sourceElements);
	parts.push(imgElement, '</picture>');

	return parts.join('\n');
}

export function buildPlaceholderDataUrl(
	width: number,
	height: number,
	label: string
): string {
	const fontSize = Math.max(12, Math.min(24, width / 15));
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" font-family="system-ui,sans-serif" font-size="${fontSize}" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
