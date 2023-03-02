let panierKanap = JSON.parse(localStorage.getItem("Panier")) // récuperation du localStorage
let apiKanap = [];

class CustomKanap {
constructor(
        id,
        img,
        altTxt,
        name,
        color,
        price,
        quantity
){
        this.id = id;
        this.img = img;
        this.altTxt = altTxt;
        this.name = name;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
}
}

let totalPrice = 0 ;
let totalProduit = 0 ;

function recupKanap(){// 
        panierKanap.forEach(kanap => { // pour chaque kanap dans le localStorage
        fetch(`http://localhost:3000/api/products/${kanap.id}`)
        .then(function(res) {
                if (res.ok) { //si la reponse est ok
                return res.json();
                }})
            .then(data => {  // je récupere le résultat de la promesse 
                kanap.colorWithQuantity.forEach((cwq) =>{
                const newKanap = new CustomKanap()
                newKanap.id = kanap.id;
                newKanap.img = data.imageUrl;
                newKanap.altTxt = data.altTxt;
                newKanap.name = data.name;
                newKanap.color = cwq.color;
                newKanap.price = data.price;
                newKanap.quantity = cwq.quantity;
                
                createHTMLArticle(newKanap);
                

                totalPrice = totalPrice + data.price *cwq.quantity ;
                totalProduit = totalProduit + cwq.quantity;
                totalPA(totalProduit,totalPrice);
                
                })

        }
        )
        
        .catch(function(err) {
                const error = "Une erreur est survenue" + " " + err;
                return  error;
                })
                
})

console.log(apiKanap);
;}



recupKanap();

function totalPA(){ // function calcule les totaux
        totalQuantity = document.getElementById("totalQuantity")
        totalQuantity.innerText = totalProduit;

        let totalPriceKanap = document.getElementById("totalPrice")
        totalPriceKanap.innerText = totalPrice;
}


function createHTMLArticle(kanap) {

/* Création de l'article avec des attribut data id et color*/

        sectionItems = document.getElementById("cart__items");
        let newArticle = document.createElement("article");
        newArticle.setAttribute("data-id",kanap.id);
        newArticle.setAttribute("data-color",kanap.color);
        sectionItems.appendChild(newArticle);

/*création div pour l'image du kanap*/

        let divCImg = document.createElement("div");
        divCImg.setAttribute("class","cart__item__img");
        newArticle.appendChild(divCImg);

/*création de l'image avec sa source et alt*/

        let newImages = document.createElement("img");
        newImages.setAttribute("src", kanap.img);
        newImages.setAttribute("alt", kanap.altTxt);
        divCImg.appendChild(newImages);

/*création d'une div pour les differents élèments du kanap*/

        let divItemC = document.createElement("div");
        divItemC.setAttribute("class","cart__item__content");
        newArticle.appendChild(divItemC);

/*création div pour les éléments texte du kanap*/

        let divCartItContent = document.createElement("div");
        divCartItContent.setAttribute("class","cart__item__content__description");
        divItemC.appendChild(divCartItContent);

/*H2 pour le kanap*/

        let kanapTitle = document.createElement("h2") ;
        kanapTitle.innerText = kanap.name;
        divCartItContent.appendChild(kanapTitle);

/*Texte color*/

        let pColor = document.createElement("p");
        pColor.innerText = kanap.color;
        divCartItContent.appendChild(pColor);

/*texte quantité*/

        let pPrice = document.createElement("p");
        
        pPrice.innerHTML = (kanap.price*kanap.quantity)+ " €"; // on affiche le prix fois la quantité de kanap choisit
        divCartItContent.appendChild(pPrice);

/*création div */

        let divCartItemContent = document.createElement("div");
        divCartItemContent.setAttribute("class", "cart__item__content__settings");
        divItemC.appendChild(divCartItemContent);

/* création div pour les quantité*/

        let divCIQuantity = document.createElement("div");
        divCIQuantity.setAttribute("class","cart__item__content__settings__quantity");
        divCartItemContent.appendChild(divCIQuantity);

/*texte pour la quantité*/

        let pQuantity = document.createElement("p");
        pQuantity.innerText = "Qté :" 
        divCIQuantity.appendChild(pQuantity);

/* boutton de navigation pour selectionné une quantité*/

        let inputQuantity = document.createElement("input");
        inputQuantity.setAttribute("type","number");
        inputQuantity.setAttribute("class","itemQuantity");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min","1");
        inputQuantity.setAttribute("max","100");
        inputQuantity.setAttribute("value",kanap.quantity);
        inputQuantity.setAttribute("onchange","changeQuantity(this.parentElement)")
        divCIQuantity.appendChild(inputQuantity);
        

/* Div pour la suppresion*/

        let divDelete = document.createElement("div");
        divDelete.setAttribute("class","cart__item__content__settings__delete");
        divCartItemContent.appendChild(divDelete);

/*Texte de suppresion*/

        let pDelete = document.createElement("p");
        pDelete.setAttribute("class","deleteItem");
        pDelete.setAttribute("onclick", "majKanap(this.parentElement)")
        pDelete.innerText = "Supprimer";
        divDelete.appendChild(pDelete);

        

        
        
}


function changeQuantity(parentElement){
        const kanapId = parentElement.closest("article").dataset.id;
        const colorKanap = parentElement.closest("article").dataset.color;


        console.log(colorKanap);

}

function majKanap(parentElement) {
        const kanapId = parentElement.closest("article").dataset.id;
        const colorKanap = parentElement.closest("article").dataset.color;
        console.log(colorKanap);
        const searchKanap = panierKanap.find(kanapInStorage => kanapInStorage.id === kanapId);
        searchKanap.colorWithQuantity.filter(cwq => cwq.color !== colorKanap);
        console.log(searchKanap);
        localStorage.setItem("Panier",JSON.stringify(panierKanap));


        
        
        

}

