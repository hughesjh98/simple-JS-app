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
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-modal');
    button.classList.add('col');
    listPokemon.classList.add("list-items");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    eventListener(button,pokemon);
}
    // when the button is click, it will fire showDetails 
    function eventListener(button, pokemon) {
        button.addEventListener('click', function(){ 
        showDetails(pokemon);
    });
}; 

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
            item.imgUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types.map((type) => type.type.name).join(',');
            item.weight = details.weight;
        }).catch(function(error){
            console.error(error);
        });
    }

    // create modal
    function showModal(pokemon) {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();
      
      let titleElement = $('<h1>' + pokemon.name + '</h1>');

      let imageElement = $('<img class="modal-img" style="width:50%">');
      imageElement.attr('src', pokemon.imgUrl);
      let imageBackElement = $('<img class="modal-img" style="width:50%">');
      imageBackElement.attr('src', pokemon.imgUrlBack)
      
      let typeContentElement = $('<p>' + 'type : ' + pokemon.types + '</p>');

      let weightContentElement = $('<p>' + 'weight : ' + pokemon.weight + " kg " + '</p>');

      let heightContentElement = $('<p>' + 'height : ' + pokemon.height + '</p>');

     modalTitle.append(titleElement);
     modalBody.append(imageElement);
     modalBody.append(imageBackElement);
     modalBody.append(typeContentElement);
     modalBody.append(weightContentElement);
     modalBody.append(heightContentElement);
    }


// show details of each pokemon
function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
}

// return keys 
return{
    add : add,
    getAll : getAll,
    addListItem:addListItem,
    showDetails:showDetails,
    loadList:loadList,
    loadDetails: loadDetails,
    showModal: showModal,
}

//end of IIFE
})();

//function to loop over pokemonReopsitory and display pokemon
pokemonRepository.loadList().then(function() {
   pokemonRepository.getAll().forEach(function(pokemon) {
     pokemonRepository.addListItem(pokemon);
    });
});
