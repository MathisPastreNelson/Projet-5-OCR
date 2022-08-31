let getProduct = [];

function RetrieveAllStorage() {
    let keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
        let test = JSON.parse(localStorage.getItem(keys[i]))
        getProduct.push(localStorage.getItem(keys[i]));
    }
}

RetrieveAllStorage()
console.table(getProduct)