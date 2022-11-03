//IIFE
let pokemonRepository = (function() {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer = document.querySelector('#modal-container');

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
    eventListener(button,pokemon);
    }

    // when the button is click, it will console.log the details.
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
            item.types = details.types[type.name];
        }).catch(function(error){
            console.error(error);
        });
    }
    // create modal
    function showModal(pokemonName, img, imgBack, pokemonType, pokemonHeight){

      modalContainer.innerText = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText =  pokemonName;

      let imageElement = document.createElement('img');
      imageElement.classList.add('img-front');
      imageElement.setAttribute("src", img);
      imageElement.setAttribute("width", "250");
      imageElement.setAttribute("height", "228");
      imageElement.setAttribute("alt", "pokemon");

      let imageBackElement = document.createElement('img');
      imageBackElement.classList.add('image-back');
      imageBackElement.setAttribute("src", imgBack);
      imageBackElement.setAttribute("width", "250");
      imageBackElement.setAttribute("height", "228");
      imageBackElement.setAttribute("alt", "pokemon");

      let typeContentElement = document.createElement('p');
      typeContentElement.innerText = pokemonType;

      let heightContentElement = document.createElement('p');
      heightContentElement.innerText = pokemonHeight;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(imageBackElement);
      modal.appendChild(typeContentElement);
      modal.appendChild(heightContentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) =>{
    let target = e.target;
    if(target === modalContainer) {
        hideModal()
    }
});

// show details of each pokemon
function showDetails(item){
    pokemonRepository.loadDetails(item).then(function(){
        showModal(
            item.name,
            item.imgUrl,
             item.imgUrlBack,
            'type: ' + item.types,
           'height: ' + item.height
        );
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
    hideModal: hideModal

}

//end of IIFE
})();

//function to loop over pokemonReopsitory and display pokemon
pokemonRepository.loadList().then(function() {
   pokemonRepository.getAll().forEach(function(pokemon) {
     pokemonRepository.addListItem(pokemon);
    });
});
