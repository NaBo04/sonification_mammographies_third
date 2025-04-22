var brushSize = 100; // Un valor por defecto del tamaño del pincel (cuadrado)
const brushColor = '#FF0F0F90'; //Color del cuadrado que es el pincel (rojo transparente)
const brushOpacity = 0.9; //Opacidad del color del cuadrado
var zoom = 0.25; //Valor inicial del zoom de la imagen
var imgInstance; //Esta variable servirá para cargar la imagen de la mamografia
const urlMamographyImage = "./assets/C/export--69797765.jpg"; //Imagen de la mamografía que uso por ahora
const urlTestImage =  "./assets/phantoms/phantom.png"; //Este no lo estoy usando, pero me sirve para hacer pruebas (No debe ir a la versión final)

const getDrawCursor = () => { //Convierte el puntero del mouse en un cuadrado personalizado
    const square = `
        <svg
            height="${ brushSize*zoom }"
            width="${ brushSize*zoom }"
            fill="${ brushColor }"
            fill-opacity="${ brushOpacity }"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="${ brushSize*zoom }"
                height="${ brushSize*zoom }"
            />
        </svg>
    `; //Los valores tienen que estar iguales para que calce, se ajusta bien considerando el zoom.
    return `data:image/svg+xml;base64,${ window.btoa(square) }`; //Esto es para que el navegador lo pueda usar como cursor gráfico
};

function updateSliderValue(value) { //Actualiza el valor según la barra deslizante
    brushSize = parseInt(value, 10); //Convierte el valor a entero en base 10
    document.getElementById("sliderValue").textContent = brushSize; //Actualiza el texto que indica el tamaño del pincel
};

const canvas = new fabric.Canvas("rasterCanvas", { //Toma el elemento con id=rasterCanvas del HTML y lo convierte en un canvas de fabric
    width : 2*window.innerWidth/3, //dos tercios del ancho de la ventana
    height : 4*window.innerHeight/5, //cuatro quintos del alto de la ventana
    backgroundColor : "#333", //Color de fondo
    enableRetinaScaling: true, //Para ajustarse a varios tipos de pantalla
    fireMiddleClick: true, //Habilita eventos con el botón del medio del mouse (rueda)
    freeDrawingCursor: `url(${ getDrawCursor() }) ${ brushSize } ${ brushSize }, crosshair`, //Activa el cursor personalizado
    selection: false, //Para no seleccionar y arrastrar objetos con el mouse
});

const img = fabric.Image.fromURL(urlMamographyImage, function(oImg) { //Toma la imagen del directorio, la convierte en un objeto de fabric y llama a una función inmediatamente después (callback)
    oImg.set("selectable", false); //Para no poder seleccionar y mover la imagen
    oImg.set("hasControls", false); //Desactiva controles de fabric por defecto de cuando seleccionas una imagen
    oImg.set("hoverCursor", "default"); //Para que el cursor no haga un cambio al pasar por sobre la imagen
    canvas.add(oImg); //Añade la imagen al canvas
    canvas.zoomToPoint(new fabric.Point(0, 0), zoom); //Ajusta el zoom y toma como referencia el punto (0, 0), el origen
    imgInstance = oImg; //Guarda la imagen en la variable global
});
  
canvas.on('mouse:wheel', function(opt) { //Llama a la funcion si se mueve la rueda del mouse sobre el canvas
    var delta = opt.e.deltaY; //Obtiene un valor segun cuanto se movio la rueda del mouse, positivo o negativo.
    zoom = canvas.getZoom(); //Obtiene el valor actual del zoom del canvas
    zoom *= 0.999 ** delta; //Realiza el zoom de manera suave
    if (zoom > 10) zoom = 10; //Limite del zoom
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom); //Se realiza el zoom respecto a la posicion actual del mouse
    opt.e.preventDefault(); //Que no haga el movieminto default de la página y se mueva completa hacia arriba o abajo
    opt.e.stopPropagation(); //Que no afecte a elementos fuera del canvas
    canvas.freeDrawingCursor = `url(${ getDrawCursor() }) 0 0, crosshair`; //Actualiza el tamaño del cursor perosanlizado
    canvas.setCursor(`url(${ getDrawCursor() }) 0 0, crosshair`); //Para que el cursor sobre el canvas siempre sea el personalizado, aunque no sea el modo de dibujo
    canvas.requestRenderAll(); //Redibuja todo el canvas, para evitar problemas de sincronizacion, luego de los ajustes.
});

