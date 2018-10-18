const uri = window.APP_URI;
const overflowDOM = document.querySelector('.overflow');

// Our order html Template
const orderTemplate = (data) => {
  const nodeDivCartItem = document.createElement('div');
  const nodeCartDesc = document.createElement('div');
  const nodeCartQty = document.createElement('div');
  const nodeCartPrice = document.createElement('div');
  const nodeCartImage = document.createElement('div');
  const nodeCartAdd = document.createElement('div');
  const inputQty = document.createElement('input');
  const imgCart = document.createElement('img');
  const spanName = document.createElement('span');
  const nodeParentBtn = document.createElement('div');
  const nodeTextComplete = document.createElement('a');
  const nodeTextProcessing = document.createElement('a');
  const nodeTextNow = document.createElement('a');
  const nodeTextCancelled = document.createElement('a');

  nodeDivCartItem.dataset.id = data.id;
  nodeDivCartItem.dataset.name = data.name;
  nodeDivCartItem.className = 'cart__item';

  nodeCartImage.className = 'cart__image';
  imgCart.src = data.img;
  nodeCartImage.appendChild(imgCart);

  nodeCartDesc.className = 'cart__description';
  spanName.innerHTML = data.name;
  nodeCartDesc.appendChild(spanName);

  nodeCartPrice.className = 'cart__item-total-price';
  nodeCartPrice.innerHTML = `&#8358; ${data.price}`;

  nodeCartAdd.className = 'cart__date';
  const dateNow = new Date();
  const date = new Date(data.created_at);
  const time = formatTime(dateNow, date);
  nodeCartAdd.innerHTML = `${time}`;

  nodeParentBtn.className = 'cart__date';
  nodeTextComplete.innerHTML = 'Completed';
  nodeTextComplete.className = 'text--success';
  nodeTextCancelled.innerHTML = 'Cancelled';
  nodeTextCancelled.className = 'text--danger';
  nodeTextProcessing.className = 'text--primary';
  nodeTextProcessing.innerHTML = 'Processing';
  nodeTextNow.className = 'text--dark';
  nodeTextNow.innerHTML = 'Pending';

  if (data.status === 'now') {
    nodeParentBtn.appendChild(nodeTextNow);
  } else if (data.status === 'processing') {
    nodeParentBtn.appendChild(nodeTextProcessing);
  } else if (data.status === 'cancelled') {
    nodeParentBtn.appendChild(nodeTextCancelled);
  } else if (data.status === 'completed') {
    nodeParentBtn.appendChild(nodeTextComplete);
  }

  // Cart Quantity Node
  inputQty.name = 'qty';
  inputQty.value = data.qty;
  inputQty.type = 'text';
  inputQty.disabled = true;
  inputQty.className = 'bg-white';
  nodeCartQty.className = 'cart__quantity';
  nodeCartQty.appendChild(inputQty);

  nodeDivCartItem.appendChild(nodeCartImage);
  nodeDivCartItem.appendChild(nodeCartDesc);
  nodeDivCartItem.appendChild(nodeCartQty);
  nodeDivCartItem.appendChild(nodeCartPrice);
  nodeDivCartItem.appendChild(nodeCartAdd);
  nodeDivCartItem.appendChild(nodeParentBtn);

  return nodeDivCartItem;
};

// Reference - https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
const formatTime = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  }

  if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  }

  if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hrs ago`;
  }

  if (elapsed < msPerMonth) {
    return `approximately ${Math.round(elapsed / msPerDay)} days ago`;
  }

  if (elapsed < msPerYear) {
    return `approximately ${Math.round(elapsed / msPerMonth)} months ago`;
  }

  return current;
};

// Construct the DOM
const constructDOM = (meals) => {
  meals.forEach(async (meal) => {
    const ordersDOM = orderTemplate(meal);
    await overflowDOM.appendChild(ordersDOM);
  });
};

const pageLoading = (isLoading) => {
  const loadingDOM = document.querySelector('.loading');
  if (isLoading) {
    loadingDOM.classList.add('loading--show');
  } else {
    loadingDOM.classList.remove('loading--show');
  }
};

window.onload = async () => {
  // Check if token exist
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const payload = token.split('.')[1];
    const data = JSON.parse(window.atob(payload));
    const expires = data.exp;
    const currentDate = Math.floor((Date.now() / 1000)); // Convert date to seconds
    // Check if the token has expired or not
    if (expires < currentDate) {
      window.location.href = '/login';
    }
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        token,
      },
    };
    pageLoading(true);
    const res = await fetch(`${uri}/users/1/orders`, options);
    const result = await res.json();
    if (res.status !== 200) toast('danger', result.message);
    console.log(result);
    await constructDOM(result.history);
    pageLoading(false);
  } else {
    flash({ type: 'default', message: 'Login Required' });
    window.location.href = '/login';
  }
};
