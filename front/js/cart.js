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
    `).join("") //retire les ',' entre les car
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
    // console.log(totalPrice)
    // console.log(everyProductInfo)

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
                everyProductInfo[i].quantity = parseInt(quantityInput[i].value)
                localStorage.setItem(everyProductInfo[i].name + " " + everyProductInfo[i].color, JSON.stringify(everyProductInfo[i]))
                location.reload();
                // console.log(listOfInput[i].value)
                // console.log(everyProductInfo[i])
                //      console.log(divQuantity[i]);
                //  console.log(everyProductInfo[i].quantity)
            }
        });
    }
}

changeQuantityandPrice()