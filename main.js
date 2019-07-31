//Add the event listener for inputting data
document.addEventListener("DOMContentLoaded", function() {
    let search = document.querySelector("#movieSearch");        //set search equal to what is entered in the movie search bar using query selector
    search.addEventListener("input", function() {               //event listening for the input of data
      getMovieList(search.value, 1);                            //function that calls our movieList function when a search happens, adding the 1 is for the search navigation
    });
  });

  //Create the getMoviesList function
  function getMovieList(search, page) {                 //search is what was entered into the field; page is the current page of the search
    console.log(search);
    const apiKey = "d14e2e38";
    if (search.length > 2) {                            //if function for searching w/o button click. Once the search length exceeds 2, the search fires 
      console.log(search);
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`)       //fetch for the results. &s added for what the search is, $p for the current page of results
        .then(r => r.json())                                                            //pass results into a json to retrieve the data
        .then(body => buildResults(search, body, page));                                //take data and pass into the build results function. Results will be what was searched, the body and the page you're on
    }
  }
  //Create the getMovie function for fetching based on imdbID when a movie name is clicked
  function getMovie(imdbID) {
    console.log(imdbID);
    const apiKey = "d14e2e38";
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then(r => r.json())
      .then(body => buildMovie(body));
  }
  //Create the buildResults table
  function buildResults(search, movieList, pageNum) {               //the results we need are what was searched, the movie list, and the current page number
    console.log(movieList);
    let main = document.querySelector("#main");                     //selects all items in the main class
    main.innerHTML = "";                                            //sets innterHTML to and empty string
    let movieUL = document.createElement("ul");                     //sets movieUL variable to create a new UL when a search is performed
    const { totalResults } = movieList;                             //destructuring
    movieList.Search.forEach(function(movie) {                      //forEach used to pull data from each result
      const { Title, Year, Type, imdbID } = movie;                  //destructuring; what each result will display 
      let movieLI = document.createElement("li");                   //sets movieLI variable to create a new li for each result
      movieLI.classList.add("item");                                //adds each item
      movieLI.classList.add(Type);                                  //type used for the color-coded type system
      movieLI.innerText = `${Title} (${Year})`;                     //sets the inner text of each li to be the movie title and year
      movieLI.addEventListener("click", function() {                //sets to where the getMovie function is called when a movie is clicked
        getMovie(imdbID);
      });
      movieUL.appendChild(movieLI);                                 //identifies the movieLI as a child of the movieUL parent node
    });
    main.appendChild(movieUL);                                      //identifies the movieUL as a child of main parent node
    var movieNav = document.createElement("div");                   //creates a div for the previous page arrow
    if (pageNum > 1) {                                              //if statement for when the page changes
      var leftArrow = document.createElement("div");                //if the page is greater than 1, the leftArrow div is created
      leftArrow.id = "leftarrow";                                   //id assigned to the leftArrow div to use the leftarrow styling from main.css
      leftArrow.addEventListener("click", function() {              //event listener added for when arrow is clicked
        getMovieList(search, pageNum - 1);                          //getMovieList function fires if it is clicked; page set to current page -1
      });
      leftArrow.innerHTML = "&nbsp;&nbsp;<i class='fas fa-arrow-left'></i>";    //styling for the arrow
      movieNav.appendChild(leftArrow);                              //indentifies leftArrow as child of movieNav parent node
    }
    middleNav = document.createElement("div");                      //creates div for the page navigation
    middleNav.id = "middlenav";                                     //id assigned to middleNav; used for styling
    middleNav.innerHTML =
      "Page " + pageNum + " of " + Math.ceil(totalResults / 10);    //innerHTML of middleNav set to display current page number out of all pages. There are 10 results per page, which is why we divide by 10 to get total pages
    movieNav.appendChild(middleNav);                                //identifies middleNav as child of movieNav parent node
    if (pageNum + 1 < Math.ceil(totalResults / 10)) {               //if statement for displaying right arrow. Tells it to display if you are on any page except than the last one
      var rightArrow = document.createElement("div");               //creates div for the rightArrow
      rightArrow.id = "rightarrow";                                 //id assigned to rightArrow div; used for styling
      rightArrow.addEventListener("click", function() {             //event listener added for when arrow is clicked
        getMovieList(search, pageNum + 1);                          //clicking arrow calls getMovieListFunction, and adds a page 
      });
      rightArrow.innerHTML = "<i class='fas fa-arrow-right'></i>&nbsp;&nbsp;";  //styling for the arrow
      movieNav.appendChild(rightArrow);                             //indentifies rightArrow as child of movieNav parent node
    }
    movieNav.id = "movienav";                                       //id assigned to movieNav; used for styling
    movieNav.classList = "movienav";                                //classList assigned to movieNav
    movieDiv = document.querySelector("#main");                     //sets movieDiv to select items in the main class  
    movieDiv.appendChild(movieNav);                                 //identifies movieNav as child of movieDiv parent node
  }
  
  //Create buildMovie function for when movie is clicked
  function buildMovie(body) {
    let main = document.querySelector("#main");                     //sets main to select items in the main class and use that styling
    console.log(body);                                              //console log of what was clicked
    main.innerHTML = body.Plot                                     //pulls the plot from the movie and adds it to the innerHTML
  }