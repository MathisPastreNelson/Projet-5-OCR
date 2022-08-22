let canapeData = [];

//Fonction Récupération des datas du back grâce a la méthode "FETCH"
async function fetchCanap() {
    await fetch("http://localhost:3000/api/products")
        // quand tu as la réponse donne le résultat en json
        .then((response) => response.json())
        // log du résultat dans la console et ajout de la fonction dans canapeData[]
        .then((promise) => {
            canapeData = promise
            console.table(canapeData);
        })
        // Si problème
        .catch(error => console.log("Erreur de la base de donnée"))
};


// Fonction pour mettre les cards dans la DIV html
async function canapDisplay() {
    await fetchCanap();
    // Injection du HTML
    // Utilisation de la méthode "MAP" pour aller chercher tous les objects
    document.getElementById("items").innerHTML = canapeData.map((canapeData) =>
        `
        <a href = ${canapeData._id}>
        <article>
        <img src=${canapeData.imageUrl} alt=${canapeData.altTxt}>
            <h3 class="productName">${canapeData.name}</h3>
            <p class="productDescription">${canapeData.description}</p>
    </article>
    </a >
    `
    )
}

fetchCanap()
canapDisplay()