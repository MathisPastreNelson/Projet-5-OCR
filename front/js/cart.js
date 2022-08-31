let getProduct = [];


//Fonction qui va chercher tout les produits du localStorage
let RetrieveAllStorage = () => {
    let keys = Object.keys(localStorage);
    let i = keys.length;
    //Tant qu'il y a des clés dans le localStorage je traduit et je met dans getProduct[]
    while (i--) {
        let parseAllProduct = JSON.parse(localStorage.getItem(keys[i]))
        getProduct.push(parseAllProduct)
    }
}

RetrieveAllStorage()
console.table(getProduct)