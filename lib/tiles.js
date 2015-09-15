module.exports = function(map, c) {
	if(c === 'ASITVD couleur' || c === 'ASITVD gris') {
		if(c === 'ASITVD couleur') { var fond = 'asitvd.fond_couleur' }
		if(c === 'ASITVD gris') { var fond =  'asitvd.fond_gris' }
		var url = 'http://ows{s}.asitvd.ch/wmts/1.0.0/' + fond + '/default/default/0/21781/{z}/{y}/{x}.png'
		var options = {
			subdomains: '56789',
			maxZoom: 28,
			attribution: 'ASIT-VD - ' 
				+ 'Informations dépourvues de foi publique, '
				+ '&copy; Etat de Vaud, '
				+ '&copy; Swisstopo, '
				+ '&copy; OpenStreetMap'
		}
	} else {
		if(c.url !== undefined) { 
			var url = c.url
			var options = c.options
		}
		else { console.log('Not a valid tile layer') }
	}
	L.tileLayer(url, options).addTo(map)
}
