import type { Dispatch, SetStateAction } from "react";
import { timeout } from "./utils";
import invariant from "tiny-invariant";

export const rollFromData = async <T extends GeneralSummary>(
	data: T[],
	setRolled: Dispatch<SetStateAction<T>>,
) => {
	let lastRoll = data[0];
	invariant(lastRoll, "Array index 0 returned undefined");
	for (let i = 0; i < 10; i++) {
		const randNumber = Math.floor(Math.random() * data.length);
		lastRoll = data[randNumber];
		invariant(lastRoll, "Array to pick randomly from is empty");
		const temp = lastRoll;
		setRolled(
			(prev) =>
				({
					...data[randNumber],
					image: i === 9 ? temp.image : prev.image,
				}) as T,
		);
		await timeout(100);
	}
	return lastRoll;
};

export interface GeneralSummary {
	name: string;
	image: string;
}
