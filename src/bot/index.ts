import { exec, spawn } from 'child_process';
import { app, dialog, globalShortcut } from 'electron';
import { windowManager } from 'node-window-manager';
import * as path from 'path';
import { getScaledBounds } from './utils/getScaledBounds';
import { HumanKeyboard } from './utils/HumanKeyboard';
import { HumanMouse } from './utils/HumanMouse';
import { sleepApprox } from './utils/sleepApprox';

const USERNAME = 'thisw4y';
const PASSWORD = '#1Account';
const WORLD_NAME = 'HISVND';
const MESSAGE = '/me selling blocks cheap in HISVND';

export async function bootstrap(): Promise<void> {
	globalShortcut.register('Alt+CommandOrControl+I', () => {
		app.exit();
	});

	switch (process.platform) {
		case 'darwin': {
			exec('open /Applications/Growtopia.app');
			break;
		}
		case 'win32': {
			const localAppDataPath = process.env.LOCALAPPDATA;

			if (localAppDataPath === undefined)
				throw Error('LOCALAPPDATA env variable is not present.');

			const growtopiaPath = path.resolve(
				localAppDataPath,
				'Growtopia',
				'Growtopia.exe'
			);

			const child = spawn(growtopiaPath, { detached: true });
			child.unref();

			break;
		}
		default: {
			dialog.showErrorBox(
				'Unsupported platform.',
				'Only macOS and Windows are supported.'
			);
			app.exit();
		}
	}

	await sleepApprox(3000);

	const windows = windowManager.getWindows();

	const growtopiaWindow = windows.find(
		(window) => window.getTitle() === 'Growtopia'
	);

	if (growtopiaWindow === undefined)
		throw Error('There is no Growtopia window open at the moment.');

	growtopiaWindow.bringToTop();

	const scaledBounds = getScaledBounds(growtopiaWindow);

	const mouse = new HumanMouse();
	const keyboard = new HumanKeyboard();

	await mouse.clickInWindow(scaledBounds, { left: '50%', bottom: 314 });

	await sleepApprox(500);

	await mouse.clickInWindow(scaledBounds, { top: 235, right: 250 });

	await keyboard.clearInput();

	await keyboard.typeString(USERNAME);
	await sleepApprox(100);

	await mouse.clickInWindow(scaledBounds, { top: 316, right: 250 });

	await keyboard.clearInput();

	await keyboard.typeString(PASSWORD);
	await sleepApprox(100);
	await mouse.clickInWindow(scaledBounds, { bottom: 80, right: 275 });

	await sleepApprox(5000);

	await mouse.clickInWindow(scaledBounds, { top: 70, right: 70 });
	await sleepApprox(500);

	await mouse.clickInWindow(scaledBounds, { top: 70, right: 70 });
	await sleepApprox(500);

	await mouse.clickInWindow(scaledBounds, { top: 165, left: '50%' });
	await sleepApprox(1000);

	await mouse.clickInWindow(scaledBounds, { top: 255, left: '50%' });

	await keyboard.clearInput();

	await keyboard.typeString(WORLD_NAME);

	await mouse.clickInWindow(scaledBounds, { bottom: 80, right: 275 });

	await sleepApprox(1000);

	await keyboard.typeKey('enter');

	await keyboard.typeString(MESSAGE);

	await keyboard.typeKey('enter');
}
