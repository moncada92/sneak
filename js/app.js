const grid = document.querySelector('.grid-view');
const list = document.querySelector('.list-view');
const cont_grid = document.querySelector('.container-grid');
const categories = document.querySelectorAll('.category');
const btn_more = document.querySelector('#more-imgs');
let search_query = document.querySelector('.category.active').dataset.category;

const client_id = "dGs_mnXz-E8TE5XDSbO6eZLyCUCs5z48cKh4KFZz8yc";
let num_page = 1;
const url_img = `https://api.unsplash.com/search/photos?page=1&query=${search_query}&client_id=${client_id}`
let num_el = 1

document.addEventListener("DOMContentLoaded", () =>{

  getData(url_img);

  grid.addEventListener('click', modeView);
  list.addEventListener('click', modeView);

  btn_more.addEventListener('click', moreImages)

  categories.forEach(category => {
    category.addEventListener('click', selectCategory);
  })

})

const getData = async (url_img, is_more_img = false) => {

  try {

    if (!is_more_img) {

      cont_grid.innerHTML= `
      <div class="container-spinner">
        <div class="spinner">
          <div class="cube1"></div>
          <div class="cube2"></div>
        </div>
      </div>`;
    }

    const res = await fetch(url_img)
    const data = await res.json();
    const images = data;

    if (!is_more_img) cont_grid.innerHTML= ``;

    images.results.forEach(img => {
      
      cont_grid.innerHTML += `
      <div class="item row${num_el}">
        <img src="${img.urls.regular}" alt="">
      </div>
      `;
      num_el++;
      if (num_el == 3) num_el = 1;
    });
  } catch (error) {
    console.log(error)
  }
  
}

function modeView() {
  
  if(this.dataset.view === 'grid') {
    this.classList.add('active');
    list.classList.remove('active');
    cont_grid.classList.remove('list')
    cont_grid.classList.add('grid')
  }
  else if(this.dataset.view === 'list') {
    this.classList.add('active');
    grid.classList.remove('active');
    cont_grid.classList.remove('grid')
    cont_grid.classList.add('list')
  }
}

function selectCategory() {

  categories.forEach(category => {
    if (category.dataset.category === this.dataset.category){
      this.classList.add('active');
      search_query = this.dataset.category;
      console.log(search_query)
      getData(`https://api.unsplash.com/search/photos?page=1&query=${search_query}&client_id=${client_id}`);

    } else {
      category.classList.remove('active');
    }
  })
  
}

function moreImages() {
  num_page++;
  getData(`https://api.unsplash.com/search/photos?page=${num_page}&query=${search_query}&client_id=${client_id}`, true);
}