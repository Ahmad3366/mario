import kaboom from "kaboom";
import 'kaboom/global';

import loadAssets from "./utils/loader";
import { makePlayer } from "./entites/player";
import { colorizeBg, drawCollisions, drawTiles, fetchMapData } from "./utils/utils";
import { setCamera } from "./utils/camera";
import { addWin } from "./entites/win";
import { addGoomba } from "./entites/goomba";

kaboom({
	logMax: 1
})

loadAssets()

setGravity(2000)

async function main() {
	colorizeBg('#35B6EB')

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
				
			}
			continue
		}

		drawTiles(layer, 16, 16)
	}

	camPos(227.5, 69)
	setCamera()
	camScale(3)
}

main()

// debug.inspect = true