'use strict'

const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

const multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: __dirname + '/../uploads'});

router.get('/:id', userCtrl.getUser);
router.post('/signup', multipartMiddleware, userCtrl.signUp);
router.post('/signin', multipartMiddleware, userCtrl.signIn);
router.put('/update', auth, multipartMiddleware, userCtrl.updateUser);

module.exports = router;