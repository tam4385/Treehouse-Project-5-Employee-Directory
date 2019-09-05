
//variable to contain the data from the fetch
let fetchData;
let modalNext;

//===============building the search form html==================
//creating the form
const searchContainer = document.querySelector('.search-container');
const form = document.createElement('form');
//adding attributes to the form
form.action = "#";
form.method = "get"
//create elements inside the form
const searchInput = document.createElement('input');
//creating attributes of input
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


//================Fetching the api data=================================
fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    // .then(data => console.log(data.results))
    .then(data => fetchData = data)
    .then(data => generateGallery(data.results))
    .catch(err => console.log(err))
                         
//=============helper functions==============================

//--------------gallery div generation
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

//-------------function to generate modal html----------------------
const modalWindow = document.createElement('div');
modalWindow.className = 'modal';

generateModal = (user) => {
    let body = document.querySelector('body');
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal';
    let html = `<div class="modal-container" id="${user.name.first} ${user.name.last}">
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
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
                `
                ;
    modalWindow.innerHTML = html;
    body.appendChild(modalWindow);


//===================Event Listeners=========================

//--------------Event listener- Modal Close Butto----------------
const close = document.getElementById('modal-close-btn')
    close.addEventListener('click', (e) => {
        if (e.target.className === 'modal-close-btn' || e.target.textContent === 'X') {
            body.removeChild(modalWindow);
        }
    });
} 

//--------------Event Listener to create modal---------------
const profileCards = document.querySelector('#gallery');
profileCards.addEventListener('click', (e) => {
    const resultUsers = fetchData.results
    resultUsers.map(user => {
        if (`${user.name.first} ${user.name.last}` === e.target.id) {
            generateModal(user)
        }
    })
});

//----------------search bar functionality--------------------
searchInput.addEventListener('keyup', () => {
    const cards = document.querySelectorAll('.card')
    let input = searchInput.value.toLocaleLowerCase();
        cards.forEach(card => {
             if (input === card.id) {
                 card.style.display = 'block'
             } else {
                 card.style.display = 'none';
             }
            
        });
});

//---------------Modal next button---------------------------
modalNext = document.querySelector('#modal-next') 
let body = document.querySelector('body');
body.addEventListener('click', (e) => {
    modalNext = document.querySelector('#modal-next')
    if (e.target === modalNext) {
        let currentModal = document.querySelector('.modal-container');
        let galleryCards = document.querySelectorAll('.card'); 
        //find current gallery card
        galleryCards.forEach(card => {
            if (card.id === currentModal.id) {
    //find next gallery card        
            let nextCard = card.nextElementSibling;
            fetchData.results.forEach(result => {
                if(nextCard.id === `${result.name.first} ${result.name.last}`) {
                      let nextProfileData = result;
                      let modalParent = currentModal.parentElement;
                      let modalDiv = document.querySelector('modal'); 
                      body.removeChild(modalParent)
                      generateModal(nextProfileData);
                }
            });
        }
    });
}
});
//---------------Modal Previous button----------------------------
body.addEventListener('click', (e) => {
    modalPrev = document.querySelector('#modal-prev')
    if (e.target === modalPrev) {
        let currentModal = document.querySelector('.modal-container');
        let galleryCards = document.querySelectorAll('.card'); 
        //find current gallery card
        galleryCards.forEach(card => {
            if (card.id === currentModal.id) {
    //find prev gallery card        
            let prevCard = card.previousElementSibling;
            fetchData.results.forEach(result => {
                if(prevCard.id === `${result.name.first} ${result.name.last}`) {
                      let prevProfileData = result;
                      let modalParent = currentModal.parentElement;
                      modalParent.removeChild(currentModal);
                      let modalDiv = document.querySelector('.modal')
                      body.removeChild(modalDiv)
                      generateModal(prevProfileData);
                }
            });
        }
    });
}
});
