var L = require('leaflet')
var initMap = require('./lib/initMap')
var wms = require('./lib/wms')
var convert = require('./lib/swisstopo')
var tiles = require('./lib/tiles')

exports.init = function(center, imagePath, callback) {
	initMap(L, function(map) { 
		L.Icon.Default.imagePath = imagePath
		if(center.x !== undefined && center.y !== undefined) {
			var lat = convert.CHtoWGSlat(center.y, center.x)
			var lng = convert.CHtoWGSlng(center.y, center.x)
			var coords = [lat, lng]
		} else {
			var coords = [center.lat, center.lng]
		}
		console.log(coords)
		map.setView(coords, center.zoom)
		callback(map)
	})
}

exports.wms = function(map, wmsConfig) {
	wms(map, wmsConfig)
}

exports.point = function(map, coords) {
	var lat = convert.CHtoWGSlat(coords[1], coords[0])
	var lng = convert.CHtoWGSlng(coords[1], coords[0])
	L.marker([lat,lng]).addTo(map)
}

exports.tiles = function(map, tilesConfig) {
	tiles(map, tilesConfig)
}
