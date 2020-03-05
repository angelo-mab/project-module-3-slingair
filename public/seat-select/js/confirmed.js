const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const flight = urlParams.get('flight');
const seat = urlParams.get('seat');
const givenName = urlParams.get('givenName');
const surname = urlParams.get('surname');
const email = urlParams.get('email');

const flightHTML = document.querySelector('#flight');
const seatHTML = document.querySelector('#seat');
const nameHTML = document.querySelector('#name');
const emailHTML = document.querySelector('#email');

flightHTML.innerHTML = flight;
seatHTML.innerHTML = seat;
nameHTML.innerHTML = givenName + " " + surname;
emailHTML.innerHTML = email;


console.log('flight: ', flight);
console.log('seat: ', seat);
console.log('given name: ', givenName);
console.log('surname: ', surname);
console.log('email: ', email);