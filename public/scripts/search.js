// console.log('search.js reporting for duty..');

// SECTION - Variables (bindings):
let petData;
const paramsObj = {};

const resultsContainer = document.getElementById('result-cont');
const logoutButton = document.getElementById('logout-btn');
const searchTitle = document.getElementById('search-title');
const searchDropdown = document.getElementById('search-dropdown');
const searchButton = document.getElementById('search-btn');


// SECTION - Event Listeners
logoutButton.addEventListener('click', handleLogoutClick);
resultsContainer.addEventListener('click', expandCardClick);
resultsContainer.addEventListener('click', handleFavorite);
searchTitle.addEventListener('click', handleSearchDrop);
searchButton.addEventListener('click', handleSearchUpdate);


// SECTION - Function Declarations
function handleLogoutClick(event) {
    event.preventDefault();
    console.log('logout button clicked.');

    fetch('http://localhost:3000/api/v1/logout', {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                window.location = '/login'
            }
        })
        .catch((error) => console.log(error));
}

function expandCardClick(event) {
    if (event.target.matches('.card__btn')) {
        // console.log('Expand card.');
        const card = event.target.closest('.card');
        const cardInfo = event.target.closest('.card__info');
        const expandButton = event.target.closest('.card__btn');

        card.classList.toggle('closed');
        cardInfo.classList.toggle('closed');
        if (!cardInfo.classList.contains('closed')) {
            expandButton.innerHTML = '&#9650';
        } else {
            expandButton.innerHTML = '&#9660';
        }
    }
}

function handleFavorite(event) {
    if (event.target.matches('.card__fav')) {
        event.target.classList.toggle('favorite');
        event.target.classList.toggle('starColor');
        if (!event.target.classList.contains('favorite')) {
            event.target.innerHTML = '&#9734';
        } else {
            event.target.innerHTML = '&#9733';
        }
    }
}

function handleSearchDrop() {
    searchDropdown.classList.toggle('closed');
    if (!searchDropdown.classList.contains('closed')) {
        document.getElementById('span-arrow').innerHTML = '&#9650';
    } else {
        document.getElementById('span-arrow').innerHTML = '&#9660';
    }
}

function handleSearchUpdate(event) {
    let count = 0;
    document.querySelectorAll('.query-param').forEach((input) => {
        if (input.value) {
            paramsObj[count] = {key: input.id, value: input.value}
            count += 1;
            input.value = '';
        }
    })
    getPetData(paramsObj);
    searchDropdown.classList.add('closed');
}

function verifyUser() {
    fetch('http://localhost:3000/api/v1/verify', {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 401) {
                window.location = '/login'
            }
        })
        .catch((error) => console.log(error));
}

function petTest() {
    fetch('http://localhost:3000/petfinder/v1/test', {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
}

async function getToken() {
    await fetch('http://localhost:3000/petfinder/v1/token', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

    getPetData();
}

function getPetData(bodyObj) {
    if (bodyObj) {
        fetch('http://localhost:3000/petfinder/v1/queryPetData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        })
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => petData = data.animals)
            .then(petData => createCards(petData))
            .catch((error) => console.log(error));
    } else {
        fetch('http://localhost:3000/petfinder/v1/petData', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => petData = data.animals)
            .then(petData => createCards(petData))
            .catch((error) => console.log(error))
    }
}

function createCards(inputArray) {
    resultsContainer.innerHTML = '';
    for (let i = 0; i < inputArray.length - 1; i++) {
        let photoSource;
        if (!inputArray[i].primary_photo_cropped) {
            photoSource = "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";
        } else {
            photoSource = inputArray[i].primary_photo_cropped['small'];
        }

        let string = '';
        for (let a = 0; a < inputArray[i].tags.length - 1; a++) {
            string = string + `#${inputArray[i].tags[a]} `;
        }

        let attributesString = '';
        let attributes = inputArray[i].attributes;
        for (let x in attributes) {
            if (attributes[x] !== null) {
                attributesString = attributesString + `[${x}: ${attributes[x]}] `;
            }
        }

        const vettedAttributes = petAttributes(inputArray[i]);

        const card = `
            <div class="card closed">
                <div class="card__photo">
                    <img src=${photoSource} />
                </div>
                <div class="card__info closed">
                    <div class="card__header">
                        <h1 class="card__title">${inputArray[i].name} (${inputArray[i].species})</h1>
                        <p class="card__btn">&#9660</p>
                        <p class="card__fav">&#9734</p>
                    </div>
                    <div class="card__writtenDesc">
                        <p>${inputArray[i].gender} • ${inputArray[i].age} • ${inputArray[i].size}</p>
                        <p>${inputArray[i].contact.address.city}, ${inputArray[i].contact.address.state}</p>
                        <p class="tags">${string}<p>
                        <br>
                        <p>Breed: ${inputArray[i].breeds.primary}</p>
                        <p class="attr">${vettedAttributes}</p>
                        
                    </div>
                </div>
            </div>
        `
        
        
    resultsContainer.insertAdjacentHTML('beforeend', card)    
    }
}

function createQueryString(input) {

    fetch('http://localhost:3000/petfinder/v1/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
}

function petAttributes(inputObj) {
    const attributes = inputObj.attributes;
    let string = '';
    for (let attr in attributes) {
        if (attributes[attr] !== null) {
            string = string + `${attr}: ${attributes[attr]} <br>`;
        }
    }
    string = string.replace(/true/g, '<span>&#9989;</span>');
    string = string.replace(/false/g, '<span>&#10060;</span>')
    return string;
}



// SECTION - Functions Calls
verifyUser();
getToken();

