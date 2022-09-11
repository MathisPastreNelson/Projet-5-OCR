// On récupère l'url de la page
const url = new URL(window.location.href);
// On récupère juste l'url ID
const orderId = url.searchParams.get("orderId");
// On met l'url ID dans le DOM
document.getElementById("orderId").textContent = `${orderId}`;
// On vide le localStorage pour que le panier revienne à zéro
localStorage.clear();

