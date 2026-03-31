export type CSSUnit = 'px' | 'rem' | 'vw' | 'em' | 'vh' | 'dvh' | 'cm' | '%';

export interface ConversionConfig {
	rootFontSize: number;
	viewportWidth: number;
	viewportHeight: number;
	parentFontSize: number;
	referenceValue: number;
}

export interface FluidTypeConfig {
	minFontSize: number;
	maxFontSize: number;
	minLineHeight: number;
	maxLineHeight: number;
	minViewport: number;
	maxViewport: number;
}

export interface ClampResult {
	value: string;
	minRem: string;
	maxRem: string;
	preferred: string;
}

export type TabId = 'converter' | 'fluid-type';

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
	minLineHeight: 24,
	maxLineHeight: 32,
	minViewport: 400,
	maxViewport: 1280
};
