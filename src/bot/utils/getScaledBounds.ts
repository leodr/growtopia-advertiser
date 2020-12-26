import { Window } from 'node-window-manager';
import { WindowBounds } from './relativeToAbsoluteCoords';

export function getScaledBounds(window: Window): WindowBounds {
	const monitor = window.getMonitor();
	const scale = monitor.getScaleFactor();

	const unscaledBounds = window.getBounds();

	if (
		unscaledBounds.x === undefined ||
		unscaledBounds.y === undefined ||
		unscaledBounds.width === undefined ||
		unscaledBounds.height === undefined
	)
		throw Error('Invalid bounds.');

	return {
		x: unscaledBounds.x * scale,
		y: unscaledBounds.y * scale,
		width: unscaledBounds.width * scale,
		height: unscaledBounds.height * scale,
	};
}
