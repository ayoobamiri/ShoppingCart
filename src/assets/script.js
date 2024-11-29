const products = [
  {
    name: 'Carton of Cherry',
    price: 4,
    quantity: 0,
    productId: 1,
    image: 'images/cherry.jpg'
  },
  {
    name: 'Carton of Strawberries',
    price: 5,
    quantity: 0,
    productId: 2,
    image: 'images/strawberry.jpg'
  },
  {
    name: 'Bag of Orange',
    price: 10,
    quantity: 0,
    productId: 3,
    image: 'images/orange.jpg'
  }
];

let cart = [];
let totalPaid = 0;

// Helper function to find a product by ID
function findProductById(productId) {
  return products.find(product => product.productId === productId);
}

// Helper function to find a product in the cart
function findCartIndexById(productId) {
  return cart.findIndex(product => product.productId === productId);
}

// Add product to cart or update its quantity
function addProductToCart(productId) {
  const product = findProductById(productId);
  if (product) {
    product.quantity += 1;
    if (!cart.includes(product)) {
      cart.push(product);
    }
  }
}

// Increase the quantity of a product


function increaseQuantity(productId) {
  const product = findProductById(productId); // Locate product in products array
  if (product) {
    product.quantity += 1; // Increment product quantity
    if (!cart.includes(product)) {
      cart.push(product); // Add to cart if not already there
    }
  }
}


function pay(amount) {
  totalPaid += amount; // Add the payment amount to the total paid
  const remaining = totalPaid - cartTotal(); // Call cartTotal as a function

  if (remaining >= 0) {
    totalPaid = 0; // Reset for the next transaction
    emptyCart(); // Clear the cart
    return remaining; // Return the change if there's any
  } else {
    return remaining; // Return negative balance to indicate amount still needed
  }
}


function emptyCart() {
  // Clears the cart (implementation depends on your cart structure)
  // For example, resetting all quantities to zero:
  products.forEach(product => product.quantity = 0);
}



// Decrease the quantity of a product
function decreaseQuantity(productId) {
  const product = findProductById(productId);
  if (product) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

// Remove a product from the cart
function removeProductFromCart(productId) {
  const index = findCartIndexById(productId);
  if (index !== -1) {
    cart[index].quantity = 0;
    cart.splice(index, 1);
  }
}

// Calculate the total price of the cart
function cartTotal() {
  return cart.reduce((total, product) => total + product.quantity * product.price, 0);
}


module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
};
