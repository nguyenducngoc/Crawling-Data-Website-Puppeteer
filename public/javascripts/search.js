const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
var filmId = "";
const url_search = new URL(window.location.href).searchParams.get("search");
const url_country = new URL(window.location.href).searchParams.get("country");
const url_category = new URL(window.location.href).searchParams.get("category");
const key_genres = new URL(window.location.href).searchParams.get("genres");
const key_release = new URL(window.location.href).searchParams.get("release");
const url_sort = new URL(window.location.href).searchParams.get("sort");
const url_page = new URL(window.location.href).searchParams.get("page");
const key_sort = url_sort ? url_sort.toLowerCase() : "popularity.desc";
const key_search = url_search ? url_search : "";
const key_category = url_category ? url_category : "movie";
const key_country = url_country ? url_country : "en";
const func = new URL(window.location.href).searchParams.get("search")
  ? "search"
  : "discover";
const page = url_page ? url_page : "1";
const idGenres = key_genres
  ? key_genres.slice(key_genres.length - 2, key_genres.length)
  : null;
const iso = key_country
  ? key_country.slice(key_country.length - 2, key_country.length)
  : null;
const apiTvGener = `https://api.themoviedb.org/3/genre/${key_category}/list?api_key=${key_api}&language=en`;
const urlFilms = `https://api.themoviedb.org/3/${func}/${key_category}?api_key=${key_api}&with_genres=${idGenres}&language=vi&sort_by=${key_sort}&page=${page}&primary_release_year=${key_release}&with_original_language=${iso}&query=${key_search}&include_adult=false`;

const img = (poster_path) => `https://image.tmdb.org/t/p/w300${poster_path}`;

const getFilm = (callback) => {
  fetch(urlFilms)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const displayShowSearch = async () => {
  console.log(urlFilms);
  const respon = await fetch(urlFilms);
  const data = await respon.json();
  viewFilm(data);

  console.log(data);
};
const formatDate = (date) => {
  if (date) {
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    const day = date.slice(8);
    return day + "-" + month + "-" + year;
  }
  return "Chưa cập nhập";
};
const pagination = () => {
  paginate.setAttribute("class", "pagination");
  var filmItem = document.querySelector(".filmStore-list");

  for (var i = 0; i < 100; i++) {
    var paginate = document.createElement("ul");
    paginate.innerHTML = `
    <li class="page-item disabled">
      <span class="page-link">Previous</span>
    </li>
    <li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>
    <li class="page-item">
       <a class="page-link" href="#">Next</a>
    </li>
    `;
  }
  filmItem.appendChild(paginate);
};
const viewFilm = (data) => {
  getPaginate(data);
  data = data.results;
  var filmItem = document.querySelector(".filmStore-list");

  for (var i = 0; i < data.length; i++) {
    filmId = `${data[i].id}`;
    var div = document.createElement("div");
    div.setAttribute("class", "filmStore-item");
    div.setAttribute("id", `${data[i].id}`);

    filmItem.appendChild(div);

    div.innerHTML = `
        <a href="${
          key_category == "tv"
            ? `chi-tiet-tivi-shows.html?id=${data[i].id}`
            : `film.html?id=${data[i].id}`
        }">
            <div class="filmStore-image">
              <img src=${img(data[i].poster_path)} loading="lazy"></img>
            </div>
            <div class="filmStore-info">        
                <h2 class="filmStore-name">${
                  data[i].title ? data[i].title : data[i].name
                }</h2>     
                <h5 class="filmStore-release"> ${formatDate(
                  data[i].release_date
                    ? data[i].release_date
                    : data[i].first_air_date
                )}</h5>      
                <h4 class="filmStore-review">
                  ${data[i].overview}
                </h4>
             </div>
         </a>`;
  }
};
const getPaginate = (data) => {
  console.log(data);
  const paginate = document.querySelector(".paginate-list");
  const prev = document.createElement("li");
  prev.setAttribute("class", "paginate-prev");
  prev.innerHTML = `  
  <div class="paginate-prev-item ${
    page === "1" ? "disabled" : ""
  }" onclick="pageChange(${page - 1})">
    Prev
  </div>`;
  paginate.appendChild(prev);
  const mod_totalPage = Math.ceil(500 / 10);
  console.log(data);

  for (let i = 0; i <= mod_totalPage; i++) {
    if (page <= 10 * (i + 1) && page >= 10 * i) {
      var tempCount = i;
    }
  }
  for (
    let i = 1, j = parseInt(10 * tempCount) + 1;
    i <= 10 && j <= 500;
    i++ && j++
  ) {
    const paginateItem = document.createElement("li");
    paginateItem.setAttribute("class", "paginate-item");
    if (page == j) {
      paginateItem.setAttribute("class", "paginate-item slected");
    }
    paginateItem.innerHTML = `
      <div class="tvSeason-other--image" data-id= ${j} onclick="pageChange(${j})">
          ${j}
      </div>
    `;

    paginate.appendChild(paginateItem);
  }
  const next = document.createElement("li");
  next.setAttribute("class", "paginate-next");
  next.innerHTML = `  
  <div class="paginate-prev-item ${
    page == 500 ? "disabled" : ""
  }" onclick="pageChange(${parseInt(page) + 1})">
    Next
  </div>`;
  paginate.appendChild(next);
};

const getGenres = async () => {
  const respon = await fetch(apiTvGener);
  const data = await respon.json();
  const tabGenres = document.querySelector(".filmSort-genres-list");
  data.genres.map((genres, index) => {
    let item = document.createElement("li");
    item.setAttribute("class", `filmSort-genres--${key_category}--item`);
    item.innerHTML = `
    <a href="kho-phim.html?category=${key_category}&genres=${genres.name}-${
      genres.id
    }&page=${page}">
        #${
          genres.name.slice(0, 12) == "Chương Trình"
            ? "CT " + genres.name.slice(13)
            : genres.name.length > 18
            ? genres.name.slice(5)
            : genres.name
        }
     
    </a>
`;
    tabGenres.appendChild(item);
  });
};

displayShowSearch();
getGenres();

function pageChange(i) {
  var queryParams = new URLSearchParams(window.location.search);
  queryParams.set("page", i);
  history.replaceState(null, null, "?" + queryParams.toString());
  console.log(window.location.search);
  window.location.reload();
  window.scroll(0, 0);
}
