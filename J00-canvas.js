var brushSize = 25;
var zoom = 1;
const brushColor = '#FF0F0F90';
const brushOpacity = 0.9;
let canvas;
let lastBrushSize = null; //Estas 3 let son para manejar el cambio en el cursor
let lastZoom = null;
let lastCursor = null;


function updateSizeValue(value) { //Actualiza el valor según la barra deslizante
    brushSize = value; //Convierte el valor a entero en base 10
    document.getElementById("sizeValue").textContent = brushSize; //Actualiza el texto que indica el tamaño del pincel
};
function updateVolumeValue(value) { //Actualiza el valor según la barra deslizante
    document.getElementById("volumeValue").textContent = value; //Actualiza el texto que indica el volumen
};
function updateMuteValue() { //Actualiza el valor según la barra deslizante
    var muteStatus = muteCheckBox.checked ? "ON" : "OFF";
    document.getElementById("muteValue").textContent = muteStatus; //Actualiza el texto que indica el volumen
};

const getDrawCursor = () => { //Convierte el puntero del mouse en un cuadrado personalizado
    const maxSize = 128; //Tamaño maximo del cursor para que salga en el navegador
    const squareSize = Math.min(brushSize * zoom, maxSize); 
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
    canvas.upperCanvasEl.addEventListener('contextmenu', function(e){ 
        e.preventDefault();//Elimina la función por defecto del click derecho
    });

    canvas.on('mouse:move', () => {
        canvas.setCursor(getAndCacheCursor());
    });

    canvas.on('mouse:up', () => {
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
}

window.addEventListener('load', () => { //Esta parte crea un canvas al que le añade la imagen que se selecconó en el HTML
    const imgElement = document.getElementById("image");
    const initializeCanvasWithImage = () => {
        const imgWidth = imgElement.naturalWidth;
        const imgHeight = imgElement.naturalHeight;
        const imgScale = imgElement.width / imgElement.naturalWidth;

        canvas = new fabric.Canvas("rasterCanvas", { //Toma el elemento con id=rasterCanvas del HTML y lo convierte en un canvas de fabric
            width : imgWidth * imgScale, //dos tercios del ancho de la ventana
            height : imgHeight * imgScale, //cuatro quintos del alto de la ventana
            backgroundColor : "#FFF", //Color de fondo
            enableRetinaScaling: true, //Para ajustarse a varios tipos de pantalla
            freeDrawingCursor: `url(${ getDrawCursor() }) ${ brushSize } ${ brushSize }, crosshair`, //Activa el cursor personalizado
            selection: false, //Para no seleccionar y arrastrar objetos con el mouse
        });
        const fabricImg = new fabric.Image(imgElement, {
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
    }

    if (imgElement.complete && imgElement.naturalHeight !== 0) {
        initializeCanvasWithImage();
    } else {
        imgElement.onload = () => {
            initializeCanvasWithImage();
        };
    }
});