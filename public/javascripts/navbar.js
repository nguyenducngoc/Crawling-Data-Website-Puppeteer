const navbar = () => {
  const date = new Date();

  const isoCountry = [
    {
      name: "Việt Nam",
      iso: "vi",
    },
    {
      name: "Thái Lan",
      iso: "th",
    },
    {
      name: "Hàn Quốc",
      iso: "ko",
    },
    {
      name: "Nhật Bản",
      iso: "ja",
    },
    {
      name: "Mỹ ",
      iso: "en",
    },
    {
      name: "Trung Quốc",
      iso: "cn",
    },
    {
      name: "Ấn Độ",
      iso: "te",
    },
    {
      name: "Hồng Kông ",
      iso: "te",
    },
    {
      name: "Nga ",
      iso: "ru",
    },
    {
      name: "Pháp ",
      iso: "eu",
    },
  ];
  const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
  const apiTvGener = (category) =>
    `https://api.themoviedb.org/3/genre/${category}/list?api_key=${api_key}&language=vi`;

  const getGenres = async (category) => {
    const respon = await fetch(apiTvGener(category));
    const data = await respon.json();
    data.genres.map((genres, index) => {
      let navGenres = document.querySelector(
        `.header-nav-genres--${category}_list`
      );

      let item = document.createElement("li");
      item.setAttribute("class", `header-nav-genres--${category}_item`);
      item.innerHTML = `
        <a href="kho-phim.html?category=${category}&genres=${genres.name}-${
        genres.id
      }&page=1">
            ${
              genres.name.slice(0, 12) == "Chương Trình"
                ? "CT " + genres.name.slice(13)
                : genres.name.slice(0, 4) == "Phim"
                ? genres.name.slice(5)
                : genres.name
            }
         
        </a>  
    `;
      navGenres.appendChild(item);
    });
  };
  const getCountry = () => {
    const navCountry = document.querySelector(".header-nav-country");

    isoCountry.map((country, index) => {
      const countryItem = document.createElement("li");
      countryItem.setAttribute("class", "header-nav-country--item");
      countryItem.innerHTML = `
        <a href="kho-phim.html?country=${country.name}-${country.iso}">
        ${country.name}
        </a>
      `;
      navCountry.appendChild(countryItem);
    });
  };
  const getDate = (date) => {
    const navDate = document.querySelector(".header-nav-date");
    for (var i = 0; i < 40; i++) {
      const dateItem = document.createElement("li");
      dateItem.setAttribute("class", "header-nav-date--item");
      dateItem.innerHTML = `
        <a href="kho-phim.html?release=${date - i}&page=1">
           ${date - i}
        </a>
      `;
      navDate.appendChild(dateItem);
    }
  };
  getGenres("movie");
  getGenres("tv");
  getCountry();
  getDate(date.getFullYear());
};

document.addEventListener("DOMContentLoaded", navbar);
