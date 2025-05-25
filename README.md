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

- Comentarios descriptivos en todos los archivos de código.
- Eliminé partes innecesarias y cambié el orden en los códigos sin alterar su funcionamiento.
- Junté dos funciones iguales en canvas.js relacionadas a 'mouse:up'
- Eliminé todo lo relacionado a isDrawingMode de canvas.js.
- Solucioné provisoriamente el exceso en el valor de skewness y kurtosis
- Arreglé un pequeño error relacionado a la carga de la imagen en el canvas
- Esta versión tiene un código de prueba comentado que genera una sinusoide como sonido en la página
        web
- Estuve investigando sobre el tema de FAUST, entiendo lo que contiene su directorio. En el actual,
        este contiene el archivo mockDSP.dsp, el más importante, que es el que se escribe en FAUST
        y describe los parámetros importantes para como voy a usar el audio en la página. Este es el
        que puedo modernizar y pasarlo a AudioWorklet. Luego el mockDSP.html es simplemente una
        página web de prueba para comprobar que el audio está funcionando correctamente, este me 
        ineteresa utilizarlo para hacer pruebas luego de la actualización. Por último mockDSP.js y 
        mockDSP.wasm son generados automáticamente por el compilador de FAUST para manejar la API
        entre otros.
- Recuperé la página de inicio, donde se pide el nombre de usuario. Está pendiente poder guardar el
        progreso con el URL único, para continuar al salir. La enlacé a la página del test 3 de 
        mamografías.
- Conseguí hacer mi versión de sonido para los 5 parámetros con faust. Le agregué el parámetro de 
        volumen. Hice una nueva página para testear el cambio en estos y logré hacer que sonara. Ya
        que sé que funciona, ahora puedo esperar a la versión de faust del profe para que esa sea 
        la función oficial de sonido según los parámetros.
- Enlacé esta nueva versión de sonido que hice con Faust a la página web original y suenan los
        valores por defecto que dejé puestos.
- Agregué un slider para manejar el volumen del audio y un botón para mutear el sonido. Ambos
        funcionan correctamente y con los nuevos parámetros que cree.
- Cree la página de selección de test y tipo de sonificación, esta viene luego de ingresar el nombre
        de usuario. Arroja advertencias en caso de no seleccionar correctamente las opciones. Tiene
        la opción de volver atrás en caso de querer cambiar de usuario. Una vez se seleccionen las
        opciones al darle a empezar envía al test 3.
- Cree 2 nuevas páginas, para el test 1 y 2. Estas tienen la estructura base de lo que en primera
        instancia fueron. Por ahora está implementada la lógica de que se necesitan respuestas para
        continuar, en cualquier momento se pude volver y hay cambios de página correctos. 
- Agregué la selección de imagen aleatoria a los test 1 y 2.
- Agregué el conteo de tiempo en pantalla en los test 1 y 2.
- Implementé la página de término. Esta sale cuando se termina uno de los tests (por ahora 1 y 2), y
        tiene un botón para en el futuro descargar las respuestas, y otro para continuar con otro
        test, que retorna a la página de selección de test.
- Implementé la descarga de un archivo .csv de prueba al presionar el botón correspondiente en la
        pantallada de término.
- Ahora el archivo de descarga incluye el nombre del usuario.
- Agregué muchos cambios de la lógica de guardar el usuario y las respuestas. Funciona con listas,
        que dependen del nombre de usuario. Si se usa el mismo nombre de usuario se guardan las
        respuestas, y así no vuelven a salir imágenes ya realizadas en los tests. Se guardan el 
        número de la imagen realizada, el tiempo, y las 2 respuestas para el test 1. Si se completan
        todos las imágenes del test 1, envía directo a la página final donde cambia el texto y se
        pueden descargar las respuestas.
- Programé el formato de respuestas del test 1. Ya se descarga correctamente en el .csv. 
- Implementé la carga de datos de progreso a la página, por si es que no se guardan en el navegador.
- Agregué a los test 1 y 2 un botón que dice controles, que abre un pop-up que en el futuro mostrará
        los controles que salen en la página de test 3, o los nuevos que agregue.
- Ajusté la distribución en pantalla de los test 1 y 2. Esto para ajustarse a la resolución de mi 
        PC. 
- Agregué una columna a la izquierda de los test 1 y 2, donde están ahora el tiempo, controles y los
        sliders con el botón de mute.
- Estoy creando un nuevo canvas.js, los test 1 y 2 ya están enlazados a este, por ahor logré crear
        el canvas con la imagen correspondiente y del tamaño que tenía antes. Se ve igual que antes,
        solo que ya no es solo una imagen, es un cavas de fabric con una imagen en el.
- Agregué el cursor cuadrado rojo en los test 1 y 2. También lo optimicé porque antes obtenía uno
        nuevo siempre que se movía el mouse, ahora solo si hubo cambios en el tamaño o el zoom.

# Proximos pasos: 
Agregar a los test 1 y 2:
- El zoom con la rueda del mouse y verificar que todo esté correcto
- El moverse con el click derecho
- El colocar cuadrados con click, que se queden puestos, se ajusten al zoom y recordar guardar 
        donde se colocan como respuestas del tipo [x, y, size] para que se descarguen en los datos
        después y sirvan para el código que quiero hacer de comprobar respuestas. Recordar también,
        que esta función no va en el test 1, que solo es escuhar.
- Agregar la lista de controles.
- Revisar todos los puntos que se relacionan a las respuestas, descarga y carga de estas, para
        añadir de manera correcta las respuestas del test 2 y 3 con los cuadrados.
- Agregar la sonificación. Esto es largo porque debo verificar que todo se haga de manera correcta.
        Puedo usar las imágenes de prueba o inventar las mías.
- Agregar el test 3 de la misma forma que los 1 y 2.

# Pasos opcionales
- Botón de pausa de tiempo
- Eliminar los cuadrados puestos con un botón, o con un botón de UNDO, creo que es más fácil.

# Pedirle al profe
- Acceso a las imágenes de mamografías con respuestas o al mismo dropbox en el que están, para 
        añadirlas al test 3 y para usar mi código con las respuestas correctas.
- Preguntarle por el tema de meter las 5 sonificaciones o no. Y luego ver como añadir esto en el
        código.
- Pedirle la o las sonificaciones finales para añadirlas.