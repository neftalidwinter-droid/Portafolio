Simulador de un Gestor de tareas con backend con servidor http y API REST con CRUD y dos frontend, uno usando bootstrap y otro React Vite.

Inicializar el proyecto:
mkdir lab-fullstack-frontend

cd lab-fullstack-frontend

Inicializar el backend (en la raiz /lab-fullstack-frontend):
mkdir backend-api

cd backend-api

npm init -y

npm install express cors

npm install --save-dev nodemon

En la carpeta /backend-api sustituir el archivo package.json por el de este repositorio con el mismo nombre, agregar la carpeta /src de este repositorio con su respectivo archivo.

Correr el servidor:
npm start

Inicializar Bootstrap (en la raiz /lab-fullstack-frontend):
mkdir frontend-bootstrap

cd frontend-bootstrap

En la carpeta /frontend-bootstrap agregar el archivo index.html y la carpeta /js con su archivo de este repositorio.

Correr el html que usa Bootstrap con Go Live.

Inicializar React Vite:
npm create vite@latest frontend-react -- --template react

ESLint Yes

npm install Yes

cd frontend-react

npm install bootstrap

En la carpeta /src sustituir los archivos base App.jsx y main.jsx por los que aparecen en este repositorio.

Dentro de /src agregar la carpeta /components de este repositorio con sus archivos correspondientes.

Correr Vite:
npm run dev