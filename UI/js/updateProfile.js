let urlParams = new URLSearchParams(location.search);
let id = urlParams.get('id');

let updateProfile = document.querySelector('#update-form');
let userName = updateProfile['name'];
let errors = document.querySelector('#errors');

async function getUser() {
  let res = await axios.get(
    `https://kigc-blog.herokuapp.com/api/auth/user/${id}`
  );
  let data = res.data;
  let name = data.user.local.name;
  userName.value = name;
}
getUser();

updateProfile.addEventListener('submit', async (e, username) => {
  e.preventDefault();
  try {
    username = userName.value;
    localStorage.removeItem('name');
    localStorage.setItem('name', username);
    let res = await axios.patch(
      `https://kigc-blog.herokuapp.com/api/auth/user/${id}`,
      { name: `${username}` }
    );
    let data = res.data;
    errors.style.display = 'block';
    errors.innerHTML = `<p class="success text-center">${data.msg}</p>`;
    setTimeout(() => errors.remove(), 3000);
  } catch (error) {
    errors.style.display = 'block';
    errors.innerHTML = `<p class="danger text-center">${errors}</p>`;
    setTimeout(() => errors.remove(), 3000);
  }
});
