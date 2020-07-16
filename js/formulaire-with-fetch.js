// variable correspondante au bouton "Passer la commande"
let formValidation = document.getElementById('submit-btn');

// attente de l'événement "click" du bouton
formValidation.addEventListener('click', function (event) {
    // empêcher l'exécution par défaut du traitement du formulaire
    event.preventDefault();

    // déclaration des variables pour récupérer et tester chaque champ du formulaire
    let firstName = document.getElementById('firstName');
    let firstNameError = document.getElementById('alerte-prénom');
    let firstNameOk = /^[a-zA-ZàâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ][a-zàâéèêîïôùûç]+([-'\s][a-zA-ZàâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ][a-zàâéèêîïôùûç]+)?$/;

    let lastName = document.getElementById('lastName');
    let lastNameError = document.getElementById('alerte-nom');
    let lastNameOk = /^[a-zA-ZàâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ][a-zA-ZàâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ]+([-'\s][a-zA-ZàâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ][a-zàâéèêîïôùûç]+)?$/;

    let address = document.getElementById('address');
    let addressError = document.getElementById('alerte-adresse');
    let addressOk = /^[\d]{1,4}[,]?\s[a-zA-Z'àâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ\s-]{2,80}$/;

    let city = document.getElementById('city');
    let cityError = document.getElementById('alerte-ville');
    let cityOk = /^[a-zA-ZàâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ]([a-zA-Z'àâéèêîïôùûçÀÂÉÈÊÎÏÔÙÛÇ\s-]?){1,45}$/;

    let email = document.getElementById('email');
    let emailError = document.getElementById('alerte-email');
    let emailOk = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // objet vide utilisé pour valider les champs
    const validation = {};

    // test de chaque champ du formulaire
    // si le champ est vide : indication de l'élément à compléter
    // si le format n'est pas respecté : indication de l'élément à corriger
    // si le champ est complété et correct : validation ok
    if (firstName.value.length == 0) {
        firstNameError.textContent = ' Veuillez indiquer votre prénom';
        firstNameError.style.color = 'red';
    } else if (firstNameOk.test(firstName.value) == false) {
        firstNameError.textContent = ' Format incorrect';
        firstNameError.style.color = 'orange';
    } else {
        validation.firstName = true;
    }
    if (lastName.value.length == 0) {
        lastNameError.textContent = ' Veuillez indiquer votre nom';
        lastNameError.style.color = 'red';
    } else if (lastNameOk.test(lastName.value) == false) {
        lastNameError.textContent = ' Format incorrect';
        lastNameError.style.color = 'orange';
    } else {
        validation.lastName = true;
    }
    if (address.value.length == 0) {
        addressError.textContent = ' Veuillez indiquer votre adresse';
        addressError.style.color = 'red';
    } else if (addressOk.test(address.value) == false) {
        addressError.textContent = ' Format incorrect';
        addressError.style.color = 'orange';
    } else {
        validation.address = true;
    }
    if (city.value.length == 0) {
        cityError.textContent = ' Veuillez indiquer votre ville';
        cityError.style.color = 'red';
    } else if (cityOk.test(city.value) == false) {
        cityError.textContent = ' Format incorrect';
        cityError.style.color = 'orange';
    } else {
        validation.city = true;
    }
    if (email.value.length == 0) {
        emailError.textContent = ' Veuillez indiquer votre email';
        emailError.style.color = 'red';
    } else if (emailOk.test(email.value) == false) {
        emailError.textContent = ' Format incorrect';
        emailError.style.color = 'orange';
    } else {
        validation.email = true;
    }

    // création de l'objet "contact" contenant les données du formulaire
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };

    // vérification que localStorage contient toujours les données
    const panier = localStorage.getItem('Articles');
    if (!panier) {
        alert("Erreur : votre panier est vide");
        window.location.replace("index.html");
    } else {

        // création  de l'objet "product" contenant les id des produits contenus dans le panier
        const products = JSON.parse(panier);

        // si tout est correct, appel de la fonction qui envoie les données à l'API
        if ((
                (validation.firstName == true) &&
                (validation.lastName == true) &&
                (validation.address == true) &&
                (validation.city == true) &&
                (validation.email == true)) &&
            products != null) {

            fetch('http://localhost:3000/api/cameras/order', {
                method: "POST",
                body: JSON.stringify({
                    contact,
                    products
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    response.json()
                        .then((data) => {
                            alert('Commande envoyée avec succès.');
                            // ouverture de la page de confirmation
                            window.location.replace("confirmation.html?orderId=" + data.orderId);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    console.error('Réponse du serveur : ' + response.status);
                }
            }).catch(error => {
                console.error(error);
            });
        }
    }
})