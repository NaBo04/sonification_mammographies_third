function scaleToRange(x, xmin, xmax, abs_min, abs_max) {
    if (x < xmin) x = xmin;
    if (x > xmax) x = xmax;
    return abs_min + ((x - xmin) / (xmax - xmin)) * (abs_max - abs_min);
}

function sonification(mean, std, skw, kur){ //Convierte los datos estadisticos en sonido
    if (!window.mock_dsp) {
        return;
    }

	mock_dsp.setParamValue("/FinalSonification/2.f0", parseFloat(mean));
	mock_dsp.setParamValue("/FinalSonification/3.harmonicity", parseFloat(std));
	mock_dsp.setParamValue("/FinalSonification/4.repetition_rate", parseFloat(skw));
	mock_dsp.setParamValue("/FinalSonification/5.bandpass/fc", parseFloat(kur));
    mock_dsp.setParamValue("/FinalSonification/6.bandpass/Q", 1.0);
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
    const scaledMean = scaleToRange(mean, 0, 255, 20, 2000);
    const scaledStd = scaleToRange(stdDev, 0, 128, 0.25, 8.0)
    const scaledSkew = scaleToRange(Math.abs(skewness), 0, 10, 0.1, 30.0);
    const scaledKurt = scaleToRange(kurtosis, 0, 20, 20, 10000); 

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
            mock_dsp.setParamValue("/FinalSonification/0.mute", 0);
        }
    });
    canvas.upperCanvasEl.addEventListener('mouseleave', () => {
        mock_dsp.setParamValue("/FinalSonification/0.mute", 1);
    });
});
