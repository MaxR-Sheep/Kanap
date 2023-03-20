let panierKanap = JSON.parse(localStorage.getItem("Panier"));

class CustomKanap {
  constructor(id, img, altTxt, name, color, price, quantity) {
    this.id = id;
    this.img = img;
    this.altTxt = altTxt;
    this.name = name;
    this.color = color;
    this.price = price;
    this.quantity = quantity;
  }
}

let totalKanapPrice = document.getElementById("totalPrice");
let totalProduits = 0;
let totalPrice = 0;
let sectionItems = document.getElementById("cart__items");

/**********************************fonction pour création d'une class kanap avec les element du LS et de l'API********************* */

const mapKanapIdAndUnitPrice = new Map(); //map pour récupérer le prix avec l'id

// fonction pour récupere le LS et l'API dans une class
function recupKanap() {
  if (panierKanap === null || panierKanap.length === 0) {
    let sectionVide = document.createElement("p");
    sectionVide.innerText = "Votre Panier est vide !";
    sectionItems.appendChild(sectionVide);
    totalKanapPrice.innerHTML = 0;
  } else {
    panierKanap.forEach((kanap) => {
      // pour chaque kanap dans le localStorage
      fetch(`http://localhost:3000/api/products/${kanap.id}`)
        .then(function (res) {
          if (res.ok) {
            //si la reponse est ok
            return res.json();
          }
        })
        .then((data) => {
          //  récupere le résultat de la promesse
          kanap.colorWithQuantity.forEach((cwq) => {
            mapKanapIdAndUnitPrice.set(kanap.id, data.price); //map avec id et prix
            const newKanap = new CustomKanap();
            newKanap.id = kanap.id;
            newKanap.img = data.imageUrl;
            newKanap.altTxt = data.altTxt;
            newKanap.name = data.name;
            newKanap.color = cwq.color;
            newKanap.price = data.price;
            newKanap.quantity = cwq.quantity;
            createHTMLArticle(newKanap);
            totalPrice += data.price * cwq.quantity;
            totalKanapPrice.innerHTML = totalPrice;
          });
        })
        .catch(function (err) {
          const error = "Une erreur est survenue" + " " + err;
          return error;
        });
    });
  }
}

recupKanap();

