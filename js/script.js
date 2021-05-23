
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


const baseUrl = 'https://pokeapi.co/api/v2';



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


$searchInput.addEventListener('input', e => {
    const filterArr = pokemonsDb.filter(item => item.name.includes(e.target.value));
    if(e.target.value !== ''){
        const template = filterArr.map(item => {
            return cardTemplate(item);
        }).join('');
        container.innerHTML = template;
    }else{
        getRequest(`${baseUrl}/pokemon`, 'offset=0&limit=100', res => {
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



window.addEventListener('load', () => {
    
    getRequest(`${baseUrl}/pokemon`,'offset=0&limit=100', res => {
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



// Pagination
pag1.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=0&limit=100', res => {
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


pag2.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=100&limit=200', res => {
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




pag3.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=200&limit=300', res => {
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






pag4.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=300&limit=400', res => {
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





pag5.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=400&limit=500', res => {
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





pag6.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=600&limit=700', res => {
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




pag7.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=700&limit=800', res => {
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





pag8.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=800&limit=900', res => {
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




pag9.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=900&limit=1000', res => {
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



pag10.addEventListener('click', e => {
    e.preventDefault();
    
    getRequest(`${baseUrl}/pokemon`,'offset=1000&limit=1100', res => {
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
                    <div class="buttons">
                        <b>Abilities:</b>
                        <button class="primary">
                            ${res.abilities[0].ability.name}
                        </button>
                        <button class="primary ghost">
                            ${res.abilities[1].ability.name}
                        </button>                        
                                                
                    </div>
                </ul>
                <button style="padding: 10px 40px; border-radius: 8px; margin: 10px; font-weight: 600; color: #fff;background-color: #343a36a9; cursor: pointer; box-shadow:
                0 0 7px #fff,
                0 0 10px #fff,
                0 0 21px rgb(208, 73, 235),
                0 0 42px #f09
                " onclick="refreshPage()">Back</button>
            </div>
        `
    })
}

function refreshPage(){
    window.location.reload();
} 







// $('#demo').pagination({
//     dataSource: [1, 2, 3, 4, 5, 6, 7,  40],
//     pageSize: 5,
//     showGoInput: true,
//     showGoButton: true,
//     callback: function(data, pagination) {
//         // template method of yourself
//         var html = template(data);
//         dataContainer.html(html);
//     }
// })