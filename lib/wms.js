var services = require('./WMSservices.json')

module.exports = function(map, service, layer) {
	var s = getService(service, services)
	if(s === null) { console.log('service "' + service + '" is unavailable') }
	else { createLayer(map, s, layer) }
}

function createLayer(map, s, l) {
	if(s.maxZoom === undefined) {
		var maxZoom = 28
	} else {
		var maxZoom = s.maxZoom
	}
	if(s.minZoom === undefined) {
		var minZoom = 0
	} else {
		var minZoom = s.minZoom
	}
	L.tileLayer.wms(s.url, {
		layers: l,
		format: s.format,
		continuousWorld: true,
		minZoom: minZoom,
		maxZoom: maxZoom,
		attribution: s.attr
	}).addTo(map)
}

function getService(service, services) {
	var s = null
	for(i=0;i<services.length;i++) {
		if(service === services[i].name) {
			s = services[i]
			break
		}
	}
	return s
}
