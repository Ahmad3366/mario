export function addGoomba(o) {
	return add([
		sprite('goomba', { anim: 'walk' }),
		pos(o.x, o.y + 16),
		area({ shape: new Rect(vec2(0, 8), 16, 16) }),
		anchor('center'),
		body(),
		offscreen({ hide: true }),
		{
			speed: 60,
			dir: 1,

			patrol() {
				this.hand = []

				this.hand.push(
					this.onUpdate(() => {
						this.move(this.speed * this.dir, 0)
					})
				)

				this.hand.push(
					this.onCollide((obj, col) => {
						if (col.isRight() || col.isLeft()) {
							this.dir = -this.dir
						}
					})
				)
			},
			

			add() {
				this.onCollide('player', (p, col) => {
					if (col.isTop()) {
						this.play('death')
						play('stomp')
						p.jump(260)
						for (const h of this.hand) {
							h.cancel()
						}
						this.unuse('body')
						this.unuse('area')
						wait(0.5, () => destroy(this))
					} else {
						if (p.playerState == 'big') {
							p.smallify()
							return
						}

						p.die()
					}
				})
			}
		},
		'enemy'
	])
}