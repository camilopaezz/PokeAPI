//VARIABLES
let pokemonToGet
const API_URL = "https://pokeapi.co/api/v2/pokemon/:id"
const OPTIONS = { crossDomain: true }
let btn = document.getElementById("start")
let responseGet

//FUNCIONES
function generarNumero(max) {
  return Math.floor((Math.random() * (max + 1)) + 1)
}

async function getData(num) {
  try {
    const response = await fetch(API_URL.replace(':id', num))
    const data = await response.json()
    responseGet = data
  } catch (error) {
    console.log(error)
  }
}

//CLASES
class Pokemon {
  constructor() {
    this.name = responseGet.name
    this.id = pokemonToGet
    this.type = responseGet.types[0].type.name
    this.abilities = this.generarHabilidades()
    this.height = responseGet.height / 10
    this.weight = responseGet.weight / 10
    this.img = responseGet.sprites.other["official-artwork"].front_default
    this.elements = {
      name: document.getElementById("name"),
      id: document.getElementById("id"),
      type: document.getElementById("type"),
      abilities: document.getElementById("abilities"),
      height: document.getElementById("height"),
      weight: document.getElementById("weight"),
      img: document.getElementById("img"),
    }
  }

  render() {
    this.elements.img.setAttribute("src", this.img)
    this.elements.name.textContent = this.name
    this.elements.id.textContent = this.id
    this.elements.type.textContent = this.type
    this.elements.abilities.textContent = this.abilities
    this.elements.height.textContent = this.height
    this.elements.weight.textContent = this.weight
  }

  generarHabilidades() {
    const abilitiesToShow = []
    for (let i = 0; i < responseGet.abilities.length; i++) {
      abilitiesToShow.push(responseGet.abilities[i].ability.name)
    }
    const result = abilitiesToShow.join(", ")
    return result
  }
}

//LISTENERS
btn.addEventListener("click", iniciar)

//EJECUCIÓN
async function iniciar() {
  pokemonToGet = generarNumero(898)
  await getData(pokemonToGet)
  let pokemon = new Pokemon
  pokemon.render()
}