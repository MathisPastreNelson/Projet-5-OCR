// Variable qui récupère les datas du localStorage
let productInBasket = [];
// Variable qui récupère les datas par fetch de l'API
let getProductByFetch = [];
// Variable qui regroupe l'ensemble des datas (localStorage + API)
let everyProductInfo = [];


// Fonction qui va chercher tout les produits du localStorage +  je traduis et je met dans productInBasket[]
let retrieveAllStorage = async () => {
    let keys = Object.keys(localStorage);
    //Tant qu'il y a des clés dans le localStorage
    for (let i = 0; i < keys.length; i++) {
        // je vérifie si le nom des clés situées dans le LocalStorage commence par un "K" majuscule
        if (keys[i][0] === "K") {
            let parseAllProduct = JSON.parse(localStorage.getItem(keys[i]))
            productInBasket.push(parseAllProduct)
            // je supprime les clés qui ne correspondent pas
        } else {
            console.log("Suppression de la clé non correspondante du localStorage")
            localStorage.removeItem(keys[i])
        }
    }
};

// Fonction Fetch dédiée au canapé de la page
let productFetch = async () => {
    await retrieveAllStorage()
    // Je contacte les produit de L'API qui sont dans le localStorage pour obtenir l'ensemble des datas
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
    // Utilisation de la méthode "MAP" pour  chercher tout les objects et les placer dans le HTML
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
    // console.table(productInBasket)
};


// Fonction pour changer les valeurs(quantité et prix) dynamiquement
let changeQuantityAndPrice = async () => {
    await calculQuantityAndPrice()
    for (let i = 0; i < quantityInput.length; i++) {
        // Au changement de la valeur de l'input
        quantityInput[i].addEventListener('change', function () {
            // Vérifie que c'est un nombre au dessus de 0
            if (quantityInput[i].value < 1 || NaN) {
                alert("Sélectionnez une quantité en chiffre et au dessus de 1")
            } else {
                // Réinjecte la valeur de quantity dans la variable panier
                productInBasket[i].quantity = parseInt(quantityInput[i].value)
                // Réinjecte la variable panier dans le localStorage
                localStorage.setItem(everyProductInfo[i].name + " " + everyProductInfo[i].color, JSON.stringify(productInBasket[i]))
                location.reload();
            }
        })
    }
};

// Fonction pour supprimer le produit du panier
let deleteProduct = async () => {
    await changeQuantityAndPrice()
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


// La variable qui va récupérer  les données de l'utilisateur
let contact = {};
// La variable qui va récupérer la commande ID
let products = [];
// Regex 
const regexForName = /^[a-zA-ZÀ-ú\-\s]{3,20}$/;
const regexForAddress = /^([a-zA-ZÀ-ÿ,-. ]{1,}|[0-9]{1,4})[ ].{1,}$/;
const regexForEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// Fonction de vérification du formulaire via des Regex
let verifyFormular = async () => {
    await deleteProduct()
    // Prénom
    const firstName = document.querySelector('#firstName')
    const firstNameError = document.querySelector('#firstNameErrorMsg')
    // On vérifie à chaque input que les entrées de l'utilisateur correspondent aux regex
    firstName.addEventListener('input', function () {
        if (firstName.value.match(regexForName)) {
            // On applique rien dans la balise firstNameError si l'input est correct
            firstNameError.innerHTML = ""
        } else {
            firstNameError.innerHTML = "Veuillez entrer un prénom valide"
        }
    })
    // Nom
    const lastName = document.querySelector('#lastName')
    const lastNameError = document.querySelector('#lastNameErrorMsg')
    lastName.addEventListener('input', function () {
        if (lastName.value.match(regexForName)) {
            lastNameError.innerHTML = ""
        } else {
            lastNameError.innerHTML = "Veuillez entrer un nom valide"
        }
    })
    // Adresse
    const address = document.querySelector('#address')
    const addressError = document.querySelector('#addressErrorMsg')
    address.addEventListener('input', function () {
        if (address.value.match(regexForAddress)) {
            addressError.innerHTML = ""
        } else {
            addressError.innerHTML = "Veuillez entrer une adresse valide"
        }
    })
    // Ville
    const city = document.querySelector('#city')
    const cityError = document.querySelector('#cityErrorMsg')
    city.addEventListener('input', function () {
        if (city.value.match(regexForName)) {
            cityError.innerHTML = ""
        } else {
            cityError.innerHTML = "Veuillez entrer une ville valide"
        }
    })
    // Email
    const email = document.querySelector('#email')
    const emailError = document.querySelector('#emailErrorMsg')
    email.addEventListener('input', function () {
        if (email.value.match(regexForEmail)) {
            emailError.innerHTML = ""
        } else {
            emailError.innerHTML = "Veuillez entrer une adresse e-mail valide"
        }
    })
}

// On vise le bouton COMMANDER
const commandButton = document.querySelector('#order')
//Fonction POST dans l'api SI les conditions sont réunis 
let commandAction = async () => {
    await verifyFormular()
    commandButton.addEventListener('click', function (e) {
        e.preventDefault()
        // On prend l'ID de chaque produits du panier 
        for (let i = 0; i < everyProductInfo.length; i++) {
            products[i] = everyProductInfo[i].id;
        } // Tout les inputs doivent correspondre aux regex
        if (firstName.value.match(regexForName)
            && lastName.value.match(regexForName)
            && address.value.match(regexForAddress)
            && city.value.match(regexForName)
            && email.value.match(regexForEmail)
            // Tout les inputs doivent être remplis 
            && firstName.value.length > 0
            && lastName.value.length > 0
            && address.value.length > 0
            && city.value.length > 0
            && email.value.length > 0
            // Il faut également qu'il y ai des produits dans le panier
            && products.length > 0) {
            // Si valide : applique les valeurs des inputs dans l'objet contact
            contact.firstName = firstName.value
            contact.lastName = lastName.value
            contact.address = address.value
            contact.city = city.value
            contact.email = email.value

            // La variable du fetchPost
            let sendOrder = { products, contact }
            console.table(sendOrder)
            console.log(sendOrder.products)
            console.log(sendOrder.contact)

            //Je vais pouvoir FETCH POST ICI je crois 

        } else {
            alert("Tout les champs du formulaire doivent être valides, un produit au minimum est nécessaire dans le panier.")
        }
    })
}

commandAction()
//Apprendre  la méthode post ET FINI
//Je vais poster les données utilisateur dans l'API à la validation du formulaire

//Voici le modèle du POST
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

