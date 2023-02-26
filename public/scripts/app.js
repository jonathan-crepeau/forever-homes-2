console.log('app.js reporting for duty..');

const btn = document.querySelector('.nav__button');
const navList = document.getElementById('drop-down');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    navList.classList.toggle('closed');
})

// function helloEcho() {
//     console.log('Hello, hello, hello from app.js... app.js ...');
// }

function createCard(input) {

    const card = `
        <div class="card">
            <div class="card__header">
                <div class="card__pet-photo">
                    <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt=""> 
                </div>
                <div class="card__pet-titles"></div>
                <div class="card__favorite-icon"></div>
            </div>
            <div class="card__hero-photo"></div>
            <div class="card__text"></div> 
        </div>
    `;
    return card;
    

    // let photoSource;
    // if (!input.primary_photo_cropped) {
    //     photoSource = "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";
    // } else {
    //     photoSource = input.primary_photo_cropped['small'];
    // }

    // let string = '';
    // for (let a = 0; a < input.tags.length - 1; a++) {
    //     string = string + `#${input.tags[a]} `;
    // }

    // let attributesString = '';
    // let attributes = input.attributes;
    // for (let x in attributes) {
    //     if (attributes[x] !== null) {
    //         attributesString = attributesString + `[${x}: ${attributes[x]}] `;
    //     }
    // }

    // const vettedAttributes = petAttributes(input);

    // const card = `
    //     <div class="card closed">
    //         <div class="card__photo">
    //             <img src=${photoSource} />
    //         </div>
    //         <div class="card__info closed">
    //             <div class="card__header">
    //                 <h1 class="card__title">${inputArray[i].name} (${inputArray[i].species})</h1>
    //                 <p class="card__btn">&#9660</p>
    //                 <p class="card__fav">&#9734</p>
    //             </div>
    //             <div class="card__writtenDesc">
    //                 <p>${inputArray[i].gender} • ${inputArray[i].age} • ${inputArray[i].size}</p>
    //                 <p>${inputArray[i].contact.address.city}, ${inputArray[i].contact.address.state}</p>
    //                 <p class="tags">${string}<p>
    //                 <br>
    //                 <p>Breed: ${inputArray[i].breeds.primary}</p>
    //                 <p class="attr">${vettedAttributes}</p>
                    
    //             </div>
    //         </div>
    //     </div>
    // `
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