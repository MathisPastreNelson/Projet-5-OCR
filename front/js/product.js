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

fetchCanap();


let productDisplay = "";
console.log(productDisplay);