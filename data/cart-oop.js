function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
            quantity: 1,
            deliveryOptionsId: "1",
          },
          {
            productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
            quantity: 2,
            deliveryOptionsId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addItemToCart(productId) {
      let existingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) existingItem = cartItem;
      });
      existingItem
        ? existingItem.quantity++
        : this.cartItems.push({
            productId,
            quantity: 1,
            deliveryOptionsId: "1",
          });
      this.saveToStorage();
    },

    removeFromCart(productId) {
      let newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (this.cartItems.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let existingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          existingItem = cartItem;
        }
      });

      existingItem.deliveryOptionsId = deliveryOptionId;
      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
