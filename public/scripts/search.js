// console.log('search.js reporting for duty..');
// SECTION - Variables (bindings):
const logoutButton = document.getElementById('logout-btn');
let accessTokenTimestamp;
// let accessToken; --> instead, try saving to .env (process.env.ACCESS_TOKEN = XXX)
let petData;


// SECTION - Functions
verifyUser();
petTest();
// getToken();

const handleLogoutClick = (event) => {
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
logoutButton.addEventListener('click', handleLogoutClick);

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

function getToken() {
    // make fetch call to Petfinder controller in controllers/Petfinder
    // get response + set timestamp in 'accessTokenTimestamp' variable when received
    // parse response for specific token, try and set to .env file (process.env.ACCESS_TOKEN = ...) instead of 

    fetch('http://localhost:3000/petfinder/v1/getToken', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
}
