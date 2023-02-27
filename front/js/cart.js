let panierKanap = JSON.parse(localStorage.getItem("Panier")) // récuperation du localStorage
console.log(panierKanap);


const requeteAllProduit =  fetch("http://localhost:3000/api/products");
 // récuperer la réponse en JSON
console.log(requeteAllProduit);
function recuperationsProduits() { // fonction pour récuperer les informations en JSON
    requeteAllProduit
    .then(function(res) {
        if (res.ok) { //si la reponse est ok
            return res.json();// retourne la réponse en JSON

        }
    })
    .then (function(value) {// appel une fonction qui vas afficher les valeurs récupérer 
        const afficheProduit = value;
        afficheProduits(panierKanap,afficheProduit)
        totalProduit()
        console.log(afficheProduit);
    })
    .catch(function(err) {
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}

function afficheProduits(panierKanap,afficheProduit){// fonction qui vas afficher chaque element pour l'HTML

        console.log(panierKanap);
        console.log(afficheProduit );

        panierKanap.forEach(kanap => { // pour chaque kanap dans le localStorage
        kanap.colorWithQuantity.forEach((cwq) =>{ // pour chaque couleur dans les kanap du localStorage
        console.log( kanap.id);
        console.log(cwq.color);
        console.log(cwq.quantity);

        let panierAffiche = afficheProduit.find( panier => panier._id === kanap.id ) // recherche si l'id du localstorage et le meme que celui de l'api
        console.log(panierAffiche);

        let totalPrice = 0 ;
        let totalProduit = 0 ;

        sectionItems = document.getElementById("cart__items");
        let newArticle = document.createElement("article");
        newArticle.setAttribute("data-id",kanap.id);
        newArticle.setAttribute("data-color",cwq.color);
        sectionItems.appendChild(newArticle);
        
        let divCImg = document.createElement("div");
        divCImg.setAttribute("class","cart__item__img");
        newArticle.appendChild(divCImg);

        let newImages = document.createElement("img");
        newImages.setAttribute("src", panierAffiche.imageUrl);
        newImages.setAttribute("alt", panierAffiche.altTxt);
        divCImg.appendChild(newImages);

        let divItemC = document.createElement("div");
        divItemC.setAttribute("class","cart__item__content");
        newArticle.appendChild(divItemC);

        let divCartItContent = document.createElement("div");
        divCartItContent.setAttribute("class","cart__item__content__description");
        divItemC.appendChild(divCartItContent);

        let kanapTitle = document.createElement("h2") ;
        kanapTitle.innerText = panierAffiche.name;
        divCartItContent.appendChild(kanapTitle);

        let pColor = document.createElement("p");
        pColor.innerText = cwq.color;
        divCartItContent.appendChild(pColor);

        let pPrice = document.createElement("p");
        pPrice.innerText = (panierAffiche.price*cwq.quantity)+ " €"; // on affiche le prix fois la quantité de kanap choisit
        divCartItContent.appendChild(pPrice);

        let divCartItemContent = document.createElement("div");
        divCartItemContent.setAttribute("class", "cart__item__content__settings");
        divItemC.appendChild(divCartItemContent);

        let divCIQuantity = document.createElement("div");
        divCIQuantity.setAttribute("class","cart__item__content__settings__quantity");
        divCartItemContent.appendChild(divCIQuantity);

        let pQuantity = document.createElement("p");
        pQuantity.innerText = "Qté :" 
        divCIQuantity.appendChild(pQuantity);

        let inputQuantity = document.createElement("input");
        inputQuantity.setAttribute("type","Number");
        inputQuantity.setAttribute("class","itemQuantity");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min","1");
        inputQuantity.setAttribute("max","100");
        inputQuantity.setAttribute("value",cwq.quantity);
        divCIQuantity.appendChild(inputQuantity);

        let divDelete = document.createElement("div");
        divDelete.setAttribute("class","cart__item__content__settings__delete");
        divCartItemContent.appendChild(divDelete);

        let pDelete = document.createElement("p");
        pDelete.setAttribute("class","deleteItem");
        pDelete.innerText = "Supprimer";
        divDelete.appendChild(pDelete);
        
})});
}


function totalProduit(){

    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.getAttribute("itemQuantity");
    console.log(totalQuantity);





    let totalPrice = doxument.getElementById("totalPrice");
}


recuperationsProduits();


