//IIFE
(function(){

let str = '';
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

// for each loop over and display pokemon with a specific height and display results in order.
   pokemonList.forEach(pokemon);

   function pokemon(item) {
    
    if(item.height < 4){
        document.getElementById("container").innerHTML= str += `<div> I am ${item.name}</div>`;
    } else if (item.height < 5.5) {
        document.getElementById("container").innerHTML= str += `<div> I am ${item.name}</div>`;
    } else if(item.height < 8) {
        document.getElementById("container").innerHTML= str += `<div> I am ${item.name}</div>`;
    } else if(item.height < 9.5) {
        document.getElementById("container").innerHTML= str += `<div> I am ${item.name}</div>`;
    } else {
        document.getElementById("container").innerHTML= str += `<div> I am ${item.name}</div>`;
    }
  };


})()
