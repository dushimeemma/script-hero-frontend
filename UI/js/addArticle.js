token = window.localStorage.getItem('token');

//get element
let articleForm = document.querySelector('#article-form');
let title = articleForm['title'];
let body = articleForm['body'];
let titleErrors = document.querySelector('#titleErrors');
let bodyErrors = document.querySelector('#bodyErrors');
let errors = document.querySelector('#errors');

articleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value === '' && body.value === '') {
    title.style.border = 'var(--danger)';
    body.style.border = 'var(--danger)';
    titleErrors.style.display = 'block';
    bodyErrors.style.display = 'block';
    titleErrors.innerText = 'title field is required';

    bodyErrors.innerText = 'body field is required';
  } else {
    titleErrors.style.display = 'none';
    bodyErrors.style.display = 'none';
    title.style.border = 'var(--success)';
    body.style.border = 'var(--success)';

    addArticle(title.value, body.value);
  }
});
const config = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': `${token}`,
  },
};

async function addArticle(title, body) {
  const res = await axios.post(
    'https://kigc-blog.herokuapp.com/api/articles',
    { title, body },
    config
  );
  const data = res.data;
  errors.style.display = 'block';
  errors.innerHTML = `<p class="text-center success">${data.msg}</p>`;
  articleForm.reset();
  setTimeout(() => errors.remove(), 3000);
}
