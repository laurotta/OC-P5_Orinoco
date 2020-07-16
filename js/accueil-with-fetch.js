fetch('http://localhost:3000/api/cameras/')
    .then(response => response.json())
    .then(products => {
        console.log(products)
        let container = document.getElementById("products");

        // boucle forEach pour afficher tous les résultats trouvés
        products.forEach((item) => {

            // création des éléments
            let itemColumn = document.createElement("div");
            let itemContainer = document.createElement("div");
            let itemImage = document.createElement("img");
            let itemContent = document.createElement("div");
            let itemTitle = document.createElement("h3");
            let itemName = document.createElement("a");
            let itemPricePlace = document.createElement("p");
            let itemPrice = item.price / 100;
            let itemURL = "produit.html?id=" + item._id;

            // affectation des attributs
            itemColumn.setAttribute("class", "col-sm-4");
            itemContainer.setAttribute("class", "product-item");
            itemImage.setAttribute("class", "product-thumb")
            itemImage.setAttribute("src", item.imageUrl);
            itemContent.setAttribute("class", "product-content");
            itemTitle.setAttribute("class", "product-name");
            itemName.setAttribute("href", itemURL);
            itemPricePlace.setAttribute("class", "price");

            // disposition des éléments
            container.appendChild(itemColumn);
            itemColumn.appendChild(itemContainer);
            itemContainer.appendChild(itemImage);
            itemContainer.appendChild(itemContent);
            itemContent.appendChild(itemTitle);
            itemTitle.appendChild(itemName);
            itemContent.appendChild(itemPricePlace);

            // affiche le nom et le prix du produit
            itemName.textContent = item.name;
            itemPricePlace.textContent = `${itemPrice.toFixed(2)} €`;
        })
    })
    .catch(error => console.error(error))