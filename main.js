//https://swapi.co/api/people/1

let charOneMovies = []
let charTwoMovies = []
let sharedMovies = []

const searchMovie = () =>{
    innerHTMLCleaner('errorMessage')
    innerHTMLCleaner('results')
    charOneMovies = []
    charTwoMovies = []
    const characterOne = document.getElementById('characterOne').value
    const characterTwo = document.getElementById('characterTwo').value
    if(characterOne !== '' && characterTwo !== ''){
        showLoadingMessage()
        Promise.all([fetchMovies(characterOne, charOneMovies), fetchMovies(characterTwo, charTwoMovies)])
            .then(()=>{
                sharedMovies = []
                sharedMovies = getSharedMovies()
                inputCleaner('characterOne')
                inputCleaner('characterTwo')
                hideLoadingMessage()
                printSharedMovies()
            }) 
            .catch(()=>{
                hideLoadingMessage()
                showErrorMessage('Nothing was found. Please, try again.')
            })
    }else{
        showErrorMessage('Fill up the search inputs and try again.')
    }
}

async function fetchMovies(character, moviesArray){
    let movieRoutes = await fetch('https://swapi.co/api/people')
        .then(res=>res.json())
        .then(res=>res.results.find(e=>e.name.toUpperCase().indexOf(character.toUpperCase())===0).films)
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

//HTML helpers

const printSharedMovies = () =>{
    const container = document.getElementById('results')
    const title = document.createElement('h2')
    title.innerText = 'Results'
    container.appendChild(title)
    sharedMovies.forEach(movie=>{
        const listItem = document.createElement('li')
        listItem.innerText = movie
        container.appendChild(listItem)
    })
}

const showErrorMessage = (errorMessage) =>{
    const container = document.getElementById('errorMessage')
    const errorDescription = document.createElement('p')
    errorDescription.innerText = errorMessage
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

const inputCleaner = (elementId) =>{
    const input = document.getElementById(elementId)
    input.value =''
}
