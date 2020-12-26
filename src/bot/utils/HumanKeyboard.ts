import { keyToggle, setKeyboardDelay, typeString } from 'robotjs';
import { distortNumber } from './distortNumber';
import { sleepApprox } from './sleepApprox';

export class HumanKeyboard {
	static DEFAULT_KEYBOARD_DELAY = 5;

	constructor() {
		setKeyboardDelay(HumanKeyboard.DEFAULT_KEYBOARD_DELAY);
	}

	async typeString(text: string): Promise<void> {
		for (const char of text.split('')) {
			if (/[a-z0-9]/.test(char)) {
				await this.typeKey(char);
			} else if (/[A-Z]/.test(char)) {
				await this.typeKey(char.toLowerCase(), 'shift');
			} else {
				await this.typeStringCharacter(char);
			}
		}
	}

	private async typeStringCharacter(char: string) {
		setKeyboardDelay(60);
		typeString(char);
		setKeyboardDelay(HumanKeyboard.DEFAULT_KEYBOARD_DELAY);
		await sleepApprox(40, 0.9);
	}

	async typeKey(
		key: string,
		modifier: string | string[] = [],
		speedMod = 1
	): Promise<void> {
		keyToggle(key, 'down', modifier);
		await sleepApprox(100 * speedMod, 0.6);
		keyToggle(key, 'up', modifier);
		await sleepApprox(80 * speedMod, 0.9);
	}

	async clearInput(backspaces = distortNumber(20, 0.15)): Promise<void> {
		for (let i = 0; i < backspaces; i++) {
			await this.typeKey('backspace', [], 0.6);
		}
	}
}
