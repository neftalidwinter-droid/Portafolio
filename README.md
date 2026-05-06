UNIVERSIDAD DE MONTEMORELOS
Facultad de Ingeniería y Tecnología 
Actividad
Odometría de un robot
Presentado en cumplimiento parcial de los requisitos de la materia de:
Estándares Web
Docente:
Daniel Neri Ramírez
Alumno:
Giovanni Efraín Ortiz González
Montemorelos, Nuevo León		30 de Abril de 2026
 
Como proyecto del módulo de JavaScript/NodeJS se nos pidió simular la odometría de un robot. Los datos que se nos entregaron fueron:
•	Tamaño de las ruedas: 140 mm.
•	Cantidad de tickets para la vuelta de una rueda: 1450 tickets.
•	Condiciones para el aumento de ticks:
o	Que se generara un número aleatorio que se tomaría como referencia para decidir si se aumentaban los ticks.
o	El número generado debía estar entre 1 y 100.
o	Si el número era menor a 50 y era impar, entonces aumentaba un ticket.
o	Si el número era mayor a 50 y par, entonces aumentaba un ticket.
Se pidió que se levantara un servidor usando express y que los tickets para cada rueda del robot se publicaran por separado: /ticketsL y /ticketsR.
Con esos datos, entonces se crearía una página en el puerto 45050 donde se verían reflejados los siguientes datos:
•	Las dos ruedas:
o	La derecha girando en sentido horario y la izquierda en sentido antihorario para simular su movimiento hacia adelante.
o	El progreso del giro de las ruedas con respecto a los tickets.
o	El avance en cm de cada rueda.
o	La velocidad de cada rueda.
•	El robot:
o	La posición del robot en el mapa:
	Posición con respecto a x.
	Posición con respecto a y.
	Ángulo de movimiento.
o	La velocidad lineal del robot.
o	La velocidad angular del robot.
Lo primero que se hizo fue diseñar la estructura del sistema:
Odom/
├── backend/
    └── serverOdom.js
└── frontend/
    ├── odom_dashboard.html
    ├── css/
    │   └── odom.css
    └── js/
        └── odom.js
Se inició npm en la carpeta backend con el comando npm init -y. También se instaló express con el comando npm install express.
En package.json se agregó el script "start": "node serverOdom.js" para iniciar el servidor con el comando npm start.
El código del servidor se realizó de la siguiente manera:
 
Se inicializaron las constantes que se van a usar y se especificó la ruta para los archivos frontend que se van a mostrar directamente en el puerto 45050.
De ahí se trabajó en el código para generar los tickets de manera aleatoria siguiendo las condiciones que nos fueron dadas:
 
Se usaron dos funciones, la primera que sigue el método de generar una semilla y la segunda función que usa un algoritmo sencillo de PRNG (pseudo-random number generator) y se jugaron con ambas funciones para producir los valores de los tickets. Para que cada tick se produjera de manera independiente se establecieron dos setInterval a 50 ms.
 
Finalmente, los valores de los tickets son publicados en las rutas dadas por la función .get en /ticketsL y /ticketsR. Y el servidor es levantado en el puerto 45050.
En el archivo odom.js que es el javascript de la página se declararon las constantes y variables (como el ancho del robot de 20cm, el diámetro de las llantas, los tickets por vuelta, las variables para actualizar la posición, etc.) y se definió la función para la Odometría diferencial:
 
 
Para calcular la distancia del robot se aplicó la fórmula: distancia = (distancia de la rueda izquierda + distancia de la rueda derecha) / 2. Para el ángulo se calculó: ángulo Theta = (distancia de la rueda izquierda - distancia de la rueda derecha) / ancho del robot.
Para calcular las distancias individuales de cada rueda se fueron tomado los tickets de avance de cada intervalo de tiempo (tickets actuales - tickets previos) multiplicados por el valor en centímetros de cada ticket. Y con esos datos se actualizan los valores del ángulo.
Se añadieron otras funciones para actualizar el mapa de posicionamiento del robot y para las representaciones visuales de las ruedas.
La función principal se determinó para funcionar en un intervalo de 100ms. Por medio de fetch la función extrae los valores de los tickets en /ticketsL y /ticketsR:
 
 
 
 
Con los valores de la odometría diferencial se calcula la posición del robot en x, y y theta. La función también incluye una ventana deslizante de 500ms para calcular las velocidades de manera suave. Y cierra con la función draw() para actualizar el mapa de posicionamiento.
La página se ve de la siguiente manera:
 
