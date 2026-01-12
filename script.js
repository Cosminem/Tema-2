// Referințe către elementele din interfață (asigură-te că ID-urile coincid cu index.html)
const dogImg = document.getElementById('dog-img');
const loader = document.getElementById('loader');
const breedDisplay = document.getElementById('breed-name');
const costDisplay = document.getElementById('avg-cost');
const descDisplay = document.getElementById('description');
const historyList = document.getElementById('history-list');
const favoritesContainer = document.getElementById('favorites-container');

/**
 * 1. FUNCȚIA PRINCIPALĂ: Preia datele de la API-ul Dog CEO
 */
async function fetchDogData() {
    // Pregătim UI-ul pentru încărcare
    if (dogImg) dogImg.style.opacity = '0';
    if (loader) loader.style.display = 'block';

    try {
        // Apelăm API-ul (cel care îți dădea codul JSON în browser)
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error("Eroare de conexiune la API.");
        
        const data = await response.json();
        const imageUrl = data.message; // Acesta este link-ul către poza propriu-zisă

        /** * PROCESARE RASA: 
         * Link-ul arată așa: .../breeds/kuvasz/imagine.jpg
         * Noi tăiem URL-ul și luăm penultima parte (rasa).
         */
        const urlParts = imageUrl.split('/');
        const breedRaw = urlParts[urlParts.length - 2];
        const breedName = breedRaw.replace('-', ' ');

        // Actualizăm Imaginea
        dogImg.src = imageUrl;
        dogImg.onload = () => {
            dogImg.style.opacity = '1';
            if (loader) loader.style.display = 'none';
        };

        // Generăm date simulate pentru aspectul "profesional"
        const randomCost = Math.floor(Math.random() * (1200 - 300) + 300) + " EUR";
        const descriptions = [
            `Rasa ${breedName} este extrem de loială și iubitoare.`,
            `Un exemplar superb din rasa ${breedName}, gata de aventură!`,
            `Inteligența rasei ${breedName} o face ușor de dresat și un companion excelent.`
        ];
        const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

        // Populăm tabelul și descrierea
        if (breedDisplay) breedDisplay.innerText = breedName;
        if (costDisplay) costDisplay.innerText = randomCost;
        if (descDisplay) descDisplay.innerText = randomDesc;

        // Adăugăm rasa în istoricul sesiunii
        updateHistory(breedName);

    } catch (error) {
        console.error("A apărut o eroare:", error);
        if (loader) loader.style.display = 'none';
        alert("Nu s-au putut încărca datele. Verifică conexiunea!");
    }
}

/**
 * 2. SISTEM FAVORITE: Salvează permanent în browser (localStorage)
 */
function addToFavorites() {
    if (!dogImg.src || dogImg.src.includes('undefined')) return;
    
    let favs = JSON.parse(localStorage.getItem('dogFavs')) || [];
    
    if (!favs.includes(dogImg.src)) {
        favs.unshift(dogImg.src); // Punem cea mai nouă poză prima
        if (favs.length > 8) favs.pop(); // Păstrăm doar ultimele 8
        localStorage.setItem('dogFavs', JSON.stringify(favs));
        renderFavorites();
    } else {
        alert("Ai salvat deja acest cățeluș! ❤️");
    }
}

function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('dogFavs')) || [];
    if (favoritesContainer) {
        favoritesContainer.innerHTML = favs
            .map(url => `<img src="${url}" class="fav-thumb" onclick="window.open('${url}')" title="Click pentru mărire">`)
            .join('');
    }
}

/**
 * 3. SISTEM DOWNLOAD: Transformă imaginea în fișier descărcabil
 */
async function downloadImage() {
    if (!dogImg.src) return;
    try {
        const res = await fetch(dogImg.src);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dog-explorer-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (e) {
        alert("Imaginea nu poate fi descărcată din motive de securitate ale browserului.");
    }
}

/**
 * 4. SISTEM ISTORIC: Reține rasele văzute în tab-ul curent (sessionStorage)
 */
function updateHistory(name) {
    let history = JSON.parse(sessionStorage.getItem('dogHistory')) || [];
    if (!history.includes(name)) {
        history.unshift(name);
        if (history.length > 5) history.pop();
        sessionStorage.setItem('dogHistory', JSON.stringify(history));
    }
    if (historyList) {
        historyList.innerHTML = history.map(h => `<span class="tag">#${h}</span>`).join(' ');
    }
}

// LEGĂTURI BUTOANE (Event Listeners)
document.addEventListener('DOMContentLoaded', () => {
    // Buton Cățel Nou
    const btnNew = document.getElementById('fetch-btn');
    if (btnNew) btnNew.addEventListener('click', fetchDogData);

    // Buton Favorite
    const btnFav = document.getElementById('fav-btn');
    if (btnFav) btnFav.addEventListener('click', addToFavorites);

    // Buton Download
    const btnDown = document.getElementById('download-btn');
    if (btnDown) btnDown.addEventListener('click', downloadImage);

    // Pornire automată la prima încărcare
    fetchDogData();
    renderFavorites();
});