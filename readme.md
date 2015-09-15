# idris-lv03

A wrapper to use the swiss LV03 projection with [leaflet](http://leafletjs.com/)

Explications [en français](https://github.com/idris-maps/idris-lv03/blob/master/readme_en_francais.md)

## Setup

Create a folder ```myProject``` for your project
```
$ mkdir myProject
$ cd myProject
```

### Install

Initialise npm and install ```idris-maps```

```
$ npm init
$ npm install idris-lv03 --save
```

Copy the ```myProject/node_modules/idris-lv03/public``` folder to ```myProject/public```

If [watchify](https://github.com/substack/watchify) is not installed, install it 

```
$ sudo npm install watchify -g
```

Create a ```main.js``` file and compile it into ```myProject/public/script.js``` with [watchify](https://github.com/substack/watchify)

```
$ watchify main.js -o public/script.js
```

You can see the result by opening ```public/index.html```

To publish on your server just copy the ```public``` folder

## Use

In ```main.js```, require ```idris-lv03```

```
var lv03 = require('idris-lv03')
```

### Initialise

#### Path to leaflets images folder

Set the path to the ```images``` folder, if it is in the same folder as ```index.html```:

```
var imagePath = 'images'
```

#### Center and zoom level at start
Set the center and zoom level of the map at start

* In LV03 coordinates as ```x``` and ```y```

```
var start = {
	x: 182273,
	y: 538745,
	zoom: 22
}
```

* In WGS84 coordinates as ```lat``` and ```lng```

```
var start = {
	lat: 46.7888,
	lng: 6.6364,
	zoom: 22
}
```

#### Initialise with ```lv03.init()```

Initialise the map with the ```start``` point and the ```imagePath```. It returns a ```map``` variable.

```
lv03.init(start, imagePath, function(map) {
	// the rest of your code goes in here
})
```

### Add WMS tiles

A WMS service needs the following keys:

- ```url``` the URL to the service
- ```format``` the format of the tiles, default is ```image/png```
- ```attr``` proper attribution to the provider
- ```minZoom```, default is 0
- ```maxZoom```, default is 28

To add the **r-pod_yverdon_cygnes** layer from [HEIGVD-WMS-RPOD](http://www.r-pod.ch/wms-server/) for example

Create the configuration

```
var cygnes = {
	url: 'http://ogc.heig-vd.ch/mapserver/wms?',
	minZoom: 22,
	format: 'image/jpeg',
	layer: 'r-pod_yverdon_cygnes',
	attr: '&copy; HEIG-VD'
}
```

... and add the layer with ```lv03.wms(map, [CONFIGURATION])```

```
lv03.init(start, imagePath, function(map) {
	lv03.wms(map, cygnes)
})
```

WMS services that I know of that do not require authentification:

* VD-WMS [list of layers](http://www.asitvd.ch/index.php?option=com_content&view=article&id=243&catid=55&tmpl=component)
* HEIGVD-WMS-RPOD [list of layers](http://www.r-pod.ch/wms-server/)
* WMS-IFDG [list of layers](http://www.geo.admin.ch/internet/geoportal/fr/home/services/geoservices/display_services/services_wms.html#wms)

### Add features in WGS84 coordinates

Within the callback of ```lv03.init()```, you can add any type of leaflet layer (such as L.marker(), L.geoJson() ...) with coordinates in WGS84

```
lv03.init(start, imagePath, function(map) {
	L.marker([46.7888,6.6364]).addTo(map)
})
```

### Add a marker in LV03 coordinates

You can add a marker in LV03 coordinates using the ```lv03.point(map, coordinates)``` function where ```coordinates``` is an array with x and y: ```[x,y]```

```
lv03.init(start, imagePath, function(map) {
	lv03.point(map, [182273,538745])
})
```

