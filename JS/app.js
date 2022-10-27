//IIFE
let pokemonRepository = (function() {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//get all pokemon an return pokemon 
function getAll() {
    return pokemonList;
}

// verification if pokemon then add pokemon
function add(pokemon){
    if( 
        typeof pokemon === "object" &&
        "name" in pokemon 
       
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
// fetch and load the names and details URL 
    function loadList(){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add (pokemon);
            });
        }).catch(function(error){
            console.error(error);
        });
    }
// fetch and load specific data from the API and console.log
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function (details){
            item.imgUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(error){
            console.error(error);
        });
    }

// show details of each pokemon
function showDetails(item){
    pokemonRepository.loadDetails(item).then(function(){
        console.log(item);
    });
}

// return keys 
return{
    add : add,
    getAll : getAll,
    addListItem:addListItem,
    showDetails:showDetails,
    loadList:loadList,
    loadDetails: loadDetails
}

//end of iife
})();

//function to loop over pokemonReopsitory and display pokemon
pokemonRepository.loadList().then(function() {
   pokemonRepository.getAll().forEach(function(pokemon) {
     pokemonRepository.addListItem(pokemon);
    });
});
