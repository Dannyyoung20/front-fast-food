'use strict';

const uri = window.APP_URI;
let token;
const tableDOM = document.querySelector('tbody');

const listTemplate = (data, index) => {
  const nodeTableRow = document.createElement('tr');
  const nodeTableDesc1 = document.createElement('td');
  const nodeTableDesc2 = document.createElement('td');
  const nodeTableDesc3 = document.createElement('td');
  const nodeTableDesc4 = document.createElement('td');
  const nodeTableDesc5 = document.createElement('td');
  const nodeTableDesc6 = document.createElement('td');
  const nodeParentBtn = document.createElement('div');
  const nodeBtnSuccess = document.createElement('a');
  const nodeBtnDanger = document.createElement('a');
  const nodeBtnComplete = document.createElement('a');
  const nodeBtnDelivered = document.createElement('a');
  const nodeBtnCancelled = document.createElement('a');

  nodeTableDesc1.innerHTML = index;
  nodeTableDesc2.innerHTML = data.name;
  nodeTableDesc2.className = 'text--capitalise';
  nodeTableDesc3.innerHTML = data.delivery_address;
  nodeTableDesc4.innerHTML = `&#8358; ${data.price}`;

  nodeParentBtn.className = 'table__buttons';
  nodeBtnComplete.className = 'button button--success button__complete';
  nodeBtnComplete.innerHTML = 'Finalise';
  nodeBtnDanger.className = 'button button--danger button__cancel';
  nodeBtnDanger.innerHTML = 'Cancel';
  nodeBtnSuccess.className = 'button button--success button__accept';
  nodeBtnSuccess.innerHTML = 'Accept';
  nodeBtnDelivered.className = 'text--success';
  nodeBtnDelivered.innerHTML = 'Completed';
  nodeBtnCancelled.className = 'text--danger';
  nodeBtnCancelled.innerHTML = 'Cancelled';

  if (data.status === 'now') {
    nodeParentBtn.appendChild(nodeBtnSuccess);
    nodeParentBtn.appendChild(nodeBtnDanger);
  } else if (data.status === 'processing') {
    nodeParentBtn.appendChild(nodeBtnComplete);
  } else if (data.status === 'cancelled') {
    nodeParentBtn.appendChild(nodeBtnCancelled);
  } else if (data.status === 'completed') {
    nodeParentBtn.appendChild(nodeBtnDelivered);
  }
  nodeTableDesc5.innerHTML = data.qty;
  nodeTableDesc6.appendChild(nodeParentBtn);
  nodeTableRow.appendChild(nodeTableDesc1);
  nodeTableRow.appendChild(nodeTableDesc2);
  nodeTableRow.appendChild(nodeTableDesc3);
  nodeTableRow.appendChild(nodeTableDesc4);
  nodeTableRow.appendChild(nodeTableDesc5);
  nodeTableRow.appendChild(nodeTableDesc6);
  nodeTableRow.dataset.id = data.slug;

  return nodeTableRow;
};

// Construct the DOM
const constructDOM = orders => {
  orders.forEach(async (order, index) => {
    const i = index + 1;
    const listDOM = listTemplate(order, i);
    await tableDOM.appendChild(listDOM);
  });
};

const handleAcceptance = () => {
  const acceptBtns = document.querySelectorAll('.button__accept');
  acceptBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id');
      const status = 'processing';

      const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          token
        },
        body: JSON.stringify({ status })
      };
      const res = await fetch(`${uri}/orders/${parentID}`, options);
      const result = await res.json();
      if (res.status !== 202) return toast('danger', result.message);
      window.location.href = '/list';
      return true;
    });
  });
};

const handleFinalise = () => {
  const finaliseBtns = document.querySelectorAll('.button__complete');
  finaliseBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id');
      const status = 'completed';

      const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          token
        },
        body: JSON.stringify({ status })
      };
      const res = await fetch(`${uri}/orders/${parentID}`, options);
      const result = await res.json();
      if (res.status !== 202) return toast('danger', result.message);
      window.location.href = '/list';
      return true;
    });
  });
};

const handleCancel = () => {
  const cancelBtns = document.querySelectorAll('.button__cancel');
  cancelBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const parentID = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id');
      const status = 'cancelled';

      const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          token
        },
        body: JSON.stringify({ status })
      };
      const res = await fetch(`${uri}/orders/${parentID}`, options);
      const result = await res.json();
      if (res.status !== 202) return toast('danger', result.message);
      window.location.href = '/list';
      return true;
    });
  });
};

window.onload = async () => {
  // Check if token exist
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    const payload = token.split('.')[1];
    const data = JSON.parse(window.atob(payload));
    const expires = data.exp;
    const currentDate = Math.floor(Date.now() / 1000); // Convert date to seconds

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
        token
      }
    };

    const res = await fetch(`${uri}/orders`, options);
    const orders = await res.json();
    if (res.status !== 200) return toast('danger', orders.message);
    if (orders.message === 'No orders' && res.status === 200) {
      tableDOM.insertAdjacentHTML('beforeend', '<tr></tr><tr></tr><p class="text--center pt-3 pb-2">No Cart item</p><tr></tr>');
      return false;
    }
    constructDOM(orders.orders.items);
  } else {
    flash({ type: 'default', message: 'Login Required' });
    window.location.href = '/login';
  }
  handleAcceptance();
  handleFinalise();
  handleCancel();
  return true;
};