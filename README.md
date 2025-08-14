# Esta es la tercera versión de sonification_mammographies

# Descripción de este directorio

- H00-startScreen.html: Página de inicio, donde se pide el nombre de usuario para ingresar. Maneja 
        la lógica de que si no se ingresó el nombre arroja una advertencia.
- H01-testSelection.html: Página para luego de ingresar, en la que se debe seleccionar un test a 
        realizar y una sonificación que se va a usar. Maneja la lógica de que se seleccione una
        opción en ambos casos para continuar. Al seleccionar cada test distinto envía a una página
        distinta al presionar 'Empezar'. Al presionar 'Volver' retorna a la página de inicio.
- H02-test1.html: Página donde se realiza el test 1 'Zonas Grises'. Muestra una imagen aleatoria 
        dentro de las 45 disponibles, junto con el número de esta. Indica el lugar donde se mostrará
        el tiempo transcurrido del test. Muestra 2 preguntas y sus respuestas relacionadas al test.
        Al presionar 'Volver' lleva a la página de selección de test y no se guarda el progreso. Al
        presionar 'Finalizar' lleva a la página de selección de test. Maneja la lógica de que si no 
        se ha seleccionado una opción en ambas preguntas, entonces no deja finalizar.
- H03-test2.html: Página donde se realiza el test 2 'Imágenes Sintéticas'. Muestra una imagen 
        aleatoria dentro de las 45 disponibles, junto con el número de esta. Indica el lugar donde 
        se mostrará el tiempo transcurrido del test. Muestra 1 pregunta y sus respuestas 
        relacionadas al test. Al presionar 'Volver' lleva a la página de selección de test y no se 
        guarda el progreso. Al presionar 'Finalizar' lleva a la página de selección de test. Maneja 
        la lógica de que si no se ha seleccionado una opción en ambas preguntas, entonces no deja 
        finalizar.
- H04-test3.html: Página donde se encuentra el test 3 'Mamografías'. Actualmente tiene unas 
        funciones para manejar los parámetros de mock_dsp, pero no funcionan 
        correctamente. Inicia todo lo relaciondo a Faust. Muestra una imagen fija de mamografía.
        Tiene instrucciones de los controles. Tiene un apartado de debugueo para la información de
        pixeles en el puntero dentro de la imagen. Tiene una barra para ajustar el tamaño del
        puntero. Maneja la lógica de que si no se ha seleccionado una opción en ambas preguntas, 
        entonces no deja finalizar.
- J00-canvas.js: Se encarga del contenido gráfico con el que se interactua. Primero define los 
        parámetros para el cursor, su forma, color y tamaño. También agrega su valor en texto junto
        a la barra deslizante que lo regula. Luego, crea el canvas que se utilizará para mostrar la
        imagen, el cursor, los recuadros, etc. Para después cargar la imagen sobre este mismo 
        canvas. Ya todo lo que queda después es definir funciones según distintos eventos. Siendo, 
        desplazarse en la imagen apretando la rueda del mouse o la barra espaciadora. Hacer zoom, 
        con la rueda del mouse. Y Colocar cuadros en el canvas presionando el click izquierdo.
- J01-sonification.js: Contiene 2 funciones que ayudan al flujo principal. La primera se encarga de
        obtener los valores de brillo rojo, de RGBA, de cada pixel en un área dada. La segunda, se
        encarga de asignar los parámetros de sonido del HTML principal, según los valores de los
        datos estadísticos. Luego, la parte principal relaciona el evento del movimiento del mouse
        por sobre el canvas que contiene la imagen de la mamografía. Este toma la posición del mouse
        y con ayuda de la función antes mencionada, utiliza los valores de los pixeles para calcular
        los distintos valores estadísticos. Finalmente se los entrega a la segunda función dicha. 
        También incluye la representación visual de los valores de los pixeles en forma de matriz, 
        en la ventana de la página, esta parte parece ser de debugueo, por lo que luego de revisarla
        la debo eliminar.
