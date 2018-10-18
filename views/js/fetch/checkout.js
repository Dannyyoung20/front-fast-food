const uri = window.APP_URI;
let cart;
let token;

const navTotalDOM = document.querySelector('.nav__total');
const buttonTotalDOM = document.querySelector('.button');
const checkoutForm = document.querySelector('#checkout');


const updateNavTotal = (price) => {
  navTotalDOM.innerHTML = `Total: &#8358; ${price}`;
};

const updateButtonTotal = (price) => {
  buttonTotalDOM.innerHTML = `Pay &#8358; ${price}`;
};

const handlePayment = async () => {
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orders = cart.showAllOrders();

    let res;
    await orders.forEach(async (order) => {
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          token,
        },
        body: JSON.stringify({ mealName: order.name, qty: order.quantity }),
      };
      res = await fetch(`${uri}/orders`, options);
      const result = await res.json();
      if (res.status !== 200) {
        toast('danger', result.message);
        return false;
      }
      return true;
    });
    flash({ type: 'success', message: 'Successfully placed orders' });
    localStorage.removeItem('cart');
    window.location.href = '/order';
  });
};


window.onload = async () => {
  // Check if token exist
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    const payload = token.split('.')[1];
    const data = JSON.parse(window.atob(payload));
    const expires = data.exp;
    const currentDate = Math.floor((Date.now() / 1000)); // Convert date to seconds

    // Check if the token has expired or not
    if (expires < currentDate) {
      window.location.href = '/login';
    }
  } else {
    flash({ type: 'default', message: 'Login Required' });
    window.location.href = '/login';
  }
  cart = new Cart();
  const total = await cart.getTotalPrice();
  await updateNavTotal(total);
  await updateButtonTotal(total);
  handlePayment();
};
