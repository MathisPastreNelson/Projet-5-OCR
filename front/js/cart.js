let productCard = [];

//Je récupère les objets du localStorage
let retrieveProductFromStorage = async () => {
    //On compte le nombre de produit dans le localStorage
    const numberOfProduct = localStorage.length;
    for (let i = 0; i < numberOfProduct; i++) {
        const item = localStorage.getItem(localStorage.key(i));
        productObject = JSON.parse(item)
        //On injecte le résultat dans un array productCard
        productCard.push(productObject)
        console.log(productObject)
    }
}




//Tentative d'Afficher les articles du localStorage à la page
let displayProduct = async () => {
    await retrieveProductFromStorage();
    console.log(productCard)
    productCard.forEach(object => {
        document.getElementById("cart__items").innerHTML =
            `
        <article class="cart__item" data - id="{productObject.id}" data - color="{product-color}">
        <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>${productCard.color}</p>
        <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté :test </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>
        `
    })
}

displayProduct()