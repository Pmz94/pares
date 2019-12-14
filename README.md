#Pares

Un simple juego de Pares

## Installacion

Nomas denle `npm install` en la terminal en la ubicacion de este proyecto

## Ejecucion

Denle `expo start` en la terminal igual en la ubicacion de este proyecto

### Nota

Si estan en Windows necesitaran cambiar una linea en el archivo `node_modules/metro-config/src/defaults/blacklist.js`

```javascript
var sharedBlacklist = [
	/node_modules[/\\]react[/\\]dist[/\\].*/,
	/website\/node_modules\/.*/,
	/heapCapture\/bundle\.js/,
  	/.*\/__tests__\/.*/
];
```

Cambiar a:

```javascript
var sharedBlacklist = [
	/node_modules[\/\\]react[\/\\]dist[\/\\].*/,
	/website\/node_modules\/.*/,
	/heapCapture\/bundle\.js/,
	/.*\/__tests__\/.*/
];

```

Fijense bien en el primer elemento del array ese. Nomas cambien la linea `/node_modules[/\\]react[/\\]dist[/\\].*/` por `/node_modules[\/\\]react[\/\\]dist[\/\\].*/` y ya, le vuelven a dar `expo start` en la terminal pa correrlo.