Página Salomon

Inicializar el proyecto:
npm create vite@latest salomon-xt6-store -- --template react

create-vite@9.3.4 Yes

ESLint Yes

npm install Yes

cd salomon-xt6-store

npm install -D tailwindcss@3 postcss autoprefixer

npx tailwindcss init -p

npm install lucide-react

Sustituir el archivo tailwind.config por el de este repositorio. En la carpeta /src sustituir los archivos index.css y App.jsx por los de este repositorio.

Elimina /src/App.css.

Añadir en /src las carpetas /data y /components de este repositorio con todos sus elementos.

Correr el servidor:
npm run dev