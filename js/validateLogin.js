//function to validate email
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
//get form element
let loginForm = document.querySelector('#login-form');
let emailInput = loginForm['email'];
let passwordInput = loginForm['password'];

//get errors div
let emailErrors = document.querySelector('#emailErrors');
let passwordErrors = document.querySelector('#passwordErrors');
let errors = document.querySelector('#errors');

//form validation
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value === '' || passwordInput.value === '') {
    emailInput.style.border = '1px solid var(--danger)';
    passwordInput.style.border = '1px solid var(--danger)';
    emailErrors.style.display = 'block';
    passwordErrors.style.display = 'block';
    emailErrors.innerText = 'email is required';
    passwordErrors.innerText = 'password is required';
  }
  if (
    emailInput.value.length > 0 &&
    validateEmail(emailInput.value) === false
  ) {
    emailInput.style.border = '1px solid var(--danger)';
    emailErrors.innerText = 'please enter a valid email';
  }
  if (emailInput.value.length > 0 && validateEmail(emailInput.value) === true) {
    emailInput.style.border = '1px solid var(--success)';
    emailErrors.style.display = 'none';
  }
  if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
    passwordInput.style.border = '1px solid var(--danger)';
    passwordErrors.style.display = 'block';
    passwordErrors.innerText = 'password must contain atleast 8 characters';
  }
  if (passwordInput.value.length > 0 && passwordInput.value.length >= 8) {
    passwordInput.style.border = '1px solid var(--success)';
    passwordErrors.style.display = 'none';
  }
  if (
    emailInput.value.length > 0 &&
    validateEmail(emailInput.value) === true &&
    passwordInput.value.length > 0 &&
    passwordInput.value.length >= 8
  ) {
    authUser(emailInput.value, passwordInput.value);
  }
});
async function authUser(email, password) {
  try {
    const res = await axios.post(
      'https://kigc-blog.herokuapp.com/api/auth/login',
      { email, password }
    );
    const data = await res.data;
    token = data.token;
    name = data.user.name;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('name', name);
    errors.style.display = 'block';
    errors.innerHTML = `<p class="success">${data.msg}</p>`;
    setTimeout(() => errors.remove(), 3000);
    loginForm.reset();
    window.location.href = 'dashboard.html';
  } catch (error) {
    errors.style.display = 'block';
    errors.innerHTML = `<p class="danger">User not created</p>`;
    setTimeout(() => errors.remove(), 10000);
    loginForm.reset();
  }
}
