//global variables
let charOneMovies = [] //list of movies from the first character
let charTwoMovies = [] //list of movies from the second character
let sharedMovies = [] //list of movies where both characters appear
let charactersNames = [] //complete names of the two characters

const searchMovie = () =>{
    event.preventDefault()

    //Cleaners of both HTML and data
    innerHTMLCleaner('errorMessage')
    innerHTMLCleaner('results')
    charOneMovies = []
    charTwoMovies = []
    charactersNames = []

    //input by user
    const characterOne = document.getElementById('characterOne').value
    const characterTwo = document.getElementById('characterTwo').value

    if(characterOne !== '' && characterTwo !== ''){
        showLoadingMessage()
        Promise.all([fetchMovies(characterOne, 0, charOneMovies), fetchMovies(characterTwo, 1, charTwoMovies)])
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
                showErrorMessage('Something went wrong. Please, make sure there are no spelling mistakes.')
            })
    }else{
        showErrorMessage('Fill up the search inputs and try again.')
    }
}

//this function fills the empty list of movies with movie titles as strings
async function fetchMovies(character, index, moviesArray){
    let APIpageCounter = 1
    let characterInfo
    while(characterInfo === undefined && APIpageCounter < 10 ){
        characterInfo = await getCharacterInfo(character, APIpageCounter)
        APIpageCounter = APIpageCounter + 1
        console.log(characterInfo)
    }
    const movieRoutes = characterInfo.films
    charactersNames[index] = characterInfo.name
    for(let i=0; i < movieRoutes.length; i++){
        let title = await getMovieTitle(movieRoutes[i])
        moviesArray.push(title)
    }
}

const getCharacterInfo = (character, pageNumber) =>{
    return fetch(`https://swapi.co/api/people/?page=${pageNumber}`)
        .then(res => res.json())
        .then(res => res.results
                        .find(e=>{
                            if(e.name.toUpperCase().includes(character.toUpperCase())){
                                return e
                            }else if(e.name.includes('-')){
                                if(e.name.replace(/-/g,'').toUpperCase().includes(character.toUpperCase())){
                                    return e
                                }
                            }else if(e.name.includes('é')){
                                if(e.name.replace('é','e').toUpperCase().includes(character.toUpperCase())){
                                    return e
                                }
                            }
                        })
            )
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
    title.innerText = `Movies in which ${charactersNames[0]} and ${charactersNames[1]} appear`
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
