const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const app = express();

// Carpeta temporal donde se guardarán los archivos que subes antes de enviarlos a Drive
const upload = multer({ dest: 'uploads/' });

// Autenticación con cuenta de servicio
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'O02-credenciales.json'),
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

app.use((req, res, next) => {
  console.log(`Recibido ${req.method} a ${req.url}`);
  next();
});

app.post('/subir', upload.single('archivo'), async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetadata = {
      name: req.file.originalname,
      parents: ['1UUFTkp2WSKNoDWTc1j5op3pDrRidQveF'], // <-- REEMPLAZA ESTO con el ID de la carpeta compartida
    };

    const media = {
      mimeType: 'text/csv',
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });

    // Elimina archivo temporal después de subirlo
    fs.unlinkSync(req.file.path);

    console.log('Archivo subido a Drive. ID:', response.data.id);
    res.send(`✅ Archivo subido a Drive. ID: ${response.data.id}`);
  } catch (error) {
    console.error('❌ Error al subir el archivo:', error);
    res.status(500).send('Error al subir archivo a Drive.');
  }
});

app.listen(5000, () => {
  console.log('Servidor escuchando en http://localhost:5000');
});
