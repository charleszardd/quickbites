export function setAuth(token, customer) {
  localStorage.setItem('token', token);
  localStorage.setItem('customer', JSON.stringify(customer));

}

export function getAuth(){
  const token = localStorage.getItem('token');
  const customer = JSON.parse(localStorage.getItem('customer'));
  return { token, customer };
}

export function isLoggedIn(){
  return !!getAuth().token;
}

export function logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('customer');
  window.location.href = '/auth/login';
}