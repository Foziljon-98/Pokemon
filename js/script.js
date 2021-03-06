
const container = document.querySelector('.container');
const cardsContainer = document.querySelector('.cardsContainer');

const pag1 = document.querySelector('.pag1');
const pag2 = document.querySelector('.pag2');
const pag3 = document.querySelector('.pag3');
const pag4 = document.querySelector('.pag4');
const pag5 = document.querySelector('.pag5');
const pag6 = document.querySelector('.pag6');
const pag7 = document.querySelector('.pag7');
const pag8 = document.querySelector('.pag8');
const pag9 = document.querySelector('.pag9');
const pag10 = document.querySelector('.pag10');

const $searchInput = document.querySelector('.searchInput');

const $prevBtn = document.querySelector('.prevBtn');
const $nextBtn = document.querySelector('.nextBtn');
const $page = document.querySelector('.page');
const LIMIT = 20;
let pageCounter = 1;
let offsetCounter = 0;
const TOTAL_POKEMONS = 1118;
const TOTAL_PAGES = Math.floor(TOTAL_POKEMONS / LIMIT);

 

const baseUrl = 'https://pokeapi.co/api/v2';
const getRequest = (url, query, cb) =>{

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}?${query}`);
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    })
    xhr.addEventListener('error', err => {
        console.log('Возникла ошибка!');
    })
    xhr.send();
   }
   




//Search
const getSearch = (url, cb) =>{
    const srch = new XMLHttpRequest();
    srch.open('GET', url);
    srch.addEventListener('load',  () => {
        const response = JSON.parse(srch.response);
        cb(response)
    })
    srch.addEventListener('error', err =>{
        console.log(err)
    })
    srch.send();
}


// Local Storage

window.addEventListener('load', () => {
    if(localStorage.getItem('pokemonsDb')){
        return;
    }else{
        getSearch(`${baseUrl}/pokemon?limit=1118`, res => {
            localStorage.setItem('pokemonsDb', JSON.stringify(res.results));
        })
    }
})

const pokemonsDb = JSON.parse(localStorage.getItem('pokemonsDb'));



// Search input
$searchInput.addEventListener('input', e => {

    const searchString = e.target.value.toUpperCase();

    const filterArr = pokemonsDb.filter(item => item.name.toUpperCase().includes(searchString));

    if(e.target.value !== ''){
        const template = filterArr.map(item => {
            return cardTemplate(item);
            
        }).join('');
        container.innerHTML = template;
        
    }else{
        getRequest(`${baseUrl}/pokemon`, 'offset=0&limit=20', res => {
            const temp = res.results.map(item => {
                return cardTemplate(item)
            }).join('');
    
            container.innerHTML = temp;
        })
    }
})


function cardTemplate(item){
    return`
        <div class="wrapper">
            <div style="background: url('./img/bg.jpg') center/ cover;" class="card front-face">
                <h1 class="neonText">${item.name}</h1>
            </div>
            <div class="card back-face">
                <img src="https://i1.wp.com/itc.ua/wp-content/uploads/2016/07/Pokemon_GO_i02.jpg?fit=770%2C546&quality=100&strip=all&ssl=1">
                <div class="info">
                    <div class="title">
                        ${item.name}
                    </div>
                </div>
                <button onclick="singlePokemon('${item.url}')">More...</button>
            </div>
        </div>
    `
}





const getRequestPag = (url, query, cb) =>{

    const baseUrl = 'https://pokeapi.co/api/v2';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${baseUrl}/${url}?${query}`);
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    })
    xhr.addEventListener('error', err => {
        console.log('Возникла ошибка!');
    })
    xhr.send();
}



