Dashboard usando Angular

Inicializar el proyecto:
npm install -g @angular/cli

ng new dashboard --style=css --ssr=false

cd dashboard-angular

npm install chart.js ng2-charts

En /src sustituir styles.css y index.html por los de este repositorio.

En /app sustituir app.ts, app.html, app.routes.ts y app.config.ts por los de este repositorio. Agregar las carpetas /core, /layout, /pages y /shared con todos sus elementos.

Ejecutar con ng serve.
