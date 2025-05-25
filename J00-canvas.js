var brushSize = 100;

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

window.addEventListener('load', () => { //Esta parte crea un canvas al que le añade la imagen que se selecconó en el HTML
    const imgElement = document.getElementById("image");
    const initializeCanvasWithImage = () => {
        const imgWidth = imgElement.naturalWidth;
        const imgHeight = imgElement.naturalHeight;
        const imgScale = imgElement.width / imgElement.naturalWidth;

        const canvas = new fabric.Canvas("rasterCanvas", { //Toma el elemento con id=rasterCanvas del HTML y lo convierte en un canvas de fabric
            width : imgWidth * imgScale, //dos tercios del ancho de la ventana
            height : imgHeight * imgScale, //cuatro quintos del alto de la ventana
            backgroundColor : "#FFF", //Color de fondo
            enableRetinaScaling: true, //Para ajustarse a varios tipos de pantalla
            //freeDrawingCursor: `url(${ getDrawCursor() }) ${ brushSize } ${ brushSize }, crosshair`, //Activa el cursor personalizado
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

        canvas.add(fabricImg);
        //canvas.zoomToPoint(new fabric.Point(0, 0), zoom);
    }

    if (imgElement.complete && imgElement.naturalHeight !== 0) {
        initializeCanvasWithImage();
    } else {
        imgElement.onload = () => {
            initializeCanvasWithImage();
        };
    }
});