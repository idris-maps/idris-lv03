var leafletProj = require('proj4leaflet')
var proj = require('./projLV03.json')

module.exports = function (L, callback) {
	var crs = new L.Proj.CRS(proj.code,proj.defs,
		{
			resolutions: proj.res,
			origin: proj.origin
		})
	var	map = new L.Map('map', {
			crs: crs,
			continuousWorld: true,
			worldCopyJump: false,
			maxZoom: proj.maxZoom
		})
	callback(map)
}
