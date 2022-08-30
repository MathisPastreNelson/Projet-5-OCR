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
    console.table(canapeData)
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
};

//Concernant le boutton "Ajouter au panier"
const button = document.querySelector("button")
//Création d'event qui s'applique au clique de l'ajout au panier
button.addEventListener("click", (e) => {
    const colorProductSelect = document.querySelector("#colors").value
    const quantitySelect = document.querySelector("#quantity").value
    //Création d'un objet regroupant les informations du produit à transmettre en localstorage
    let productInBasket = {
        id: idProduct,
        color: colorProductSelect,
        quantity: Number(quantitySelect),
    }
    //Condition contraignant l'utilisateur à mettre une couleur + une quantité de produit entre 1 et 100
    if (colorProductSelect == null || colorProductSelect == "" ||
        quantitySelect <= 0 || quantitySelect > 100 || quantitySelect == null) {
        alert("Selectionnez une couleur et un nombre d'article entre 1 et 100")
    } else {
        //L'objet est ajouté au localStorage avec son nom+couleur en guise de clé
        localStorage.setItem(canapeData.name + " " + colorProductSelect, JSON.stringify(productInBasket))
        alert("Votre produit a été ajouté au panier.")
        console.log(productInBasket)
    }
    //Récupérer le prix avec une autre fonction que le localStorage car danger de sécurité peut être un fetchproduct 
})


productDisplay();

