const initApp = () => {
  const date = new Date();

  const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
  const apiFilm = `
  https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=vi&page=1`;
  // const apiNow = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=vi&page=1`;
  const apiNow = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=vi&primary_release_date.gte=2022-07-01&primary_release_date.lte=2022-09-01`;
  const img = (poster_path) => `https://image.tmdb.org/t/p/w500/${poster_path}`;
  var filmItem = document.querySelector(".film-list");

  const getFilm = (callback) => {
    fetch(apiFilm)
      .then((response) => {
        return response.json();
      })
      .then(callback);
  };

  const displayFilm = () => {
    getFilm((data) => {
      data = data.results;
      for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "film-item");
        div.setAttribute("id", `${data[i].id}`);

        div.innerHTML = `
      <a href="film.html?id=${data[i].id}">
        <img src=${img(data[i].poster_path)} loading="auto"></img>
            <div class="info">        
              <h2 class="filmUpdate-name">${data[i].title}</h2>           
           </div>
       </a>`;
        filmItem.appendChild(div);
      }
    });
  };

  // const displayFilmHot = () => {
  //   const filmHotList = document.querySelector(".filmHot-list");
  //   getFilm((data) => {
  //     for (var i = 0; i < data.length; i++) {
  //       var li = document.createElement("li");
  //       li.setAttribute("class", "filmHot-item");
  //       filmHotList.appendChild(li);
  //       li.innerHTML = `
  //        <a href="film/${data[i].id}">
  //           <div class="filmHot-image">
  //           <img src=${img(data[i].poster_path)}></img>
  //           </div>
  //           <div class="filmHot-name">${data[i].title}</div>
  //        </a>

  //        `;
  //     }
  //     slickSlide();
  //   });
  // };
  async function displayPosterShow() {
    const filmHotList = document.querySelector(".filmBanner-list");
    const respon = await fetch(apiNow);
    const data = await respon.json();
    const result = data.results;
    for (var i = 0; i < 10; i++) {
      var li = document.createElement("li");

      li.setAttribute("class", "filmBanner-item");
      filmHotList.appendChild(li);
      li.innerHTML = `
      <a href="film.html?id=${result[i].id}">
          <div class="filmBanner-image" loading="auto">
          <img src=${img(result[i].backdrop_path)} > </img>
          <h5 class="filmBanner-name">${result[i].title}</h5>
         </div>
      </a>
      `;
      submitFilm();
    }
    result.map((item, index) => {});
    slickSlideBanner();
  }
  // function displayPosterShow() {
  //   const filmHotList = document.querySelector(".filmBanner-list");
  //   getFilm((data) => {
  //     for (var i = 3; i < 10; i++) {
  //       var li = document.createElement("li");
  //       li.setAttribute("class", "filmBanner-item");
  //       filmHotList.appendChild(li);
  //       li.innerHTML = `
  //       <a href="film.html?id=${data[i].id}">
  //           <div class="filmBanner-image">
  //           <img src=${img(data[i].backdrop_path)}></img>
  //           <h5 class="filmBanner-name">${data[i].original_title}</h5>
  //          </div>
  //       </a>
  //       `;
  //       // li.innerHTML = `
  //       // <form action="/film/index.html" method="get" id ="form-film" name="id">
  //       //       <div  value=${data[i].id} class="filmBanner-image" name="id" onClick="document.forms['form-film'].submit();">
  //       //         <img src=${img(data[i].backdrop_path)} " /></img>
  //       //          <h5 class="filmBanner-name">${data[i].original_title}</h5>
  //       //      </div>

  //       // </form>
  //       //   `;
  //       submitFilm();
  //     }

  //     slickSlideBanner();
  //   });
  // }

  const displayAccount = () => {
    const token = JSON.parse(localStorage.getItem("supabase.auth.token"));

    var auth = document.querySelector(".header-auth");
    var authWork = document.querySelector(".header-auth-work");
    var account = document.querySelector(".header-account");
    var login = JSON.parse(localStorage.getItem("login"));
    var accountName = document.querySelector(".account-name");

    if (token) {
      auth.style.display = "none";
      authWork.style.display = "block";

      const name = document.createElement("div");
      const dropdown = document.createElement("div");
      name.setAttribute("class", "header-name");
      dropdown.setAttribute("class", "header-dropdown");
      accountName.innerHTML = `
    ${
      token.currentSession.user.user_metadata.fullname
        ? token.currentSession.user.user_metadata.fullname
        : "Vô danh"
    }
    `;

      const logout = () => {
        const btnLogout = document.querySelector(".header-logout");
        btnLogout.addEventListener("click", () => {
          localStorage.removeItem("login");
          window.location.reload();
        });
      };
      logout();
    }
  };
  function submitFilm() {
    // var btnSubmit = document.querySelector(".filmBanner-image");
    // var formFilm = document.getElementById("form-film");
    // console.log(formFilm.action + "?id=" + btnSubmit.getAttribute("data-id"));
    // formFilm.action =
    //   "/film/index.html" + "?id=" + btnSubmit.getAttribute("data-id");
    // console.log(formFilm.action);
    // btnSubmit.addEventListener("click", function (e) {
    //   console.log(formFilm.action);
    //   formFilm.submit();
    // });
  }
  const slickSlideBanner = () => {
    $(".filmBanner-list").slick({
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      focusOnSelect: true,
      autoplaySpeed: 2000,
      autoplay: true,
      prevArrow:
        '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
      nextArrow:
        '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40",
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 500,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    });
  };
  const slickSlide = () => {
    $(".filmHot-list").slick({
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 4,
      autoplaySpeed: 1000,
      autoplay: true,
      prevArrow:
        '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
      nextArrow:
        '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
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

  // displayFilmHot();
  displayFilm();
  displayAccount();
  // logout();
  displayPosterShow();
  // backgroundLogin() ;
};
document.addEventListener("DOMContentLoaded", initApp);
