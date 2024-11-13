const detailApp = () => {
  const details = document.querySelector(".filmDetail-container");
  const suggest = document.querySelector(".filmSuggest-container");
  var id = new URL(window.location.href).searchParams.get("id");
  var genres = "";
  const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
  const apiDetailFilm = `https://api.themoviedb.org/3/movie/${id}}?api_key=${key_api}&language=vi`;
  const apiTrendFilm = `https://api.themoviedb.org/3/trending/all/day?api_key=${key_api}&language=vi`;
  const apiTrailerFilm = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key_api}&language=en`;
  const apiCastFilm = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key_api}&language=vi`;
  const apiGenrerFilm = (genres) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${key_api}&with_genres=${genres}&language=vi`;

  const img = (poster_path) =>
    `https://image.tmdb.org/t/p/original/${poster_path}`;
  const img300 = (poster_path) =>
    `https://image.tmdb.org/t/p/w300/${poster_path}`;
  const getTrendFilm = (callback) => {
    fetch(apiTrendFilm(genres))
      .then((response) => {
        return response.json();
      })
      .then(callback);
  };
  const getCastFilm = (callback) => {
    fetch(apiCastFilm)
      .then((response) => {
        return response.json();
      })
      .then(callback);
  };
  const getFilmDetail = (callback) => {
    fetch(apiDetailFilm)
      .then((response) => {
        return response.json();
      })
      .then(callback);
  };

  const getTrailer = (callback) => {
    fetch(apiTrailerFilm)
      .then((response) => {
        return response.json();
      })
      .then(callback);
  };
  const getSuggest = (callback) => {
    fetch(apiGenrerFilm(genres))
      .then((response) => {
        return response.json();
      })
      .then(callback);
  };
  var stopVideo = (e) => {
    var iframe = document.querySelector("iframe");
    var video = document.querySelector("video");
    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if (video) {
      video.pause();
    }
  };

  const detailsFilm = () => {
    getFilmDetail((data) => {
      if (!data) {
        alert("Đang fetch");
      }
      genres = data.genres[0] ? data.genres[0].id : "";

      details.innerHTML = `
        <div class="filmDetail-image">
          <img src="https://image.tmdb.org/t/p/w300/${
            data.poster_path ? data.poster_path : data.backdrop_path
          }"  loading="auto"></img>
          <div class="filmDetail-button">
          <div class="button button--trailer">
            Trailer
          </div>
           <div class="filmDetail-play button">
              <a href="xem-phim.html?category=movie&id=${data.id}">Xem phim</a>
      
            </div>
      
        </div>
      <div id="myModal" class="modal-trailer">
        <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
        </div>
      </div>
      </div>
      
        </div>
        <div class="filmDetail-infor" id="scroll-style">
            <h2 class="filmDetail-name">
              ${data.title}
            </h2>
            <h4 class="filmDetail-originalName">
            ${data.original_title} (${
        data.release_date ? data.release_date.slice(0, 4) : ""
      })
            </h4>
            <h4 class="filmDetail-status" >Trạng thái: <span class="${
              data.status === "Released" ? "bg-green" : "bg-brown"
            }">${
        data.status === "Released" ? "Đã phát hành" : "Sắp phát hành"
      }</span></h4>
            <h4 class="filmDetail-genres">
              Thể loại:
                <span >
                ${
                  data.genres
                    ? data.genres.map((item) => " " + item.name.slice(5) + " ")
                    : ""
                }
                </span>
            </h4>
            <h4 class="filmDetail-productioncountry">
              Nước sản xuất:
            <span> ${
              data.production_countries[0]
                ? data.production_countries[0].name
                : ""
            }</span>
            </h4>
            <h4 class="filmDetail-date">
              Năm sản xuất:
              <span>${data.release_date.slice(0, 4)}</span>
            </h4>
            <h4 class="filmDetail-vote">
            Điểm:
            <span> ${data.vote_average}/10</span>
            </h4>
            <h4 class="filmDetail-votecount">
            Số lượt đánh giá:
              <span>  ${data.vote_count} </span>
            </h4>
            <h4 class="filmDetail-review"> Nội dung phim:
              <span>${data.overview}</span>
            </h4>
        </div>
      
        `;

      trailerFilm();
      modal();
      suggesttionFilm();
      displayCast();
      data.belongs_to_collection
        ? colectionFilm(data.belongs_to_collection)
        : (document.querySelector(".filmColection").style.display = "none");
    });
  };
  const colectionFilm = (data) => {
    var imgColection = document.querySelector(".filmColection-image");
    var nameColection = document.querySelector(".filmColection-name");
    var buttonColection = document.querySelector(".filmColection-button");
    var posterColection = document.querySelector(".filmColection-poster");
    imgColection.innerHTML = `
  <img src=${img(data.backdrop_path)} loading="auto"></img>
 
  `;
    nameColection.innerHTML = `
   <span> ${data.name}</span>
  `;
    buttonColection.innerHTML = `
      <a href="colection.html?id=${data.id}">
        Xem ngay
      </a>
  `;
    posterColection.innerHTML = `
    <img src=${img300(data.poster_path)} loading="auto"></img>
  `;
  };
  const modal = () => {
    var modal = document.getElementById("myModal");
    var btnTrailer = document.querySelector(".button--trailer");
    var btnClose = document.querySelector(".close");
    btnTrailer.addEventListener("click", function (e) {
      modal.style.display = "block";
    });
    btnClose.addEventListener("click", function (e) {
      modal.style.display = "block";

      stopVideo();
    });
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        stopVideo();
      }
    };
  };
  const trailerFilm = () => {
    getTrailer((data) => {
      const modalTrailer = document.querySelector(".modal-content");
      const div = document.createElement("div");
      div.setAttribute("class", "filmDetail-showTrailer");
      div.innerHTML = `
      ${
        data.results[0]
          ? `<iframe
            width="854px"
            height="480px"
            src="https://www.youtube-nocookie.com/embed/${data.results[0].key}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>`
          : "Hiện tại chưa có trailer"
      } 
      `;
      modalTrailer.appendChild(div);
    });
  };
  function suggesttionFilm() {
    const suggestList = document.querySelector(".filmSuggest-list");
    getSuggest((data) => {
      data = data.results;

      for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "filmSuggest-item");
        li.setAttribute("id", `${data[i] ? data[i].id : ""}`);
        li.innerHTML = `
      <a href="film.html?id=${data[i].id}">
        <img src=${img300(data[i].poster_path)} loading="auto"></img>
        <div class="info"> 
            <h2 class="filmSuggest-name">${data[i].title}</h2>
        </div>
      </a>
        `;

        suggestList.appendChild(li);
      }
      slickSlide();
    });
  }
  const displayCast = () => {
    const suggestList = document.querySelector(".filmCast-list");
    getCastFilm((data) => {
      console.log("cast", data);
      data = data.cast;
      data.cast
        ? (data = data.cast)
        : (document.querySelector(".filmCast").style.display = "none");

      for (var i = 0; i < 4; i++) {
        var li = document.createElement("li");
        li.setAttribute("class", "filmCast-item");
        li.setAttribute("id", `${data[i] ? data[i].id : ""}`);
        li.innerHTML = `
        ${
          data[i]
            ? ` 
            <a href="dien-vien.html?id=${data[i].id}" >
               <div class="filmCast-image" style="margin: auto;">
                  <img loading="auto" src=${img300(
                    data[i].profile_path
                  )} alt="cast" style="width:100%;
                              width: 100%;
                              height: 230px;
                              object-fit: cover;
                              object-position: top;
                              border-radius: 10px 10px 0 0;
                              "/>
                </div>
              <div class="infor"> 
                <h2 class="filmCast-originalName">${data[i].original_name}</h2>
                <h2 class="filmCast-character">${data[i].character}</h2>
              </div>
          </a>`
            : ""
        }
    
        `;

        suggestList.appendChild(li);
      }
    });
  };
  const slickSlide = () => {
    $(".filmSuggest-list").slick({
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 4,
      variableWidth: true,
      variableHeight: true,
      // autoplaySpeed: 1000,
      // autoplay: true,
      prevArrow:
        '<div class="slick-prev position left-15 " ><i class="fa fa-angle-left fs-25" aria-hidden="true"></i></div>',
      nextArrow:
        '<div class="slick-next position right-20" ><i class="fa fa-angle-right fs-25" aria-hidden="true"></i></div>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  detailsFilm();
};

document.addEventListener("DOMContentLoaded", detailApp);
