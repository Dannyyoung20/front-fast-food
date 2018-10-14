'use strict';

const constructDOMElement = () => {
  const nodeDivToast = document.createElement('div');
  const nodeDivImg = document.createElement('div');
  const DOMImg = document.createElement('img');
  const nodeDivDesc = document.createElement('div');

  // Add the id attr
  nodeDivToast.id = 'toast';

  nodeDivImg.id = 'toast__img';
  DOMImg.src = 'img/if_icons_notifications_1564519.svg';
  DOMImg.alt = 'Toast Image';

  nodeDivDesc.id = 'toast__desc';

  // Append Children to root toast node
  nodeDivImg.appendChild(DOMImg);
  nodeDivToast.appendChild(nodeDivImg);
  nodeDivToast.appendChild(nodeDivDesc);

  // Finally append root node toast to body
  document.getElementsByTagName('body')[0].appendChild(nodeDivToast);
};

const toast = (type, message) => {
  // 1. Get the type of toast to show - success or danger
  // 2. Add the DOM element
  // 3. Show the Toast
  const eleDesc = document.getElementById('toast__desc');
  const eleToast = document.getElementById('toast');

  eleDesc.innerHTML = message;
  eleToast.className = 'toast--show';

  if (typeof type === 'string') {
    eleToast.classList.add(`toast--${type}`);
  }

  setTimeout(() => {
    eleToast.className = eleToast.className.replace('toast--show', '');
  }, 5000);
};

constructDOMElement();