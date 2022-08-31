//Variable qui récupère les données de l'API
let canapeData = [];

//Fonction de Récupération de l'API grâce a la méthode "FETCH"
let fetchCanap = async () => {
    await fetch("http://localhost:3000/api/products")
        // La réponse convertie en .Json
        .then((res) => res.json())
        // Ajout de la fonction dans canapeData[]
        .then((res) => canapeData = res)
};

//Fonction d'affichage des canapés
let canapDisplay = async () => {
    await fetchCanap();
    // Utilisation de la méthode "MAP" pour aller chercher tous les objects et les placer dans l'ID
    document.getElementById("items").innerHTML = canapeData.map((canapeData) =>
        `
    <a href = ./product.html?id=${canapeData._id}>
    <article>
    <img src=${canapeData.imageUrl} alt=${canapeData.altTxt}>
    <h3 class="productName">${canapeData.name}</h3>
    <p class="productDescription">${canapeData.description}</p>
    </article>
    </a >
    `
    ).join("") //retire les ',' entre les cards
    console.table(canapeData)
};

canapDisplay();


