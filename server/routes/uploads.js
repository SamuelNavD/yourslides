'use strict'

const express = require('express');
const path = require('path');
const fs = require('fs');
const auth = require('../middlewares/auth');
const config = require('../config');

const router = express.Router();

const multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '/../uploads'});
var imageMultipartMiddleware = multipart({ uploadDir: __dirname + '/../uploads/images'});

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

// Images Editor

router.get('/image/:file', (req, res) => {
  var file = req.params.file;
  
  var pathImage = path.resolve( __dirname, `../uploads/images/${file}` );

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

router.post('/upload/image/file', imageMultipartMiddleware, (req, res) => {
  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];
  const fileNameSplit = req.files.image.name.split('.');
  const fileExtension = fileNameSplit[ fileNameSplit.length - 1 ].toLowerCase();
  const filePath = req.files.image.path;
  const fileNameServerSplit = filePath.split('/');
  const fileNameServer = fileNameServerSplit[ fileNameServerSplit.length - 1 ];

  if (req.files && validExtension.indexOf(fileExtension) >= 0) {
    return res.status(200).json({
      "success": 1,
      "file": {
        "url": `${config.url}:${config.port}/content/image/${fileNameServer}`,
      }
    })
  } else if (validExtension.indexOf(fileExtension) < 0) {
    fs.unlinkSync(filePath);
    return res.status(406).json({
      "success": 0,
    })
  }
});

router.post('/upload/image/url', imageMultipartMiddleware, (req, res) => {

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];

  var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      var fileExtension = res.headers['content-type'].split('/')[1];
      if (validExtension.indexOf() >= 0) {
        request(uri).pipe(fs.createWriteStream(filename + '.' + fileExtension)).on('close', callback);
      } else if (validExtension.indexOf(fileExtension) < 0) {
        return res.status(406).json({
          success: 0
        })
      }
    });
  };

  var imageId = makeid(24);
  download(req.body.url, './server/uploads/images/'+ imageId, (res) => {
    return res.status(200).json({
      "success": 1,
      "file": {
        "url": `${config.url}:${config.port}/content/image/${imageId}.${fileExtension}`,
      }
    })
  });

  
});

module.exports = router;