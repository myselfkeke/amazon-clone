export const cart = [
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    quantity: 5,
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    quantity: 2,
  },
];

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
      });
  console.log(cart);
}

// note - what is normalizing the data or deduplicationg the data
