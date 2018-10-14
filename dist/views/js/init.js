'use strict';

window.APP_URI = 'http://127.0.0.1:4000/api/v1';

if (localStorage.getItem('flash')) {
  const flash = localStorage.getItem('flash');
  const noty = JSON.parse(flash);
  console.log(noty);
  toast(noty.type, noty.message);
  localStorage.removeItem('flash');
}