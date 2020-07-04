// récupère la valeur d'un paramètre de l'url par window.location.search
function obtenirParametre(sVar) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

orderId = obtenirParametre("orderId");

if (orderId != "") {

    let reference = document.getElementById('réf-commande');
    let totalAmount = document.getElementById('prix-total');
    let itemsInCart = JSON.parse(localStorage.Articles);
    let sum = 0;

    reference.textContent = orderId;
    
    itemsInCart.forEach((id) => {
                    
        let url = "http://localhost:3000/api/cameras/" + id;

        fetch(url).then((response) =>
            response.json().then((data) => {
                sum += data.price / 100;
                totalAmount.textContent = `${sum.toFixed(2)} €`;
            })
        )
    });

} else {
    window.alert("Erreur : cette page n'esiste pas");
    window.location.replace("index.html");
}