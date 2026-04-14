import type { ClampResult, LineHeightFactor, LineHeightMode } from '../types';

function roundTo(value: number, decimals: number): number {
	const factor = Math.pow(10, decimals);
	return Math.round(value * factor) / factor;
}

function formatNum(value: number): string {
	return roundTo(value, 2).toFixed(2);
}

export function calculateLineHeightPx(
	fontSize: number,
	factor: LineHeightFactor,
	mode: LineHeightMode = 'offset'
): number {
	if (mode === 'factor') {
		return Math.round(fontSize * factor);
	}

	const offset = factor === 1.5 ? 8 : 4;
	return Math.round(fontSize + offset);
}

export function calculateClamp(
	minPx: number,
	maxPx: number,
	minVw: number,
	maxVw: number,
	rootFontSize = 16
): ClampResult {
	const minRem = roundTo(minPx / rootFontSize, 2);
	const maxRem = roundTo(maxPx / rootFontSize, 2);
	const slope = (maxPx - minPx) / (maxVw - minVw);
	const intercept = minPx - slope * minVw;
	const slopeVw = roundTo(slope * 100, 2);
	const interceptRem = roundTo(intercept / rootFontSize, 2);

	const sign = interceptRem >= 0 ? '+' : '-';
	const absIntercept = Math.abs(interceptRem);

	const preferred = `${formatNum(interceptRem)}rem + ${formatNum(slopeVw)}vw`;
	const value = `clamp(${formatNum(minRem)}rem, ${formatNum(absIntercept)}rem ${sign} ${formatNum(slopeVw)}vw, ${formatNum(maxRem)}rem)`;

	return {
		value,
		minRem: formatNum(minRem),
		maxRem: formatNum(maxRem),
		preferred
	};
}

export function computeFluidValue(
	minPx: number,
	maxPx: number,
	minVw: number,
	maxVw: number,
	currentVw: number
): number {
	if (currentVw <= minVw) return minPx;
	if (currentVw >= maxVw) return maxPx;
	const slope = (maxPx - minPx) / (maxVw - minVw);
	return minPx + slope * (currentVw - minVw);
}
