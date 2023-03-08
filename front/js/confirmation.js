// On affiche le numéro de commande.Il n'est pas stocké

function confirmation()
{
    const idItem = document.getElementById("orderId");
    idItem.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

confirmation();