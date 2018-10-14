'use strict';

const uri = window.APP_URI;

// Increment functionality
const incrementBtn = document.querySelectorAll('#increment');
const decrementBtn = document.querySelectorAll('#decrement');

incrementBtn.forEach(inc => {
  inc.addEventListener('click', e => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const inputDOM = parentDOM.getElementsByTagName('input')[0];
    let value = parseInt(inputDOM.value, 10);

    if (value <= 100) {
      value += 1;
    } else {
      value = 0;
    }
    inputDOM.value = value;
  });
});

decrementBtn.forEach(dec => {
  dec.addEventListener('click', e => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const inputDOM = parentDOM.getElementsByTagName('input')[0];
    let value = parseInt(inputDOM.value, 10);

    if (value >= 1) {
      value -= 1;
    } else {
      value = 0;
    }
    inputDOM.value = value;
  });
});

window.onload = () => {
  // Check if token exist
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const payload = token.split('.')[1];
    const data = JSON.parse(window.atob(payload));
    const expires = data.exp;
    const currentDate = Math.floor(Date.now() / 1000); // Convert date to seconds

    // Check if the token has expired or not
    if (expires < currentDate) {
      window.location.href = '/login';
    }
  } else {
    flash({ type: 'default', message: 'Login Required' });
    window.location.href = '/login';
  }
};