'use strict';

localStorage.removeItem('token');
localStorage.removeItem('cart');
localStorage.removeItem('user');
flash({ type: 'success', message: 'successfully logged out' });
window.location.href = '/login';