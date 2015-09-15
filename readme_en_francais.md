# idris-lv03

Utiliser la projection suisse LV03 avec [leaflet](http://leafletjs.com/)

## Mise en place

Créer un dossier ```monProject```

```
$ mkdir myProject
$ cd myProject
```

### Installer

Initialiser npm and installer ```idris-maps```

```
$ npm init
$ npm install idris-lv03 --save
```

Copier le dossier ```myProject/node_modules/idris-lv03/public``` à ```monProject/public```

Si [watchify](https://github.com/substack/watchify) n'est pas installé:

```
$ sudo npm install watchify -g
```

Créer un fichier ```main.js``` et compilez le en ```myProject/public/script.js``` avec [watchify](https://github.com/substack/watchify)

```
$ watchify main.js -o public/script.js
```

Vous pourrez voir le résultat en ouvrant ```public/index.html``` dans un navigateur

Pour publier la carte, il suffit de copier le dossier ```public``` sur votre serveur une fois la carte créée

## Utilisation

Dans ```main.js```, demandez ```idris-lv03```

```
var lv03 = require('idris-lv03')
```

### Initialisation

#### Chemin vers le dossier images de leaflet

S'il est dans le même dossier que ```index.html```:

```
var imagePath = 'images'
```

#### Point de départ

Définissez le centre et le niveau de zoom de la carte au départ

* Avec des coordonnées LV03 en ```x``` et```y```

```
var start = {
	x: 182273,
	y: 538745,
	zoom: 22
}
```

* Avec des coordonnées WHS84 en ```lat``` et ```lng```

```
var start = {
	lat: 46.7888,
	lng: 6.6364,
	zoom: 22
}
```

#### Initialiser la carte avec ```lv03.init()```

La fonction prends les variables ```start``` et ```imagePath``` créées précédemment et renvoit une variable ```map```.

```
lv03.init(start, imagePath, function(map) {
	// le reste de votre code ici
})
```

### Ajouter un service WMS

La configuration du service nécessite les clés suivantes:

- ```url``` the URL to the service
- ```format``` the format of the tiles, default is ```image/png```
- ```attr``` proper attribution to the provider
- ```minZoom```, default is 0
- ```maxZoom```, default is 28

Pour ajouter la couche **r-pod_yverdon_cygnes** de [HEIGVD-WMS-RPOD](http://www.r-pod.ch/wms-server/) par exemple:

* créer la variable de configuration

```
var cygnes = {
	url: 'http://ogc.heig-vd.ch/mapserver/wms?',
	minZoom: 22,
	format: 'image/jpeg',
	attr: '&copy; HEIG-VD'
}
```

* ajouter la couche avec ```lv03.wms(map, [CONFIGURATION])```

```
lv03.init(start, imagePath, function(map) {
	lv03.wms(map, cygnes)
})
```

Quelques services en libre accès:

* VD-WMS [liste des couches](http://www.asitvd.ch/index.php?option=com_content&view=article&id=243&catid=55&tmpl=component)
* HEIGVD-WMS-RPOD [liste des couches](http://www.r-pod.ch/wms-server/)
* WMS-IFDG [liste des couches](http://www.geo.admin.ch/internet/geoportal/fr/home/services/geoservices/display_services/services_wms.html#wms)

### Ajouter une couche leaflet en WGS84

À l'intérieur du callback de ```lv03.init()```, vous pouvez une couche leaflet (comme L.marker(), L.geoJson() ...) avec des coordonnées en WGS84

```
lv03.init(start, imagePath, function(map) {
	L.marker([46.7888,6.6364]).addTo(map)
})
```

### Ajouter un markeur en LV03

La fonction ```lv03.point()``` prends deux paramétres ```map``` et ```coordonées``` au format  ```[x,y]```

```
lv03.init(start, imagePath, function(map) {
	lv03.point(map, [182273,538745])
})
```

