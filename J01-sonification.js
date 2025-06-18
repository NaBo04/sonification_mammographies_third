function scaleToRange(x, xmin, xmax, a = 0.001, b = 0.1) {
    if (x < xmin) x = xmin;
    if (x > xmax) x = xmax;
    return a + ((x - xmin) / (xmax - xmin)) * (b - a);
}

function sonification(mean, std, skw, kur){ //Convierte los datos estadisticos en sonido
    if (!window.mock_dsp) {
        return;
    }

    var sonific = sessionStorage.getItem('sonification');
    if (sonific == 2) {
        mean = scaleToRange(mean, 0, 0.1, 25, 75); //Esto está re-harcodeado, ojalá arreglar la parte de como se escalan los valores para cada sonificacion
        std = scaleToRange(std, 0, 0.1, 100, 200);
        skw = scaleToRange(skw, 0, 0.1, 250, 450);
        kur = scaleToRange(kur, 0, 0.1, 600, 1000);
    }

	mock_dsp.setParamValue("/mock_dsp/mean", parseFloat(mean));
	mock_dsp.setParamValue("/mock_dsp/std_dev", parseFloat(std));
	mock_dsp.setParamValue("/mock_dsp/skewness", parseFloat(skw));
	mock_dsp.setParamValue("/mock_dsp/kurtosis", parseFloat(kur));
}

function statisticalData(data) {
    const n = data.length;
    if (n === 0) return;

    const mean = data.reduce((sum, val) => sum + val, 0) / n; //promedio
    const variance = data.reduce((sum, val) => sum + (val - mean) ** 2, 0) / n;
    const stdDev = Math.sqrt(variance); //variación estándar
    let skewness = 0;
    let kurtosis = 0;
    if (stdDev > 0) {
        skewness = data.reduce((sum, val) => sum + ((val - mean) / stdDev) ** 3, 0) / n;
        kurtosis = data.reduce((sum, val) => sum + ((val - mean) / stdDev) ** 4, 0) / n - 3;

        if (!isFinite(skewness) || skewness < 0) skewness = 0;
        if (!isFinite(kurtosis) || kurtosis < 0) kurtosis = 0;
    }
    //Acá donde se sacan las escalas de los valores debo preguntarle al profe lo que considere adecuado
    const scaledMean = scaleToRange(mean, 0, 255);
    const scaledStd = scaleToRange(stdDev, 0, 128)
    const scaledSkew = scaleToRange(Math.abs(skewness), 0, 10);
    const scaledKurt = scaleToRange(kurtosis, 0, 20); 

    sonification(scaledMean, scaledStd, scaledSkew, scaledKurt);
}

window.addEventListener('load', () => {
    canvas.on('mouse:move', function(event) {
        const windowSize = squareSize / (zoom * imgScale); //El tamaño del cuadrado actual

        const pointer = canvas.getPointer(event.e);
        const realX = Math.floor((pointer.x / imgScale));
        const realY = Math.floor((pointer.y / imgScale));
        var pixelData = originalImageCtx.getImageData(realX, realY, windowSize, windowSize).data; //Obtiene la info RGBA de la imagen orignal, para una ventana que parte en la esquina superior izquierda
        
        var BWPixelData = []; //Para guardar los valores de brillo de cada pixel de la imagen (black-white)
        for(var i = 0; i< pixelData.length / 4; i++){ //Llena la matriz solo con los valores de rojo de cada pixel
            BWPixelData[i] = pixelData[4*i];
        }
        statisticalData(BWPixelData);
    });
    
    canvas.upperCanvasEl.addEventListener('mouseenter', () => {
        if (window.isMuted == false) {
            mock_dsp.setParamValue("/mock_dsp/mute", 0);
        }
    });
    canvas.upperCanvasEl.addEventListener('mouseleave', () => {
        mock_dsp.setParamValue("/mock_dsp/mute", 1);
    });
});
