import { ConstrainedCoords } from '../utils/relativeToAbsoluteCoords';
import type { StepFactory } from './types';

export const mouseClickInWindowStep: StepFactory<ConstrainedCoords> = (
	coords
) => {
	return function clickInWindow({ windowBounds, mouse }) {
		if (!windowBounds) {
			throw Error('No window bounds are provided.');
		}

		return mouse.clickInWindow(windowBounds, coords);
	};
};
