'use strict'

const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/private', auth, (req, res)=>{res.status(200).send({ message: "Estás dentro" });});
router.post('/signup', userCtrl.signUp);
router.post('/singin', userCtrl.signIn);

module.exports = router;