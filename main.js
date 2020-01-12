//global variables
let charOneMovies = [] //list of movies from the first character
//let charOneCompleteName = '' //complete name of the first character as given by the API
let charTwoMovies = [] //list of movies from the second character
//let charTwoCompleteName = '' //complete name of the second character as given by the API
let sharedMovies = [] //list of movies where both characters appear

const searchMovie = () =>{
    event.preventDefault()

    //Cleaners of both HTML and data
    innerHTMLCleaner('errorMessage')
    innerHTMLCleaner('results')
    charOneMovies = []
    charTwoMovies = []

    //input by user
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

//this function fills the empty list of movies with movie titles as strings
async function fetchMovies(character, moviesArray){
    let APIpageCounter = 1
    let characterInfo
    while(characterInfo === undefined && APIpageCounter < 10 ){
        characterInfo = await getCharacterInfo(character, APIpageCounter)
        APIpageCounter = APIpageCounter + 1
        console.log(characterInfo)
    }
    const movieRoutes = characterInfo.films
    for(let i=0; i < movieRoutes.length; i++){
        let title = await getMovieTitle(movieRoutes[i])
        moviesArray.push(title)
    }
}

const getCharacterInfo = (character, pageNumber) =>{
    return fetch(`https://swapi.co/api/people/?page=${pageNumber}`)
        .then(res => res.json())
        .then(res => res.results.find(e=>e.name.toUpperCase().indexOf(character.toUpperCase())===0))
}

//returns the movie title and takes the API route as a parameter
const getMovieTitle = route =>{
    return fetch(route)
        .then(res=>res.json())
        .then(res=>res.title)
}

//compares the two arrays of movies and returns an array with the movies in common
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
    const title = document.createElement('h3')
    title.innerText = 'Results'
    container.appendChild(title)
    if(sharedMovies.length === 0){
        const textItem = document.createElement('p')
        textItem.innerText = 'No movies in common'
        container.appendChild(textItem)
    }else{
        sharedMovies.forEach(movie=>{
        const listItem = document.createElement('li')
        listItem.innerText = movie
        container.appendChild(listItem)
        })
    }
    
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
