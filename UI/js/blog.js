token = window.localStorage.getItem('token');
//display article on blog app
async function blog() {
  const res = await axios.get('https://kigc-blog.herokuapp.com/api/articles');
  const data = res.data;
  const articles = data.articles;
  articles.forEach((blog) => {
    let id = blog._id;
    let article = document.createElement('article');
    article.classList.add('blog-content');
    article.classList.add('text-black');
    article.classList.add('border-radius');
    article.classList.add('p');
    article.classList.add('mt');
    article.classList.add('mb');
    article.innerHTML =
      `    <h3 class="m-bottom capitalize">${blog.title}</h3>
        <p class="m-bottom">
         ${blog.body}
        </p>
       
          <button class="float-right mb" onclick="onClickRead('` +
      id +
      `')">Read More</button>
        `;
    document.querySelector('#articles').appendChild(article);
  });
}
blog();
//read more function
function onClickRead(id) {
  window.location.href = 'singleblog.html?id=' + id;
}
