//get the id
let urlParams = new URLSearchParams(location.search);
let id = urlParams.get('id');
//display an article in html
async function getBlog() {
  const res = await axios.get(
    `https://kigc-blog.herokuapp.com/api/articles/${id}`
  );
  const data = res.data;

  let articles = data.article;
  let article = document.createElement('article');
  article.classList.add('blog-content');
  article.classList.add('text-black');
  article.classList.add('border-radius');
  article.classList.add('p');
  article.classList.add('mt');

  if (name) {
    article.innerHTML = `          <h3 class="m-bottom capitalize">${articles.title}</h3>
      <p class="m-bottom">
       ${articles.body}
      </p>
      <h6 class="text-center capitalize m-bottom">leave your comment here</h6>
      <div class="errors text-center" id="errors"></div>
      <form class="mb" id="form-comment">
        <div class="form-group">
          <textarea name="comment" cols="10" rows="3" id="comment"></textarea
          >
        </div>
       <h6 id="view" class="pointer"><u>View all comments</u></h6> <button class="float-right mb">Comment</button>
      </form>
<div class="comment text-black" id="comment-area">
    <h3 class="text-center">Comments</h3> <hr/>
</div>`;
  } else {
    article.innerHTML = `<h3 class="m-bottom capitalize">${articles.title}</h3>
      <p class="m-bottom">
       ${articles.body}
      </p>`;
  }

  document.querySelector('#articles').appendChild(article);
}
getBlog();
