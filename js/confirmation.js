// récupère la valeur d'un paramètre de l'url par window.location.search
function obtenirParametre(sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

orderId = obtenirParametre("orderId");

// vérification de l'existence d'un orderId et d'articles
if (orderId != "" && localStorage.Articles != undefined) {

    // initialisation les éléments
    let reference = document.getElementById('réf-commande');
    let totalAmount = document.getElementById('prix-total');
    let itemsInCart = JSON.parse(localStorage.Articles);
    let sum = 0;

    // affiche l'orderId
    reference.textContent = orderId;
    
    // appel à l'API pour récupérer les prix
    itemsInCart.forEach((id) => {
                    
        let url = "http://localhost:3000/api/cameras/" + id;

        fetch(url).then((response) => {
            if (response.ok) {
                response.json().then((data) => {

                    // clacul du total et affichage du montant
                    sum += data.price / 100;
                    totalAmount.textContent = `${sum.toFixed(2)} €`;
                })
            } else {
                console.log('Mauvaise réponse du réseau');
            }
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            alert("Erreur de connexion à l'API");
        });
    });

    // la commande étant terminée, suppression des articles
    eraseArticle();

// s'il n'y a pas d'orderId ou d'articles
} else {
    window.alert("Commande terminée ou inexistante");
    window.location.replace("index.html");
}

function eraseArticle() {
    localStorage.removeItem('Articles');
}
