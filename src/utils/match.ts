export const encryptMatch = (id: number): string => {
	return `${process.env.TOKEN}${id}`;
};

export const decryptMatch = (matched: string): number => {
	const idString: string = matched.replace(process.env.TOKEN as string, '').replace(process.env.TOKEN as string, '');
	return parseInt(idString);
};
