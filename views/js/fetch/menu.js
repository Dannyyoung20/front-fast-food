const uri = window.APP_URI;
const menuForm = document.getElementById('menuForm');
const token = localStorage.getItem('token');

// Form Submit
menuForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('meal-name').value;
  const price = document.getElementById('price').value;
  const imageUrl = document.getElementById('image-url').value;

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token,

    },
    body: JSON.stringify({ name, price, imageUrl }),
  };

  try {
    const res = await fetch(`${uri}/menu`, options);
    const result = await res.json();
    if (res.status !== 200) toast('danger', result.message);
    if (result.menu) {
      flash({ type: 'success', message: result.message });
      window.location.href = '/menu';
    }
  } catch (error) {
    toast('danger', error);
  }
});

window.onload = () => {
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
  } else {
    flash({ type: 'default', message: 'Login Required' });
    window.location.href = '/login';
  }
};
