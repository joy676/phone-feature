const loadPhone =async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = ''
    // display only 9 phones
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    // display no phones found
    const noPhoneFound = document.getElementById('no-found-msg')
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none')
    }
    else{
        noPhoneFound.classList.add('d-none')
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top img-fluid p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneDiv)
    });
    // stop loader
    toggleSpinner(false)
}
// common function
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    // searchField.value = ''
    loadPhone(searchText, dataLimit)
}
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10)
})
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10)
    }
})
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// not the best way to way show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}
const displayPhoneDetails = (phone) => {
    const phoneTitle = document.getElementById('phoneDetailModalLabel');
    phoneTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Info Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Info Found'}</p>
    `
}
loadPhone('apple')