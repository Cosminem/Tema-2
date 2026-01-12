// Constante și Referințe
const dogImg = document.getElementById('dog-img');
const loader = document.getElementById('loader');
const breedDisplay = document.getElementById('breed-name');
const costDisplay = document.getElementById('avg-cost');
const descDisplay = document.getElementById('description');
const historyList = document.getElementById('history-list');
const favoritesContainer = document.getElementById('favorites-container');

// 1. Funcția Principală - Fetch
async function fetchDogData() {
    // Reset UI
    dogImg.style.opacity = '0';
    loader.style.display = 'block';

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error("Eroare la conectarea cu API-ul.");
        
        const data = await response.json();
        const imageUrl = data.message;

        // Extragere Rasă din URL
        const urlParts = imageUrl.split('/');
        const breedRaw = urlParts[urlParts.length - 2];
        const breedName = breedRaw.replace('-', ' ');

        // Actualizare Imagine
        dogImg.src = imageUrl;
        dogImg.onload = () => {
            dogImg.style.opacity = '1';
            loader.style.display = 'none';
        };

        // Generare Date Simulare
        const randomCost = Math.floor(Math.random() * (1500 - 400) + 400) + " EUR";
        const descriptions = [
            `Rasa ${breedName} este recunoscută pentru loialitatea sa incredibilă.`,
            `Dacă cauți un prieten inteligent și jucăuș, un ${breedName} este alegerea perfectă.`,
            `Această rasă se adaptează excelent la viața de familie și iubește plimbările lungi.`
        ];
        const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

        // Afișare în UI
        breedDisplay.innerText = breedName;
        costDisplay.innerText = randomCost;
        descDisplay.innerText = randomDesc;

        // Actualizare Istoric Sesiune
        addToHistory(breedName);

    } catch (error) {
        console.error("Eroare:", error);
        alert("Ups! Nu am putut descărca datele.");
        loader.style.display = 'none';
    }
}

// 2. Sistem Favorite (localStorage - Rămân salvate după Refresh)
function addToFavorites() {
    if (!dogImg.src) return;
    
    let favs = JSON.parse(localStorage.getItem('dogFavs')) || [];
    if (!favs.includes(dogImg.src)) {
        favs.unshift(dogImg.src); // Adaugă la început
        if (favs.length > 10) favs.pop(); // Limităm la 10 favorite
        localStorage.setItem('dogFavs', JSON.stringify(favs));
        renderFavorites();
    } else {
        alert("Această imagine este deja la favorite!");
    }
}

function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('dogFavs')) || [];
    favoritesContainer.innerHTML = favs
        .map(url => `<img src="${url}" class="fav-thumb" title="Click pentru a vedea" onclick="window.open('${url}')">`)
        .join('');
}

// 3. Sistem Download (Blob)
async function downloadImage() {
    try {
        const response = await fetch(dogImg.src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dog-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (e) {
        alert("Descărcarea a eșuat.");
    }
}

// 4. Sistem Istoric (sessionStorage - Se șterge când închizi tab-ul)
function addToHistory(name) {
    let history = JSON.parse(sessionStorage.getItem('dogHistory')) || [];
    if (!history.includes(name)) {
        history.unshift(name);
        if (history.length > 5) history.pop();
        sessionStorage.setItem('dogHistory', JSON.stringify(history));
    }
    historyList.innerHTML = history.map(item => `<span>#${item}</span>`).join(' ');
}

// Event Listeners
document.getElementById('fetch-btn').addEventListener('click', fetchDogData);
document.getElementById('fav-btn').addEventListener('click', addToFavorites);
document.getElementById('download-btn').addEventListener('click', downloadImage);

// Inițializare la pornire
window.onload = () => {
    fetchDogData();
    renderFavorites();
};