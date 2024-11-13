var id = new URL(window.location.href).searchParams.get("id");
const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
const detailTv = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=vi`;
const urlTV = (sessionNumber) =>
  `https://api.themoviedb.org/3/tv/${id}/season/${sessionNumber}?api_key=${api_key}&language=vi`;
const img300 = (poster_path) =>
  `https://image.tmdb.org/t/p/w300/${poster_path}`;
const img500 = (poster_path) =>
  `https://image.tmdb.org/t/p/w500/${poster_path}`;
const img = (poster_path) =>
  `https://image.tmdb.org/t/p/original/${poster_path}`;
// const linkFilm = (id, season, episodes) =>
//   `https://2embed.org/embed/series?tmdb=${id}&sea=${season}&epi=${episodes}`;
  const linkFilm = (id, season, episodes) =>
  `xem-phim.html?category=tv&id=${id}&season=${season}&epi=${episodes}`;
const motchill = "./assets/img_erro.png";

async function getSeasons() {
  console.log(detailTv);
  const respon = await fetch(detailTv);
  const data = await respon.json();
  console.log(data);
  const seasonsNew = new URL(window.location.href).searchParams.get("season")
    ? data.seasons[new URL(window.location.href).searchParams.get("season") - 1]
    : data.seasons[data.seasons.length - 1];
  console.log(seasonsNew);
  const seasonNumber = data.seasons[data.seasons.length - 1].season_number;
  var tvHeader = document.querySelector(".tvSeason-header");
  console.log(seasonsNew);
  tvHeader.innerHTML = `
        <div > 
            <img src="${img(data.backdrop_path)}" class="tvSeason-bg" loading="auto"/>
            <div class="tvSeason-child" >
                 <div class="tvSeason-poster" >
                        <img loading="auto"  src=${img300(
                          seasonsNew.poster_path
                            ? seasonsNew.poster_path
                            : data.poster_path
                        )} alt="bg" />
                </div>
                <div class="tvSeason-infor">
                    <div class="tvSeason-name">
                        ${data.name} - ${seasonsNew.name}
                     </div>
                    <div class="tvSeason-overview">
                        ${
                          seasonsNew.overview
                            ? seasonsNew.overview
                            : data.overview
                        }
                    </div>
                    <div class="tvSeason-button arrow1" onclick="seeMore()">   
                          Xem ngay
                        
                    </div>
                </div>
            </div>
        </div>

    `;

  async function getEpisode() {
    console.log(seasonsNew.season_number);

    const respon = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonsNew.season_number}?api_key=${api_key}&language=vi`
    );
    const data = await respon.json();
    var tvMain = document.querySelector(".tvSeason-main");
    console.log(data);
    const episodes = data.episodes;

    episodes.map((item) => {
      const div = document.createElement("div");
      div.setAttribute("class", "tvSeason-episode");
      div.setAttribute("id", `${item.id}`);
      tvMain.appendChild(div);
      div.innerHTML = `
          <a href=${linkFilm(id, seasonNumber, item.episode_number)}>
          
          <div class="tvSeason-episode--image">
              <img src="${
                item.still_path ? img500(item.still_path) : motchill
              }" loading="auto"/>
          </div>
          <div class="tvSeason-episode--infor">
              <div class="tvSeason-episode--title">
              ${item.name}
              
              </div>
            
              <div class="tvSeason-episode--overview">
                 ${item.overview}
                
              </div>
            
          </div>
          </a>
     
    `;
    });
  }

  getEpisode();
  getTVSeason(data, seasonNumber);
}

const getTVSeason = (data, seasonNumber) => {
  const tvOther = document.querySelector(".tvSeason-other--list");
  var seasons = data.seasons;
  seasons.map((item, index) => {
    const li = document.createElement("li");
    li.setAttribute("class", "tvSeason-other--item");
    index < seasons.length
      ? (li.innerHTML = `

            <div class="tvSeason-other--image" data-id= ${
              item.season_number
            } onclick="routeSeason(${item.season_number})"> 
                <img src=${
                  item.poster_path ? img300(item.poster_path) : motchill
                } alt="avt" loading="auto"/>
            </div>
            <div class="tvSeason-other--infor">
                  <div class="tvSeason-other--name">
                      ${data.name} - ${item.name}
                  </div>
            </div>
    `)
      : "";
    tvOther.appendChild(li);
  });
};

getSeasons();
function routeSeason(numberSeason) {
  var queryParams = new URLSearchParams(window.location.search);
  queryParams.set("season", numberSeason);
  history.replaceState(null, null, "?" + queryParams.toString());
  console.log(window.location.search);
  window.location.reload();
  window.scroll(0, 0);
} 
const seeMore = () => {
  let seeMore = document.querySelector(".tvSeason-button");
  let seasonOther = document.querySelector(".tvSeason-other");
  let tvOtherList = document.querySelector("#main");
  tvOtherList.style.display = "block";
  seasonOther.style.display = "block";
  seeMore.style.display = "none";
  var scroll_y = scrollY;
  scroll(0, scroll_y + 800);
  document.querySelector(".tvSeason-header").style.boxShadow =
    "box-shadow: 0 1px 1px rgb(0 0 0 / 20%) 0 40px 0 -3px #5a5555 0 9px 1px -3px rgb(0 0 0 / 20%)  0 350px 0 -6px #464141 0 17px 2px -6px rgb(0 0 0 / 20%);";
};
