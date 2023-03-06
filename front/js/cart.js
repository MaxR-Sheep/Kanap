let panierKanap = JSON.parse(localStorage.getItem("Panier")) // récuperation du localStorage

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
let totalProduits = 0 ;

sectionItems = document.getElementById("cart__items");

/**********************************fonction pour création d'une class kanap avec les element du LS et de l'API********************* */

function recupKanap(){//

        if (panierKanap=== null || panierKanap == 0) {
                const emptyPanier =`<p> Votre panier est vide!<p>`;
                sectionItems.innerHTML = emptyPanier
        }
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
                totalPrice +=   data.price *cwq.quantity ;
                })}
        )
        .catch(function(err) {
                const error = "Une erreur est survenue" + " " + err;
                return  error;
                })
                
        })
}


/******************************************************************création html************************************************** */
function createHTMLArticle(kanap) {

/* Création de l'article avec des attribut data id et color*/

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
        
        divCIQuantity.appendChild(inputQuantity);
        inputQuantity.addEventListener("change", changeQuantity)
        


/* Div pour la suppresion*/

        let divDelete = document.createElement("div");
        divDelete.setAttribute("class","cart__item__content__settings__delete");
        divCartItemContent.appendChild(divDelete);

/*Texte de suppresion*/

        let itemDelete = document.createElement("p");
        itemDelete.setAttribute("class","deleteItem");
        itemDelete.addEventListener("click", deleteProduit, false);
        itemDelete.innerHTML = "Supprimer";
        divDelete.appendChild(itemDelete);

        getTotalQuantity();

}
/***************************************************fonction******************************************************** */

function changeQuantity(event){

        let parentElement = event.currentTarget.parentElement
        let kanapId = parentElement.closest("article").dataset.id;
        let colorKanap = parentElement.closest("article").dataset.color;

        getTotalQuantity();
}

// function refreshHTML(){
//         cleanPage(); 
//         recupKanap();
// }

function getTotalQuantity(){
        totalProduits = 0;
        
        let listOfInputs = document.getElementsByClassName("itemQuantity");
        let totalPriceKanap = document.getElementById("totalPrice")
        let totalQuantity = document.getElementById("totalQuantity")
        for (i = 0; i < listOfInputs.length; i++){
                
                totalProduits = totalProduits + Number(listOfInputs[i].value);
                totalQuantity.innerText = totalProduits;
                
                
        }
        totalPriceKanap.innerHTML = totalPrice;
}


/************************************************************fonction delete***************************************************** */
function deleteProduit (event){

        let parentElement = event.currentTarget.parentElement
        let kanapId = parentElement.closest("article").dataset.id;
        let colorKanap = parentElement.closest("article").dataset.color;
        const searchedKanap = panierKanap.find(kanap => kanap.id === kanapId);
        const searchedColorWithQuantity = searchedKanap.colorWithQuantity.find(cwq => cwq.color === colorKanap); // {color: "blue", quantity:4}
        const colorWithQuantityUpdated = searchedKanap.colorWithQuantity.filter(cwq => cwq.color !== searchedColorWithQuantity.color);
        searchedKanap.colorWithQuantity = colorWithQuantityUpdated;
        if(Array.from(searchedKanap.colorWithQuantity).length === 0){
                const updatedOrder = panierKanap.filter(kanap => kanap.id !== searchedKanap.id);
                localStorage.setItem("Panier", JSON.stringify(updatedOrder));
                
                if (localStorage === undefined) {
                        
                        localStorage.clear()
                }
        }else{
                localStorage.setItem("Panier", JSON.stringify(panierKanap));
        }
        location.reload();
//        refreshHTML();
}
/************************************************lancement des fonctions**************************************************** */
async function loadPage(){
        recupKanap();
        getTotalQuantity();
}
loadPage();

/**********************************************************partie formulaire********************************************** */

let nameRegex = new RegExp ("^[a-zA-Z ,.'-]+$"); // utilisation expresion régulieres pour les noms de a-z maj ou min avec certaine expection 
let emailRegex = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");// obligation d'avoir le @ utilisation des chiffres et lettres
let addressRegex = new RegExp ("^([0-9]*) ?([a-zA-Z,\. ]*)$"); //réitération de lettres limité

function validationFormulair() {

        let form = document.querySelector (".cart__order__form");

        //On écoute les modifs du formulaire

        form.firstName.addEventListener('change',function() 
        {
        validFirstName(this);
        });

        form.lastName.addEventListener('change', function () 
        {
        validLastName(this);
        });

        form.address.addEventListener('change', function () 
        {
        validAddress(this);
        });

        form.city.addEventListener('change', function () 
        {
        validCity(this);
        });

        form.email.addEventListener('change', function () 
        {
        validEmail(this);
});

//On test les entrées du formulaire pour quel soit conforme sinon message d'erreur


const validFirstName = function(inputFirstName)
{

        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (nameRegex.test(inputFirstName.value)){
        firstNameErrorMsg.innerHTML = '';
        }   else 
        {
        firstNameErrorMsg.innerHTML = "Saisie invalide.Veuillez réessayer."
        }
};

const validLastName = function (inputLastName) 
{
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (nameRegex.test(inputLastName.value)) 
        {
        lastNameErrorMsg.innerHTML = '';
        } else 
        {
        lastNameErrorMsg.innerHTML = 'Saisie invalide.Veuillez réessayer.';
        }
};

const validAddress = function (inputAddress) 
{
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegex.test(inputAddress.value)) 
        {
        addressErrorMsg.innerHTML = '';
        } else 
        {
        addressErrorMsg.innerHTML = 'Saisie invalide.Veuillez réessayer.';
        }
};

const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (nameRegex.test(inputCity.value)) 
        {
        cityErrorMsg.innerHTML = '';
        } else 
        {
        cityErrorMsg.innerHTML = 'Saisie invalide.Veuillez réessayer.';
        }
};

const validEmail = function (inputEmail) 
{
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegex.test(inputEmail.value)) 
        {
        emailErrorMsg.innerHTML = '';
        } else 
        {
        emailErrorMsg.innerHTML = 'Saisie invalide.Veuillez réessayer.';
        }
};

}
validationFormulair() 
