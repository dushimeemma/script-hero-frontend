token = window.localStorage.getItem('token');
id = window.localStorage.getItem('id');
email = window.localStorage.getItem('email');

if (email !== 'dushimeemma@gmail.com') {
  window.location.href = 'login.html';
}

let tableQuestions = document.querySelector('#my-table');
let tableArticles = document.querySelector('#table-article');
let articleArea = document.querySelector('#article');
let questionArea = document.querySelector('#question');
let viewA = document.querySelector('#viewA');
let viewQ = document.querySelector('#viewQ');

async function getArticles() {
  const res = await axios.get('https://kigc-blog.herokuapp.com/api/articles');
  const data = res.data.articles;
  data.forEach((article) => {
    let id = article._id;
    let row = tableArticles.insertRow(tableArticles.rows.length);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = article.title;
    cell2.innerHTML =
      `<img src="./images/update-1.png" class="m-icon icon pointer" onclick="onClickUpdate('` +
      id +
      `')"/><td><img src="./images/delete-2.jpg" class="m-icon pointer icon"onclick="onClickDelete('` +
      id +
      `')"/></td>`;
    let count = tableArticles.rows.length;
    let displayCount = document.querySelector('#count-articles');
    displayCount.innerHTML = `${count - 1} Articles`;
    displayCount.addEventListener('click', (e) => {
      questionArea.style.display = 'none';
      articleArea.style.display = 'block';
      tableArticles.style.width = '100% !important';
    });
  });
}
getArticles();

let config = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': `${token}`,
  },
};

async function getQueries() {
  const res = await axios.get(
    'https://kigc-blog.herokuapp.com/api/queries',
    config
  );
  const data = res.data.queries;
  data.forEach((query) => {
    let id = query._id;
    let row = tableQuestions.insertRow(tableQuestions.rows.length);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = query.email;
    cell2.innerHTML = query.message;
    cell3.innerHTML =
      `<td><img src="./images/delete-2.jpg" class="m-icon pointer icon"onclick="onClickDeleteQ('` +
      id +
      `')"/></td>`;
    let count = tableQuestions.rows.length;
    let displayCount = document.querySelector('#count-questions');
    displayCount.innerHTML = `${count - 1} Questions`;
    cell2.style.cursor = 'pointer';
    cell2.addEventListener('click', async () => {
      const res = await axios.patch(
        `https://kigc-blog.herokuapp.com/api/queries/${id}`
      );
      window.location.href = 'dashboard.html';
    });
    displayCount.addEventListener('click', (e) => {
      articleArea.style.display = 'none';
      questionArea.style.display = 'block';
      tableQuestions.style.width = '100% !important';
    });
  });
}
getQueries();

async function onClickDelete(id) {
  const res = await axios.delete(
    `https://kigc-blog.herokuapp.com/api/articles/${id}`,
    config
  );
  window.location.href = 'dashboard.html';
}
async function onClickDeleteQ(id) {
  const res = await axios.delete(
    `https://kigc-blog.herokuapp.com/api/queries/${id}`,
    config
  );
  window.location.href = 'dashboard.html';
}
async function onClickUpdate(id) {
  window.location.href = 'updateArticle.html?id=' + id;
}
async function unreadQ() {
  const res = await axios.get(
    'https://kigc-blog.herokuapp.com/api/queries/unread',
    config
  );
  const data = res.data;
  let num = data.queries;
  let count = num.length;
  let unreadQ = document.querySelector('#count-unread');
  unreadQ.innerHTML = count;
}
unreadQ();
//update profile
let updateBtn = document.querySelector('#update-profile');
updateBtn.addEventListener('click', (e) => {
  if (id) {
    window.location.href = 'updateProfile.html?id=' + id;
  }
});
//view articles using links
viewA.addEventListener('click', (e) => {
  e.preventDefault();
  questionArea.style.display = 'none';
  articleArea.style.display = 'block';
  tableArticles.style.width = '100% !important';
});
viewQ.addEventListener('click', (e) => {
  e.preventDefault();
  articleArea.style.display = 'none';
  questionArea.style.display = 'block';
  tableQuestions.style.width = '100% !important';
});
