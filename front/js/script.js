const requeteAllProduit =  fetch("http://localhost:3000/api/products");// récuperer la réponse en JSON

function recuperationsProduits() { // fonction pour récuperer les informations en JSON
    requeteAllProduit
    .then(function(res) { // promesse pour une fonction qui attend une réponse
        if (res.ok) { //si la réponse est ok
            return res.json();// retourne la réponse en JSON
        }
    })
    .then (function(value) {// appel un function qui vas afficher les valeurs récupérer 
        const listProduct = value; // notre constante listProduct est égale a une valeur
        afficheProduits(listProduct) // on appel la fonction
    })
    .catch(function(err) { // sinon on appel un fonction erreur pour nous la rapporté
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}

recuperationsProduits(); // appel de la fonction

/************************************affichage des elements HTML********************************************** */

function afficheProduits(listProduct){// function qui vas afficher chaque element pour l'HTML
    listProduct.forEach(product => { // on recherhce pour chque produit ses éléments

        sectionItems = document.getElementById("items")// création d'un ID 

        let newLien = document.createElement("a"); // création d'une card avec un lien cliquable 
        newLien.setAttribute("href",`./product.html?id=${product._id}`);// permet que chaque lien soit unique selon la carte cliquer
        sectionItems.appendChild(newLien);//newlien devient l'enfant de sectionItems

        let newArticle = document.createElement("article");
        newLien.appendChild(newArticle);

        let newImages = document.createElement("img");// affichage de l'image avec sa source et son alt
        newImages.setAttribute("src", product.imageUrl);//  on récupere l'image dans l'api 
        newImages.setAttribute("alt", product.altTxt);
        newArticle.appendChild(newImages);

        let newH3 = document.createElement("h3");// titre de la card
        newH3.setAttribute("class","productName");//on attribut au titre une class= productName
        newH3.innerText = product.name;
        newArticle.appendChild(newH3);

        let newP = document.createElement("p");// texte de la card
        newP.setAttribute("class","productDescription");
        newP.innerText = product.description;
        newArticle.appendChild(newP);
    });
};




