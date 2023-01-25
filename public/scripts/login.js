console.log('login.js reporting for duty..');

/*
1. Get form data
2. Validate form data values
3. Submit request if valid
4. Redirect to /profile if successful
*/


const form = document.getElementById("login-form");

const handleSubmitClick = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const userData = {};


    const formInputs = [...form.elements];
    formInputs.forEach((input) => {
        input.classList.remove('input-error');
        if (input.type !== 'submit' && input.value === "") {
            formIsValid = false;
            input.classList.add('input-error');
        } else if (input.type === "password" && input.value.length < 4) {
            formIsValid = false;
            input.classList.add('input-error');
        }

        if (formIsValid) {
            userData[input.name] = input.value;
        }
    });

    if (formIsValid) {
        fetch('http://localhost:3000/api/v1/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location = '/search';
            });
    }
}

form.addEventListener('submit', handleSubmitClick);