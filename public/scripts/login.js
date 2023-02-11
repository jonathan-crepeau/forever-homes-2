console.log('login.js reporting for duty..');

// SECTION - Global Variables (Bindings)
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("registration-form");

// SECTION - Event Listeners
// form.addEventListener('submit', handleSubmitClick);

// SECTION - Function Declarations
// function handleSubmitClick(event) {
//     event.preventDefault();
//     let formIsValid = true;
//     const userData = {};


//     const formInputs = [...form.elements];
//     formInputs.forEach((input) => {
//         input.classList.remove('input-error');
//         if (input.type !== 'submit' && input.value === "") {
//             formIsValid = false;
//             input.classList.add('input-error');
//         } else if (input.type === "password" && input.value.length < 4) {
//             formIsValid = false;
//             input.classList.add('input-error');
//         }

//         if (formIsValid) {
//             userData[input.name] = input.value;
//         }
//     });

//     if (formIsValid) {
//         fetch('http://localhost:3000/api/v1/login', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'credentials': 'include'
//             },
//             body: JSON.stringify(userData)
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 window.location = '/search';
//             });
//     }
// }

$('a').click(function(){
    $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
});

$('button').click(function(event) {
    event.preventDefault();
    if (event.target.matches('#login')) {
        console.log('login button clicked!');
        event.preventDefault();
        let formIsValid = true;
        const userData = {};
    
    
        const formInputs = [...loginForm.elements];
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

    } else {
        console.log('register button clicked!');
        event.preventDefault();
        let userData = {};
        let isFormValid = true;
        console.log('Submit button clicked.');
    
        // Clear Alert Messages
        document.querySelectorAll('.alert').forEach((alert) => alert.remove());
    
        // 3. Get Form Values
        formInputs = [...signupForm.elements];
    
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
});