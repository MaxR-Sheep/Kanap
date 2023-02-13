let source = window.location.href;// source est = à la page la partie localisation du lien
console.log(source);
let newURL = new URL(source);//on demande le nouvelle url
console.log(newURL);

const idKanap = newURL.searchParams.get("id");//on crée une constante pour que le nouvelle url récupere l'ID du produit
console.log(idKanap);

const requetProduit = fetch ("http://localhost:3000/api/products/" + idKanap );//récupere les information de l'ID en JSON

console.log(requetProduit);

/*function qui vas afficher chaque element pour l'HTML*/
function recupProduit(){
        requetProduit
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(kanap){
            const afficheProduit = kanap
            produitKanap(afficheProduit);
            console.log(afficheProduit);
        })
        .catch(function(err) {
            const error = "Une erreur est survenue" + " " + err;
        return  error;
        });

};
recupProduit();

/* fonction pour appeller le produit avec son image son prix et description */
function produitKanap(afficheProduit){  
    console.log(afficheProduit);
/*  affichage de l'image avec sa source et son alt*/
    let newImage = document.createElement("img");
    newImage.setAttribute("src", afficheProduit.imageUrl);
    newImage.setAttribute("alt", afficheProduit.altTxt);
    const itemImage = document.querySelector(".item__img");
    itemImage.appendChild(newImage);
    console.log(newImage);
/* affichage du h1*/
    let titreH1 = document.getElementById("title");
    titreH1.innerText = afficheProduit.name;
/* affichage du prix*/
    let priceProduct = document.getElementById("price");
    priceProduct.innerText = afficheProduit.price;
/* afficher la description*/
    let descriptionProduit = document.getElementById("description");
    descriptionProduit.innerText = afficheProduit.description;

    appelCouleur(afficheProduit);
};

let valeurCouleur = "";// variable pour les couleurs qui seront choisi
const tabColor = document.getElementById("colors");// const pour que l'ID colors soit utiliser
tabColor.setAttribute("onchange","saveColorLet()");// permet de memoriser la couleur du kanap ajout de onchange en html et de la function savecouleur

//function pour crée un menu déroulant avec les couleurs
function appelCouleur(afficheProduit){
    for (let color in afficheProduit.colors){
        console.log(afficheProduit.colors[color]);
        
        let optionColors = document.createElement("option");
        optionColors.innerText = afficheProduit.colors[color];
        optionColors.setAttribute("value", afficheProduit.colors[color] );
        tabColor.appendChild(optionColors);
    };
};


//fonction qui sélectionne la couleur souhaiter
function saveColorLet(){
    const valurOfSelect = document.getElementById("colors").value;
    valeurCouleur = valurOfSelect;
    console.log("vous avez choisi la couleur " + valeurCouleur);
};

//fonction pour mémoriser la quantité
let quantityKanap = "";
const valeurQuantity = document.getElementById("quantity").value;
    valeurQuantity.setAttribute("onchange", "saveQuantity()");
function saveQuantity(){
    
    quantityKanap = valeurQuantity;
    console.log(" la quantité chaoisit est de: ", quantityKanap );
}




// utilisation du localStorage pour envoyé les élements dans le panier
function btnAddPanier(){
    if (valeurCouleur !==""){
        requetProduit.forEach(kanap => {
            if (kanap.idKanap === idKanap) {
                // ici on enregiste dans le localStorageles info du canapé personnalisé
                let persoKanap = {
                    kanapID : kanap.idKanap ,
                    kanapName : kanap.name ,
                    kanapColor : valeurCouleur,
                    kanapQuantity

                }
            }
        });
    }
}
