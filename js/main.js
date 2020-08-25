const viewProfile = document.querySelector('#profile-modal');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close');
const nav = document.getElementById('nav');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
footer.innerHTML = `&copy; ${new Date().getFullYear()} KIGC Ltd.`;

menu.addEventListener('click', onClick);
closeBtn.addEventListener('click', onClose);
//window.addEventListener('click', outsideClose);

function onClick() {
  nav.style.display = 'block';
}
function onClose() {
  nav.style.display = 'none';
}
/*function outsideClose(e) {
  if (e.target != menu) {
    nav.style.display = 'none';
  }
}*/

//fix navbar
const navLinks = document.querySelector('#nav-links');
const guestLinks =
  '<li><a href="index.html" class="nav-link">Home</a></li><li><a href="contact.html" class="nav-link">Contact</a></li><li><a href="about.html" class="nav-link">About</a></li><li><a href="blog.html" class="nav-link">Blog</a></li><li><a href="login.html">Login</a></li><li><a href="register.html">Register</a></li>';
const authLinks =
  '<li><li><a href="blog.html" class="nav-link">Blog</a></li><li><li><a href="dashboard.html" class="nav-link">Dashboard</a></li><li class="text-capitalize"><a href="dashboard.html">Welcome <strong id="username"></strong></a></li><li class="text-capitalize"><a href="index.html" id="logout">Logout</a></li><li class="text-capitalize"></li></ul>';
//navbar
navLinks.innerHTML = guestLinks;

let userProfile = document.querySelector('#close-profile');
//edit profile from modal profile
let editProfile = document.querySelector('#edit-profile');
userProfile.addEventListener('click', (e) => {
  viewProfile.style.display = 'none';
});
