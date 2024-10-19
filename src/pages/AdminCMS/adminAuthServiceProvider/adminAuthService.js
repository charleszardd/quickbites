export function setAuth(token, admin) {
  localStorage.setItem('token', token);
  localStorage.setItem('customer', JSON.stringify(admin));

}

export function getAuth() {
  const token = localStorage.getItem('token');
  const admin = JSON.parse(localStorage.getItem('admin'));
  return { token, admin };
}

export function isLoggedIn() {
  return !!getAuth().token;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('customer');
  window.location.href = '/admincms';
}