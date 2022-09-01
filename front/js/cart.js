let getProduct = [];
let getProductByFetch = [];


//Fonction qui va chercher tout les produits du localStorage
let retrieveAllStorage = async () => {
    let keys = Object.keys(localStorage);
    let i = keys.length;
    //Tant qu'il y a des clés dans le localStorage je traduis et je met dans getProduct[]
    while (i--) {
        let parseAllProduct = JSON.parse(localStorage.getItem(keys[i]))
        getProduct.push(parseAllProduct)
    }
};

//Fonction fectch dédiée au canapé de la page
let productFetch = async () => {
    await retrieveAllStorage()
    //il faut que j'arrive à contacter l'api de chaques produits du panier
    Promise.all(getProduct.map(getProduct =>
        fetch(`http://localhost:3000/api/products/${getProduct.id}`)
            .then(res => res.json())))

        .then(console.log)
    //J'en SUIS LA je n'arrive pas a récupérer la réponse dans getProductByFetch
    console.log(getProductByFetch)

};

let displayProduct = async () => {
    await productFetch()
    console.log(getProduct)
    // Utilisation de la méthode "MAP" pour  chercher tout les objects et les placer dans l'ID
    document.getElementById("cart__items").innerHTML = getProduct.map((getProduct) =>
        `
    <article class="cart__item" data-id="${getProduct.id}" data-color="${getProduct.color}">
    <div class="cart__item__img">
    <img src="." alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>${getProduct.color}</p>
    <p>42,00 €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : ${getProduct.quantity}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${getProduct.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `
    ).join("") //retire les ',' entre les cards
};

displayProduct()
//console.table(getProduct)