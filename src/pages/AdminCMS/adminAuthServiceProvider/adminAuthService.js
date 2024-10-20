export function setAuth(token, admin) {
  localStorage.setItem('admin-auth-token', token);
  localStorage.setItem('admin', JSON.stringify(admin));
  localStorage.setItem('role_id', admin.role_id);
}

export function getAuth() {
  const token = localStorage.getItem('admin-auth-token');
  const admin = JSON.parse(localStorage.getItem('admin'));
  const role_id = localStorage.getItem('role_id');
  return { token, admin, role_id };
}

export function isLoggedIn() {
  const token = localStorage.getItem('admin-auth-token');
  const role_id = localStorage.getItem('role_id');
  return { token, role_id };
}


export function logout() {
  localStorage.removeItem('admin-auth-token');
  localStorage.removeItem('admin');
  localStorage.removeItem('role_id');
  window.location.href = '/admincms';
}
