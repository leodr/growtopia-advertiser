export function relativeToAbsoluteCoords(
	windowBounds: WindowBounds,
	constrainedCoords: ConstrainedCoords
): ScreenCoordinates {
	if (windowBounds.x === undefined || windowBounds.y === undefined)
		throw Error('windowBounds have no offset coordinates.');

	if (windowBounds.width === undefined || windowBounds.height === undefined)
		throw Error('windowBounds have no dimensions.');

	const transformedCoords = Object.entries(constrainedCoords).reduce<
		Record<string, number>
	>((obj, [key, value]) => {
		if (typeof value === 'string' && value.endsWith('%')) {
			const percentage = parseInt(value.replace('%', '')) / 100;
			return {
				...obj,
				[key]:
					percentage *
					(['top', 'bottom'].includes(key)
						? windowBounds.height ?? 0
						: windowBounds.width ?? 0),
			};
		} else {
			return { ...obj, [key]: value };
		}
	}, {});

	if (transformedCoords.top != null) {
		if (transformedCoords.left != null) {
			return [
				windowBounds.x + transformedCoords.left,
				windowBounds.y + transformedCoords.top,
			];
		} else if (transformedCoords.right != null) {
			return [
				windowBounds.x + windowBounds.width - transformedCoords.right,
				windowBounds.y + transformedCoords.top,
			];
		}
	} else if (transformedCoords.bottom != null) {
		if (transformedCoords.left != null) {
			return [
				windowBounds.x + transformedCoords.left,
				windowBounds.y + windowBounds.height - transformedCoords.bottom,
			];
		} else if (transformedCoords.right != null) {
			return [
				windowBounds.x + windowBounds.width - transformedCoords.right,
				windowBounds.y + windowBounds.height - transformedCoords.bottom,
			];
		}
	}

	throw Error('Invalid coordinates.');
}

export type ScreenCoordinates = [x: number, y: number];

export interface WindowBounds {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface ConstrainedCoords {
	top?: number | string;
	right?: number | string;
	bottom?: number | string;
	left?: number | string;
}
