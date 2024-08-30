export function setCamera() {

	const player = get('player')[0]
	const rightBoundary = 227.5
	const leftBoundary = 2326

	function handleCamera() {
		if (player.pos.x < rightBoundary || player.pos.x > leftBoundary) {
			return
		}

		camPos(player.pos.x, 69)
	}
	
	player.onUpdate(() => {
		handleCamera()
	})
	player.onPhysicsResolve(() => {
		handleCamera()
	})
}

