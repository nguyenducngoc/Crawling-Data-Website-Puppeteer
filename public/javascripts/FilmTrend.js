const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
const apiTrendFilm = `https://api.themoviedb.org/3/trending/all/day?api_key=${key_api}&language=vi`;
const img = (poster_path) => `https://image.tmdb.org/t/p/w500/${poster_path}`;
const getFilm = (callback) => {
  fetch(apiTrendFilm)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const showFilmTrend = () => {
  
  getFilm((data) => {

    let trendData = data.results;
    for (var i = 0; i < 8; i++) {

      const filmTrendList = document.querySelector(".filmTrend-list");
      var li = document.createElement("li");
      li.setAttribute("class", "filmTrend-item");
      filmTrendList.appendChild(li);
      li.innerHTML = `
      
      <div class="filmTrend-image"> 
      <a href="film.html?id=${trendData[i].id}">
        <img loading="auto" src="https://image.tmdb.org/t/p/w300${
          trendData[i].poster_path
        }"></img> 
      </a>  
      </div>
      <div class="filmTrend-infor">
        <h4 class="filmTrend-name">${
          !trendData[i].original_name
            ? trendData[i].original_title
            : trendData[i].original_name
        } </h4>
       
         <h4 class="filmTrend-popularity">
          Lượt xem: ${trendData[i].popularity} 
         </h4>
         <h4 class="filmTrend-vote">
          Điểm: ${trendData[i].vote_average}/10
         </h4>
         <h4 class="filmTrend-${trendData[i].media_type}">
        ${trendData[i].media_type === "tv" ? "TV Show" : "Movies"}
         </h4>  
      </div>
      
      `;
    }
  });
};
showFilmTrend();
