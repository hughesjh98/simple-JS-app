let pokemonList = [
    {
        name: "Bulbasaur", 
        height: 2,
        type: ["grass", "posion"]
   },

    {
        name: "Charizard",
        height: 5,
        type: ["fire", "flying"]},

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


// loop over and display pokemon with a specific height and display results in an ordered list.
for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height === 2){
      document.getElementById("pokemon1").innerHTML= pokemonList[i].name + " is a grass and poison pokemon.";

    }else if (pokemonList[i].height === 5){
        document.getElementById("pokemon2").innerHTML= pokemonList[i].name + " is a fire and flying pokemon.";

    }else if (pokemonList[i].height === 6){
        document.getElementById("pokemon3").innerHTML= pokemonList[i].name + " is an psychic pokemon.";

    } else if (pokemonList[i].height === 9){
      document.getElementById("pokemon4").innerHTML= pokemonList[i].name + " is a ground and ghost pokemon.";
    } else{ 
        document.getElementById("pokemon5").innerHTML= pokemonList[i].name + " is a normal pokemon.";
    }
  }