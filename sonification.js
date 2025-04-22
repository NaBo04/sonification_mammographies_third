var mock_dsp = window.mock_dsp; //Crea una variable con el mismo nombre y valor que tenga mock_dsp en el HTML
const arrayDisplay = document.getElementById('arrayDisplay'); //Toma una seccion visual del HTML para poder realizar cambios

function getPixelDataFromOriginalImage(x, y, windowSize) { //Crea una copia de la imagen en pantalla para trabajarla en un contexto de dibujo y retorna 
	var offScreenCanvas = document.createElement('canvas'); //Crea un canvas oculto
	var offScreenCtx = offScreenCanvas.getContext('2d', { willReadFrequently: true }); //Hace que el canvas tenga un contexto de dibujo 2D para ciertos comandos y optimiza el leer los pixeles
	offScreenCanvas.width = imgInstance._originalElement.width; //El nuevo canvas tiene el mismo ancho que la variable de imagen original
	offScreenCanvas.height = imgInstance._originalElement.height; //Tambien el mismo alto. (ImgInstance es una variable de canvas.js)
	offScreenCtx.drawImage(imgInstance._originalElement, 0, 0); //En el contexto de dibujo del nuevo canvas, copia la imagen original por completo desde el origen
	var pixelData = offScreenCtx.getImageData(x, y, windowSize, windowSize).data; //Del contexto de dibujo, extrae la informacion RGBA de un cuadro de ese tamaño y en esas coordenadas
	return pixelData; 
}

function sonification(mean, std, skw, kur, mute){ //Convierte los datos estadisticos en sonido
	if (mute){ //Toma el booleano mute
		mute = 0.0 //Si debe mutearse vale el minimo
	} else {
		mute = 1.0 //Sino, puede sonar al maximo
	}
	mean = parseFloat(mean) //Convierte los datos en float
	std = parseFloat(std)
	skw = parseFloat(skw)
	kur = parseFloat(kur)

	mock_dsp.setParamValue("/audiogen/mute", mute) //Le pasa los valores como parametros a mock_dsp
	mock_dsp.setParamValue("/audiogen/vol", mean)
	mock_dsp.setParamValue("/audiogen/noise", std)
	mock_dsp.setParamValue("/audiogen/freq", skw)
	mock_dsp.setParamValue("/audiogen/tempo", kur)
}

canvas.on('mouse:move', function(event) { //Sintaxis de Fabric. canvas es un objeto y realiza una funcion con este evento: mover el mouse sobre el canvas
    const window_size = 10; //Tamaño para ventana cuadrada alrededor del puntero
	var ctx = canvas.getContext('2d', { willReadFrequently: true }); //Guarda el contexto 2D de dibujo del canvas para leer pixeles
	var pointer = canvas.getPointer(event.e); //Coordenadas del mouse respecto al canvas, no a la ventana
    ///////// La DATA pareciera estar desfasada hacia abajo y la derecha /////////// Revisar si esto sigue siendo asi
	var data = ctx.getImageData(event.e.clientX, event.e.clientY, window_size, window_size).data; //Obtiene la info RGBA del contexto 2D, para una ventana que parte en la posicion del mouse respecto a la ventana
	var array = []; //Para llenar la matriz con los datos obtenidos
	for(var i = 0; i< window_size * window_size; i++){ //Llena la matriz solo con los valores de rojo de cada pixel
		array[i] = data[4*i]	
	}

	var objects = canvas.getObjects(); //Guarda los objetos dibujados en el canvas gestionado por Fabric
	mammography = objects[0] //El primer objeto del canvas es la imagen de la mamografia
	var BWPixelData = []; //Para guardar los valores de brillo de cada pixel de la imagen (black-white)
	var imagePointer = mammography.toLocalPoint(new fabric.Point(pointer.x, pointer.y), 'top', 'left'); //Entrega las coordenadas del puntero, pero ahora respecto a la imagen misma
	var pixelData = getPixelDataFromOriginalImage(Math.round(imagePointer.x) + 50, Math.round(imagePointer.y) + 50, 4); //Usa la funcion de arriba para obtener la info alrededor del puntero. (Tiene desplazamiento y distinto tamaño de ventana)
	for(var i = 0; i< 4 * 4; i++){ //Rellena la matriz de antes solo con los valores rojos de los pixeles y los normaliza
		BWPixelData[i] = pixelData[4*i]/255;
	}
	const newArr = []; //Para ordenar los datos en forma de matriz cuadrada
	while(BWPixelData.length) newArr.push(BWPixelData.splice(0,4)); //Carga los datos en la nueva matriz en subconjuntos para que quede cuadrada
	arrayDisplay.textContent = ` ${newArr[0]} \n ${newArr[1]} \n ${newArr[2]} \n ${newArr[3]}`; //Esto es para mostrar en la ventana en la parte de ArrayDisplay los resultados obtenidos

    const n = array.length; //Largo del primer array
	let mean = array.reduce((a,b) => a+b)/n/255; //Calcula el promedio y normaliza
	let std = Math.sqrt(array.map(x => Math.pow(x/255-mean,2)).reduce((a,b) => a+b)/n); //Calcula desviacion estandar y normaliza
	let skewness = 0.0001; //Valor inicial para evitar errores
	let kurtosis = 0.0001; //Valor inicial para evitar errores
    var mute = false; //Booleano para silenciar el audio
	if (std < 0.0001){ //Si la desviacion estandar es demasiado pequeña se dejan los valores anteriores
		skewness = 0.0001; //Redundante
		kurtosis = 0.0001; //Redundante
	}
	else {
		skewness = Math.sqrt(array.map(x => Math.pow(x/255-mean, 3)).reduce((a,b) => a+b)/(n*Math.pow(std, 3))); //Calcula skewness definitiva normalizada
		kurtosis = Math.sqrt(array.map(x => Math.pow(x/255-mean, 4)).reduce((a,b) => a+b)/(n*Math.pow(std, 4))); //Calcula kurtosis definitiva normalizada
	}
	if (isNaN(skewness)){ //Creo que esto tambien es redundante se puede hacer mejor 
		skewness = 0.0001;
		kurtosis = 0.0001;
	}

    sonification(mean, std, skewness, kurtosis, mute); //Llama a la otra función para convertir los datos en sonido
});