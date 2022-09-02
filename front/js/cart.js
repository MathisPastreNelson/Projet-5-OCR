let getProduct = [];
let getProductByFetch = [];
let everyProductInfo = [];


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
    //Je contacte les produit de L'API qui sont dans le localStorage pour obtenir l'enssemble des datas
    getProductByFetch = await Promise.all(getProduct.map(getProduct =>
        fetch(`http://localhost:3000/api/products/${getProduct.id}`)
            .then(res => res.json())))
};

//Fonction qui regroupe les données situées dans l'API relatif aux produits du panier
let getEveryProductInfo = async () => {
    await productFetch()
    for (let i = 0; i < getProduct.length; i++) {
        everyProductInfo.push({
            ...getProduct[i],
            ...getProductByFetch[i]
        });
    }
}

let displayProduct = async () => {
    await getEveryProductInfo()
    // Utilisation de la méthode "MAP" pour  chercher tout les objects et les placer dans l'ID
    document.getElementById("cart__items").innerHTML = everyProductInfo.map((everyProductInfo) =>
        `
    <article class="cart__item" data-id="${everyProductInfo.id}" data-color="${everyProductInfo.color}">
    <div class="cart__item__img">
    <img src="${everyProductInfo.imageUrl}" alt="${everyProductInfo.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${everyProductInfo.name}</h2>
    <p>${everyProductInfo.color}</p>
    <p>${everyProductInfo.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : ${everyProductInfo.quantity}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${everyProductInfo.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `).join("") //retire les ',' entre les cards
};


//fonction de calcul et d'affichage des quantités + prix
let calculQuantityAndPrice = async () => {
    await displayProduct()
    // on cible la class "itemQuantity"
    let quantityInInput = document.getElementsByClassName('itemQuantity')
    // variable accueillant la quantité de produit total
    let totalQuantity = 0;
    // boucle for pour obtenir la quantité total de produit et l'appliquer dans la variable
    for (let i = 0; i < quantityInInput.length; i++) {
        totalQuantity += quantityInInput[i].valueAsNumber
    }
    // affichage de la quantité de produit total
    let quantityInHtml = document.getElementById('totalQuantity')
    quantityInHtml.innerHTML = totalQuantity
    // boucle for pour le calcul du prix total de tous les produits
    let totalPrice = 0;
    for (let i = 0; i < quantityInInput.length; i++) {
        totalPrice += (quantityInInput[i].valueAsNumber * everyProductInfo[i].price)
    }
    // affichage du prix total de tous les produits
    let totalPriceInHtml = document.getElementById('totalPrice')
    totalPriceInHtml.innerHTML = totalPrice
    // console.log(totalPrice)
    // console.log(totalQuantity)
};



calculQuantityAndPrice()
