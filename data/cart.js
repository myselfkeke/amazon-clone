export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
      quantity: 5,
      deliveryOptionsId: "1",
    },
    {
      productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
      quantity: 2,
      deliveryOptionsId: "2",
    },
  ];
}

// function to save the cart to local storage so that it doesn't get reset when the page is refreashed as they are stored in valiable till now and variable vaporates when page is refreashed.

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// function to Add Item to Cart;
export function addItemToCart(productId) {
  let existingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) existingItem = cartItem;
  });
  existingItem
    ? existingItem.quantity++
    : cart.push({
        productId,
        quantity: 1,
        deliveryOptionsId: "1",
      });
  console.log(cart);

  saveToStorage();
}

// note - what is normalizing the data or deduplicationg the data

// function to remove the cart item when delete link is clicked.
export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}
