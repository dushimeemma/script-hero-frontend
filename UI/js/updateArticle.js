let urlParams = new URLSearchParams(location.search);
let id = urlParams.get('id');
//get element
let updateForm = document.querySelector('#update-form');
let title = updateForm['title'];
let body = updateForm['body'];
let errors = document.querySelector('#errors');
//get article to update
async function getSingleArticle() {
  const res = await axios.get(
    `https://kigc-blog.herokuapp.com/api/articles/${id}`
  );
  const article = res.data.article;
  title.value = article.title;
  body.value = article.body;
}
getSingleArticle();
//update article
async function updateArticle(title, body) {
  try {
    const res = await axios.put(
      `https://kigc-blog.herokuapp.com/api/articles/${id}`,
      { title, body },
      config
    );
    errors.style.display = 'block';
    errors.innerHTML = `<p class="text-center success">${res.data.msg}</p>`;
    setTimeout(() => errors.remove(), 3000);
  } catch (error) {
    errors.style.display = 'block';
    errors.innerHTML = `<p class="text-center danger">Failed to update</p>`;
    setTimeout(() => errors.remove(), 3000);
  }
}
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  updateArticle(title.value, body.value);
});

token = window.localStorage.getItem('token');
const config = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token,
  },
};
