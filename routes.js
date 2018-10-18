import express from 'express';
import path from 'path';

const router = express.Router();


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/logout.html'));
});

// Authentiation Routes
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Authenticated Routes
router.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/order.html'));
});

router.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/cart.html'));
});

router.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/checkout.html'));
});

router.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/history.html'));
});

router.get('/finalise', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/finalise.html'));
});


// Admin Routes
router.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-menu.html'));
});

router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-list.html'));
});

export default router;
