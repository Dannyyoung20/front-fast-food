import express from 'express';
import path from 'path';

const router = express.Router();


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
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

export default router;
