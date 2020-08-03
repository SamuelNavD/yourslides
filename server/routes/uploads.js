'use strict'

const express = require('express');
const path = require('path');
const fs = require('fs');
const auth = require('../middlewares/auth');

const router = express.Router();

const multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '/../uploads'});

router.get('/:file', (req, res) => {
  var file = req.params.file;
  
  var pathImage = path.resolve( __dirname, `../uploads/${file}` );

  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage, (err) => {
      if (err) res.status(404).json({
        message: 'Error al traer la imagen',
        errors: { err: err, message: 'La imagen no se ha podido descargar del servidor' }
      });
    });
  } else {
    res.status(404).json({
      message: 'Error al traer la imagen',
      errors: { message: 'La imagen no se ha encontrado en el sistema' }
    });
  }
});

router.put('/upload', auth, multipartMiddleware, (req, res) => {
  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];
  const fileNameSplit = req.files.image.name.split('.');
  const fileExtension = fileNameSplit[ fileNameSplit.length - 1 ].toLowerCase();
  const filePath = req.files.image.path;
  const fileNameServerSplit = filePath.split('/');
  const fileNameServer = fileNameServerSplit[ fileNameServerSplit.length - 1 ];

  if (req.files && validExtension.indexOf(fileExtension) >= 0) {
    return res.status(200).json({
      message: 'Archivo subido',
      fileName: `${fileNameServer}`
    })
  } else if (validExtension.indexOf(fileExtension) < 0) {
    fs.unlinkSync(filePath);
    return res.status(406).json({
      err: 'Extensión de archivo no válida'
    })
  }
});

module.exports = router;