import Store, { Schema } from 'electron-store';
import * as path from 'path';

interface StoreInterface {
	account: {
		growId: string;
		password: string;
	};
	executablePath: string;
}

const schema: Schema<StoreInterface> = {
	account: {
		type: 'object',
		properties: {
			growId: { type: 'string' },
			password: { type: 'string' },
		},
		required: ['growId', 'password'],
	},
	executablePath: { type: 'string' },
};

const defaults: StoreInterface = {
	account: { growId: '', password: '' },
	executablePath:
		process.platform === 'darwin'
			? '/Applications/Growtopia.app'
			: path.join(process.env.LOCALAPPDATA, 'Growtopia', 'Growtopia.exe'),
};

export const store = new Store({
	schema,
	defaults,
});
