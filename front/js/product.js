//On récup l'URL de la page courante
let completeUrl = window.location.href;
let url = new URL(completeUrl);
//On récupère uniquement l'id du produit dans l'URL
let idProduct = url.searchParams.get("id");

//Fonction fectch dédiée au canapé de la page
let productFetch = async () => {
    await fetch("http://localhost:3000/api/products/" + idProduct)
        // quand tu as la réponse donne le résultat en json
        .then((res) => res.json())
        // Ajout du résultat dans canapeData[]
        .then((res) => canapeData = res)
    //   console.table(canapeData)
};

//Fonction qui affiche les données sur les différents éléments HTML
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
    let selectColor = document.getElementById('colors');
    //Fonction forEach pour afficher l'ensemble des colors
    canapeData.colors.forEach((color) => {
        //Ajout d'une nouvelle option pour chaques colors
        let colorOption = document.createElement("option")
        colorOption.innerHTML = `${color}`
        colorOption.value = `${color}`
        selectColor.appendChild(colorOption);
    });
};

//Concernant le boutton "Ajouter au panier"
const buttonAddBasket = document.querySelector("button")
//Création d'event qui s'applique au clique de l'ajout au panier
buttonAddBasket.addEventListener("click", (e) => {
    const colorProductSelect = document.querySelector("#colors").value
    const quantitySelect = document.querySelector("#quantity").value
    //Création d'un objet regroupant les informations du produit à transmettre en localstorage
    let productInBasket = {
        id: idProduct,
        color: colorProductSelect,
        quantity: parseInt(quantitySelect),
    }
    //Condition contraignant l'utilisateur à mettre une couleur + une quantité de produit entre 1 et 100
    if (colorProductSelect == null || colorProductSelect == "" ||
        quantitySelect < 1 || quantitySelect > 100 || quantitySelect == null) {
        alert("Sélectionnez une couleur et un nombre d'article entre 1 et 100")
    }
    //On vérifie si l'objet n'est pas déja présent  afin d'incrémenter uniquement la quantité de produit
    else if (localStorage.getItem(canapeData.name + " " + colorProductSelect)) {
        //Je récupère l'objet du localStorage
        let productAlreadyIn = JSON.parse(localStorage.getItem(canapeData.name + " " + colorProductSelect))
        //J'additionne l'ancienne et la nouvelle quantité
        productAlreadyIn.quantity += parseInt(quantitySelect)
        //Je renvoi le produit avec sa nouvelle valeur (quantité)
        localStorage.setItem(canapeData.name + " " + colorProductSelect, JSON.stringify(productAlreadyIn))
        console.log(productAlreadyIn)
        alert("Votre quantité de produit a été rajouter au panier.")
    }
    //Si le produit n'existe pas déja dans le localStorage on l'ajoute simplement
    else {
        localStorage.setItem(canapeData.name + " " + colorProductSelect, JSON.stringify(productInBasket))
        console.log(productInBasket)
        alert("Votre produit a été ajouté au panier.")
    }
})


productDisplay();
