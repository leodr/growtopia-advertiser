import { spawn } from 'child_process';
import { windowManager } from 'node-window-manager';
import { clearInputStep } from './steps/clearInputStep';
import { mouseClickInWindowStep } from './steps/mouseClickInWindowStep';
import { sleepApproxStep } from './steps/sleepApproxStep';
import type { Step, StepArguments } from './steps/types';
import { getScaledBounds } from './utils/getScaledBounds';
import { HumanKeyboard } from './utils/HumanKeyboard';
import { HumanMouse } from './utils/HumanMouse';

class Bot {
	currentStep = 0;

	cancelled = false;

	steps: Step[] = [
		function openGrowtopia({ executablePath }) {
			const child = spawn(executablePath, { detached: true });
			child.unref();
		},

		sleepApproxStep(3000),

		function bringGrowtopiaToFrontAndReportMetrics(stepArguments) {
			const windows = windowManager.getWindows();

			const growtopiaWindow = windows.find(
				(window) => window.getTitle() === 'Growtopia'
			);

			if (growtopiaWindow === undefined)
				throw Error('There is no Growtopia window open at the moment.');

			growtopiaWindow.bringToTop();

			const scaledBounds = getScaledBounds(growtopiaWindow);

			stepArguments.windowBounds = scaledBounds;
		},

		mouseClickInWindowStep({ left: '50%', bottom: 314 }),

		sleepApproxStep(500),

		mouseClickInWindowStep({ top: 235, right: 250 }),

		clearInputStep(),

		async function typeGrowId({ keyboard, growId }) {
			await keyboard.typeString(growId);
		},

		sleepApproxStep(100),

		mouseClickInWindowStep({ top: 316, right: 250 }),

		clearInputStep(),

		async function typePassword({ keyboard, password }) {
			await keyboard.typeString(password);
		},

		sleepApproxStep(100),

		// Press login button
		mouseClickInWindowStep({ bottom: 80, right: 275 }),

		sleepApproxStep(5000),

		// Close news panel
		mouseClickInWindowStep({ top: 70, right: 70 }),

		sleepApproxStep(500),

		// Open in-game menu
		mouseClickInWindowStep({ top: 70, right: 70 }),

		sleepApproxStep(500),

		// Click "Exit World" button
		mouseClickInWindowStep({ top: 165, left: '50%' }),

		sleepApproxStep(1000),

		// Enter world name field
		mouseClickInWindowStep({ top: 255, left: '50%' }),

		clearInputStep(),

		async function typeWorldName({ keyboard, worldName }) {
			await keyboard.typeString(worldName);
		},

		// Hit "Enter World" button
		mouseClickInWindowStep({ bottom: 80, right: 275 }),

		sleepApproxStep(1000),

		async function openChat({ keyboard }) {
			await keyboard.typeKey('enter');
		},

		async function enterMessage({ keyboard, message }) {
			await keyboard.typeString(message);
		},

		async function sendMessage({ keyboard }) {
			await keyboard.typeKey('enter');
		},
	];

	run(args: Omit<StepArguments, 'mouse' | 'keyboard' | 'windowBounds'>) {
		const mouse = new HumanMouse();
		const keyboard = new HumanKeyboard();

		const stepArguments = { ...args, mouse, keyboard };

		const executeNextStep = async () => {
			if (!this.cancelled) {
				await this.steps[this.currentStep++](stepArguments);

				setImmediate(executeNextStep);
			}
		};

		setImmediate(executeNextStep);
	}

	stop() {
		this.cancelled = true;
	}
}

type BotArguments = Omit<StepArguments, 'mouse' | 'keyboard' | 'windowBounds'>;

/**
 * This function creates a new bot and starts its execution.
 * @param botArgs The parameters for the bot.
 * @returns A function that stops the bot execution.
 */
export function startBot(botArgs: BotArguments) {
	const bot = new Bot();

	bot.run(botArgs);

	return () => {
		bot.stop();
	};
}
