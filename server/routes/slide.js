'use strict'

const express = require('express');
const slideCtrl = require('../controllers/slide');
const auth = require('../middlewares/auth');

const router = express.Router();

const multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '/../uploads'});

router.get('/:id', slideCtrl.getSlide);
router.get('/all/:owner', slideCtrl.getAll);
router.put('/create', multipartMiddleware, slideCtrl.createSlide);
router.post('/update', multipartMiddleware, slideCtrl.updateSlide);
router.delete('/delete', multipartMiddleware, slideCtrl.deleteSlide);

module.exports = router;