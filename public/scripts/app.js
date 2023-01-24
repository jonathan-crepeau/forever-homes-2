console.log('app.js reporting for duty..');

const btn = document.querySelector('.nav__button');
const navList = document.getElementById('drop-down');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    navList.classList.toggle('closed');
})