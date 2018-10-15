'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/index.html'));
});

// Authentiation Routes
router.get('/login', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/login.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/signup.html'));
});

// Authenticated Routes
router.get('/order', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/order.html'));
});

router.get('/cart', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/cart.html'));
});

// Admin Routes
router.get('/menu', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/admin-menu.html'));
});

exports.default = router;