# Proyecto Angular + Node.js + Express + Sequelize

Este es un proyecto full-stack que consiste en un frontend desarrollado en Angular y un backend en Node.js con Express y Sequelize para la gestión de datos en una base de datos MySQL. 
Consiste en un crud en frontend, con creación de api y backend donde también se urtilizan los pluggins más comunes full-calendar, mapas y gráficos.

Tecnologías utilizadas:

Frontend (Angular 19)

Angular 19 (Standalone: true)

Bootstrap para el diseño responsive /Estética: bootswatch/sketchy/

Angular Material (Tema Rose Red)

Leaflet para mapas

ngx-toastr para notificaciones

Consumo de APIs mediante HttpClient

FullCalendar para la gestión de eventos

Chart.js para visualización de datos

Backend (Node.js + Express)

Node.js

Express.js

Sequelize (ORM para MySQL)

MySQL como base de datos

Dotenv para la gestión de variables de entorno

CORS para el manejo de solicitudes entre dominios

Instalación/configuración:

Backend

Clonar el repositorio:

git clone [https://github.com/SandraBienert/inproCode-sprint-8-ClubTeatre-Angular.git]
cd inproCode-project

Desconectate de github, para no cambiar nada:
git remote remove origin

Instalar dependencias:

npm install

Configurar la base de datos en el archivo .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=822025Clave%
DB_NAME=membres

Ejecutar migraciones con Sequelize:

npx sequelize-cli db:migrate

Iniciar el servidor:

npm start

Frontend

Navegar al directorio del frontend y al backend:

cd inprocode-project
cd server

Instalar dependencias:

npm install

Ejecutar el proyecto en modo desarrollo:

ng serve -o
nodemon dist/index.js

Para producción:

npm run build

Endpoints del Backend

GET /membres: Obtener la lista de miembros.

POST /membres: Crear un nuevo miembro.

PUT /membres/:id: Actualizar un miembro existente.

DELETE /membres/:id: Eliminar un miembro.

GET /calendari_debuts: Obtener eventos de FullCalendar.

Configuración de Angular

El proyecto está configurado con las siguientes características:

outputPath: dist/inprocode-project

Estilos:

@angular/material/prebuilt-themes/rose-red.css

src/styles.css

bootstrap.min.css

leaflet.css

ngx-toastr/toastr.css

Scripts:

jquery.min.js

popper.min.js

bootstrap.min.js

Dependencias principales:

@angular/animations, @angular/cdk, @angular/core, @angular/forms

@fullcalendar/angular, @fullcalendar/core, @fullcalendar/daygrid, @fullcalendar/interaction, @fullcalendar/list

chart.js, rxjs, zone.js

bootstrap, jquery, leaflet, ngx-toastr

Configuraciones de build y serve:

npm start usa la configuración de desarrollo por defecto.

npm run build genera una versión optimizada.

npm run watch reconstruye en modo desarrollo al detectar cambios.

Configuración del Backend

Dependencias principales:

express, sequelize, mysql2, cors, dotenv

DevDependencies:

@types/cors, @types/express, @types/mysql

Scripts disponibles:

npm start: Inicia el servidor

npm test: Ejecuta pruebas (actualmente no configurado)

Estilos:
bootswatch.com/sketchy/

Autores

Sandra Bienert

Licencia

Este proyecto está bajo la licencia MIT.
