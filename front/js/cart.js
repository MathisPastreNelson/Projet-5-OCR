// Variable qui récupère les datas du localStorage
let productInBasket = [];
// Variable qui récupère les datas par fetch de l'API
let getProductByFetch = [];
// Variable qui regroupe l'enssemble des datas (localStorage + API)
let everyProductInfo = [];


// Fonction qui va chercher tout les produits du localStorage +  je traduis et je met dans productInBasket[]
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

// Fonction fectch dédiée au canapé de la page
let productFetch = async () => {
    await retrieveAllStorage()
    // Je contacte les produit de L'API qui sont dans le localStorage pour obtenir l'enssemble des datas
    getProductByFetch = await Promise.all(productInBasket.map(productInBasket =>
        fetch(`http://localhost:3000/api/products/${productInBasket.id}`)
            .then(res => res.json())))
};

// Fonction qui regroupe les datas situées dans l'API relatif aux produits du panier
let getEveryProductInfo = async () => {
    await productFetch()

    for (let i = 0; i < productInBasket.length; i++) {
        everyProductInfo.push({
            ...productInBasket[i],
            ...getProductByFetch[i]
        })
    }
};

// Fonction d'affichage des produits
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
    `).join("") // Retire les ',' entre les cards
};

// Variable utilisée dans les prochaines fonctions cible la class "itemQuantity"
let quantityInput = document.getElementsByClassName('itemQuantity')

// Fonction de calcul et d'affichage des quantités + prix
let calculQuantityAndPrice = async () => {
    await displayProduct()
    // Variable accueillant la quantité total de produit
    let totalQuantity = 0;
    // Variable accueillant le prix total de produit
    let totalPrice = 0;
    // Boucle for pour obtenir la quantité total + prix total et l'appliquer dans les variables
    for (let i = 0; i < quantityInput.length; i++) {
        totalQuantity += quantityInput[i].valueAsNumber
        totalPrice += (quantityInput[i].value * everyProductInfo[i].price)
    }
    // Affichage de la quantité de produit total
    let totalQuantityInHtml = document.getElementById('totalQuantity')
    totalQuantityInHtml.innerHTML = totalQuantity
    // Affichage du prix total de tous les produits
    let totalPriceInHtml = document.getElementById('totalPrice')
    totalPriceInHtml.innerHTML = totalPrice
    console.table(productInBasket)
};


// Fonction pour changer les valeurs(quantité et prix) dynamiquement
let changeQuantityandPrice = async () => {
    await calculQuantityAndPrice()
    for (let i = 0; i < quantityInput.length; i++) {
        // Au changement de la valeur de l'input
        quantityInput[i].addEventListener('change', function () {
            // Vérifie que c'est un nombre au dessus de 0
            if (quantityInput[i].value < 1 || NaN) {
                alert("Selectionnez une quantité en chiffre et au dessus de 1")
            } else {
                // Reinjecte la valeur de quantity dans la variable panier
                productInBasket[i].quantity = parseInt(quantityInput[i].value)
                // Reinjecte la variable panier dans le localStorage
                localStorage.setItem(everyProductInfo[i].name + " " + everyProductInfo[i].color, JSON.stringify(productInBasket[i]))
                location.reload();
            }
        })
    }
};

// Fonction pour supprimer le produit du panier
let deleteProduct = async () => {
    await changeQuantityandPrice()
    // Vise le button supprimer
    let deleteProductInHtml = document.getElementsByClassName('deleteItem')
    for (let i = 0; i < deleteProductInHtml.length; i++) {
        deleteProductInHtml[i].addEventListener('click', function () {
            // Supprime le produit du localStorage
            localStorage.removeItem(everyProductInfo[i].name + " " + everyProductInfo[i].color)
            location.reload();
            // console.log(deleteProductInHtml[i])
        })
    }
};

let verifyFormular = async () => {
    await deleteProduct()
    // Prénom
    let firstName = document.querySelector('#firstName')
    let firstNameError = document.querySelector('#firstNameErrorMsg')
    // Nom
    let lastName = document.querySelector('#lastName')
    let lastNameError = document.querySelector('#lastNameErrorMsg')
    // Adresse
    let address = document.querySelector('#address')
    let addressError = document.querySelector('#addressErrorMsg')
    // Ville
    let city = document.querySelector('#city')
    let cityError = document.querySelector('#cityErrorMsg')
    // Email
    let email = document.querySelector('#email')
    let emailError = document.querySelector('#emailErrorMsg')
}

verifyFormular()

