const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerMain = document.querySelector('main')


function fetchAllTrainers(){
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(json => parseEachTrainer(json))
}

function parseEachTrainer(json) {
  json.forEach(function(trainer){
    renderCard(trainer)
  })
}

function renderCard(trainerData){

  let pName = document.createElement('p')
    pName.innerText = `${trainerData.name}`

  let trainerCard = document.createElement('div')
    trainerCard.classList.add(`card`)
    trainerCard.id = `t_${trainerData.id}`

  let addPokeBtn = document.createElement('button')
    addPokeBtn.id = `trainer btn_${trainerData.id}`
    addPokeBtn.innerText = `Add Pokemon`
    addPokeBtn.addEventListener('click', addPokemon)

  let pokeContainer = document.createElement('ul')

  trainerMain.appendChild(trainerCard)
  trainerCard.appendChild(pName)
  trainerCard.appendChild(addPokeBtn)
  trainerCard.appendChild(pokeContainer)

  trainerData.pokemons.forEach(function(eachPoke){
   renderPoke(eachPoke)
  })
}

function renderPoke(eachPoke){
  let trainerCard = document.getElementById(`t_${eachPoke.trainer_id}`)
  let pokeName = document.createElement(`li`)
    pokeName.innerText = `${eachPoke.nickname} (${eachPoke.species})`
    pokeName.id = `pId_${eachPoke.id}`
  let releaseBtn = document.createElement(`button`)
    releaseBtn.id = `pokeId_${eachPoke.id}`
    releaseBtn.classList.add(`release`)
    releaseBtn.innerText = `Release`
    releaseBtn.addEventListener('click', releasePokemon)
    // debugger
  pokeName.appendChild(releaseBtn)
  trainerCard.appendChild(pokeName)
}

function addPokemon(clickEvent){
  fetch(`http://localhost:3000/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify({
      "trainer_id": `${clickEvent.target.id.split("_")[1]}`
      })
    })
    .then(res => res.json())
    .then(json => renderPoke(json))
  }

function releasePokemon(clickEvent) {
  let tarkgetPokeId = clickEvent.path[0].id.split("_")[1]
  document.getElementById(`pId_${parseInt(tarkgetPokeId)}`).remove()
  fetch(`http://localhost:3000/pokemons/${tarkgetPokeId}`, {
    method: "DELETE"
  })
}


document.addEventListener(`DOMContentLoaded`, function() {
  console.log(`we have liftoff 🚀`)
  fetchAllTrainers()
})
