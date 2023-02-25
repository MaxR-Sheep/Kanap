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
        afficheProduits(listProduct)
        console.log(listProduct);
    })
    .catch(function(err) {
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}
console.log(recuperationsProduits);
recuperationsProduits(); // appel de la fonction

console.log(requeteAllProduit);

function afficheProduits(listProduct){// function qui vas afficher chaque element pour l'HTML
    listProduct.forEach((product,index) => {
        console.log("numero du produit:" + index + ", nom du produit: " + product.name);
        
        sectionItems = document.getElementById("items")// création d'un ID 

        let newLien = document.createElement("a"); // création d'une card avec un lien cliquable 
        newLien.setAttribute("href",`./product.html?id=${product._id}`);// permet que chaque lien soit unique selon la carte cliquer
        sectionItems.appendChild(newLien);

        let newArticle = document.createElement("article");
        newLien.appendChild(newArticle);

        let newImages = document.createElement("img");// affichage de l'image avec sa source et son alt
        newImages.setAttribute("src", product.imageUrl);
        newImages.setAttribute("alt", product.altTxt);
        newArticle.appendChild(newImages);

        let newH3 = document.createElement("h3");// titre de la card
        newH3.setAttribute("class","productName");
        newH3.innerText = product.name;
        newArticle.appendChild(newH3);

        let newP = document.createElement("p");// texte de la card
        newP.setAttribute("class","productDescription");
        newP.innerText = product.description;
        newArticle.appendChild(newP);
    });
};




