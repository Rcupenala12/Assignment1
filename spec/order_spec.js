import { Order } from '../Order.js';

describe("Tests all stages of an order", function() {

    it("test greeting", function() {
        const oOrder = new Order("999-999-9999");
        const aResults = oOrder.handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Renette's Dream Restaurant!");
    });

    it("test order item", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        const aResults = oOrder.handleInput("pizza");
        expect(aResults[0]).toBe("Great choice! What size would you like? (small, medium, large)");
    });

    it("test order size", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("burger");
        const aResults = oOrder.handleInput("medium");
        expect(aResults[0]).toBe("Awesome! What toppings would you like? (e.g., cheese, bacon, mushrooms)");
    });

    it("test toppings", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("burger");
        oOrder.handleInput("large");
        const aResults = oOrder.handleInput("cheese, mushrooms");
        expect(aResults[0]).toBe("Toppings added! Would you like a drink? (Coke, Sprite, Water)");
    });

    it("test upsell item", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("pizza");
        oOrder.handleInput("small");
        oOrder.handleInput("pepperoni, olives");
        const aResults = oOrder.handleInput("coke");
        expect(aResults[0]).toBe("Thank you for your order!");
    });

    it("test order summary", function() {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("burger");
        oOrder.handleInput("medium");
        oOrder.handleInput("bacon, lettuce");
        oOrder.handleInput("water");
        const aResults = oOrder.handleInput("");
        expect(aResults[1]).toContain("Order Summary:");
    });

});

  
  