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
let cancel = document.querySelector(".cancel");
let container = document.querySelector(".container");
let moreInfoPopup = document.querySelector(".moreinfo-popup");
let movieSearchName = document.querySelector("#movie-search");

let moviesDetails;

function createMovieDiv(name, image, rating, link, language, genre,summary,premired,type,status) {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let moviePoster = document.createElement("img");
    moviePoster.src = image;
    moviePoster.alt = `${name} Poster`;

    moviesDetails = document.createElement("div");
    moviesDetails.classList.add("movie-details");

    let movieName = document.createElement("div");
    movieName.classList.add("movie-div");
    movieName.innerText = name;

    let ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating-div");
    ratingDiv.innerText = `Rating: ${rating}`;

    let languageDiv = document.createElement("div");
    languageDiv.classList.add("language-div");
    languageDiv.innerText = `Language: ${language}`;

    let genreDiv = document.createElement("div");
    genreDiv.classList.add("genre-div");
    genreDiv.innerText = `Genre: ${genre}`;

    // Append movieName, ratingDiv, languageDiv, and genreDiv to moviesDetails
    moviesDetails.appendChild(movieName);
    moviesDetails.appendChild(ratingDiv);
    moviesDetails.appendChild(languageDiv);
    moviesDetails.appendChild(genreDiv);

    // Add a "More Info" button
    let moreInfoButton = document.createElement("button");
    moreInfoButton.classList.add("more-info-button");
    moreInfoButton.innerText = "more Info...";

    // Add a click event listener to the button
    moreInfoButton.addEventListener("click", function() {
        container.style.filter = "blur(8px)"
        moreInfoPopup.innerHTML = ""
       if ( moreInfoPopup.style.scale == "1") {
        moreInfoPopup.style.scale = "0"
        container.style.filter = "blur(0px)"

       }else{
        moreInfoPopup.style.scale = "1";
        cancel.style.scale = "1"

       }
      let popupChild = createMovieDetailsDiv(name, summary,premired,type,status)
        moreInfoPopup.appendChild(popupChild);

        console.log(`More info clicked for ${name}`);
    });

    // Append the button to moviesDetails
    moviesDetails.appendChild(moreInfoButton);

    // Append the poster and moviesDetails to the movieDiv
    movieDiv.appendChild(moviePoster);
    movieDiv.appendChild(moviesDetails);

    // Append the movieDiv to the container
    allMovieName.appendChild(movieDiv);
}


function createMovieDetailsDiv(name, summary, premiered, type, status) {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("more-details-info-div");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");
    titleDiv.innerHTML = `<h1>${name}</h1>`

    let summaryDiv = document.createElement("div");
    summaryDiv.classList.add("summary-div");
    summaryDiv.innerHTML = `overview: ${summary}`;

    let premieredDiv = document.createElement("div");
    premieredDiv.classList.add("premiered-div");
    premieredDiv.innerText = `Premiered: ${premiered}`;

    let typeDiv = document.createElement("div");
    typeDiv.classList.add("type-div");
    typeDiv.innerHTML = `Type: ${type}`;

    let statusDiv = document.createElement("div");
    statusDiv.classList.add("status-div");
    statusDiv.innerHTML = `Status: ${status}`;

    // Append titleDiv, summaryDiv, premieredDiv, typeDiv, and statusDiv to mainDiv
    mainDiv.appendChild(titleDiv);
    mainDiv.appendChild(summaryDiv);
    mainDiv.appendChild(premieredDiv);
    mainDiv.appendChild(typeDiv);
    mainDiv.appendChild(statusDiv);

    let closeButton = document.createElement("button")
    closeButton.classList.add("cancel-button")
    closeButton.innerText = "cancel";
    cancel.appendChild(closeButton)

    closeButton.addEventListener("click" , ()=>{
        moreInfoPopup.style.scale = "0"
        cancel.style.scale = "0"
        container.style.filter = "blur(0px)"

    })

    return mainDiv;
}

// Example usage:





let btn = document.querySelector(".btn");

let loading = document.querySelector(".loader-container");

btn.addEventListener("click", () => {
    loading.style.display = "block";
    allMovieName.innerHTML = ""

    movieName(movieSearchName.value)
        .then(data => {
            console.log(data);

            if (data.length === 0) {
                allMovieName.innerHTML = `<h1 style="color:white; text-align:center;">No movies related to your search </h1>`;
                return;
            }

            data.forEach(ele => {
                let name = ele.show.name;
                let summary = ele.show.summary;
                let premeried = ele.show.premiered;
                let type = ele.show.type;
                let status = ele.show.status;
                let language = ele.show.language;
                let genre = ele.show.genres;
                let image = ele.show.image ? ele.show.image.medium : '';
                let officialSiteLink = ele.show.officialSite ? ele.show.officialSite : '#';
                let rating = ele.show.rating ? ele.show.rating.average : 'N/A';
                if (genre == "") {
                    genre = "others"
                }
                if (rating == null) {
                    rating = "N/A"
                }
                if (status === "Ended") {
                    status = "<h2 style='color:red; display:inline-block;'>Ended</h2>";
                }else if(status === "Running"){
                    status = "<h2 style='color:green; display:inline-block;'>Running</h2>";
                }else{
                    status = `<h2 style='color:yellow; display:inline-block;'>${status}</h2>`;

                }
                
                createMovieDiv(name, image, rating, officialSiteLink, language, genre,summary,premeried,type,status);
            });
            // this.click() = officialSiteLink;
            

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
