'use strict';

if (localStorage.getItem('user')) {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = window.atob(user.isAdmin);
  if (isAdmin !== 'true') {
    window.location.href = '/order';
  }
}