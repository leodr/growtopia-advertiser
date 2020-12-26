import { HumanKeyboard } from '../utils/HumanKeyboard';
import { HumanMouse } from '../utils/HumanMouse';
import { WindowBounds } from '../utils/relativeToAbsoluteCoords';

export interface StepArguments {
	executablePath: string;
	mouse: HumanMouse;
	keyboard: HumanKeyboard;
	windowBounds?: WindowBounds;
	growId: string;
	password: string;
	worldName: string;
	message: string;
}

export type Step = (args: StepArguments) => Promise<void> | void;
export type StepFactory<T> = (options: T) => Step;
