console.log('login.js reporting for duty..');

// SECTION - Global Variables (Bindings)
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("registration-form");
const inputs = document.querySelectorAll('.input-field');


// SECTION - Attach event listener to each input field:
inputs.forEach((input) => {
    input.addEventListener('input', handleWriting)
})


// SECTION - Animate form when switching between the two:
$('.message a').click(function(){
    $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
});

// SECTION - Handle submit clicks for EITHER form:
$('button').click(function(event) {
    event.preventDefault();
    document.querySelectorAll('.alert').forEach((alert) => alert.remove());


// SECTION - Handle login form & make fetch call if successful:
    if (event.target.matches('#login')) {
        event.preventDefault();
        let formIsValid = true;
        const userData = {};
    
        const formInputs = [...loginForm.elements];
        formInputs.forEach((input) => {
            input.classList.remove('input-error');
            if (input.type !== 'submit' && input.value === "") {
                formIsValid = false;
                input.classList.add('input-error');
                if (!input.nextElementSibling.classList.contains('alert')) {
                    input.insertAdjacentHTML('afterend', `
                        <div class="alert ${input.id}-message">
                            Please include a ${input.placeholder}
                        </div>
                    `);
                }
            } 
            // else if (input.type === "password" && input.value.length < 4) {
            //     formIsValid = false;
            //     input.classList.add('input-error');
            // }
    
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

    } else {
        console.log('register button clicked!');
        event.preventDefault();
        let userData = {};
        let isFormValid = true;
    
        formInputs = [...signupForm.elements];
        formInputs.forEach((input) => {
            input.classList.remove('input-error');
            if (input.type !== 'submit' && input.value === "") {
                isFormValid = false;
                input.classList.add('input-error');
                if (!input.nextElementSibling.classList.contains('alert')) {
                    input.insertAdjacentHTML('afterend', `
                        <div class="alert ${input.id}-message">
                            Please include a ${input.placeholder}
                        </div>
                    `);
                }
            } else if (input.type === "password" && input.value.length < 4) {
                isFormValid = false;
                input.classList.add('input-error');
                if (!input.nextElementSibling.classList.contains('alert')) {
                    input.insertAdjacentHTML('afterend', `
                        <div class="alert ${input.id}-message">
                            ${input.placeholder} must be at least 5 characters long
                        </div>
                    `);
                }
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
});

function handleWriting(event) {
    event.preventDefault();
    // console.log('Writing in an input');
    event.target.classList.remove('input-error');
    if (document.querySelector(`.${event.target.id}-message`)) {
        document.querySelector(`.${event.target.id}-message`).remove();
    }
}