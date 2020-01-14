const results = [
    {
        name: "Luke Skywalker",
        films: [2,6,3,1,7]
    },{
        name: "C-3PO",
        films: [2,5,4,6,3,1]
    },{
        name: "Obi-Wan Kenobi",
        films: [2,5,4,6,3,1]
    },{
        name: "Padmé Amidala",
        films: [5,4,6]
    },{
        name: "Ki-Adi-Mundi",
	    films: [5,4,6]
    }
]

const getCharacterInfo = (character) =>{
    return results
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
}

if(getCharacterInfo('Luke Skywalker') !== results[0]){
    throw new Error('Check fail: happy path')
}else if(getCharacterInfo('Luke Skywalker') === results[0]){
    console.log('Happy path checked')
}

if(getCharacterInfo('luke skywalker') !== results[0]){
    throw new Error('Check fail: no capital letters')
}else if(getCharacterInfo('luke skywalker') === results[0]){
    console.log('No capital letters checked')
}

if(getCharacterInfo('Luke') !== results[0]){
    throw new Error('Check fail: name only')
}else if(getCharacterInfo('Luke') === results[0]){
    console.log('Name only checked')
}

if(getCharacterInfo('luke') !== results[0]){
    throw new Error('Check fail: name only no capital letters')
}else if(getCharacterInfo('luke') === results[0]){
    console.log('Name only no capital letters checked')
}

if(getCharacterInfo('LUKE SKYWALKER') !== results[0]){
    throw new Error('Check fail: all caps')
}else if(getCharacterInfo('LUKE SKYWALKER') === results[0]){
    console.log('All caps checked')
}

if(getCharacterInfo('LUKE') !== results[0]){
    throw new Error('Check fail: name only in all caps')
}else if(getCharacterInfo('LUKE') === results[0]){
    console.log('Name only in all caps checked')
}

if(getCharacterInfo('Skywalker') !== results[0]){
    throw new Error('Check fail: lastname only')
}else if(getCharacterInfo('Skywalker') === results[0]){
    console.log('Lastname only checked')
}

if(getCharacterInfo('skywalker') !== results[0]){
    throw new Error('Check fail: lastname only no capital letters')
}else if(getCharacterInfo('skywalker') === results[0]){
    console.log('Lastname only no capital letters checked')
}

if(getCharacterInfo('SKYWALKER') !== results[0]){
    throw new Error('Check fail: name only')
}else if(getCharacterInfo('SKYWALKER') === results[0]){
    console.log('Name only checked')
}

if(getCharacterInfo('Luke Sky') !== results[0]){
    throw new Error('Check fail: lastname shortened')
}else if(getCharacterInfo('Luke Sky') === results[0]){
    console.log('Lastname shortened checked')
}

if(getCharacterInfo('C-3PO') !== results[1]){
    throw new Error('Check fail: Happy path hyphen')
}else if(getCharacterInfo('C-3PO') === results[1]){
    console.log('Happy path hyphen checked')
}

if(getCharacterInfo('C3PO') !== results[1]){
    throw new Error('Check fail: no hyphen')
}else if(getCharacterInfo('C3PO') === results[1]){
    console.log('No hyphen checked')
}

if(getCharacterInfo('Padmé') !== results[3]){
    throw new Error('Check fail: Happy path stress')
}else if(getCharacterInfo('Padmé') === results[3]){
    console.log('Happy path stress checked')
}

if(getCharacterInfo('Padme') !== results[3]){
    throw new Error('Check fail: no stress')
}else if(getCharacterInfo('Padme') === results[3]){
    console.log('No stress checked')
}

if(getCharacterInfo('Ki-Adi-Mundi') !== results[4]){
    throw new Error('Check fail: Happy path two hyphens')
}else if(getCharacterInfo('Ki-Adi-Mundi') === results[4]){
    console.log('Happy path two hyphens checked')
}

if(getCharacterInfo('KiAdiMundi') !== results[4]){
    throw new Error('Check fail: no two hyphens')
}else if(getCharacterInfo('KiAdiMundi') === results[4]){
    console.log('No two hyphens checked')
}



