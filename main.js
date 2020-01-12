//https://swapi.co/api/people/1

let charOneMovies = []
let charTwoMovies = []
let sharedMovies = []

const searchMovie = () =>{
    const characterOne = document.getElementById('characterOne').value
    const characterTwo = document.getElementById('characterTwo').value
    if(characterOne !== '' && characterTwo !== ''){
        innerHTMLCleaner('errorMessage')
        showLoadingMessage()
        Promise.all([fetchMovies(characterOne, charOneMovies), fetchMovies(characterTwo, charTwoMovies)])
            .then(()=>{
                sharedMovies = getSharedMovies()
                hideLoadingMessage()
                printSharedMovies()
            }) 
    }else{
        showErrorMessage()
    }
    
}

async function fetchMovies(character, moviesArray){
    let movieRoutes = await fetch('https://swapi.co/api/people')
        .then(res=>res.json())
        .then(res=>res.results.find(e=>e.name.toUpperCase()===character.toUpperCase()).films)
    for(let i=0; i < movieRoutes.length; i++){
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
    const title = document.createElement('h2')
    title.innerText = 'Results:'
    container.appendChild(title)
    sharedMovies.forEach(movie=>{
        const listItem = document.createElement('li')
        listItem.innerText = movie
        container.appendChild(listItem)
    })
}

const showErrorMessage = () =>{
    const container = document.getElementById('errorMessage')
    const errorDescription = document.createElement('p')
    errorDescription.innerText = 'Fill up the search inputs and try again'
    container.appendChild(errorDescription)
}

const innerHTMLCleaner = (elementId) =>{
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}

const showLoadingMessage = () =>{
    const loading = document.getElementById('loading')
    loading.classList.replace('hide', 'show')
}

const hideLoadingMessage = () =>{
    const loading = document.getElementById('loading')
    loading.classList.replace('show', 'hide')
}
