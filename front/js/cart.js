let productCard = [];

let retrieveProductFromStorage = () => {
    //On compte le nombre de produit dans le localStorage
    const numberOfProduct = localStorage.length;
    for (let i = 0; i < numberOfProduct; i++) {
        const item = localStorage.getItem(localStorage.key(i));
        const itemObject = JSON.parse(item)
        productCard.push()
        console.log(itemObject)
    }
}

//Tentative d'Afficher les articles du localStorage à la page
let displayProduct = async () => {
    await retrieveProductFromStorage()
    const article = makeArticle(itemObject)
}

retrieveProductFromStorage()