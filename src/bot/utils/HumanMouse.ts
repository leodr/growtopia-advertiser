import { mouseToggle, moveMouseSmooth, setMouseDelay } from 'robotjs';
import { distortNumber } from './distortNumber';
import {
	ConstrainedCoords,
	relativeToAbsoluteCoords,
	ScreenCoordinates,
	WindowBounds,
} from './relativeToAbsoluteCoords';
import { sleepApprox } from './sleepApprox';

const MOUSE_ERROR = 0.2;

export class HumanMouse {
	currentPosition?: ScreenCoordinates;

	constructor() {
		setMouseDelay(5);
	}

	async move(...target: ScreenCoordinates): Promise<void> {
		const stopCount = Math.round(Math.random()) + 1;

		const stops: ScreenCoordinates[] = [];

		for (let i = 0; i < stopCount; i++) {
			const prev = stops[i - 1] ?? target;

			const nextTarget: ScreenCoordinates = [
				distortNumber(prev[0], MOUSE_ERROR),
				distortNumber(prev[1], MOUSE_ERROR),
			];

			await this.movePointer(...nextTarget);
		}

		await this.movePointer(...target);
	}

	async movePointer(...target: ScreenCoordinates): Promise<void> {
		moveMouseSmooth(...target);
		this.currentPosition = target;

		await sleepApprox(10, 0.5);
	}

	async click(): Promise<void> {
		mouseToggle('down');
		await sleepApprox(90, 0.3);
		mouseToggle('up');
		await sleepApprox(90, 0.3);
	}

	async clickInWindow(
		scaledBounds: WindowBounds,
		constrainedCoords: ConstrainedCoords
	): Promise<void> {
		const playButtonCoords = relativeToAbsoluteCoords(
			scaledBounds,
			constrainedCoords
		);

		await this.move(...playButtonCoords);

		await this.click();
	}
}
