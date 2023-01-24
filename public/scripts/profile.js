console.log('profile.js reporting for duty..');

const logoutButton = document.getElementById('logout-btn');

const handleLogoutClick = (event) => {
    event.preventDefault();
    console.log('logout button clicked.');

    fetch('http://localhost:3000/api/v1/logout', {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => window.location = '/login')
        .catch((error) => console.log(error));
}

logoutButton.addEventListener('click', handleLogoutClick);

const verifyUser = () => {
    fetch('http://localhost:3000/api/v1/verify', {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status = 401) {
                window.location = '/login';
            }
        })
        .catch((error) => console.log(error));
}

verifyUser();