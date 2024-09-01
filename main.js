import kaplay from "kaplay";
import 'kaplay/global';

import loadAssets from "./utils/loader";
import { makePlayer } from "./entites/player";
import { colorizeBg, drawCollisions, drawTiles, fetchMapData } from "./utils/utils";
import { setCamera } from "./utils/camera";
import { addWin } from "./entites/win";
import { addGoomba } from "./entites/goomba";
import { soundSys } from "./utils/SoundSys";
import { addCoin } from "./entites/coin";

kaplay({
	logMax: 1
})

loadAssets()
soundSys.initSounds()

setGravity(2000)

async function main() {
	colorizeBg('#35B6EB')
	soundSys.playSound('theme')

	const mapData = await fetchMapData('./maps/map.json')
	const layers = mapData.layers

	let player = null

	for (const layer of layers) {
		if (layer.name == 'collisions') {
			drawCollisions(layer)
			continue
		}
		if (layer.name == 'spawns') {
			for (const o of layer.objects) {

				if (o.name == 'win') {
					addWin(o)
				}
				if (o.name == 'player') {
					player = makePlayer(vec2(o.x, o.y))
					player.enableMovment()
					player.setEvents()
					player.update()
				}
				if (o.name == 'goomba') {
					const goomba = addGoomba(o)
					goomba.patrol()
				}
				if (o.name == 'mystery') {
					add([
						sprite('mystery'),
						pos(o.x, o.y + 16),
						area(),
						body({isStatic: true}),
						offscreen({hide: true}),
						{
							properties: o.properties
						},
						'mystery'
					])
				}
				if (o.name == 'coin') {
					addCoin(o)
				}
				
			}
			continue
		}

		drawTiles(layer, 16, 16)
	}

	camPos(227.5, 69)
	setCamera()
	camScale(3)
}

scene('main', main)
scene('intro', () => {
	colorizeBg('#35B6EB')
	add([
		text('press [Enter] to start !', {size: 50}),
		anchor('center'),
		pos(center())
	])
	onKeyPress('enter', () => go('main'))
})

go('intro')

// debug.inspect = true