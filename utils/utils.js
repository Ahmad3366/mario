export function colorizeBg(hexCode) {
	add([
		rect(width(), height()),
		fixed(),
		color(Color.fromHex(hexCode))
	])
}

export async function fetchMapData(mapPath) {
  const mapData = await fetch(mapPath, { cache: "no-store" })
  return await mapData.json()
}

export function drawTiles(layer, tilewidth, tileheight) {

	let nbOfDrawnTiles = 0;
	const tilePos = vec2(0, 0)
	let tiles = []
	for (const tile of layer.data) {
		if (nbOfDrawnTiles % layer.width == 0) {
			tilePos.x = 0
			tilePos.y += tileheight
		} else {
			tilePos.x += tilewidth
		}

		nbOfDrawnTiles++
		if (tile == 0) continue;

		tiles.push({
			tileFrame: tile - 1,
			x: tilePos.x,
			y: tilePos.y
		})
	}

	onDraw(() => {
		for (const tile of tiles) {
			drawSprite({
				sprite: 'world',
				pos: vec2(tile.x, tile.y),
				frame: tile.tileFrame
			})
			
		}
	})
}

export function drawCollisions(layer) {
	for (const object of layer.objects) {
		add([
			// rect(object.width, object.height),
			pos(object.x, object.y + 16),
			area({shape: new Rect(vec2(0), object.width, object.height), collisionIgnore: ['ground']}),
			body({isStatic: true}),
			offscreen({hide: true}),
			object.name,
			'ground',
			{
				properties: object.properties
			}
		])
	}
}