/******************************************************************création html************************************************** */
//fonction pour chaque éléments du DOM à crée
function createHTMLArticle(kanap) {
  /* Création de l'article avec des attribut data id et color*/

  let newArticle = document.createElement("article");
  newArticle.setAttribute("data-id", kanap.id);
  newArticle.setAttribute("data-color", kanap.color);
  sectionItems.appendChild(newArticle);

  /*création div pour l'image du kanap*/

  let divCImg = document.createElement("div");
  divCImg.setAttribute("class", "cart__item__img");
  newArticle.appendChild(divCImg);

  /*création de l'image avec sa source et alt*/

  let newImages = document.createElement("img");
  newImages.setAttribute("src", kanap.img);
  newImages.setAttribute("alt", kanap.altTxt);
  divCImg.appendChild(newImages);

  /*création d'une div pour les differents élèments du kanap*/

  let divItemC = document.createElement("div");
  divItemC.setAttribute("class", "cart__item__content");
  newArticle.appendChild(divItemC);

  /*création div pour les éléments texte du kanap*/

  let divCartItContent = document.createElement("div");
  divCartItContent.setAttribute("class", "cart__item__content__description");
  divItemC.appendChild(divCartItContent);

  /*H2 pour le kanap*/

  let kanapTitle = document.createElement("h2");
  kanapTitle.innerText = kanap.name;
  divCartItContent.appendChild(kanapTitle);

  /*Texte color*/

  let pColor = document.createElement("p");
  pColor.innerText = kanap.color;
  divCartItContent.appendChild(pColor);

  /*texte quantité*/

  let pPrice = document.createElement("p");
  pPrice.innerHTML = kanap.price * kanap.quantity + " €"; // on affiche le prix fois la quantité de kanap choisit
  divCartItContent.appendChild(pPrice);

  /*création div */

  let divCartItemContent = document.createElement("div");
  divCartItemContent.setAttribute("class", "cart__item__content__settings");
  divItemC.appendChild(divCartItemContent);

  /* création div pour les quantité*/

  let divCIQuantity = document.createElement("div");
  divCIQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  divCartItemContent.appendChild(divCIQuantity);

  /*texte pour la quantité*/

  let pQuantity = document.createElement("p");
  pQuantity.innerText = "Qté :";
  divCIQuantity.appendChild(pQuantity);

  /* boutton de navigation pour selectionné une quantité*/

  let inputQuantity = document.createElement("input");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("class", "itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("value", kanap.quantity);

  divCIQuantity.appendChild(inputQuantity);
  inputQuantity.addEventListener("change", changeQuantity, false);

  /* Div pour la suppresion*/

  let divDelete = document.createElement("div");
  divDelete.setAttribute("class", "cart__item__content__settings__delete");
  divCartItemContent.appendChild(divDelete);

  /*Texte de suppresion*/

  let itemDelete = document.createElement("p");
  itemDelete.setAttribute("class", "deleteItem");
  itemDelete.addEventListener("click", deleteProduit, false);
  itemDelete.innerHTML = "Supprimer";
  divDelete.appendChild(itemDelete);

  getTotalQuantity();
}

/***************************************************fonction changement quantité et prix total******************************************************** */

let unitPrice = 0;
//fonction qui lance le changement des inputs quantité
function changeQuantity(event) {
  let parentElement = event.currentTarget.parentElement; //l'élément parent de l'input surlequel on agit
  let kanapId = parentElement.closest("article").dataset.id; //on recherche au plus pret l'article avec comme data associer a id
  let colorKanap = parentElement.closest("article").dataset.color;
  unitPrice = mapKanapIdAndUnitPrice.get(kanapId) * Number(event.target.value); // mapKanapIdAndUnitPrice.get(kanapId) ça sort la valeur associée à l'id donc la quantité
  if (Number(event.target.value) > 100) {
    alert("Quantité trop importante");
  } else {
    refreshContent(parentElement);
    saveQuantityInLocalStorage(kanapId, colorKanap, Number(event.target.value));
    getAllUnitPrice();
    getTotalQuantity();
  }
}

//fonction pour sauvegarder dans le LS les nouvelle quantité
function saveQuantityInLocalStorage(kanapId, colorKanap, quantityKanap) {
  const searchKanapId = panierKanap.find(
    (idStorage) => idStorage.id === kanapId
  );
  if (searchKanapId) {
    const searchColor = searchKanapId.colorWithQuantity.find(
      (caq) => caq.color === colorKanap
    );
    if (searchColor) {
      searchColor.quantity = quantityKanap;
      localStorage.setItem("Panier", JSON.stringify(panierKanap));
    }
  }
}

//focntion qui se modifie pour le prix unitaire
function refreshContent(parentElement) {
  let divCartItemContent = parentElement.closest(".cart__item__content");
  let divDescription = divCartItemContent.children[0];
  divDescription.children[2].innerHTML = `${unitPrice} €`;
}

// fonction pour que le changement soit visible sur le total des articles
function getTotalQuantity() {
  totalProduits = 0;
  let listOfInputs = document.getElementsByClassName("itemQuantity");
  let totalQuantity = document.getElementById("totalQuantity");
  if (listOfInputs.length === 0) {
    totalProduits = 0;
    totalQuantity.innerText = totalProduits;
  } else {
    for (i = 0; i < listOfInputs.length; i++) {
      totalProduits += Number(listOfInputs[i].value);
      totalQuantity.innerText = totalProduits;
    }
  }
}

// récuperation pour que le prix total s'additionne
function getAllUnitPrice() {
  let allCartItem = document.querySelectorAll(".cart__item__content");
  let newTotalPrice = 0;
  for (const divDescription of allCartItem) {
    let divContent = divDescription.children[0];
    let pUnitPrice = divContent.children[2].textContent;
    let pCleanPrice = pUnitPrice.substring(0, pUnitPrice.indexOf(" €")); // on sépare les different element du paragraphe
    newTotalPrice += Number(pCleanPrice);
  }
  totalKanapPrice.innerHTML = newTotalPrice;
}

/************************************************************fonction delete***************************************************** */
// récuperation du localStorage
function refreshVarPanier() {
  panierKanap = JSON.parse(localStorage.getItem("Panier"));
}

//fonction pour supprimer un element du panier
function deleteProduit(event) {
  let parentElement = event.currentTarget.parentElement;
  let kanapId = parentElement.closest("article").dataset.id;
  let colorKanap = parentElement.closest("article").dataset.color;
  let searchedKanap = panierKanap.find((kanap) => kanap.id === kanapId);
  let searchedColorWithQuantity = searchedKanap.colorWithQuantity.find(
    (cwq) => cwq.color === colorKanap
  ); // {color: "blue", quantity:4}
  let colorWithQuantityUpdated = searchedKanap.colorWithQuantity.filter(
    (cwq) => cwq.color !== searchedColorWithQuantity.color
  );
  searchedKanap.colorWithQuantity = colorWithQuantityUpdated;
  if (searchedKanap.colorWithQuantity.length === 0) {
    let updatedOrder = panierKanap.filter((kanap) => kanap.id !== kanapId);
    localStorage.setItem("Panier", JSON.stringify(updatedOrder));
    refreshVarPanier(); //rafraichir la variable car pas de reload page, sinon état précédent conservé
  } else {
    localStorage.setItem("Panier", JSON.stringify(panierKanap));
    refreshVarPanier();
  }
  parentElement.closest("article").remove();
  getTotalQuantity();
  getAllUnitPrice();
  if (panierKanap === null || panierKanap.length === 0) {
    const emptyPanier = `<p> Votre panier est vide!<p>`;
    sectionItems.innerHTML = emptyPanier;
    totalKanapPrice.innerHTML = 0;
  }
}

/**********************************************************partie formulaire********************************************** */

let nameRegex = new RegExp("^[a-zA-Z ,.'-]+$"); // utilisation expression régulieres pour les noms de a-z maj ou min avec certaine expection
let emailRegex = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
); // obligation d'avoir le @ utilisation des chiffres et lettres
let addressRegex = new RegExp("^([0-9]*) ?([a-zA-Z,. ]*)$"); //réitération de lettres limité

