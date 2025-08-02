var brushSize = 25;
var zoom = 1;
const brushColor = '#FF0F0F90';
const brushOpacity = 0.9;
const maxSize = 128; //Tamaño maximo del cursor para que salga en el navegador
var squareSize = Math.min(brushSize * zoom, maxSize); 
let canvas;
let fabricImg;
let imgWidth;
let imgHeight;
let imgScale;
let originalImageCanvas;
let originalImageCtx;
let originalImageData;
let lastBrushSize = null; //Estas 3 let son para manejar el cambio en el cursor
let lastZoom = null;
let lastCursor = null;
let isDragging = false;
let whiteScreen;

function updateSizeValue(value) { //Actualiza el valor según la barra deslizante
    brushSize = value; //Convierte el valor a entero en base 10
    document.getElementById("sizeValue").textContent = brushSize; //Actualiza el texto que indica el tamaño del pincel
};
function updateVolumeValue(value) { //Actualiza el valor según la barra deslizante
    document.getElementById("volumeValue").textContent = value; //Actualiza el texto que indica el volumen
};
function updateContrastValue(value) { //Actualiza el valor según la barra deslizante
    document.getElementById("contrastValue").textContent = value; //Actualiza el texto que indica el volumen
    const imageData = new ImageData(new Uint8ClampedArray(originalImageData.data), imgWidth, imgHeight);
    const data = imageData.data;
    const factor = (259 * (value * 255 + 255)) / (255 * (259 - value * 255));
    for (let i = 0; i < data.length; i += 4) {
        const gray = data[i];
        const newGray = Math.max(0, Math.min(255, factor * (gray - 128) + 128));
        data[i] = data[i + 1] = data[i + 2] = newGray;
    }
    originalImageCtx.putImageData(imageData, 0, 0);

    const dataURL = originalImageCanvas.toDataURL();
    fabricImg.setSrc(dataURL, () => {
        fabricImg.scaleX = imgScale;
        fabricImg.scaleY = imgScale;
        canvas.renderAll();
    });
};

function putWhiteScreen() {
    canvas.add(whiteScreen);
    canvas.bringToFront(whiteScreen);
    canvas.renderAll()
}
function quitWhiteScreen() {
    canvas.remove(whiteScreen);
    canvas.renderAll();
}

const getDrawCursor = () => { //Convierte el puntero del mouse en un cuadrado personalizado
    squareSize = Math.min(brushSize * zoom, maxSize); 
    const square = `
        <svg
            height="${ squareSize }"
            width="${ squareSize }"
            fill="${ brushColor }"
            fill-opacity="${ brushOpacity }"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="${ squareSize }"
                height="${ squareSize }"
            />
        </svg>
    `; //Los valores tienen que estar iguales para que calce, se ajusta bien considerando el zoom.
    return `data:image/svg+xml;base64,${ window.btoa(square) }`; //Esto es para que el navegador lo pueda usar como cursor gráfico
};
const getAndCacheCursor = () => { //Esto revisa si cambiaron las condiciones del cursor para obtener uno nuevo, sino mantener el antiguo.
    if (brushSize !== lastBrushSize || zoom !== lastZoom || !lastCursor) {
        lastCursor = `url(${ getDrawCursor() }) 0 0, crosshair`;
        lastBrushSize = brushSize;
        lastZoom = zoom;
    }
    return lastCursor;
};

