class Cart {
  constructor(cart = []) {
    this.cart = cart;
    // Our chosen character list
    this.chosenChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789_';
    // Array for storing the string characters.
    this.stringArray = [];
    // Random character number
    this.iterationCount = 12;
  }

  static generateID() {
    // Looping through our character
    for (let i = 0; i < this.iterationCount; i += 1) {
      // Get a random character index
      const randCharIndex = Math.floor(Math.random() * this.chosenChar.length);
      // Get the character
      const char = this.chosenChar.charAt(randCharIndex);

      // Push the character to our string array
      this.stringArray.push(char);
    }
    // Return the full random string.
    const string = this.stringArray.join('');

    // Clean our stringArray
    this.stringArray.splice(0, this.stringArray.length);

    // Return our random string
    return string;
  }

  // @params _body req.body
  // @desc Storing the post data
  cartOrder(_body) {
    // Construct a db Object for the order
    const order = {
      order: {
        id: Cart.generateID(),
        name: _body.name,
        price: _body.price,
        quantity: _body.quantity,
      },
    };
    // Store the order details in our cart
    this.cart.push(order);
    return this.cart;
  }

  // @desc Displaying all the orders
  showAllOrders() {
    return this.cart;
  }

  // @params _orderID req.params, _body req.body
  // @desc Updates a specific order
  updateSpecificOrder(_orderID, _body) {
    // Getting the order item index
    const orderIndex = this.cart.findIndex(order => order.order.id === _orderID);

    // Remove the order from our cart
    const orderData = this.cart.splice(orderIndex, 1);

    // Construct a db Object for the order
    const order = {
      order: {
        id: orderData[0].order.id,
        name: _body.name,
        price: _body.price,
        quantity: _body.quantity,
      },
    };
    // cart the order details in our cart
    this.cart.push(order);
    return order;
  }

  // @params _orderID req.params
  // @desc Displays a specific order
  deleteSpecificOrder(_orderID) {
    // Getting the order item index
    const orderIndex = this.cart.findIndex(order => order.order.id === _orderID);

    // Remove the order from our cart
    this.cart.splice(orderIndex, 1);
    return true;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cart.forEach((order) => {
      const orderPrice = order.qty * order.price;
      totalPrice += orderPrice;
    });
    return totalPrice;
  }
}

window.onload = () => {
  let cart;
  let cartStore = JSON.parse(localStorage.getItem('cart'));
  if (cartStore === null) {
    cart = new Cart();
  } else {
    cart = new Cart(cartStore);
  }
};
