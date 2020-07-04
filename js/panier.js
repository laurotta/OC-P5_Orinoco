window.onload = () => {
    if(localStorage.Articles != null){
        let itemsInCart = JSON.parse(localStorage.Articles);
        let sum = 0;
    
        itemsInCart.forEach((id) => {
                    
            let url = "http://localhost:3000/api/cameras/" + id;

            fetch(url).then((response) =>
                response.json().then((data) => {

                    let productName = data.name;
                    let productPrice = data.price / 100;
                    let container = document.getElementById("cart-tablebody");
                    let line = document.createElement("tr");
                    let cellName = document.createElement("td");
                    let cellPrice = document.createElement("td");
                    let totalPlace = document.getElementById("total");

                    container.appendChild(line);
                    line.appendChild(cellName);
                    line.appendChild(cellPrice);

                    cellName.textContent = productName;
                    cellPrice.textContent = `${productPrice.toFixed(2)} €`;
                    sum += data.price / 100;
                    totalPlace.textContent = `${sum.toFixed(2)} €`;
                })
            )
        });
        
    } else {
        window.alert("Le panier est vide");
        window.location.replace("index.html");
    }
}