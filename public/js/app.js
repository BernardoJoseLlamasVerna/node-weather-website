console.log('Client side JS file is loaded');

// Experiments using fetch()
/*fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then((data) => {
        console.log(data);
    });
});*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    //console.log(location)

    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageTwo.textContent = data.location;
                messageTwo.textContent = data.forecast
            }
        });
    });
});