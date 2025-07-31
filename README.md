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
- Para todos los tests, la barra de control del volumen aparece solo si se escogió la opción de 
        realizar el test con sonificación. Si es el test muteado ya no hay barra de volumen.
- Ajsuté los pop-ups de instrucciones dentro de cada test, para que también extraigan su contenido
        del archivo de instrucciones.
- Separé las respuestas para un mismo de usuario tanto por si los hizo con o sin sonificacion como
        por número de test. Ahora son 6 listas en total para cada nombre de usuario.
- Hice un gran cambio en cuanto a la subida de las respuestas al Google Drive. Considerando que 
        Google cambió sus políticas y la forma que utilizaba antes ya no funciona, tuve que buscar
        una alternativa. Ahroa utilizo un Google App Script. Con esto, le doy los permisos para 
        acceder a mi cuenta con el código que yo programe. Ahora conseguí que no se tenga que 
        iniciar un servidor aparte, ni se utiliza node, ni credenciales, ni nada como antes. 
        Funciona directamente en el navegador del usuario y al finalizar cada test como antes se 
        suben las respuestas automáticamente. Además, ahora se separan las respuestas en distintas
        carpetas según el test.
- Agregué una barra de contraste en los 3 test. Cambia tanto el contraste de la imagen visible, como
        el del canvas oculto por lo que el sonido depende de exactamente la imagen mostrada en 
        pantalla. Además, no se ve afectada por los cuadros, zoom, desplazamiento, ni nada, por lo 
        que es completamente compatible. Eso sí, fue complicado implementarlo, ya que las imágenes
        son muy grandes y la librería no lo soporta, por lo que lo hice manualmente, lo que es un 
        poco lento ante cambios muy rápidos.
- En el proceso de implementar el contraste, hice un ajuste que quería hacer sobretodo para el test
        3, ya que ahora las imágenes se escalan correctamente y cubren completamente el canvas. Lo 
        que sobre en una de las direcciones queda oculto pero se puede acceder a ello desplazando
        la imagen. Así no se pierde ni modifica la información con escalamientos. Es bueno ya que 
        si cambio el tamaño del canvas seguirá funcionando. Afecta un poco al test 1 y 2 pero lo 
        arreglaré luego, aunque es mínimo el efecto.
- Agregrué en las instrucciones de los test 2 y 3 que coloquen los cuadrados lo más centrados
        posibles en las microcalcificaciones.
- Ajusté el bloque que contiene las instrucciones en la selección del test, ahora es del 40% de la
        pantalla que lo contenga. Con esto aproveché de ajustar la forma en que escribo las 
        instrucciones para que se adapten también a esto. También borre lo relacionado a la caja de
        mute y agregué lo que menciona el contraste.
- Eliminé por completo la segunda sonificación. Incluyendo los archivos de faust, el contenido de
        las respuestas, opciones, archivo de sonificación, etc.
- Cambié la pregunta del test 1.
- Agregué 100% seguro e inseguro a los tests. 
- Hice varios cambios a la distribución del estilo de los tests. Con esto vairas partes se adaptan
        al tamaño de la pantalla, para que se vea bien en distintas resoluciones.
- En las instrucciones se menciona que se tomará el tiempo
- Implimenté el botón de pausa. Este abre un pop-up que indica que el test se pausó. Se puede volver
        cerrando el pop-up o apretando reanudar. Cuando se pausa, al igual que cuando se leen las 
        instrucciones, el tiempo no se sigue contando y se bloquea la imagen en la pantalla.

# Proximos pasos: 

- test 1: Mantener tamaño del puntero fijo.
- hablarle al profe para decidir las 45 fotos del test 3.
- test 2: identifique la presencia de 1 o más lesiones sugerentes de malignidad en esta mamografía. 
        Si considera que no hay lesión, indique su nivel de seguridad y continúe.
- test 3: cambiar toda la interfaz a un lado y dejar más espacio para la imagen.
- Una vez tenga las imágenes del test 3 debo borrar datos de las esquinas.
- Revisar el tema de la red neuronal. El profe me añadió a otro github en el que debería estar. Este
        valor es un número más para los parámetros del mockDSP y debería manejar un sonido también.
- Arreglar el hardcodeo de las escalas en sonification, esto lo puedo hacer para cuando el profe me
        pase las sonificaciones reales. Aparte revisar que creo que la función de escalar tiene unos
        rangos mínimos-máximos por defecto equivocados.
- Al final de todo, elminiar los botones de volver, atrás, cambiar de usuario, todos.
- Que la página no vibre al cambiar el volumen (por el tamaño del texto).
- Al pasar de cada imágen en los tests, guardar la configuración establecida de volumen, tamaño 
        del puntero, etc.
- Tomar todas las imágenes del test1, dividirlas en 2, quitando la línea, para en ese test poner 2
        canvas que ponga ambas mitades y así evitar que suene la línea. Otra opción es quitar la 
        línea con recortes, ajustar la imágen y simplemente colocar ambas zonas sin la línea 
        intermedia, así no tengo que hacer 2 canvas y cranearme como hacer que suenen de un lado y
        del otro.
- Hacer que el código funcione en un servidor/app de github como me mostró el profe que se puede
        hacer.
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
- Podría cambiar lo de seleccionar un test como click y que salen las instrucciones, ya que ahora es
        un progreso lineal, por lo que simplemente debería decir el test con las instrucciones dadas
        y darle a comenzar y listo.
- Que el botón de instrucciones funcione igual que el pausa. Que detenga el tiempo y se bloquee la
        imagen.

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