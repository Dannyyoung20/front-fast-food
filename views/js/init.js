window.APP_URI = 'https://fast-foo.herokuapp.com/api/v1';

// Check if there is any message that needs to be flashed
if (localStorage.getItem('flash')) {
  const flash = localStorage.getItem('flash');
  const noty = JSON.parse(flash);
  toast(noty.type, noty.message);
  localStorage.removeItem('flash');
}

const getUserDetails = async (options) => {
  const res = await fetch(`${window.APP_URI}/users/me`, options);
  const user = await res.json();
  if (res.status !== 200) return false;
  let isAdmin;
  if (user.user[0].role === 1) {
    isAdmin = btoa('true');
  } else {
    isAdmin = btoa('false');
  }
  const $authUser = {
    email: user.user[0].email,
    isAdmin,
    address: user.user[0].address,
  };
  localStorage.setItem('user', JSON.stringify($authUser));
  return true;
};

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      token,
    },
  };
  if(localStorage.getItem('user') === undefined) {
    getUserDetails(options);
  }
}

const flash = (data) => {
  localStorage.setItem('flash', JSON.stringify(data));
};
