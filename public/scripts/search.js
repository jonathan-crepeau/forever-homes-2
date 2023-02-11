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
        event.target.closest('.card').classList.toggle('closed');
        event.target.closest('.card__info').classList.toggle('closed');
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
        const card = `
            <div class="card closed">
                <div class="card__photo">
                    <img src=${photoSource} />
                </div>
                <div class="card__info closed">
                    <div class="card__header">
                        <h2 class="card__title">${inputArray[i].name}</h2>
                        <p class="card__btn">&#9660</p>
                    </div>
                    <div class="card__writtenDesc"></div>
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

const testObj = {
    0: {key: 'type', value: 'dog'},
    1: {key: 'color', value: 'black'},
    2: {key: 'location', value: "New Hampshire"}
}

// SECTION - Functions Calls
verifyUser();
getToken();

