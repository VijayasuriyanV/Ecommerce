export const loadState = <T = unknown>(key: string): T | undefined => {
	try {
		const serializedState = localStorage.getItem(key);
		if (!serializedState) return undefined;

		const parsed = JSON.parse(serializedState);

		if (Array.isArray(parsed)) {
			return parsed as T;
		}

		return undefined;
	} catch (err) {
		console.error(`Failed to load state for key: ${key}`, err);
		return undefined;
	}
};

export const saveState = <T>(key: string, state: T): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (err) {
		console.error(`Failed to save state for key: ${key}`, err);
	}
};

export const removeState = (key: string): void => {
	try {
		localStorage.removeItem(key);
	} catch (err) {
		console.error(`Failed to remove ${key} from localStorage`, err);
	}
};
