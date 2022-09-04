// variable qui récupère les datas du localStorage
let productInBasket = [];
// variable qui récupère les datas par fetch de l'API
let getProductByFetch = [];
// variable qui regroupe les datas totaux (localStorage + API)
let everyProductInfo = [];



//Fonction qui va chercher tout les produits du localStorage +  je traduis et je met dans productInBasket[]
let retrieveAllStorage = async () => {
    let keys = Object.keys(localStorage);
    //Tant qu'il y a des clés dans le localStorage
    for (let i = 0; i < keys.length; i++) {
        // je vérifie si le nom des clés situées dans le LocalStorage correspondent au panier
        if (keys[i][0] === "K") {
            let parseAllProduct = JSON.parse(localStorage.getItem(keys[i]))
            productInBasket.push(parseAllProduct)
            // je supprime les clés qui ne correspondent pas
        } else {
            console.log("erreur")
            localStorage.removeItem(keys[i])
        }
    }
};

//Fonction fectch dédiée au canapé de la page
let productFetch = async () => {
    await retrieveAllStorage()
    //Je contacte les produit de L'API qui sont dans le localStorage pour obtenir l'enssemble des datas
    getProductByFetch = await Promise.all(productInBasket.map(productInBasket =>
        fetch(`http://localhost:3000/api/products/${productInBasket.id}`)
            .then(res => res.json())))
};

//Fonction qui regroupe les datas situées dans l'API relatif aux produits du panier
let getEveryProductInfo = async () => {
    await productFetch()

    for (let i = 0; i < productInBasket.length; i++) {
        everyProductInfo.push({
            ...productInBasket[i],
            ...getProductByFetch[i]
        })
    }
};

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
    <p>${everyProductInfo.price * everyProductInfo.quantity} €</p>
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

// variable utilisée dans les prochaines fonctions cible la class "itemQuantity"
let quantityInput = document.getElementsByClassName('itemQuantity')

// fonction de calcul et d'affichage des quantités + prix
let calculQuantityAndPrice = async () => {
    await displayProduct()
    // variable accueillant la quantité total de produit 
    let totalQuantity = 0;
    // boucle for pour obtenir la quantité total de produit et l'appliquer dans la variable
    for (let i = 0; i < quantityInput.length; i++) {
        totalQuantity += quantityInput[i].valueAsNumber
    }
    // affichage de la quantité de produit total
    let quantityInHtml = document.getElementById('totalQuantity')
    quantityInHtml.innerHTML = totalQuantity
    // boucle for pour le calcul du prix total de tous les produits
    let totalPrice = 0;
    for (let i = 0; i < quantityInput.length; i++) {
        totalPrice += (quantityInput[i].value * everyProductInfo[i].price)
    }
    // affichage du prix total de tous les produits
    let totalPriceInHtml = document.getElementById('totalPrice')
    totalPriceInHtml.innerHTML = totalPrice
    console.table(productInBasket)

};


// fonction pour changer les valeurs(quantité et prix) dynamiquement
let changeQuantityandPrice = async () => {
    await calculQuantityAndPrice()
    for (let i = 0; i < quantityInput.length; i++) {
        // au changement de la valeur de l'input
        quantityInput[i].addEventListener('change', function () {
            // vérifie que c'est un nombre au dessus de 0
            if (quantityInput[i].value < 1 || NaN) {
                alert("Selectionnez une quantité en chiffre et au dessus de 1")
            } else {
                // injection dans le localStorage
                productInBasket[i].quantity = parseInt(quantityInput[i].value)
                // reinjecte dans le localStorage
                localStorage.setItem(everyProductInfo[i].name + " " + everyProductInfo[i].color, JSON.stringify(productInBasket[i]))
                location.reload();
            }
        })
    }
};

// fonction pour supprimer le produit du panier
let deleteProduct = async () => {
    await changeQuantityandPrice()
    // vise le button supprimer
    let deleteProductInHtml = document.getElementsByClassName('deleteItem')
    for (let i = 0; i < deleteProductInHtml.length; i++) {
        deleteProductInHtml[i].addEventListener('click', function () {
            // supprime le produit du localStorage
            localStorage.removeItem(everyProductInfo[i].name + " " + everyProductInfo[i].color)
            location.reload();
            // console.log(deleteProductInHtml[i])
        })
    }
};

deleteProduct()

