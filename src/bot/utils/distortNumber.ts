/**
 * Distorts a number by changing its value up to a certain percentage.
 * @param number The number to distort
 * @param distortionFactor The distortion percentage (e.g. 0.1)
 */
export function distortNumber(
	number: number,
	distortionFactor: number
): number {
	const rndFactor = Math.random() * distortionFactor * 2 - distortionFactor;

	return number + number * rndFactor;
}