- S00-styleStartScreen.css: Contiene configuración estética para la página de inicio. 
- S01-styleTestSelection.css: Contiene configuración estética para la página de selección de tests. 
- S02-styleTest1.css: Contiene configuración estética para la página del test 1. 
- S03-styleTest2.css: Contiene configuración estética para la página del test 2. 
- S04-styleTest3.css: Contiene configuración estética para la página del test 3. 

# Actualizaciones

- Destaqué en rojo la instrucción de no marcar nada si considera que la imagen no tiene lesión 
        maligna.
- Para la versión oficial, el test 1 ya no contiene barra de contraste.
- Implementé la versión para hacer pruebas. Esta incluye solo los tests 1 y 2, y se pueden realizar
        4 formas distintas de cada uno. Estas son las combinaciones de hacer los test con y sin 
        sonificación, y hacerlos con y sin contraste. Las respuestas se cargan a una nueva carpeta
        de Google Drive.

# Proximos pasos: 

- Al pasar de cada imágen en los tests, guardar la configuración establecida de volumen, tamaño 
        del puntero, etc. 
- Podría cambiar lo de seleccionar un test como click y que salen las instrucciones, ya que ahora es
        un progreso lineal, por lo que simplemente debería decir el test con las instrucciones dadas
        y darle a comenzar y listo.
- La sonificación tiene que ser con respecto a la imagen original, no alterarse con el contraste de
        la imagen.
- Si el test es el 1 o el 2 dejar el tamaño fijo de la imagen, igual al tamaño que tienen las 
        imágenes de estos. El test 3 si se debe quedar como el último código que hice que se adapta
        con una escala bien hecha, sin perder información. Pasa que en el test 1 no queda centrado,
        y tanto en este como en el 2 se puede perder un poquito de info. Sería bueno algo como, un
        tercio de la pantalla en ancho, y el alto que sea lo necesario para que la escala sea 
        correcta. 
- El contraste es lento en cambio cuando la imagen es muy grande, se me ocurre mejor poner 2 botones
        de + y - para que le de tiempo a cambiar.
- Me gustaría hacer que todo funcione en proporciones, del tipo que los bloque de columna y así sean
        un porcentaje de la ventana y así se adapte a varias resoluciones de pantallas.
- Revisar el tema de la red neuronal. El profe me añadió a otro github en el que debería estar. Este
        valor es un número más para los parámetros del mockDSP y debería manejar un sonido también.
- Tomar todas las imágenes del test1, dividirlas en 2, quitando la línea, para en ese test poner 2
        canvas que ponga ambas mitades y así evitar que suene la línea. Otra opción es quitar la 
        línea con recortes, ajustar la imágen y simplemente colocar ambas zonas sin la línea 
        intermedia, así no tengo que hacer 2 canvas y cranearme como hacer que suenen de un lado y
        del otro.
- Insistir al profe con la sonificación, el pago y el correo de Marcelo para pedirle las imágenes
        oficiales para el test 3.
- Arreglar el hardcodeo de las escalas en sonification, esto lo puedo hacer para cuando el profe me
        pase las sonificaciones reales. Aparte revisar que creo que la función de escalar tiene unos
        rangos mínimos-máximos por defecto equivocados.
- Al final de todo, elminiar los botones de volver, atrás, cambiar de usuario, todos.

# Pasos opcionales
- Añadir un botón de volver adelante y atrás para los cuadrados puestos, esto es cosa de guardar
        una lista con las coordenadas y los tamañaos para eliminarlos en orden o agregarlos. Luego,
        una función simple del canvas que cuando se apriete uno de estos botones se carga esa lista,
        con uno más o menos.
- Me gustaría invertir unas cositas, y es que podría cambiar el tamaño del puntero con la rueda del
        mouse, y ajustar el zoom con 2 botones de + y - al lado del canvas.