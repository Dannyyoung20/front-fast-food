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

router.get('/logout', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/logout.html'));
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

router.get('/checkout', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/checkout.html'));
});

router.get('/history', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/history.html'));
});

router.get('/finalise', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/finalise.html'));
});

// Admin Routes
router.get('/menu', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/admin-menu.html'));
});

router.get('/list', (req, res) => {
  res.sendFile(_path2.default.join(__dirname, '../views/admin-list.html'));
});

exports.default = router;