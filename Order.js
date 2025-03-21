export class Order {
  constructor(sFrom) {
      this.sFrom = sFrom;
      this.isDone = false;
      this.sItem = "";
      this.sSize = "";
      this.sToppings = "";
      this.sDrink = "";

      this.OrderState = {
          WELCOMING: () => {
              let aReturn = [];
              this.stateCur = this.OrderState.ORDERING;
              aReturn.push("Welcome to Renette's Dream Restaurant!");
              aReturn.push("What would you like to order? (Burger or Pizza)");
              return aReturn;
          },
          ORDERING: (sInput) => {
              let aReturn = [];
              this.sItem = sInput.toLowerCase();
              if (this.sItem !== "burger" && this.sItem !== "pizza") {
                  aReturn.push("Sorry, we only serve Burger or Pizza. Please choose one.");
                  return aReturn;
              }
              this.stateCur = this.OrderState.SIZE;
              aReturn.push(`Great choice! What size would you like? (Small, Medium, Large)`);
              return aReturn;
          },
          SIZE: (sInput) => {
              let aReturn = [];
              this.sSize = sInput.toLowerCase();
              if (!["small", "medium", "large"].includes(this.sSize)) {
                  aReturn.push("Please choose Small, Medium, or Large.");
                  return aReturn;
              }
              this.stateCur = this.OrderState.TOPPINGS;
              aReturn.push("Awesome! What toppings would you like? (e.g., cheese, bacon, mushrooms)");
              return aReturn;
          },
          TOPPINGS: (sInput) => {
              let aReturn = [];
              this.sToppings = sInput;
              this.stateCur = this.OrderState.DRINK;
              aReturn.push("Toppings added! Would you like a drink? (Coke, Sprite, Water)");
              return aReturn;
          },
          DRINK: (sInput) => {
              let aReturn = [];
              this.sDrink = sInput.toLowerCase();
              this.stateCur = this.OrderState.CONFIRMATION;
              aReturn.push("Thank you! Here is your order summary:");
              aReturn.push(`🍔 ${this.sSize} ${this.sItem} with ${this.sToppings}`);
              if (this.sDrink !== "no") {
                  aReturn.push(`🥤 Drink: ${this.sDrink}`);
              }
              aReturn.push("Would you like to confirm your order? (Yes/No)");
              return aReturn;
          },
          CONFIRMATION: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().startsWith('y')) {
                  aReturn.push("✅ Your order is confirmed!");
                  aReturn.push(`📞 We will text you when it's ready for pickup at Renette's Dream Restaurant.`);
              } else {
                  aReturn.push("❌ Order canceled. Let us know if you’d like to order again!");
              }
              this.isDone = true;
              return aReturn;
          }
      };

      this.stateCur = this.OrderState.WELCOMING;
  }

  handleInput(sInput) {
      return this.stateCur(sInput);
  }

  isDone() {
      return this.isDone;
  }
}
