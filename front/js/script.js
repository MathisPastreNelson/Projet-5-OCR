// Variable qui récupère les données de l'API
let canapeData = [];

// Fonction de Récupération de l'API grâce a la méthode "FETCH"
let fetchCanap = async () => {
    await fetch("https://mathispastrenelson.github.io/Projet-5-OCR:3000/api/products")
        // La réponse converti en .Json
        .then((res) => res.json())
        // Ajout de la fonction dans canapeData[]
        .then((res) => canapeData = res)
    console.table(canapeData)
};

// Fonction d'affichage des canapés
let canapDisplay = async () => {
    await fetchCanap();
    // Utilisation de la méthode "MAP" pour chercher tous les objects et les placer dans l'ID
    document.querySelector("#items").innerHTML = canapeData.map((canapeData) =>
        `
    <a href = ./product.html?id=${canapeData._id}>
    <article>
    <img src=${canapeData.imageUrl} alt=${canapeData.altTxt}>
    <h3 class="productName">${canapeData.name}</h3>
    <p class="productDescription">${canapeData.description}</p>
    </article>
    </a >
    `
    ).join("") // Retire les ',' entre les cards
};

canapDisplay();


