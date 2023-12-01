const movieName = async (movie) => {
    try {
        const apiUrl = `https://api.tvmaze.com/search/shows?q=${decodeURIComponent(movie)}&embed=episodes`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        let data =  await response.json();
        console.log(data);
        return data;
     
    } catch (error) {
        console.error(error);
    }
};


let allMovieName = document.querySelector(".all-movie-name");
let movieSearchName = document.querySelector("#movie-search");


function createMovieDiv(name, image, rating) {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let movieName = document.createElement("h2");
    movieName.textContent = name;

    let movieImage = document.createElement("img");
    movieImage.src = image;
    movieImage.alt = `${name} Poster`;

    let movieRating = document.createElement("p");
    movieRating.textContent = `Rating: ${rating}`;

    movieDiv.appendChild(movieName);
    movieDiv.appendChild(movieImage);
    movieDiv.appendChild(movieRating);

    allMovieName.appendChild(movieDiv);
}
let btn = document.querySelector(".btn");

let loading = document.querySelector(".loader-container");

btn.addEventListener("click", () => {
    loading.style.display = "block";
    allMovieName.innerHTML = ""

    movieName(movieSearchName.value)
        .then(data => {
            console.log(data);

            if (data.length === 0) {
                allMovieName.innerHTML = `<h1>No movies related to your search </h1>`;
                return;
            }

            data.forEach(ele => {
                let name = ele.show.name;
                let image = ele.show.image ? ele.show.image.medium : ''; // Check if image is available
                let rating = ele.show.rating ? ele.show.rating.average : 'N/A'; // Check if rating is available
                createMovieDiv(name, image, rating);
            });

        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            loading.style.display = "none";
        });
});

movieSearchName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

function createMovieDiv(name, image, rating) {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let movieName = document.createElement("h2");
    movieName.textContent = name;

    let movieImage = document.createElement("img");
    movieImage.src = image;
    movieImage.alt = `${name} Poster`;

    let movieRating = document.createElement("p");
    movieRating.textContent = `Rating: ${rating}`;

    movieDiv.appendChild(movieName);
    movieDiv.appendChild(movieImage);
    movieDiv.appendChild(movieRating);

    allMovieName.appendChild(movieDiv);
}
