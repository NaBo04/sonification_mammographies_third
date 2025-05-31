var brushSize = 100;
var zoom = 0.25;
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
        //canvas.zoomToPoint(new fabric.Point(0, 0), zoom);
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