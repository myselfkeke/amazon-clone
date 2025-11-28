import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  it("display the cart", () => {
    const orderSummaryDivTest = document.querySelector(".js-test-container");
    orderSummaryDivTest.innerHTML = `<div class="js-order-summary"> </div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });
});
