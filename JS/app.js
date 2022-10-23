//IIFE
let pokemonRepository = (function() {
let pokemonList = [
    {
        name: "Bulbasaur", 
        height: 2,
        type: ["grass", "posion"]
    },

    {
        name: "Charizard",
        height: 5,
        type: ["fire", "flying"]
    },

    {
        name: "Mewtwo",
        height: 6,
        type: "psychic"
   },

   {
        name:"Golurk", 
        height: 9, 
        type: ["ground", "ghost"]
   },

   {
        name: "Arceus", 
        height: 10, 
        type: "normal"
   }
]
//get all pokemon an return pokemon 
function getAll() {
    return pokemonList;
}

// verification if pokemon then add pokemon
function add(pokemon){
    if( 
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "type" in pokemon &&
        "height" in pokemon 
        ){
        pokemonList.push(pokemon);
    } else {
        console.log("pokemon is a bit sus");
    }
}

//append pokemon into the ul
function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.classList.add("list-items");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    //click event to console.log pokemon details 
   button.addEventListener('click', function(){ 
       showDetails(pokemon);
    });
}

// show details
function showDetails(pokemon){
console.log(pokemon);
};

// return keys 
return{
    add : add,
    getAll : getAll,
    addListItem:addListItem,
    showDetails:showDetails
}

//end of iife
})()

//add new pokemon then push to pokemon list
pokemonRepository.add ({
    name: "Pidgeotto",
    height: 1.1,
    type: ["normal", "flying"],
    });
    
pokemonRepository.add({
    name: "crobat",
    height: 5,
    type: ["posion","flying"]
    });
pokemonRepository.add({
    name: "Cobalion",
    height: 6,
    type:["stee;","fighting"]
    });

//function to loop over pokemonReopsitory and display pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
 pokemonRepository.addListItem(pokemon);
    });

