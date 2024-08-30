export function addWin (o) {
	add([
		sprite('castle'),
		pos(o.x, o.y + 16),
		anchor('bot'),
		area({shape: new Rect(vec2(14, 0), 16, 120)}),
		{
			add() {
				this.onCollide('player', (player) => {
					player.disableMovment()
					player.fadeO()
				})
			}
		}
	])
}