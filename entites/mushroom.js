export function addMushroom(obj) {
	return add([
		sprite('mushroom'),
		pos(obj.pos.x, obj.pos.y - 16),
		area(),
		body(),
		offscreen({destroy: true}),
		{
			speed: 60,
			dir: -1,

			add() {
				this.jump(200)

				this.onCollide('player', (p) => {
					destroy(this)
					play('powerup')
					p.biggify()
				})
			},
			patrol() {
				this.onUpdate(() => {
					this.move(this.speed * this.dir, 0)
				})

				this.onCollide((obj, col) => {
					if (col.isRight() || col.isLeft()) {
						this.dir = -this.dir
					}
				})
			}
		}
	])
}