let panierKanap = JSON.parse(localStorage.getItem("Panier")) // récuperation du localStorage
console.log(panierKanap);


const requeteAllProduit =  fetch("http://localhost:3000/api/products");
 // récuperer la réponse en JSON

function recuperationsProduits() { // fonction pour récuperer les informations en JSON
    requeteAllProduit
    .then(function(res) {
        if (res.ok) {
            return res.json();// retourne la réponse en JSON
        }
    })
    .then (function(value) {// appel un function qui vas afficher les valeurs récupérer 
        const listProduct = value;
        afficheProduits(panierKanap)
        console.log(listProduct);
    })
    .catch(function(err) {
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}

function afficheProduits(panierKanap){// function qui vas afficher chaque element pour l'HTML
    panierKanap.forEach(kanap => {
        kanap.colorWithQuantity.forEach((cwq) =>{
        console.log( kanap.id);
        console.log(cwq.color);
        console.log(cwq.quantity);
        sectionItems = document.getElementById("cart__items")

})});
}


recuperationsProduits();



























/*const requeteAllProduit =  fetch("http://localhost:3000/api/products")

function recuperationsProduits() { // fonction pour récuperer les informations en JSON
    requeteAllProduit
    .then(function(res) {
        if (res.ok) {
            return res.json();// retourne la réponse en JSON
            ;
        }
    })
    .then(data => console.log(data))
    .catch(function(err) {
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}
console.log(requeteAllProduit);


const completeCmd = JSON.parse(localStorage.getItem("commande"));
const kanapList = document.getElementById(cart__items)
let newListKanap= []

const localKanap = localStorage.getItem(kanapPerso);
console.log("Panier");

console.log(completeCmd);

class kanap {
    constructor (name , color , quantity){
        this.name = name;
        this.color = color;
        this.price = price
        this.quantity = quantity;
    }
}

function getKanapName(key) {
    let name ="";
    requeteAllProduit.forEach((kanap) => {
        if (kanap._id === key) {
            name = kanap.name
        }
    });
    return name;
};

function getKanapPrice (key){
    let price = "";
    requeteAllProduit.forEach ((kanap) =>{
        if (kanap.price === key) {
            price = kanap.price;
        }
    })
    return price;
};


if (completeCmd){
    Object.keys(completeCmd).forEach((key) => {
        let kanapName = getKanapName(key);
        let kanapPrice = getKanapPrice (key);

        let kanapObject =new kanap(kanapName, kanapPrice);
        newListKanap.push(kanapObject);

    })
}  else {
    console.log( " ajouter des articles");
}

console.log(newListKanap);*/