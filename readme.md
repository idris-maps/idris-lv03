#idris-lv03

A wrapper to use the swiss LV03 projection with [leaflet](http://leafletjs.com/)

##Install

Create a folder ```myProject``` for your project
```
$ mkdir myProject
$ cd myProject
```

Initialise npm and install ```idris-maps```

```
$ npm init
$ npm install idris-lv03 --save
```

Copy the ```myProject/node_modules/idris-lv03/public``` folder to ```myProject/public```

Create a ```main.js``` file and compile it into ```myProject/public/script.js``` with [watchify](https://github.com/substack/watchify)

```
$ watchify main.js -o public/script.js
```

If watchify is not installed, install it 

```
$ sudo npm install watchify --save
```

and try again.

##Use

In ```main.js```, require ```idris-lv03```

```
var lv03 = require('idris-lv03')
```

###Initialise

Set start point and path to the ```public/images``` folder

```
var imagePath = 'images'

var start = {
	lat: 46.7888,
	lng: 6.6364,
	zoom: 23
}
```

Initialise the map with the ```start``` point and the ```imagePath```. It returns a ```map``` variable.

```
lv03.init(start, imagePath, function(map) {
	// code goes here
})
```

###Add WMS tiles

The only tile services available so for are from [ASIT-VD](http://www.asitvd.ch) and [swisstopo](http://www.geo.admin.ch/internet/geoportal/fr/home/services/geoservices/display_services/services_wms.html#wms):

* VD-WMS [list of layers](http://www.asitvd.ch/index.php?option=com_content&view=article&id=243&catid=55&tmpl=component)
* HEIGVD-WMS-RPOD [list of layers](http://www.r-pod.ch/wms-server/)
* WMS-IFDG [list of layers](http://www.geo.admin.ch/internet/geoportal/fr/home/services/geoservices/display_services/services_wms.html#wms)

To add a service, see **Add WMS service**.

To add a layer from an existing service: **r-pod_yverdon_cygnes** from [HEIGVD-WMS-RPOD](http://www.r-pod.ch/wms-server/) for example, use ```lv03.wms(map, [SERVICE], [LAYER])``` like this:

```
lv03.init(start, imagePath, function(map) {
	lv03.wms(map, 'HEIGVD-WMS-RPOD', 'r-pod_yverdon_cygnes')
})
```

###Add features in WGS84 coordinates

Within the callback of ```lv03.init()```, you can add any type of leaflet layer (such as L.marker(), L.geoJson() ...) with coordinates in WGS84

```
lv03.init(start, imagePath, function(map) {
	L.marker([46.7888,6.6364]).addTo(map)
})
```

###Add a marker in LV03 coordinates

You can add a marker in LV03 coordinates using the ```lv03.point(map, coordinates)``` function where ```coordinates``` is an array with x and y: ```[x,y]```

```
lv03.init(start, imagePath, function(map) {
	lv03.point(map, [182273,538745])
})
```

##Add WMS service

Publicly available WMS services will be added in the future. If you want to add your own, you can do so in ```node_modules/idris-lv03/lib/WMSservices.json```

A service needs the following keys:

* ```name``` the name of the service
* ```url``` the URL to the service
* ```format``` the format of the tiles (```'image/jpeg'```, for example)
* ```attr``` proper attribution to the provider

Optional keys are:

* ```minZoom```, default is 0
* ```maxZoom```, default is 28

