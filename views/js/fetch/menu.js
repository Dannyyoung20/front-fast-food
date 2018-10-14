const uri = window.APP_URI;


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
