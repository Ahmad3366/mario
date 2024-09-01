export default function loadAssets() {
  loadRoot('../assets/')

  loadSprite('castle', 'Castle.png')
  loadSprite('mario', 'Mario.png', {
    sliceX: 26,
    anims: {
      'idle-small': 0,
      'walk-small': { from: 1, to: 3, loop: true },
      'jump-small': 5,
      'idle-big': 8,
      'walk-big': { from: 9, to: 11, loop: true },
      'jump-big': 13,
      'idle-power': 17,
      'walk-power': { from: 18, to: 20, loop: true },
      'jump-power': 22,
      death: 6
    }
  })
  loadSpriteAtlas('Enemies.png', {
    'goomba': {
      x: 0,
      y: 0,
      width: 96,
      height: 32,
      sliceX: 3,
      anims: {
        walk: { from: 0, to: 1, loop: true },
        death: 2
      }
    },
    'koopa': {
      x: 96,
      y: 0,
      height: 32,
      width: 128,
      sliceX: 4,
      anims: {
        walk: { from: 0, to: 1, loop: true },
        death: 2
      }
    }
  })
	loadSprite('world', 'OverWorld.png', {
		sliceX: 8,
		sliceY: 8
	})
	loadSpriteAtlas('OverWorld.png', {
		'mystery': {
			x: 64,
			y: 0,
			width: 16,
			height: 16
		},
		'empty': {
			x: 32,
			y: 0,
			width: 16,
			height: 16
		},
	})
	loadSpriteAtlas('Items.png', {
		'mushroom': {
			x: 0,
			y: 0,
			width: 16,
			height: 16
		}
	})

	loadRoot('../sounds/')
	loadSound('jump', 'jump-small.wav')
	loadSound('powerup', 'powerup.wav')
	loadSound('stomp', 'stomp.wav')
	loadSound('stage_clear', 'stage_clear.wav')
	loadSound('theme', 'Theme.mp3')
}