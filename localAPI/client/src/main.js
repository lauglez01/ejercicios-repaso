import { url, options } from "./api";
import { createSearch, showMovies, showMovie } from "./dom";

const divContainer = document.createElement("div");
divContainer.classList.add("container");

const containerFilter = document.createElement("div");
containerFilter.classList.add("container-filter");

const list = document.createElement("ul");
divContainer.appendChild(list);

const postData = async () => {
  try {   
    const response = await fetch(url, options);
    const movies = await response.json();

    const spanFilter = document.createElement("span");
    spanFilter.textContent = "Filter by ID: ";
    containerFilter.appendChild(spanFilter);

    const searchTag = createSearch();
    containerFilter.appendChild(searchTag);

    divContainer.insertBefore(containerFilter, list);

    document.body.appendChild(divContainer);

    showMovies(movies, list);

    // Evento de búsqueda
    searchTag.addEventListener("input", (event) => {
      const filterValue = event.target.value.trim();  // valor que introduce el usuario
      let normalizedID = filterValue;

      if (filterValue && /^[0-9]+$/.test(filterValue)) {  // si el valor del filtro es un dígito, añadimos 'top' antes
        normalizedID = `top${filterValue}`;
      }

      list.innerHTML = "";  

      if (filterValue === "") {
        
        showMovies(movies, list);
      } else {
        //find es un boolean, que devuelve true si el ID coincide con el que introducimos (con el top delante)
        const filteredMovie = movies.find((movie) => movie.id === normalizedID);

        if (filteredMovie) {
          showMovie(filteredMovie, list);
        } else {
          const message = document.createElement("p");
          message.textContent = "No movies found with this ID.";
          list.appendChild(message);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
};

postData();
