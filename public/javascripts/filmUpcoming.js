const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
const apiUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key_api}&language=vi&page=3`;
const img = (poster_path) => `https://image.tmdb.org/t/p/w300${poster_path}`;
const getFilm = (callback) => {
  fetch(apiUpcoming)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

function displayUpcoming() {
  const tvList = document.querySelector(".upcoming-list");
  getFilm((data) => {
    data = data.results;

    for (var i = 0; i <12; i++) {

      const li = document.createElement("li");
      li.setAttribute("class", "upcoming-item");
      {
        data[i].backdrop_path
          ? li.setAttribute("class", "upcoming-item")
          : li.setAttribute("class", "upcoming-item-none");
      }
      tvList.appendChild(li);
      li.innerHTML = `
        <a href="film.html?id=${data[i].id}">
          <div class="upcoming-image">
            <img loading="auto" src=${img(data[i].backdrop_path)} ></img>
          </div>
          <div class="upcoming-item-name">
            ${data[i].title}
          </div>
          <div class="upcoming-release">Sắp ra mắt</div>
        </a>
      `;
    }
  });
}
displayUpcoming();