function configurarEventosCanvas() {
    canvas.on('mouse:move', function(opt) {
        canvas.setCursor(getAndCacheCursor());
    });

    canvas.on('mouse:down', function(e) {
        if (e.button == 1 && putSquare == true) { //Detecta el click izquierdo
            var pointer = this.getPointer(e); //Obtiene las coordenadas actuales del puntero
            const squareSize2 = Math.min(brushSize * zoom, maxSize) / zoom; 
            var rect = new fabric.Rect({ //Variable que crea un objeto de fabric igual al puntero 
                left: pointer.x, //Coordenadas de la variable son las del mouse
                top: pointer.y,
                fill: 'rgba(255,0,0,0.5)', //Color
                width: squareSize2,  //Ancho y altura
                height: squareSize2, 
                selectable: false //No es seleccionable luego
            });
            canvas.add(rect); //Lo agrega al canvas para que se vea en pantalla
            squares.push([(pointer.x + squareSize2 / 2) / imgScale, (pointer.y + squareSize2 / 2) / imgScale]); //guarda las coordenadas del centro del cuadrado como respuesta
        }
    });

    canvas.on('mouse:up', () => { //Para colocar de nuevo el puntero al soltar el mouse
        canvas.setCursor(getAndCacheCursor());
    });

    canvas.on('mouse:wheel', function(opt) {
        var delta = opt.e.deltaY; //Obtiene un valor segun cuanto se movio la rueda del mouse, positivo o negativo.
        zoom = canvas.getZoom(); //Obtiene el valor actual del zoom del canvas
        zoom *= 0.999 ** delta; //Realiza el zoom de manera suave
        if (zoom > 10) zoom = 10; //Limite del zoom
        if (zoom < 0.5) zoom = 0.5;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom); //Se realiza el zoom respecto a la posicion actual del mouse
        opt.e.preventDefault(); //Que no haga el movieminto default de la página y se mueva completa hacia arriba o abajo
        opt.e.stopPropagation(); //Que no afecte a elementos fuera del canvas
        canvas.requestRenderAll(); //Redibuja todo el canvas, para evitar problemas de sincronizacion, luego de los ajustes.
        canvas.setCursor(getAndCacheCursor());
    });
    //Todo esto de abajo es para el click derecho que funciona distinto
    canvas.upperCanvasEl.addEventListener('contextmenu', function(e){ //Con esto recibo el click derecho
        e.preventDefault(); //Elimina la función por defecto del click derecho
    });

    canvas.upperCanvasEl.addEventListener('mousedown', function(e) {
        if (e.button == 2) { //Detecta el click derecho
            isDragging = true;
            canvas.lastPosX = e.clientX; //Guarda la posición del mouse para luego calcular el movimiento
            canvas.lastPosY = e.clientY;
        }
    });

    canvas.upperCanvasEl.addEventListener('mouseup', () => { //Para dejar de arrastrar cuando se suelta el click dercho
        isDragging = false;
    });

    canvas.upperCanvasEl.addEventListener('mousemove', function(e) {
        if (isDragging == true) {
            var vpt = canvas.viewportTransform; //Guarda valores que usa fabric para la vista del canvas
            vpt[4] += e.clientX - canvas.lastPosX; //4 es vista horizontal y con esto la ajusta según el desplazamiento
            vpt[5] += e.clientY - canvas.lastPosY; //5 es vista vertical y hace lo mismo
            canvas.requestRenderAll(); //Carga nuevamente todo lo que contiene el canvas
            canvas.lastPosX = e.clientX; //Guarda las coordenadas del mouse
            canvas.lastPosY = e.clientY;
        }
    });
}

window.addEventListener('load', () => { //Esta parte crea un canvas al que le añade la imagen que se selecconó en el HTML
    const imgElement = document.getElementById("image"); //guarda el elemento HTML de la imgaen en una constante
    const initializeCanvasWithImage = () => {
        imgWidth = imgElement.naturalWidth;
        imgHeight = imgElement.naturalHeight;
        const canvasWidth = window.test == 3 ? window.innerWidth * 0.5 : window.innerWidth * 0.33;
        const canvasHeight = window.innerHeight * 0.9;
        imgScale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

        canvas = new fabric.Canvas("rasterCanvas", { //Toma el elemento con id=rasterCanvas del HTML y lo convierte en un canvas de fabric
            width: canvasWidth, 
            height : canvasHeight,
            backgroundColor : "#FFF", //Color de fondo
            enableRetinaScaling: true, //Para ajustarse a varios tipos de pantalla
            freeDrawingCursor: `url(${ getDrawCursor() }) ${ brushSize } ${ brushSize }, crosshair`, //Activa el cursor personalizado
            selection: false, //Para no seleccionar y arrastrar objetos con el mouse
        });
        fabricImg = new fabric.Image(imgElement, {
            left: 0,
            top: 0,
            selectable: false,
            hasControls: false,
            hoverCursor: "default",
            scaleX: imgScale,
            scaleY: imgScale
        });

        canvas.add(fabricImg); //Añade la imagen al canvas
        canvas.zoomToPoint(new fabric.Point(0, 0), zoom);
        configurarEventosCanvas();
        //Aquí creo el contexto de dibujo sobre un canvas oculto que contiene solo la imagen original
        originalImageCanvas = document.createElement('canvas');
        originalImageCanvas.width = imgWidth;
        originalImageCanvas.height = imgHeight;
        originalImageCtx = originalImageCanvas.getContext('2d', { willReadFrequently: true });
        originalImageCtx.drawImage(imgElement, 0, 0, imgWidth, imgHeight);
        originalImageData = originalImageCtx.getImageData(0, 0, imgWidth, imgHeight);
    }

    if (imgElement.complete && imgElement.naturalHeight !== 0) {
        initializeCanvasWithImage();
    } else {
        imgElement.onload = () => {
            initializeCanvasWithImage();
        };
    }

    whiteScreen = new fabric.Rect({left: 0, top: 0, width: canvas.width, height: canvas.height,
        fill: 'white', selectable: false, evented: false}); //Pantalla blanca para cuando se pause
});