// console.log('search.js reporting for duty..');
// SECTION - Variables (bindings):
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', handleLogoutClick);

let accessToken = {};
let accessTokenTimestamp;
let petData;


// SECTION - Functions
verifyUser();
getToken();

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

function getPetData() {
    fetch('http://localhost:3000/petfinder/v1/petData', {
        method: 'GET'
        // body: JSON.stringify(accessToken)
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
}

function handleTokenResponse(inputObj) {
    // console.log(inputObj);
    accessToken['token'] = inputObj.access_token;
    accessTokenTimestamp = Date.now();
    // console.log(accessToken);
}