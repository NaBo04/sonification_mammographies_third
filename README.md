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

- Agregué la opción en la ventana de inicio para elegir el tipo de test a realizar, ya sea con o 
        sin sonificación. Esta selección queda guardada para el resto del desarrollo del test.
- Cambié las instrucciones en la ventana de selección de test. Para esto, agregué un nuevo código en
        JS que contiene las instrucciones, lo que lo hace mucho más ordenado. De esta manera, las
        instrucciones cambian dependiendo de si se escogió el test con o sin sonificación.
- Para todos los tests, hice un ajuste para cuando terminan todas las imágenes de un test. Ya no se
        recarga por última vez la misma ventana, sino que cambia de inmediato a la ventana final.
- Para todos los tests, eliminé la checkbox de mute, considerando que eso ahora se selecciona desde
        un inicio. Para esto también eliminé la lógica de actualización de su valor. Ahora todo se
        maneja por medio de una variable global.

# Proximos pasos: 

- Agregar un opción en la pantalla de inicio, que pregunte qué tipo de test quiere realizar, si con
        sonido o sin sonido. Según esto, por usuario guardar respuestas distintas para con sonido y
        sin sonido. Eso si, no se puede cambiar una vez se seleccione, y al terminar no se da la 
        opción de empezar de nuevo, ya que la idea es realizar el test en días distintos.
- Agregar una barra que cambie el contraste en los tests como una opción más para los usuarios.
- Indicar explícitamente en las instrucciones que deben colocar los cuadrados lo más centrados 
        posible en las microcalcificaciones.
- Eliminar una de las sonificaciones, solo se hará con una el test.
- Cambiar en el test 1 la pregunta: ¿Es la intensidad de color igual en la imagen de arriba que en 
        la de abajo?
- Cambiar los niveles de seguridad a 100% seguro y 100% inseguro.
- Quitar el botón de mute de los tests, solo se maneja de fondo según lo que se escogió al inicio.
- Indicar en las instrucciones que el tiempo se va a tomar durante los tests.
- Agregar un botón de pausa en los tests, debe pausar el tiempo de fondo y abrir un pop-up para que
        no se pueda continuar viendo el test.
- test 1: Mantener tamaño del puntero fijo.
- hablarle al profe para decidir las 45 fotos del test 3.
- test 2: identifique la presencia de 1 o más lesiones sugerentes de malignidad en esta mamografía. 
        Si considera que no hay lesión, indique su nivel de seguridad y continúe.
- test 3: cambiar toda la interfaz a un lado y dejar más espacio para la imagen.
- Una vez tenga las imágenes del test 3 debo borrar datos de las esquinas.
- Intentar iniciar el servidor al ejecutar la primera ventana, para que se pueda iniciar todo solo
        y que sea luego capaz de subir las soluciones al drive sin correr el server aparte.
- Revisar el tema de la red neuronal. El profe me añadió a otro github en el que debería estar. Este
        valor es un número más para los parámetros del mockDSP y debería manejar un sonido también.
- Arreglar el hardcodeo de las escalas en sonification, esto lo puedo hacer para cuando el profe me
        pase las sonificaciones reales. Aparte revisar que creo que la función de escalar tiene unos
        rangos mínimos-máximos por defecto equivocados.
- Arreglar el escalamiento de la imagen, creo que se ajusta al tamño del canvas. Debería mostrar lo
        que pueda de la imagen como un recorte, que luego se pueda desplazar en lo que falte.

# Pasos opcionales
- Añadir un botón de volver adelante y atrás para los cuadrados puestos, esto es cosa de guardar
        una lista con las coordenadas y los tamañaos para eliminarlos en orden o agregarlos. Luego,
        una función simple del canvas que cuando se apriete uno de estos botones se carga esa lista,
        con uno más o menos.
- Me gustaría invertir unas cositas, y es que podría cambiar el tamaño del puntero con la rueda del
        mouse, y ajustar el zoom con 2 botones de + y - al lado del canvas.

# Pedirle al profe
- Todas las imágenes del test 3 de mamografías.
- La sonificación final, para esto necesito el mockDSP. Tengo que tener ojo con los rangos mínimos, 
        máximos, los intervalos de cambio, etc. Que también le añada mute y volumen.