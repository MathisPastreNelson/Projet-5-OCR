// A lancer dans le terminal pour lancer le serveur back
// cd back
// node server

const reponse = fetch("http://localhost:3000/api/products")
    // quand tu as la réponse donne le résultat en json
    .then(reponse => reponse.json())
    // log du résultat dans la console
    .then(reponse => console.table(reponse));

//On vise l'ID dans le DOM
document.getElementById("items")


