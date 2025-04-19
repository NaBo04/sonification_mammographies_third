# Esta es la tercera versión de sonification_mammographies

Actualmente es una copia de la segunda versión, con comentarios adicionales en los códigos,
que me ayudan a entender el funcionamiento completo de este. En este readme iré detallando las
actualizaciones pertinentes, cambios y funcionalidades del código completo.

# Descripción de este directorio

- styles.css: Contiene configuración estética para la página web.
- sonification.js: Contiene 2 funciones que ayudan al flujo principal. La primera se encarga de
        obtener los valores de brillo rojo, de RGBA, de cada pixel en un área dada. La segunda, se
        encarga de asignar los parámetros de sonido del HTML principal, según los valores de los
        datos estadísticos. Luego, la parte principal relaciona el evento del movimiento del mouse
        por sobre el canvas que contiene la imagen de la mamografía. Este toma la posición del mouse
        y con ayuda de la función antes mencionada, utiliza los valores de los pixeles para calcular
        los distintos valores estadísticos. Finalmente se los entrega a la segunda función dicha. 
        También incluye la representación visual de los valores de los pixeles en forma de matriz, 
        en la ventana de la página, esta parte parece ser de debugueo, por lo que luego de revisarla
        la debo eliminar.
- canvas.js: Se encarga del contenido gráfico con el que se interactua. Primero define los 
        parámetros para el cursor, su forma, color y tamaño. También agrega su valor en texto junto
        a la barra deslizante que lo regula.

# Actualizaciones

- Comentarios en: styles.css
- Comentarios en: sonification.js
- Comentarios en: canvas.js 
- Eliminé partes innecesarias y cambié el orden en: sonification.js
- Eliminé partes innecesarias y cambié el orden en: canvas.js