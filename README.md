# Proyecto para prueba de traslados

## Detalles:

- Backend hecho con node, express, typescript
- Hace uso de la api de transfers de [HotelBeds](https://developer.hotelbeds.com/documentation/transfers/)
- Otras librerías empleadas zod, jsonwebtoken, cors, cookie-parser, axios, bcrypt, helmet, short-unique-id
- Persistencia de datos en memoria, al reiniciar el server es necesario volver a registrar y loguear
- Tiene definidos 8 endpoints
  Auth: - POST (/api/auth/register) Permite registrar un usuario - POST (/api/auth/login) Permite loguear - POST (/api/auth/logout) Permite desloguear
  Country: - GET (/api/country/:country) Recibe por param el nombre de un país (en inglés) comprueba si existe y retorna destinos de ese país(ciudades).
  Locations: - GET (/api/locations/:cityCode) Recibe el codigo de una ciudad, y retorna puertos, aeropuertos, estaciones de tren y hoteles registrados por HotelBeds
  Availables: - POST (/api/availables) Recibe un body json con: fromType, fromCode, toType,toCode, outbound, inbound, adults,children, infants y retorna traslados disponibles con esas caracteristicas
  Confirm: - POST (/api/confirmTransfer) Requiere estár logueado, un body json con {remark, lenguage, transfers:{rateKey, transferDetails:{type,direction, code, companyName}[]}} y devuelve un objeto con detalles sobre la confirmación.
  Cancel: - DELETE (/api/cancelTransfer) Requiere estar logueado, y por par/ametro la referencia a la confirmación de traslado (booking) para cancelar

## Para levantar el proyecto en local:

- Clonar
- "npm install" en terminal
- Crear archivo .env con las variables definidas en .env.example
- "npm run dev" en terminal
