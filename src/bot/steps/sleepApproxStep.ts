import { sleepApprox } from '../utils/sleepApprox';
import type { StepFactory } from './types';

export const sleepApproxStep: StepFactory<number> = (time) => {
	return function sleepApproximately() {
		return sleepApprox(time);
	};
};
