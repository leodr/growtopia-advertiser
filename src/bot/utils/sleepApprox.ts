export async function sleepApprox(
	ms: number,
	distortionFactor = 0.1
): Promise<void> {
	const rndFactor = Math.random() * distortionFactor * 2 - distortionFactor;

	return await new Promise((resolve) => {
		setTimeout(resolve, ms + ms * rndFactor);
	});
}
