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

//append pokemon into a div
function addListItem(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function () {
        const row = $(".row");
        const card = $('<div class="card text-center mx-auto m-3 bg-light list-group-item-action" style="width:300px"  data-toggle="modal" data-target="#modal"></div>');
        const cardImage = $('<img class="card-img-top mx-auto" alt="Card image" style="width:30%" />');
        cardImage.attr("src", pokemon.imgUrl);
        const cardBody = $('<div class="card-body"></div>');
        const cardTitle = $("<h5 class='card-title'>" + pokemon.name + "</h5>");
        const detailsButton = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">details</button>'
        );
  
        row.append(card);
        //append image to the card
        card.append(cardImage);
        card.append(cardBody);
        cardBody.append(cardTitle);
        cardBody.append(detailsButton);
  
        detailsButton.on("click", () => {
                showDetails(pokemon);
            });
            card.on("click", () => {
                showDetails(pokemon);
            })
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

    let searchBar = $(".search-bar");
    const alert = alert("please enter a character");
    //add even listener for after any keypress
    searchBar.keyup((e) => {
      const pokemonCard = $(".card");
      const searchString = e.target.value.toLowerCase();
      const letters =  /^[A-Za-z]+$/;
      const filteredPokemonList = pokemonList.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchString);
      });

      if (searchString.match(letters)){
        return filteredPokemonList;
      };

      // remove all pokemon cards from the document
      $(".card").remove();

      //Re-append only the filteredPokemonList
      filteredPokemonList.forEach(function (pokemon) {
        addListItem(pokemon);
      });
    });

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
