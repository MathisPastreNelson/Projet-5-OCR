//On récup l'URL de la page courante
let str = window.location.href;
let url = new URL(str);
//On récupère uniquement l'id du produit dans l'URL
let idProduct = url.searchParams.get("id");

//Fonction fectch dédiée au canapé de la page
let productFetch = async () => {
    await fetch("http://localhost:3000/api/products/" + idProduct)
        // quand tu as la réponse donne le résultat en json
        .then((res) => res.json())
        // Ajout de la fonction dans canapeData[]
        .then((res) => canapeData = res)
    // console.table(canapeData)
};

//Fonction qui réparti les données sur les différents éléments HTML
let productDisplay = async () => {
    await productFetch()
    //image
    document.querySelector(".item__img").innerHTML =
        ` 
            <img src = ${canapeData.imageUrl} alt = ${canapeData.altTxt}>
            `
    //prix
    document.getElementById("price").innerHTML =
        ` 
            ${canapeData.price}
            `
    //titre
    document.getElementById("title").innerHTML =
        `
        ${canapeData.name}
        `
    //description
    document.getElementById("description").innerHTML =
        `
        ${canapeData.description}
        `
    //couleur
    let select = document.getElementById('colors');
    //Fonction forEach pour afficher l'enssemble des colors
    canapeData.colors.forEach((color) => {
        //Ajout d'une nouvelle option pour chaques colors
        let colorOption = document.createElement("option")
        colorOption.innerHTML = `${color}`
        colorOption.value = `${color}`
        select.appendChild(colorOption);
    });
    /*J'en suis là comprendre le localStorage*/

    /* let getProductInBasket =
         productPrice = canapeData.price
     productTitle = canapeData.name
     productColor = canapeData.colors
 
     console.log(getProductInBasket)*/

};

//Concernant le boutton "Ajouter au panier"
const button = document.querySelector("button")
//Condition vérifiant les valeurs que le client a choisi (couleur/quantité)
if (button != null) {
    button.addEventListener("click", (e) => {
        const colorProductSelect = document.querySelector("#colors").value
        const quantitySelect = document.querySelector("#quantity").value
        //Condition contraignant l'utilisateur à mettre une couleur et une quantité de produit entre 1 et 100
        if (colorProductSelect == null || colorProductSelect == "" ||
            quantitySelect == 0 || quantitySelect > 100 || quantitySelect == null) {
            alert("Selectionnez une couleur et un nombre d'article entre 1 et 100")
        }
        //Création d'un objet regroupant les informations du produit à transmettre en au panier
        let productInBasket = {
            id: idProduct,
            name: canapeData.name,
            imageUrl: canapeData.imageUrl,
            imageTxt: canapeData.altTxt,
            color: colorProductSelect,
            quantity: quantitySelect,
        }
        //L'objet est ajouté au localStorage
        localStorage.setItem(idProduct, JSON.stringify(productInBasket))
    })
}

productDisplay();

