const webAppUrl = 'https://script.google.com/macros/s/AKfycbxMdMNixjFUw8PJwL3xftzg4N7DvRUMb4Hm7QrNFqq--eHggbElTES8DQE35lwAAj7F/exec'

async function subirArchivoDesdeBlob(blob, nombreArchivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = async function () {
      const base64 = lector.result.split(',')[1];

      const datos = {
        fileName: nombreArchivo,
        mimeType: blob.type,
        fileContent: base64
      };

      try {
        const respuesta = await fetch(webAppUrl, {
          method: 'POST',
          body: JSON.stringify(datos) // No incluyas headers Content-Type
        });

        const json = await respuesta.json();
        if (json.status === 'ok') {
          resolve(json.fileId);
        } else {
          reject(json.message);
        }
      } catch (err) {
        reject(err.message);
      }
    };

    lector.readAsDataURL(blob);
  });
}
