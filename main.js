//https://swapi.co/api/people/1

let charOneMovies = []
let charTwoMovies = []
let sharedMovies = []

const searchMovie = () =>{
    //const characterOne = document.getElementById('characterOne').value
    //const characterTwo = document.getElementById('characterTwo').value
    Promise.all([fetchMovies(0, charOneMovies), fetchMovies(1, charTwoMovies)])
        .then(()=>{
            sharedMovies = getSharedMovies()
            printSharedMovies()
        })
}

async function fetchMovies(num, moviesArray){
    let movieRoutes = await fetch('https://swapi.co/api/people')
        .then(res=>res.json())
        .then(res=>res.results[num].films)
    for(let i=0; i<movieRoutes.length; i++){
        let title = await getMovieTitle(movieRoutes[i])
        moviesArray.push(title)
    }
}

const getMovieTitle = route =>{
    return fetch(route)
        .then(res=>res.json())
        .then(res=>res.title)
}

const getSharedMovies = () =>{
    let movies = charOneMovies.filter(charOneMovie=>{
        let shared = false
        charTwoMovies.forEach(charTwoMovie=>{
            if(charTwoMovie === charOneMovie) shared = true
        })
        if(shared) return charOneMovie
    })
    return movies
}

const printSharedMovies = () =>{
    const container = document.getElementById('results')
    sharedMovies.forEach(movie=>{
        const listItem = document.createElement('li')
        listItem.innerText = movie
        container.appendChild(listItem)
    })
}
