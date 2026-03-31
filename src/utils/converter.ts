import type { CSSUnit, ConversionConfig } from '../types';

const PX_PER_CM = 37.7952755906;

export function toPx(
	value: number,
	unit: CSSUnit,
	config: ConversionConfig
): number {
	switch (unit) {
		case 'px':
			return value;
		case 'rem':
			return value * config.rootFontSize;
		case 'em':
			return value * config.parentFontSize;
		case 'vw':
			return (value * config.viewportWidth) / 100;
		case 'vh':
			return (value * config.viewportHeight) / 100;
		case 'dvh':
			return (value * config.viewportHeight) / 100;
		case 'cm':
			return value * PX_PER_CM;
		case '%':
			return (value * config.referenceValue) / 100;
	}
}

export function fromPx(
	px: number,
	unit: CSSUnit,
	config: ConversionConfig
): number {
	switch (unit) {
		case 'px':
			return px;
		case 'rem':
			return px / config.rootFontSize;
		case 'em':
			return px / config.parentFontSize;
		case 'vw':
			return (px / config.viewportWidth) * 100;
		case 'vh':
			return (px / config.viewportHeight) * 100;
		case 'dvh':
			return (px / config.viewportHeight) * 100;
		case 'cm':
			return px / PX_PER_CM;
		case '%':
			return (px / config.referenceValue) * 100;
	}
}

export function convert(
	value: number,
	from: CSSUnit,
	to: CSSUnit,
	config: ConversionConfig
): number {
	if (from === to) return value;
	const px = toPx(value, from, config);
	return fromPx(px, to, config);
}

export function formatResult(value: number): string {
	if (Number.isInteger(value)) return value.toString();
	const str = value.toFixed(4);
	return str.replace(/\.?0+$/, '');
}

export function needsReference(
	unit: CSSUnit
): (
	| 'rootFontSize'
	| 'parentFontSize'
	| 'viewportWidth'
	| 'viewportHeight'
	| 'referenceValue'
)[] {
	switch (unit) {
		case 'rem':
			return ['rootFontSize'];
		case 'em':
			return ['parentFontSize'];
		case 'vw':
			return ['viewportWidth'];
		case 'vh':
		case 'dvh':
			return ['viewportHeight'];
		case '%':
			return ['referenceValue'];
		default:
			return [];
	}
}
