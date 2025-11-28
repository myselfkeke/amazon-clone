class Cart {
  cartItems;
  #localStorageKey; // # sign before the localStorageKey make it private. which means it will only be accesible inside the class and team can't mutate it outsid of the class.

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();

    // businessCart.localStorageKey = "cart-business";
    // businessCart.loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

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
  }
  removeFromCart(productId) {
    let newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (this.cartItems.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let existingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        existingItem = cartItem;
      }
    });

    existingItem.deliveryOptionsId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
