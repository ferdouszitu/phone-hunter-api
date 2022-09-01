const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // display 10 only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');

    }

    // display no phones
    const noPhone = document.getElementById('no-found-msg');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
                            <div class="card p-4">
                            <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}<h5>
                         with supporting text below as a natural
                             lead-in to additional content. This content is a little bit longer.</p>
                             <button onclick="loadPhoneDetails('${phone.slug}')"  href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                            </div>
                        </div>
        `
        phonesContainer.appendChild(phoneDiv);
    })
    // stop spinner or loader
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // start spinner or loader
    processSearch(10)
})

//search input field button handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10)
        // code for enter
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})
const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}
const displayPhoneDetail = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date '} </p>
    <p>MainFeatures : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No information found'}, ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No information found '} </p>
    <p>Others: ${phone.others ? phone.others.WLAN : 'No information found  '} </p>
    
`

}

loadPhone('apple');