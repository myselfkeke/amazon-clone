import { cart, removeFromCart } from "../data/cart.js";
console.log(cart);

import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { updateDeliveryOption } from "../data/cart.js";

// code to make chekout.html interactive
let cartSummaryHtml = "";
cart.forEach((cartItem) => {
  console.log(cartItem);

  let productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;

      const deliveryOptionId = cartItem.deliveryOptionsId;
      let deliveryOption;

      deliveryOptions.forEach((option) => {
        console.log(deliveryOptionId);

        if (option.id === deliveryOptionId) {
          deliveryOption = option;
        }
      });

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-quantity-link link-primary" data-delete-link-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               
                ${deliveryOptionsHTML(matchingProduct, cartItem)}

              </div>
            </div>
          </div>
      `;
    }
  });
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

    html += ` <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}"
            >
      <input
        type="radio"
        ${isChecked ? "checked" : " "}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
      />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString}</div>
      </div>
    </div>
  `;
  });
  return html;
}

const orderSummaryDiv = document.querySelector(".js-order-summary");
orderSummaryDiv.innerHTML = cartSummaryHtml;

// to make the delete button interactive here are the steps
// 1. acces the html element and add eventListener
// 2. update the cart order
// 3. update the cart order summary, by removing the html.

const deleteLinkArr = document.querySelectorAll(".js-delete-quantity-link");

deleteLinkArr.forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.deleteLinkId;

    removeFromCart(productId);
    console.log(cart);
    // steps to delete the item from order summary
    // -1. Use the DOM to get the exact element which is to ve remove and
    // -2. Use the .remove() method to update the cart summary page
    // note removing from the cart and updating the html of order summary both shoul be happening once user click the delete Link.
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});

const deliveryOptionArr = document.querySelectorAll(".js-delivery-option");

deliveryOptionArr.forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;

    updateDeliveryOption(productId, deliveryOptionId);
  });
});
