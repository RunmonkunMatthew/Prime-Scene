const global = {
  currentPage: window.location.pathname,
  api: {
    apikey: "3ccd15014defbab04acd7be3819b2942",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

async function displayPopularMovies() {
  const { results } = await fetchApiData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">

           ${
             movie.poster_path
               ? `
             <img
               src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              alt="${movie.title}"
              class="movie-img"
            />
            `
               : `
             <img
              src="./images/no-image.jpg"
              alt="${movie.title}"
              class="movie-img"
            />`
           }
          </a>

          <div class="card-body">
            <h5>${movie.title}</h5>
            <p class="card-body-note">
              <small>Release Date:${movie.release_date}</small>
            </p>
          </div>
    `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

async function displayPopularTvShows() {
  const { results } = await fetchApiData("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="tv-show-details.html?id=${show.id}">

           ${
             show.poster_path
               ? `
             <img
              src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
              alt="${show.name}"
              class="movie-img"
            />
            `
               : `
             <img
              src="./images/no-image.jpg"
              alt="${show.name}"
              class="movie-img"
            />`
           }
          </a>

          <div class="card-body">
            <h5>${show.name}</h5>
            <p class="card-body-note">
              <small>Release Date:${show.first_air_date}</small>
            </p>
          </div>
    `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

//display movie details\
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  const movie = await fetchApiData(`movie/${movieId}`);

  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
          <div class="details-top">

            <div class="movie-img">
             ${
               movie.poster_path
                 ? `
                 <img
                   src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                   alt="${movie.title}"
                   class="movie-img"
                 />
               `
                 : ` 
                 <img
                   src="./images/no-image.jpg"
                   alt="${movie.title}"
                   class="movie-img"
                 /> `
             
          }
            </div>

            <div>
              <h2>${movie.title}</h2>
              <p><i class="fas fa-star text-primary"></i> ${movie.vote_average.toFixed()} / 10</p>
              <p class="release-date">Release Date: ${movie.release_date}</p>

              <p>
               ${movie.overview}  
              </p>

              <h5>Genres</h5>
              <ul class="genre-group">
                ${movie.genres
                  .map((genre) => `<li>${genre.name}</li>`)
                  .join("")}
              </ul>

              <a href="${
                movie.homepage
              }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
          </div>

          <div class="details-below">
            <h2>Movie Info</h2>
            <ul>
              <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
                movie.budget
              )}</li>

              <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
                movie.revenue
              )}</li>

              <li><span class="text-secondary">Runtime:</span> ${
                movie.runtime
              } minutes</li>

              <li><span class="text-secondary">Status:</span> ${
                movie.status
              }</li>
            </ul>

            <h4>Production Companies</h4>
            <div class="list-group">${movie.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join("")}</div>
          </div>
  `;
  document.querySelector("#movie-details").appendChild(div);
}

async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];

  const show = await fetchApiData(`tv/${showId}`);

  displayBackgroundImage("show", show.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
          <div class="details-top">

            <div class="show-img">
             ${
               show.poster_path
                 ? `
                 <img
                   src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
                   alt="${show.name}"
                   class="show-img"
                 />
               `
                 : ` 
                 <img
                   src="./images/no-image.jpg"
                   alt="${show.name}"
                   class="show-img"
                 /> `
             }
          }
            </div>

            <div>
              <h2>${show.name}</h2>
              <p><i class="fas fa-star text-primary"></i> ${show.vote_average.toFixed()} / 10</p>
              <p class="release-date">Release Date: ${show.first_air_date}</p>

              <p>
               ${show.overview}  
              </p>

              <h5>Genres</h5>
              <ul class="genre-group">
                ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
              </ul>

              <a href="${
                show.homepage
              }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
          </div>

          <div class="details-below">
            <h2>Show Info</h2>
            <ul>
             <li>
                <span class="text-secondary">Number Of Episodes:</span> ${
                  show.number_of_episodes
                }
              </li>
              <li>
                <span class="text-secondary">Last Episode To Air:</span> ${
                  show.last_episode_to_air.name
                }
              </li>
              <li><span class="text-secondary">Status:</span> ${
                show.status
              }</li>
            </ul>

            </ul>

            <h4>Production Companies</h4>
            <div class="list-group">${show.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join("")}</div>
          </div>
  `;
  document.querySelector("#show-details").appendChild(div);
}

//display Background image
function displayBackgroundImage(type, BackgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${BackgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

//Slider
async function displaySwiper() {
  const { results } = await fetchApiData("movie/top_rated");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${

               movie.poster_path

                 ? `
                 <img
                   src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                   alt="${movie.title}"
                   class="movie-img"
                 />
               `
                 : ` 
                 <img
                   src="./images/no-image.jpg"
                   alt="${movie.title}"
                   class="movie-img"
                 /> `
          }
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed()} / 10
            </h4>
    `;
    
    document.querySelector('.swiper-wrapper').appendChild(div);
    
    initSwiper();
  });
}

// init slider 
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay:{
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      500:{
        slidesPerView: 2
      },
      700:{
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  })
}

// fetch api data
async function fetchApiData(endpoint) {
  const API_KEY = global.api.apikey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const result = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = result.json();

  hideSpinner();
  return data;
}

//highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll("nav-link");

  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//show spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

//hide spinner
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//add commas to numbers
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/tv-shows.html":
      displayPopularTvShows();
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/anime.html":
      console.log("Anime Page");
      break;
    case "/anime-details.html":
      console.log("Anime Details Page");
      break;
    case "/tv-show-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      console.log("Search Page");
      break;
  }

  highlightActiveLink();
}

window.addEventListener("DOMContentLoaded", init);
