export const createSearch = () => {
    const search = document.createElement("input");
    search.type = "text";
    search.classList.add("styled-search");
    search.placeholder = "Enter movie ID...";
    return search;
  };
  
  export const showMovies = (movies, list) => {
    list.innerHTML = "";  // Limpiamos la lista
    movies.forEach((movie) => showMovie(movie, list));
  };

  export const showMovie = (movie, list) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h2>${movie.title} (${movie.year})</h2>
      <p><strong>Description:</strong> ${movie.description}</p>
      <p><strong>Rating:</strong> ${movie.rating}</p>
      <p><strong>Genre:</strong> ${movie.genre.join(", ")}</p>
      <img src="${movie.image}" alt="${movie.title}" style="max-width:200px;"/>
      <p><a href="${movie.imdb_link}" target="_blank">More on IMDb</a></p>
    `;
    list.appendChild(listItem);
  };
  