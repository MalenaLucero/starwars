let charOneMovies = []
let charTwoMovies = []

const searchMovie = () =>{
    const characterOne = document.getElementById('characterOne').value
    const characterTwo = document.getElementById('characterTwo').value
    Routes(characterOne)
        .then(routes=>{
            async () =>{
                let movies = await routes.map(route=>{
                    async function name(route){
                        let name = await fetchMovieName(route)
                        return name
                    }
                    return name(route)
                })
                console.log(movies)
            }
        })
}

async function Routes(character){
    const movieRoutes = await fetchMovieRoutes(character)
    return movieRoutes
}

const fetchMovieRoutes = (character) =>{
    return fetch('https://swapi.co/api/people/')
        .then(res=>res.json())
        .then(res=>{
            return res.results.find(char => char.name === character).films
        })
}

const fetchMovieName = (route) =>{
    return fetch(route)
        .then(res=>res.json())
        .then(res=>res.title)
}

