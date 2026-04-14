export type CSSUnit = 'px' | 'rem' | 'vw' | 'em' | 'vh' | 'dvh' | 'cm' | '%';

export interface ConversionConfig {
	rootFontSize: number;
	viewportWidth: number;
	viewportHeight: number;
	parentFontSize: number;
	referenceValue: number;
}

export type LineHeightFactor = 1.5 | 1.3;
export type LineHeightMode = 'offset' | 'factor';

export interface FluidTypeConfig {
	minFontSize: number;
	maxFontSize: number;
	lineHeightFactor: LineHeightFactor;
	lineHeightMode: LineHeightMode;
	minViewport: number;
	maxViewport: number;
}

export interface ClampResult {
	value: string;
	minRem: string;
	maxRem: string;
	preferred: string;
}

export type TabId = 'converter' | 'fluid-type' | 'responsive-image';

export type ImageFormat = 'avif' | 'webp';
export type ImageFallbackFormat = 'jpg' | 'png' | 'webp';
export type LoadingStrategy = 'lazy' | 'eager';

export interface ResponsiveImageConfig {
	imageName: string;
	alt: string;
	loading: LoadingStrategy;
	useFetchPriority: boolean;
	width: number;
	height: number;
	breakpoints: number[];
	formats: ImageFormat[];
	fallbackFormat: ImageFallbackFormat;
	fallbackBreakpoint: number;
	sizes: string;
}

export const DEFAULT_RESPONSIVE_IMAGE_CONFIG: ResponsiveImageConfig = {
	imageName: 'hero',
	alt: 'Hero banner',
	loading: 'lazy',
	useFetchPriority: false,
	width: 1920,
	height: 1080,
	breakpoints: [480, 1280, 1920],
	formats: ['avif', 'webp'],
	fallbackFormat: 'jpg',
	fallbackBreakpoint: 1280,
	sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
};

export const UNIT_LABELS: Record<CSSUnit, string> = {
	px: 'Pixels (px)',
	rem: 'Root Em (rem)',
	vw: 'Viewport Width (vw)',
	em: 'Em (em)',
	vh: 'Viewport Height (vh)',
	dvh: 'Dynamic Viewport Height (dvh)',
	cm: 'Centímetros (cm)',
	'%': 'Porcentagem (%)'
};

export const DEFAULT_CONFIG: ConversionConfig = {
	rootFontSize: 16,
	viewportWidth: 1920,
	viewportHeight: 1080,
	parentFontSize: 16,
	referenceValue: 1000
};

export const DEFAULT_FLUID_CONFIG: FluidTypeConfig = {
	minFontSize: 16,
	maxFontSize: 22,
	lineHeightFactor: 1.5,
	lineHeightMode: 'offset',
	minViewport: 400,
	maxViewport: 1280
};
