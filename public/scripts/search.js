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
            .then(petData => displayCards(petData))
            .catch((error) => console.log(error));
    } else {
        fetch('http://localhost:3000/petfinder/v1/petData', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => petData = data.animals)
            .then(petData => displayCards(petData))
            .catch((error) => console.log(error))
    }
}


function displayCards(inputArray) {
    resultsContainer.innerHTML = '';
    for (let i = 0; i < inputArray.length - 1; i++) {
        // console.log(inputArray[i])
        let card = createCard(inputArray[i]);
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



// SECTION - Functions Calls
verifyUser();
getToken();