//fonction pour le formulaire qu'il soit valide
function validationFormulair() {
  let form = document.querySelector(".cart__order__form");

  //On écoute les modifs du formulaire

  form.firstName.addEventListener("change", function () {
    validFirstName();
  });

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    validCity(this);
  });

  form.email.addEventListener("change", function () {
    validEmail();
  });
}
//On test les entrées du formulaire pour quel soit conforme sinon message d'erreur

// fonction validation du prénom
function validFirstName() {
  let inputFirstName = document.getElementById("firstName");
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  if (
    nameRegex.test(inputFirstName.value) &&
    inputFirstName.value.length !== 0
  ) {
    firstNameErrorMsg.innerHTML = "";
    return true;
  } else {
    firstNameErrorMsg.innerHTML = "Saisie invalide.Veuillez réessayer.";
    return false;
  }
}

// fonction validation du nom
function validLastName() {
  let inputLastName = document.getElementById("lastName");
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  if (nameRegex.test(inputLastName.value) && inputLastName.value.lenght !== 0) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML = "Saisie invalide.Veuillez réessayer.";
  }
}

// fonction validation de l'adresse
function validAddress() {
  let inputAddress = document.getElementById("address");
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  if (
    addressRegex.test(inputAddress.value) &&
    inputAddress.value.lenght !== 0
  ) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.innerHTML = "Saisie invalide.Veuillez réessayer.";
  }
}

// fonction validation de la city
function validCity() {
  let inputCity = document.getElementById("city");
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  if (nameRegex.test(inputCity.value) && inputCity.value.lenght !== 0) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML = "Saisie invalide.Veuillez réessayer.";
  }
}

// fonction validation du mail
function validEmail() {
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  let inputEmail = document.getElementById("email");
  if (emailRegex.test(inputEmail.value) && inputEmail.value.length !== 0) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML =
      "E-mail non valide. Il doit contenir un @ et un point suivi d'au maximum 3 lettres";
    return false;
  }
}

validationFormulair();

/*****************************************************envoi de la commande avec les informations du formulaire une fois vérifier********************************** */

const order = document.getElementById("order");
order.addEventListener("click", (event) => envoiCommand(event));

//fonction pour l'envoi de la commande
function envoiCommand(event) {
  event.preventDefault(); // on lui dire quoi faire au clic
  const emailBool = validEmail();
  const firstnameBool = validFirstName();
  const lastNameBool = validLastName();
  const addressBool = validAddress();
  const cityBool = validCity();

  if (emailBool && firstnameBool && lastNameBool && addressBool && cityBool) {
    // on crée un array avec les elements du LocalStorage
    let products = [];
    for (let i = 0; i < panierKanap.length; i++) {
      products.push(panierKanap[i].id);
    }

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: products,
    };

    //Et ensuite on redirige l'utilisateur vers la page confirmation

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        window.location.assign(`confirmation.html?order=${data.orderId}`); // assigne a une nouvelle page choisi.
      });
  } else {
    alert("Merci de bien renseigner les champs du formulaire");
  }
}
