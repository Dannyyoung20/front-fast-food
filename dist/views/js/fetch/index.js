'use strict';

const uri = window.APP_URI;
const menuForm = document.querySelector('#card');
const token = localStorage.getItem('token');
let cart;

// <div class="card card--vertical card--has-shadow card--shape grid-item mt-4">
//   <div class="card__image">
//     <img src="img/meals/hamburger.png" />
//   </div>
//   <div class="card__content">
//     <div class="card__title">
//       <h3 class="card__title--text title__text--dark pt-1">Hamburger</h3>
//     </div>
//     <div class="card__price">
//       <span>&#8358; 3,000</span>
//     </div>
//     <div class="card__button">
//       <a href="#" class="button button--secondary button--clicked">Added Item</a>
//     </div>
//   </div>
// </div>

const cardTemplate = data => {
  const nodeParentCard = document.createElement('div');
  const nodeCardImg = document.createElement('div');
  const nodeCardContent = document.createElement('div');
  const nodeCardTitle = document.createElement('div');
  const nodeCardPrice = document.createElement('div');
  const nodeCardButton = document.createElement('div');
  const nodeImg = document.createElement('img');
  const nodeTitle = document.createElement('h3');
  const nodeSpan = document.createElement('span');
  const nodeBtn = document.createElement('a');

  nodeParentCard.dataset.id = data.id;
  nodeParentCard.dataset.name = data.name;
  nodeParentCard.className = 'card card--vertical card--has-shadow card--shape grid-item mt-4';

  nodeCardImg.className = 'card__image';
  nodeImg.src = data.img;
  nodeImg.className = 'order-image';
  nodeCardImg.appendChild(nodeImg);

  nodeCardContent.className = 'card__content';
  nodeCardTitle.className = 'card__title';
  nodeTitle.className = 'card__title--text title__text--dark pt-1 text--capitalise';
  nodeTitle.innerHTML = data.name;
  nodeCardTitle.appendChild(nodeTitle);

  nodeCardPrice.className = 'card__price';
  nodeSpan.innerHTML = `&#8358; ${data.price}`;
  nodeSpan.className = 'price';
  nodeCardPrice.appendChild(nodeSpan);

  nodeCardButton.className = 'card__button';
  nodeBtn.className = 'button button--secondary button__add';
  nodeBtn.innerHTML = 'Add to cart';
  nodeCardButton.appendChild(nodeBtn);

  nodeCardContent.appendChild(nodeCardTitle);
  nodeCardContent.appendChild(nodeCardPrice);
  nodeCardContent.appendChild(nodeCardButton);

  nodeParentCard.appendChild(nodeCardImg);
  nodeParentCard.appendChild(nodeCardContent);

  if (localStorage.getItem('cart')) {
    const exists = cart.getSpecificOrder(data.name);
    if (exists) {
      nodeBtn.classList.add('button--clicked');
      nodeBtn.innerHTML = 'Added to cart';
    }
  }

  return nodeParentCard;
};

// Construct the DOM
const constructDOM = meals => {
  meals.forEach(async meal => {
    const ordersDOM = cardTemplate(meal);
    await menuForm.appendChild(ordersDOM);
  });
};

const handleButtonClick = () => {
  const addButtons = document.querySelectorAll('.button__add');
  addButtons.forEach(button => {
    button.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id');
      const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
      const quantity = 1;
      const name = parentDOM.getAttribute('data-name');
      const imageUrl = parentDOM.querySelector('.order-image').src;
      const price = parseInt(parentDOM.querySelector('.price').innerHTML.split(' ')[1], 10);

      if (e.currentTarget.classList.contains('button--clicked')) {
        return true;
      }

      const data = {
        name,
        quantity,
        imageUrl,
        price,
        tracking: 'now'
      };
      const existOrderID = await cart.getSpecificOrder(name);

      if (existOrderID) {
        cart.updateQuantityOrder(existOrderID, data);
        toast('success', 'Item successfully added');
        e.currentTarget.classList.add('button--clicked');
        e.currentTarget.innerHTML = 'Added to cart';
      } else {
        const isDone = await cart.storeOrder(data);
        if (isDone) {
          toast('success', 'Item successfully added');
          e.currentTarget.classList.add('button--clicked');
          e.currentTarget.innerHTML = 'Added to cart';
        }
      }
      return true;
    });
  });
};

window.onload = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  const res = await fetch(`${uri}/menu`, options);
  const result = await res.json();
  const cart = new Cart();
  if (res.status !== 200) toast('danger', result.message);
  await constructDOM(result.menu);
  handleButtonClick();
};