<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dog Explorer Professional</title>
    <link href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6c5ce7;
            --secondary: #a29bfe;
            --accent: #fd79a8;
            --text: #2d3436;
            --bg: #f9f9f9;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            display: flex;
            justify-content: center;
            padding: 20px;
            margin: 0;
        }

        .main-container {
            background: white;
            max-width: 600px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
            border: 1px solid #eee;
        }

        .dog-image-wrapper {
            width: 100%;
            height: 400px;
            background: #dfe6e9;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        #dog-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 0.3s;
        }

        .content-padding {
            padding: 25px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #fffafa;
            border-radius: 10px;
            overflow: hidden;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        th {
            background-color: var(--secondary);
            color: white;
            font-weight: 600;
        }

        .description-box {
            background: #f1f2f6;
            padding: 15px;
            border-left: 5px solid var(--primary);
            border-radius: 5px;
            margin-bottom: 25px;
            font-style: italic;
            line-height: 1.6;
        }

        .actions {
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        .btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
            font-size: 14px;
        }

        .btn:hover {
            background: var(--accent);
            transform: translateY(-2px);
        }

        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            position: absolute;
        }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>

    <div class="main-container">
        <div class="dog-image-wrapper">
            <div id="loader" class="loader"></div>
            <img id="dog-img" src="" alt="Cățeluș" style="opacity: 0;">
        </div>

        <div class="content-padding">
            <table>
                <thead>
                    <tr>
                        <th>Specificație</th>
                        <th>Detalii</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rasa</td>
                        <td id="breed-name" style="text-transform: capitalize;">---</td>
                    </tr>
                    <tr>
                        <td>Cost Mediu</td>
                        <td id="avg-cost">---</td>
                    </tr>
                </tbody>
            </table>

            <div class="description-box" id="description">
                Apasă butonul de mai jos pentru a descoperi detalii despre acest cățeluș adorabil.
            </div>

            <div class="actions">
                <button class="btn" onclick="fetchDogData()">Mai multe imagini</button>
            </div>
        </div>
    </div>

    <script>
        async function fetchDogData() {
            const imgElement = document.getElementById('dog-img');
            const loader = document.getElementById('loader');
            const breedDisplay = document.getElementById('breed-name');
            const costDisplay = document.getElementById('avg-cost');
            const descDisplay = document.getElementById('description');

            // Reset UI
            imgElement.style.opacity = '0';
            loader.style.display = 'block';

            console.log("--- START FETCH ---");

            try {
                console.log("Se accesează Dog CEO API...");
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                
                const data = await response.json();
                console.log("Date primite:", data);

                // Extragerea rasei din URL-ul imaginii
                const urlParts = data.message.split('/');
                const breedRaw = urlParts[urlParts.length - 2];
                const breedClean = breedRaw.replace('-', ' ');

                // Generare date simulate (deoarece API-ul nu oferă preț/descriere)
                const fakeCost = Math.floor(Math.random() * (2500 - 500) + 500) + " EUR";
                const descriptions = [
                    "Un companion loial, cunoscut pentru energia sa debordantă și inteligența nativă.",
                    "Această rasă este extrem de iubitoare cu copiii și se adaptează ușor la viața de apartament.",
                    "Un câine protector, curajos și gata oricând pentru o sesiune lungă de joacă în parc.",
                    "Apreciat pentru eleganța sa, acest patruped necesită atenție constantă și multă afecțiune."
                ];
                const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

                // Actualizare UI
                imgElement.src = data.message;
                imgElement.onload = () => {
                    imgElement.style.opacity = '1';
                    loader.style.display = 'none';
                    console.log("Imagine încărcată cu succes.");
                };

                breedDisplay.innerText = breedClean;
                costDisplay.innerText = fakeCost;
                descDisplay.innerText = randomDesc;

            } catch (error) {
                console.error("EROARE PROCES:", error);
                alert("Eroare la încărcare: " + error.message);
                loader.style.display = 'none';
            }
        }

        // Inițializare la prima încărcare
        window.onload = fetchDogData;
    </script>
</body>
</html>