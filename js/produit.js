// récupère la valeur d'un paramètre de l'url par window.location.search
function obtenirParametre(sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// vérifie que l'url est correcte en contrôlant que l'API retourne quelque chose
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

id = obtenirParametre("id");

// vérification de l'existence d'un id dans l'url
if (id != "") {

    let url = "http://localhost:3000/api/cameras/" + id;

    // appel de l'API sur l'id pour récupérer les infos du produit
    fetch(url).then((response) =>
        response.json().then((data) => {

            // si l'url est erronée, retour à la page index.html
            if (isEmpty(data)) {
                window.alert("Erreur : cette page n'esiste pas");
                window.location.replace("index.html");

            // si l'url est correcte, création de l'affichage des données du produit
            } else {

                // création des éléments
                let productName = data.name;
                let picturePlace = document.getElementById("image-article");
                let productPicture = document.createElement("img");
                let productPrice = data.price / 100;
                let lensesElement = document.querySelector("select");
                let lensesData = data.lenses;
                let productId = data._id;

                // création du sélecteur contenant les différents objectifs
                for (let options of lensesData) {
                    let optionElement = document.createElement("option");
                    optionElement.value = options;
                    optionElement.innerHTML = options;
                    lensesElement.appendChild(optionElement);
                }

                // ajout de la photo
                productPicture.setAttribute("src", data.imageUrl);
                picturePlace.appendChild(productPicture);

                // affichage des informations
                document.querySelector('#nom').innerHTML = productName;
                document.querySelector('#description').innerHTML = data.description;
                document.querySelector('#prix').textContent = productPrice.toFixed(2) + " €";

                // ajoute le produit dans le localStorage lors du clic sur le bouton
                let addToCart = document.getElementById('ajout-panier');
                addToCart.addEventListener('click', function () {

                    // lecture du localStorage pour vérifier s'il contient déjà un article
                    let actualCart = localStorage.getItem("Articles");

                    // si le panier est vide
                    if (actualCart === undefined || actualCart == null || actualCart.length <= 0) {
                        items = [productId];
                        window.alert(`Le ${productName} a bien été ajouté à votre panier`);
                    }

                    // si le panier n'est pas vide, ajout du produit à la suite
                    else {
                        items = JSON.parse(actualCart);
                        if (!items.find(element => element == productId)) {
                            items.push(productId);
                            window.alert(`Le ${productName} a bien été ajouté à votre panier`);

                        // si le produit est déjà dans le panier
                        } else {
                            window.alert(`Le produit est déjà dans votre panier`);
                        }
                    }
                    localStorage.setItem("Articles", JSON.stringify(items));
                })
            }
        })
    );

// s'il n'y a pas d'id indiqué dans l'url, retour à la page index.html
} else {
    window.alert("Erreur : cette page n'existe pas");
    window.location.replace("index.html");
}