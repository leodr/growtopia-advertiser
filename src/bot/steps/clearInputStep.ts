import type { StepFactory } from './types';

export const clearInputStep: StepFactory<void> = () => {
	return function clearKeyboardInput({ keyboard }) {
		return keyboard.clearInput();
	};
};
