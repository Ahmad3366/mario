export function addCoin (o) {
	add([
		sprite('coin', {anim: 'spin'}),
		pos(o.x, o.y + 16),
		// anchor('bot'),
		// area({shape: new Rect(vec2(14, 0), 16, 120)}),
		area(),
		{
			add() {
				this.onCollide('player', (player) => {
					destroy(this)
					play('coin')
				})
			}
		}
	])
}