canvas.on('mouse:up', function(opt) { //Relaciona una funcion al evento de soltar el click del mouse sobre el canvas
    canvas.setCursor(`url(${ getDrawCursor() }) 0 0, crosshair`); //Recarga el puntero porsiacaso
    this.setViewportTransform(this.viewportTransform); //Revisar que onda con esto porque no tiene mucho sentido
    this.isDragging = false; //Esto tambien esta extraño
    this.selection = false;
});

canvas.on('mouse:down', function(opt) { //Relaciona una funcion al evento de presionar el click del mouse sobre el canvas
    var evt = opt.e; //Toma el evento realizado con el mouse, del objeto opt de fabric
    console.log(evt.buttons)
    if (evt.buttons === 4) { //Boton del medio (rueda), pero esto no funciona realmente.
        this.isDragging = true; //Activa el modo de arrastre en la imagen
        this.selection = false; //Tampoco selecciona nada
        this.lastPosX = evt.clientX; //Guarda la posición del mouse para luego calcular el movimiento
        this.lastPosY = evt.clientY;
    } else {
        canvas.freeDrawingCursor = `url(${ getDrawCursor() }) 0 0, crosshair`; //Actualiza el cursor
        var pointer = canvas.getPointer(opt.e); //Obtiene las coordenadas actuales del puntero
        var rect = new fabric.Rect({ //Variable que crea un objeto de fabric igual al puntero 
            left: pointer.x, //Coordenadas de la variable son las del mouse
            top: pointer.y,
            fill: 'rgba(255,0,0,0.5)', //Color
            width: brushSize, //Ancho y altura
            height: brushSize,
            selectable: false //No es seleccionable luego
        });
        canvas.add(rect); //Lo agrega al canvas para que se vea en pantalla
    }
});

addEventListener("keydown", async evt => { //Relaciona la funcion a continuacion con el evento de presionar una tecla
    if (evt.key == " ") { //Si la tecla es la barra espaciadora
        canvas.on('mouse:move', function(opt) { //Para cuando el mouse se mueve por sobre el canvas
            canvas.setCursor('grabbing'); //Cambia el cursor a la manito clasica de moverse
            var evt = opt.e; //Obtiene el evento del mouse
            this.isDragging = true; //Activa el modo de arrastre
            this.selection = false; //No se puede seleccionar
            this.lastPosX = evt.clientX; //Guarda la ultima posicion del mouse en X e Y
            this.lastPosY = evt.clientY;
        });
    }
});

addEventListener("keyup", async evt => { //Relaciona la funcion a continuacion con el evento de soltar una tecla
    if (evt.key == " ") { //Si la tecla que se soltó es la barra espaciadora
        canvas.on('mouse:move', function(opt) { //Relaciona la funcion a continuacion con el movimiento del mouse
            canvas.setCursor(`url(${ getDrawCursor() }) 0 0, crosshair`); //Actualiza el cursor personalizado
            var evt = opt.e; //Guarda el evento del mouse
            this.isDragging = false; //Desactiva el modo de movimiento
            this.selection = false; //No se puede seleccionar
            this.lastPosX = evt.clientX; //Considero que esto no deberia estar aca, simplemente que se descative el modo arrastrar
            this.lastPosY = evt.clientY;
            canvas.freeDrawingCursor = `url(${ getDrawCursor() }) 0 0, crosshair`;  //Actualiza el cursor personalizado
        });
    }
});

canvas.on('mouse:move', function(opt) { //Funcion realacionada al evento de mover el mouse sobre el canvas
    canvas.setCursor(`url(${ getDrawCursor() }) 0 0, crosshair`); //Actualiza el cursor
    if (this.isDragging) { //Si esta en el modo moverse
        var e = opt.e; //Guarda el evento del mouse
        var vpt = this.viewportTransform; //Guarda valores que usa fabric para la vista del canvas
        vpt[4] += e.clientX - this.lastPosX; //4 es vista horizontal y con esto la ajusta según el desplazamiento
        vpt[5] += e.clientY - this.lastPosY; //5 es vista vertical y hace lo mismo
        this.requestRenderAll(); //Carga nuevamente todo lo que contiene el canvas
        this.lastPosX = e.clientX; //Guarda las coordenadas del mouse
        this.lastPosY = e.clientY;
    }
});