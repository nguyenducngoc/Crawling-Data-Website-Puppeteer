const watchInit = (e) => {
  const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
  const baseURL = " https://api.themoviedb.org/3";
  const id = new URL(window.location.href).searchParams.get("id");
  const category = new URL(window.location.href).searchParams.get("category");
  const season = new URL(window.location.href).searchParams.get("season");
  const epi = new URL(window.location.href).searchParams.get("epi");
  const img300 = (poster_path) =>
    `https://image.tmdb.org/t/p/w300/${poster_path}`;
  const watchFrame = document.querySelector(".watch-iframe");
  const tvDetail = `
 ${baseURL}/tv/${id}/season/${season}?api_key=${api_key}&language=vi`;
  const movieDetail = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=vi`;
  const watchTile = document.querySelector(".watch-infor");
  const apiGenrerFilm = (genres) =>
    `${baseURL}/discover/${category}?api_key=${api_key}&with_genres=${genres}&language=vi`;

  //   const genresWatch =  `
  //  ${baseURL}/genre/${category}/list?api_key=<<api_key>>&language=en-US`
  // const formatRuntime = (time) => {
  //   const h = Math.round(time / 60) ;
  //   if (h>0) {
  //     const m =time -60*h ;
  //     return h +"h" + m
  //   }
  // }
  const getFilmGenres = async (genres) => {
    const respon = await fetch(apiGenrerFilm(genres));
    const data = await respon.json();
    const results = data.results ; 
    console.log(results);
   const genresList = document.querySelector(".watchs-genres-list")
   results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)).reverse()
   .map((item, index)=> {
    const itemGenres = document.createElement("li")
    itemGenres.setAttribute("class","watchs-genres-item" ) 
  
    itemGenres.innerHTML = `
      <div class="watch-main-genres-image"> 
          <img src=${img300(item.backdrop_path)} alt="" loading="auto"/>
      </div>
    `
    genresList.appendChild(itemGenres) ; 
   })
    
  };
  const getTitle = async () => {
    const respon = await fetch(category == "movie" ? movieDetail : tvDetail);
    const data = await respon.json();
    console.log(data);
    category === "movie" ? getFilmGenres(data.genres[0]) : "";
    watchTile.innerHTML = `
    
    <div class="watch-title">
    
    ${
      category == "movie"
        ? ` ${data.title}`
        : `
        ${data.episodes[epi - 1].name}
    `
    }
    
    </div>
    <div class="watch-genres ${category == "movie" ? "" : "hide"}" >
     
      ${category == "movie" ? `  ${data.genres[0].name} ` : null}
    </div>
    <div class="watch-date">
    <span>Ngày phát hành: </span>
    ${
      category == "movie"
        ? ` ${data.release_date}`
        : `
        ${data.episodes[epi - 1].air_date}
    `
    }
    
    </div>
    <div class="watch-runtime">
    <span>Thời lượng: </span>
    ${
      category == "movie"
        ? ` ${data.runtime}`
        : `
        ${data.episodes[epi - 1].runtime}
    `
    }
    Phút
     
    </div>
   
    <div class="watch-overview">
    <span> Nội dung: </span>
    ${
      category == "movie"
        ? ` ${data.overview}`
        : `
        ${data.episodes[epi - 1].overview}
    `
    }
      
    </div>
    <div class="watch-vote_average">
    <span>Điểm đánh giá</span>
    ${
      category == "movie"
        ? ` ${data.vote_average}`
        : `
        ${data.episodes[epi - 1].vote_average}
    `
    }
     
    </div>
    <div class="watch-interac">
        <div class="bookmark">
        <i class="fa fa-bookmark" aria-hidden="true"></i>
          Lưu
        </div>
        <div class="like"> <i class="fa fa-heart" aria-hidden="true"></i>Yêu thích </div>
        <div class="share">
        <i class="fa fa-share" aria-hidden="true"></i>
        Chia sẻ
        </div>
    </div>

    `;
  };
  getTitle();
  watchFrame.innerHTML = `
    ${
      category == "movie"
        ? `
    <iframe id="ve-iframe" src="https://2embed.org/embed/${category}?tmdb=${id}" width="600px" height="350px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

    `
        : `<iframe src="https://2embed.org/embed/${
            category == "tv" ? "series" : ""
          }?tmdb=${id}&sea=${season}&epi=${epi}" width="600px" height="350px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>`
    }

    `;
};
document.addEventListener("DOMContentLoaded", watchInit());
