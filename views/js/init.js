window.APP_URI = 'http://127.0.0.1:4000/api/v1';

// Check if there is any message that needs to be flashed
if(localStorage.getItem('flash')) {
  const flash = localStorage.getItem('flash');
  const noty = JSON.parse(flash);
  toast(noty.type, noty.message);
  localStorage.removeItem('flash');
}

const flash = (data) => {
  localStorage.setItem('flash', JSON.stringify(data));
};
