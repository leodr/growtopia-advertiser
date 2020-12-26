import { useEffect, useState } from 'react';
import { store } from '../shared/store';

export function useStore<T = string>(
	path: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState(() => store.get(path) as T);

	useEffect(() => {
		store.set(path, value);
	}, [path, value]);

	return [value, setValue];
}
