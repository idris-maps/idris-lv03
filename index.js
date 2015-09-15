var L = require('leaflet')
var initMap = require('./lib/initMap')
var wms = require('./lib/wms')
var convert = require('./lib/swisstopo')

exports.init = function(center, imagePath, callback) {
	initMap(L, function(map) { 
		L.Icon.Default.imagePath = imagePath
		map.setView([center.lat, center.lng], center.zoom)
		callback(map) 
	})
}

exports.wms = function(map, service, layer) {
	wms(map, service, layer)
}

exports.point = function(map, coords) {
	var lat = convert.CHtoWGSlat(coords[1], coords[0])
	var lng = convert.CHtoWGSlng(coords[1], coords[0])
	L.marker([lat,lng]).addTo(map)
}
