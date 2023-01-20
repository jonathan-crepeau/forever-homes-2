console.log('signup.js reporting for duty..');

const form = document.getElementById('signup-form');

/*
 1. Select the form
 2. Listen for submit and prevent default
 3. Get form values
 4. Validate values
 5. Submit request if valid
 6. Redirect to login on success
*/

const handleSubmitClick = (event) => {
    event.preventDefault();
    let userData = {};
    let isFormValid = true;
    console.log('Submit button clicked.');

    // Clear Alert Messages
    document.querySelectorAll('.alert').forEach((alert) => alert.remove());

    // 3. Get Form Values
    formInputs = [...form.elements];

    // 4. Validate Values
    formInputs.forEach((input) => {
        input.classList.remove('input-error');
        if (input.type !== 'submit' && input.value === "") {
            isFormValid = false;
            input.classList.add('input-error');
        } else if (input.type === "password" && input.value.length < 4) {
            isFormValid = false;
            input.classList.add('input-error');
        }

        // NOTE: see if Auth signup controller ignores the submit input, otherwise the next line should be edited to "if (isFormValid && input.type !== "submit") {}":"
        if (isFormValid) {
            userData[input.name] = input.value;
        }

    });

    // 5. Submit Request If Valid
    if (isFormValid) {
        fetch('http://localhost:3000/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location = '/login';
            })
            .catch((error) => console.log(error));
    }

}

form.addEventListener('submit', handleSubmitClick);