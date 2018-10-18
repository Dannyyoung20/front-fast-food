'use strict';

const uri = window.APP_URI;
const cartDOM = document.querySelector('#cart');
const navTotalDOM = document.querySelector('.nav__total');
// Initalise our cart
let cart;
// Our Cart html Template
const orderTemplate = data => {
  const nodeDivCartItem = document.createElement('div');
  const nodeCartDesc = document.createElement('div');
  const nodeCartQty = document.createElement('div');
  const nodeCartPrice = document.createElement('div');
  const nodeCartImage = document.createElement('div');
  const nodeCartRemove = document.createElement('div');
  const buttonIncrement = document.createElement('button');
  const buttonDecrement = document.createElement('button');
  const inputQty = document.createElement('input');
  const imgPlus = document.createElement('img');
  const imgMinus = document.createElement('img');
  const imgCart = document.createElement('img');
  const removeBtn = document.createElement('span');
  const spanName = document.createElement('span');

  nodeDivCartItem.dataset.id = data.id;
  nodeDivCartItem.dataset.name = data.name;
  nodeDivCartItem.className = 'cart__item';

  nodeCartImage.className = 'cart__image';
  imgCart.src = data.imageUrl;
  nodeCartImage.appendChild(imgCart);

  nodeCartDesc.className = 'cart__description';
  spanName.innerHTML = data.name;
  nodeCartDesc.appendChild(spanName);

  nodeCartPrice.className = 'cart__item-total-price';
  nodeCartPrice.innerHTML = `&#8358; ${data.price}`;

  removeBtn.className = 'ion-ios-close remove-item';
  nodeCartRemove.className = 'button-group';
  nodeCartRemove.appendChild(removeBtn);

  // Cart Quantity Node
  imgPlus.src = 'img/plus.svg';
  imgMinus.src = 'img/minus.svg';
  buttonIncrement.id = 'increment';
  buttonIncrement.className = 'cart__button-plus';
  buttonIncrement.type = 'button';
  buttonDecrement.id = 'decrement';
  buttonDecrement.className = 'cart__button-minus';
  buttonDecrement.type = 'button';
  buttonIncrement.appendChild(imgPlus);
  buttonDecrement.appendChild(imgMinus);
  inputQty.name = 'qty';
  inputQty.value = `${data.quantity}`;
  inputQty.type = 'text';
  nodeCartQty.className = 'cart__quantity';
  nodeCartQty.appendChild(buttonIncrement);
  nodeCartQty.appendChild(inputQty);
  nodeCartQty.appendChild(buttonDecrement);

  // Appending all nodes to root node
  nodeDivCartItem.appendChild(nodeCartRemove);
  nodeDivCartItem.appendChild(nodeCartImage);
  nodeDivCartItem.appendChild(nodeCartDesc);
  nodeDivCartItem.appendChild(nodeCartQty);
  nodeDivCartItem.appendChild(nodeCartPrice);

  return nodeDivCartItem;
};

const updateNavTotal = price => {
  navTotalDOM.innerHTML = `Total: &#8358; ${price}`;
  const btn = document.querySelector('.cart__button');
  btn.innerHTML = `Pay &#8358;${price}`;
};

// Increment functionality
const increment = () => {
  const incrementBtn = document.querySelectorAll('#increment');
  incrementBtn.forEach(inc => {
    inc.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
      const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
      const inputDOM = parentDOM.getElementsByTagName('input')[0];
      let quantity = parseInt(inputDOM.value, 10);
      if (quantity <= 100) {
        quantity += 1;
      } else {
        quantity = 0;
      }
      inputDOM.value = quantity;
      const data = { quantity };
      await cart.updateSpecificOrder(parentID, data);
      const total = await cart.getTotalPrice();
      await updateNavTotal(total);
    });
  });
};

// Decrement functionality
const decrement = () => {
  const decrementBtn = document.querySelectorAll('#decrement');
  decrementBtn.forEach(dec => {
    dec.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
      const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
      const inputDOM = parentDOM.getElementsByTagName('input')[0];
      let quantity = parseInt(inputDOM.value, 10);

      if (quantity >= 1) {
        quantity -= 1;
      } else {
        quantity = 0;
      }
      inputDOM.value = quantity;
      const data = { quantity };
      await cart.updateSpecificOrder(parentID, data);
      const total = await cart.getTotalPrice();
      await updateNavTotal(total);
    });
  });
};

const constructDOM = meals => {
  meals.forEach(async meal => {
    const ordersDOM = orderTemplate(meal);
    await cartDOM.appendChild(ordersDOM);
  });
};

const handleRemoveOrder = () => {
  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach(button => {
    button.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
      const isDone = await cart.deleteSpecificOrder(parentID);

      if (isDone) {
        flash({ type: 'success', message: 'Item Successfully Removed' });
        window.location.href = '/cart';
      }
    });
  });
};

const handlePayment = () => {
  const btn = document.querySelector('.cart__button');
  btn.addEventListener('click', async e => {
    const stripeBtn = document.querySelector('#stripe-btn');
    stripeBtn.dataset.amount = cart.getTotalPrice();
  });
};

window.onload = async () => {
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
    pageLoading(true);
    cart = new Cart();
    const btn = document.querySelector('.cart__button');
    const total = cart.getTotalPrice();
    btn.innerHTML = `Pay &#8358;${total}`;

    const orders = cart.showAllOrders();
    if (Array.isArray(orders) && orders.length !== 0) {
      await constructDOM(orders);
      const total = await cart.getTotalPrice();
      await updateNavTotal(total);
    } else {
      const total = await cart.getTotalPrice();
      await updateNavTotal(total);
      cartDOM.insertAdjacentHTML('beforeend', '<p class="text--center pt-3 pb-2">No Cart item</p>');
    }
    pageLoading(false);
  } else {
    flash({ type: 'default', message: 'Login Required' });
    window.location.href = '/login';
  }
  increment();
  decrement();
  handleRemoveOrder();
  handlePayment();
};