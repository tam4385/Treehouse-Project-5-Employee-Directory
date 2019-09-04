
//variable to contain the data from the fetch
let fetchData;

//building the search form html
const searchContainer = document.querySelector('.search-container');
const form = document.createElement('form');

form.action = "#";
form.method = "get"
//create elements inside the form
const searchInput = document.createElement('input');
searchInput.type = "search";
searchInput.id = 'search-input';
searchInput.className = 'search-input';
searchInput.placeholder = 'Search...';

const searchSubmit = document.createElement('submit');
searchSubmit.type = 'submit';
searchSubmit.value = '&#x1F50D';
searchSubmit.id = 'search-submit';
searchSubmit.className = 'search-submit';

//appending the elements
searchContainer.appendChild(form);
form.appendChild(searchInput);
form.appendChild(searchSubmit);

//search bar functionality
searchInput.addEventListener('keyup', () => {
    const cards = document.querySelectorAll('.card')
    console.log(cards)
        cards.forEach(card => {
            let parent = card.parentElement
            parent.removeChild(card);
            //loop through fetch results and add condition to match names of fetch results
            fetchData.results.forEach(result => {
                if (searchInput.value === result.name.first 
                    || searchInput.value === result.name.last) {
                    generateGallery(result);
                } else {
                  console.log('else')  
                }
            });
    });
});
//Fetching the api data
fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    // .then(data => console.log(data.results))
    .then(data => fetchData = data)
    .then(data => generateGallery(data.results))
    .catch(err => console.log(err))
                         
//=============helper functions==============================

//gallery div generation
const galleryDiv = document.getElementById('gallery');
//function to add html and response text to the gallery div
generateGallery = (data) => {
    //select gallery div
    data.map(result => {
    let HTML = `
    <div class="card" id="${result.name.first} ${result.name.last}">
                    <div class="card-img-container">
                        <img class="card-img" src="${result.picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
                        <p class="card-text">${result.email}</p>
                        <p class="card-text cap">${result.location.city}, ${result.location.state}</p>
                    </div>
                </div>`;
    galleryDiv.innerHTML += HTML;
});

}

const modalWindow = document.createElement('div');
modalWindow.className = 'modal';
//function to generate modal html
generateModal = (user) => {
    let body = document.querySelector('body');
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal';
    let html = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}, ${user.location.state} </p>
                        <hr>
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${user.dob.date}, age ${user.dob.age}</p>
                    </div>
                </div>
                `;
    modalWindow.innerHTML = html;
    body.appendChild(modalWindow);
//adding event listener to the close button
const close = document.getElementById('modal-close-btn')
    close.addEventListener('click', (e) => {
        if (e.target.className === 'modal-close-btn' || e.target.textContent === 'X') {
            body.removeChild(modalWindow);
        }
    });
} 

//Event listener for the modal window
const profileCards = document.querySelector('#gallery');

profileCards.addEventListener('click', (e) => {
    const resultUsers = fetchData.results
    resultUsers.map(user => {
        if (`${user.name.first} ${user.name.last}` === e.target.id) {
            generateModal(user)
        }
    })
});


