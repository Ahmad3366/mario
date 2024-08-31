class SoundSys {
	soundMap = {}

	initSounds() {
		this.soundMap['theme'] = play('theme', {paused: true})
		this.soundMap['stage_clear'] = play('stage_clear', {paused: true})
	}

	playSound(key) {
		this.soundMap[key].paused = false
	}

	stopSound(key) {
		this.soundMap[key].stop()
	}
}

export const soundSys = new SoundSys()