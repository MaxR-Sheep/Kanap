let source = window.location.href;// source est = à la page la partie localisation du lien

let newURL = new URL(source);// on demande le nouvelle url

const idKanap = newURL.searchParams.get("id");// on crée une constante pour que le nouvelle url récupere l'ID du produit

const requetProduit = fetch ("http://localhost:3000/api/products/" + idKanap );// récupere les information de l'ID en JSON

/* function qui vas afficher chaque element pour l'HTML*/
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
        })
        .catch(function(err) {
            const error = "Une erreur est survenue" + " " + err;
        return  error;
        });
};


/* fonction pour appeller le produit avec son image son prix et description */
function produitKanap(afficheProduit){  

/*  affichage de l'image avec sa source et son alt*/
    let newImage = document.createElement("img");
    newImage.setAttribute("src", afficheProduit.imageUrl);
    newImage.setAttribute("alt", afficheProduit.altTxt);
    const itemImage = document.querySelector(".item__img");
    itemImage.appendChild(newImage);

/* affichage du h1 et du nom du canapé*/
    let titreH1 = document.getElementById("title");
    titreH1.innerText = afficheProduit.name;
/* affichage du prix */
    let priceProduct = document.getElementById("price");
    priceProduct.innerText = afficheProduit.price;
/* afficher la description */
    let descriptionProduit = document.getElementById("description");
    descriptionProduit.innerText = afficheProduit.description;

    appelCouleur(afficheProduit);
};

let valeurCouleur = "";// variable pour les couleurs qui seront choisi
const tabColor = document.getElementById("colors");// const pour que l'ID colors soit utiliser
tabColor.setAttribute("onchange","saveColorLet()");// permet de memoriser la couleur du kanap ajout de onchange en html et de la function savecouleur

// function pour crée un menu déroulant avec les couleurs
function appelCouleur(afficheProduit){
    for (let color in afficheProduit.colors){

        let optionColors = document.createElement("option");
        optionColors.innerText = afficheProduit.colors[color];
        optionColors.setAttribute("value", afficheProduit.colors[color] );
        tabColor.appendChild(optionColors);
    };
};

// fonction qui sélectionne la couleur souhaiter
function saveColorLet(){
    const valurOfSelect = document.getElementById("colors").value;
    valeurCouleur = valurOfSelect;
};

let numbreElement = '';// pour récupérer la quantité
const quanti = document.getElementById("quantity");
quanti.setAttribute("onchange","saveQuantity()" );


function saveQuantity(){
    const valueQuantity = document.getElementById("quantity").value;
    numbreElement = valueQuantity;
}

// utilisation de bouton pour ajouté au panier
const btnAddToPanier = document.getElementById("addToCart");
btnAddToPanier.setAttribute("onclick", "btnAddPanier()");


function btnAddPanier() {// fonction pour le bonton achat
    let parsedCmd = JSON.parse(localStorage.getItem("Panier")); // appele le localstorage 
        if ((valeurCouleur !=="" && numbreElement >= 0 && numbreElement < 100)){ // si la couleur et la quantité son bien sélectionner
            if (parsedCmd ){ // si dans le local storage il y a bien quelque chose
                const searchKanap = parsedCmd.find(kanapInStorage => kanapInStorage.id === idKanap); // constante qui va rechercher si on a un kanap avec le meme ID
                if (searchKanap) { // si on utilise la constante searchkanap
                    const searchColor = searchKanap.colorWithQuantity.find( caq => caq.color === valeurCouleur); // on utilise une constante qui va verifier si c'est la même couleur
                    if (searchColor) { // si on utilise la constante search color
                        searchColor.quantity = Number(searchColor.quantity)+ Number(numbreElement) ; // alors on aditionne la quantité
                        if (searchColor.quantity >= 100) { // si la quantité des article pour le localstorage dépasse 100
                            alert ("Quantité trop importante") // alert car quantité trop importante
                        }
                    }else{
                        const newColorAndQ = {// on utilise une constante avec une nouvelle couleur et une nouvelle quantité
                            color : valeurCouleur, quantity: Number(numbreElement)
                        }
                        searchKanap.colorWithQuantity.push(newColorAndQ)
                    }
            }else{
                const newKanap = {
                    id: idKanap,
                    colorWithQuantity : []
                }
                const cwq = {
                    color : valeurCouleur, quantity : Number(numbreElement)
                }
                newKanap.colorWithQuantity.push(cwq);
                parsedCmd.push(newKanap);
            }
        alert ( "Articles ajouter au panier")
        localStorage.setItem("Panier", JSON.stringify(parsedCmd));//on ajoute au localstorage
        }else{  // si le kanap n'a pas d'id dans le local storage on crée un nouveau tableau 
            const newPanier = [] 
            const newKanap = {
                id: idKanap,
                colorWithQuantity: []
            }
            const cwq = {
                color : valeurCouleur, quantity : Number(numbreElement)
            }
            newKanap.colorWithQuantity.push(cwq);
            newPanier.push(newKanap)
            alert ( "Articles ajouter au panier")
            localStorage.setItem("Panier", JSON.stringify(newPanier))
        }
    }
}

recupProduit();