window.addEventListener('load', () => {
    
    getRequestPag(`pokemon`,`offset=${offsetCounter}&limit=${LIMIT}`, res => {
        const temp = res.results.map(item => {
            return  `
                <div class="wrapper">
                    <div style="background: url('./img/bg.jpg') center/ cover;" class="card front-face">
                        <h1 class="neonText">${item.name}</h1>
                    </div>
                    <div class="card back-face">
                        <img src="https://i1.wp.com/itc.ua/wp-content/uploads/2016/07/Pokemon_GO_i02.jpg?fit=770%2C546&quality=100&strip=all&ssl=1">
                        <div class="info">
                            <div class="title">
                                ${item.name}
                            </div>
                        </div>
                        <button onclick="singlePokemon('${item.url}')">More...</button>
                    </div>
                </div>
            `
        }).join('');

        container.innerHTML = temp;
    })
})



// More
function singlePokemon(url){
    getRequest(url, '', res =>{
        console.log(res);
        container.innerHTML = `
            <div class="card-container">
                <img class="round" src="${res.sprites.other.dream_world.front_default}" />
                <ul>
                    <h1>${res.name}</h1>
                    <li>
                        <b>Type:</b>
                        <span>${
                            res.types.length !== 0 ? `<span style="background-color:green;padding: 3px 8px; border-radius: 6px;">${[res.types[0].type.name]}</span>` : "Dosen't types"}
                        </span>
                    </li>
                    <li>
                        <b>Order:</b>
                        <span>${res.order}</span>
                    </li>

                    <li>
                        <b>Height:</b>
                        <span>${res.height}</span>
                    </li>
                   
                    <li>
                        <b>Weight:</b>
                        <span>${res.weight}0/gr</span>
                    </li>
                    <li>
                        <b>Hp:</b>
                        <span>${res.stats[0].base_stat}</span>
                    </li>
                    <li>
                        <b>Defense:</b>
                        <span>${res.stats[2].base_stat}</span>
                    </li> 
                    <li>
                        <b>Special-attack:</b>
                        <span>${res.stats[3].base_stat}</span>
                    </li> 
                    <li>
                        <b>Special-defense:</b>
                        <span>${res.stats[4].base_stat}</span>
                    </li> 
                    <li>
                        <b>Speed:</b>
                        <span>${res.stats[5].base_stat}</span>
                    </li> 
                    <li>
                        <b>Abilities:</b>
                        <span style="background-color:green;padding: 3px 8px; border-radius: 6px;">${res.abilities[0].ability.name}</span>
                    </li>                    
                </ul>
                <button class="backBtn" onclick="refreshPage()">Back</button>
            </div>
        `
    })
}


function refreshPage(){
    window.location.reload();
    
} 




// Pagination

window.addEventListener('load', () => {
    $page.innerHTML = pageCounter;
    $prevBtn.setAttribute('disabled',true);
});


$nextBtn.addEventListener('click', e => {
    e.preventDefault();
    $prevBtn.removeAttribute('disabled');
    if(pageCounter >= 1 && pageCounter <= TOTAL_PAGES){
        if(pageCounter === TOTAL_PAGES){
            $nextBtn.setAttribute('disabled', true);
            getRequestPag('pokemon', `offset=${offsetCounter += LIMIT}&limit=${LIMIT}`, res => {
                pageCounter++;
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardTemplate(item)).join('');
                container.innerHTML = temp;
            })
        }else{
            getRequestPag('pokemon', `offset=${offsetCounter += LIMIT}&limit=${LIMIT}`, res => {
                pageCounter++;
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardTemplate(item)).join('');
                container.innerHTML = temp;
            })
        }
    }
})



$prevBtn.addEventListener('click', e => {
    e.preventDefault();
    if(pageCounter >= 1){
        pageCounter--;
        if(pageCounter === 1){
            $prevBtn.setAttribute('disabled', true);
            offsetCounter = 0;
            getRequestPag('pokemon', `offset=${offsetCounter}&limit=${LIMIT}`, res =>{
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardTemplate(item)).join('');
                container.innerHTML = temp;
            })
        }else{
            getRequestPag('pokemon', `offset=${offsetCounter -= LIMIT}&limit=${LIMIT}`, res => {
                $nextBtn.removeAttribute('disabled');
                $page.innerHTML = pageCounter;
                const temp = res.results.map(item => cardTemplate(item)).join('');
                container.innerHTML = temp;
            })
        }
    }
})