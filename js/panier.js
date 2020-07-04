window.onload = () => {

    // vérifie que le panier n'est pas vide
    if(localStorage.Articles != null){

        // affectation des données du localStorage "Articles"
        let itemsInCart = JSON.parse(localStorage.Articles);

        // initialisation d'une variable pour le calcul du total
        let sum = 0;
    
        // boucle forEach pour ajouter chaque article au tableau
        itemsInCart.forEach((id) => {
                    
            let url = "http://localhost:3000/api/cameras/" + id;

            // appel de l'API sur l'id pour récupérer le nom et le prix de l'article
            fetch(url).then((response) =>
                response.json().then((data) => {

                    // création des éléments
                    let productName = data.name;
                    let productPrice = data.price / 100;
                    let container = document.getElementById("cart-tablebody");
                    let line = document.createElement("tr");
                    let cellName = document.createElement("td");
                    let cellPrice = document.createElement("td");
                    let totalPlace = document.getElementById("total");

                    // disposition des éléments
                    container.appendChild(line);
                    line.appendChild(cellName);
                    line.appendChild(cellPrice);

                    // affiche nom et prix dans le tableau
                    cellName.textContent = productName;
                    cellPrice.textContent = `${productPrice.toFixed(2)} €`;
                    
                    // calcul et affichage du total
                    sum += data.price / 100;
                    totalPlace.textContent = `${sum.toFixed(2)} €`;
                })
            )
        });
    
    // si le panier est vide, retour à la page principale
    } else {
        window.alert("Le panier est vide");
        window.location.replace("index.html");
    }
}