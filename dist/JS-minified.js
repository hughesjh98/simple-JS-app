let pokemonRepository=function(){let t=[];function e(){return t}function a(e){"object"==typeof e&&"name"in e?t.push(e):console.log("pokemon is a bit sus")}function n(t){pokemonRepository.loadDetails(t).then(function(){let e=$(".row"),a=$('<div class="card text-center mx-auto m-3 bg-light list-group-item-action" style="width:300px"  data-toggle="modal" data-target="#modal"></div>'),n=$('<img class="card-img-top mx-auto" alt="Card image" style="width:30%" />');n.attr("src",t.imgUrl);let o=$('<div class="card-body"></div>'),i=$("<h5 class='card-title'>"+t.name+"</h5>"),r=$('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal">details</button>');e.append(a),a.append(n),a.append(o),o.append(i),o.append(r),r.on("click",()=>{l(t)}),a.on("click",()=>{l(t)})})}function o(t){let e=t.detailsUrl;return t.details?Promise.resolve(t):fetch(e).then(function(t){return t.json()}).then(function(e){t.details=e,t.imgUrl=e.sprites.front_default,t.imgUrlBack=e.sprites.back_default,t.height=e.height,t.types=e.types.map(t=>t.type.name).join(","),t.weight=e.weight}).catch(function(t){console.error(t)})}function i(t){let e=$(".modal-body"),a=$(".modal-title");a.empty(),e.empty();let n=$("<h1>"+t.name+"</h1>"),o=$('<img class="modal-img" style="width:50%">');o.attr("src",t.imgUrl);let i=$('<img class="modal-img" style="width:50%">');i.attr("src",t.imgUrlBack);let l=$("<p>type : "+t.types+"</p>"),r=$("<p>weight : "+t.weight+" kg </p>"),s=$("<p>height : "+t.height+"</p>");a.append(n),e.append(o),e.append(i),e.append(l),e.append(r),e.append(s)}function l(t){o(t).then(function(){i(t)})}return $(".search-bar").keyup(e=>{let a=e.target.value.toLowerCase(),o=/^[A-Za-z\s]*$/,i=t.filter(t=>{if(a.match(o))return t.name.toLowerCase().includes(a)});$(".card").remove(),i.forEach(function(t){n(t)})}),{add:a,getAll:e,addListItem:n,showDetails:l,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){a({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:o,showModal:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});