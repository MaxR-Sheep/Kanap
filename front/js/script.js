const requeteAllProduit =  fetch("http://localhost:3000/api/products");
 // récuperer la réponse en JSON

function recuperationsProduits() {
    requeteAllProduit
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then (function(value) {
        const listProduct = value;
        afficheProduits(listProduct)
        console.log(listProduct);
    })
    .catch(function(err) {
        const error = "Une erreur est survenue" + " " + err;
    return  error;
    });
    
}
recuperationsProduits();


console.log(requeteAllProduit);

function afficheProduits(listProduct){
    listProduct.forEach((product,index) => {
        console.log("numero du produit:" + index + ", nom du produit: " + product.name);
        
        sectionItems = document.getElementById("items")

        let newLien = document.createElement("a");
        newLien.setAttribute("href",`./product.html?id=${product._id}`);
        sectionItems.appendChild(newLien);

        let newArticle = document.createElement("article");
        newLien.appendChild(newArticle);

        let newImages = document.createElement("img");
        newImages.setAttribute("src", product.imageUrl);
        newImages.setAttribute("alt", product.altTxt);
        newArticle.appendChild(newImages);

        let newH3 = document.createElement("h3");
        newH3.setAttribute("class","productName");
        newH3.innerText = product.name;
        newArticle.appendChild(newH3);

        let newP = document.createElement("p");
        newP.setAttribute("class","productDescription");
        newP.innerText = product.description;
        newArticle.appendChild(newP);
    });
};

let pageArticle = ""

let search_params = new URLSearchParams(pageArticle);
console.log(pageArticle);
if (search_params.has("id")){
    let identifant = search_params.get("id");
    console.log(identifant);
};



