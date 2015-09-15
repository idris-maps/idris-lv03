module.exports = function(map, wmsConfig) {
	createLayer(map, wmsConfig)
}

function createLayer(map, c) {
	if(c.maxZoom === undefined) {
		var maxZoom = 28
	} else {
		var maxZoom = c.maxZoom
	}
	if(c.minZoom === undefined) {
		var minZoom = 0
	} else {
		var minZoom = c.minZoom
	}
	if(c.format === undefined) {
		var format = c.format
	} else {
		var format = 'image/png'
	}
	L.tileLayer.wms(c.url, {
		layers: c.layer,
		format: format,
		continuousWorld: true,
		minZoom: minZoom,
		maxZoom: maxZoom,
		attribution: c.attr
	}).addTo(map)
}

