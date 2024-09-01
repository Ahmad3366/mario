import { addMushroom } from "./mushroom"

export function makePlayer(posi) {
	return add([
		sprite('mario'),
		pos(posi || 32),
		area({ shape: new Rect(vec2(0), 15, 16) }),
		body(),
		anchor('bot'),
		offscreen({ distance: 0 }),
		opacity(),
		z(999),
		{
			initPos: posi,
			speed: 120,
			isMoving: false,
			playerState: 'small',
			playerJumpForce: 500,
			died: false,

			enableMovment() {
				this.controlHandlers = []

				this.controlHandlers.push(
					onKeyDown('left', () => {
						this.move(-this.speed, 0)
						this.flipX = true
						this.isMoving = true
						if (this.curAnim() != `walk-${this.playerState}`) {
							this.play(`walk-${this.playerState}`)
						}
					})
				)

				this.controlHandlers.push(
					onKeyDown('right', () => {
						this.move(this.speed, 0)
						this.isMoving = true
						this.flipX = false
						if (this.curAnim() != `walk-${this.playerState}`) {
							this.play(`walk-${this.playerState}`)
						}
					})
				)

				this.controlHandlers.push(
					onKeyPress('up', () => {
						if (this.isGrounded()) {
							this.jump(this.playerJumpForce)
							play('jump')
						}
					})
				)

				this.controlHandlers.push(
					onKeyRelease((key) => {
						if (key == 'left' || key == 'right') {
							this.isMoving = false
							this.play(`idle-${this.playerState}`)
						}
					})
				)
			},

			disableMovment() {
				this.play(`idle-${this.playerState}`)
				for (const handler of this.controlHandlers) {
					handler.cancel()
				}
			},
			update() {
				this.onUpdate(() => {
					if (!this.isGrounded()) {
						this.play(`jump-${this.playerState}`)
					}

					if (this.pos.y > 220) {
						this.pos = this.initPos
						camPos(227.5, 69)
						// this.gravityScale = 1
					}

					if (this.isGrounded() && !this.isMoving) {
						this.play(`idle-${this.playerState}`)
					}
					if (this.pos.x <= 7) {
						this.pos.x = 7
					}

					if (this.died) {
						this.play('death')
					}
				})
			},

			fadeO() {
				tween(
					1,
					0,
					0.5,
					o => this.opacity = o
				)
			},

			biggify() {
				this.playerState = 'big'
				this.area.shape.height = 32
			},
			smallify() {
				this.playerState = 'small'
				this.area.shape.height = 16
			},

			setEvents() {
				this.onGround(() => {
					this.play(`idle-${this.playerState}`)
				})
				this.onHeadbutt((obj) => {
					if (obj.is('mystery') && !obj.properties[0].value) {

						obj.use(sprite('empty'))
						const m = addMushroom(obj)
						m.patrol()

						obj.properties[0].value = true
					}
				})

				this.onExitScreen(() => {
					if (this.died) {
						this.gravityScale = 0
					}
				})
			},

			die() {

				// there's a bug somewhere here ...
				this.disableMovment()
				this.died = true
				this.collisionIgnore.push('ground')
				this.play('death')
				this.jump()
				wait(2, () => {
					this.gravityScale = 1
					camPos(227.5, 69)
					this.died = false
					this.collisionIgnore.pop()
					this.enableMovment()
					this.pos = this.initPos
				})
			}
		},
		'player'
	])
}