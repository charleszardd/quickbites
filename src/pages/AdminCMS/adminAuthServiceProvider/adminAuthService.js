export function setAuth(token, admin) {
  localStorage.setItem('admin-auth-token', token);
  localStorage.setItem('admin', JSON.stringify(admin));
}

export function getAuth() {
  const token = localStorage.getItem('admin-auth-token');
  const admin = JSON.parse(localStorage.getItem('admin'));
  return { token, admin };
}

export function isLoggedIn() {
  const token = localStorage.getItem('admin-auth-token');
  return { token };
}

export function logout() {
  localStorage.removeItem('admin-auth-token');
  localStorage.removeItem('admin');
  window.location.href = '/admincms';
}
