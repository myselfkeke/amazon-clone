let productsHtml = "";
products.forEach((product) => {
  productsHtml += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${
              product.rating.stars * 10
            }.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected="" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button data-product-id="${
            product.id
          }" class="add-to-cart-button button-primary js-add-to-cart-button">
            Add to Cart
          </button>
        </div>
        `;
});
document.querySelector(".js-products-grid").innerHTML = productsHtml;

const addToCartButtonArr = document.querySelectorAll(".js-add-to-cart-button");

addToCartButtonArr.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    let existingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) existingItem = cartItem;
    });
    existingItem
      ? existingItem.quantity++
      : cart.push({
          productId: productId,
          quantity: 1,
        });
    console.log(cart);
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(".js-cart-quantity").innerText = cartQuantity;
  });
});

// the below commented logic is given by chatgpt

// AddToCartButtonArr.forEach((addToCartButton) => {
//   addToCartButton.addEventListener("click", () => {
//     const productName = addToCartButton.dataset.productName;

//     // Find if item already exists
//     const existingItem = cart.find(
//       (cartItem) => cartItem.productName === productName
//     );

//     if (existingItem) {
//       // if present, increase quantity
//       existingItem.quantity++;
//     } else {
//       // if not present, add new one
//       cart.push({
//         productName,
//         quantity: 1,
//       });
//     }

//     console.log(cart);
//   });
// });
