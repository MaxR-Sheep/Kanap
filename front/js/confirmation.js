let newURL = new URL(window.location.href);// on demande le nouvelle url

const orderId = newURL.searchParams.get("order")


function confirmation()
{
    const idItem = document.getElementById("orderId");
    idItem.innerText = orderId;

}

confirmation();