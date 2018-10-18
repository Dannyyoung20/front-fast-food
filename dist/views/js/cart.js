'use strict';

const cartStore = JSON.parse(localStorage.getItem('cart'));
class Cart {
  constructor() {
    if (cartStore === null) {
      this.cart = [];
    } else {
      this.cart = cartStore;
    }
  }

  static generateID() {
    // Our chosen character list
    const chosenChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789_';

    // Random character number
    const iterationCount = 10;

    // Array for storing the string characters.
    const stringArray = [];
    // Looping through our character
    for (let i = 0; i < iterationCount; i += 1) {
      // Get a random character index
      const randCharIndex = Math.floor(Math.random() * chosenChar.length);
      // Get the character
      const char = chosenChar.charAt(randCharIndex);

      // Push the character to our string array
      stringArray.push(char);
    }
    // Return the full random string.
    const string = stringArray.join('');

    // Clean our stringArray
    stringArray.splice(0, stringArray.length);

    // Return our random string
    return string;
  }

  // @params _body req.body
  // @desc Storing the post data
  storeOrder(_body) {
    // Construct a db Object for the order
    const order = {
      id: Cart.generateID(),
      name: _body.name,
      price: _body.price,
      quantity: _body.quantity,
      imageUrl: _body.imageUrl
    };
    // Store the order details in our cart
    this.cart.push(order);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return true;
  }

  // @desc Displaying all the orders
  showAllOrders() {
    return this.cart;
  }

  // @params _orderID req.params, _body req.body
  // @desc Updates a specific order
  updateSpecificOrder(_orderID, _body) {
    // Getting the order item index
    const orderIndex = this.cart.findIndex(order => order.id === _orderID);

    // Remove the order from our cart
    const orderData = this.cart.splice(orderIndex, 1);

    // Construct a db Object for the order
    const order = {
      id: orderData[0].id,
      name: orderData[0].name,
      price: orderData[0].price,
      quantity: _body.quantity,
      imageUrl: orderData[0].imageUrl
    };
    // cart the order details in our cart
    this.cart.push(order);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateQuantityOrder(_orderID, _body) {
    // Getting the order item index
    const orderIndex = this.cart.findIndex(order => order.id === _orderID);

    // Remove the order from our cart
    const orderData = this.cart.splice(orderIndex, 1);
    const newQty = _body.quantity + orderData[0].quantity;

    // Construct a db Object for the order
    const order = {
      id: orderData[0].id,
      name: orderData[0].name,
      price: orderData[0].price,
      quantity: newQty,
      imageUrl: orderData[0].imageUrl
    };
    // cart the order details in our cart
    this.cart.push(order);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // @params _orderID req.params
  // @desc Displays a specific order
  deleteSpecificOrder(_orderID) {
    // Getting the order item index
    const orderIndex = this.cart.findIndex(order => order.id === _orderID);

    // Remove the order from our cart
    this.cart.splice(orderIndex, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return true;
  }

  deleteAllOrders() {
    localStorage.removeItem('cart');
    this.cart = [];
  }

  getSpecificOrder(name) {
    const orderIndex = this.cart.findIndex(order => order.name === name);

    if (orderIndex === -1) {
      return false;
    }
    return this.cart[orderIndex].id;
  }

  getTotalPrice() {
    let totalPrice = 0;
    if (Array.isArray(this.cart) && this.cart.length !== 0) {
      this.cart.forEach(order => {
        const orderPrice = order.quantity * order.price;
        totalPrice += orderPrice;
      });
    }
    return totalPrice;
  }
}