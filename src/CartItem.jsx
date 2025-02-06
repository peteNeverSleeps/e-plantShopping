import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total amount for all items in the cart.
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const unitCost = parseFloat(item.cost.replace('$', ''));
      return total + unitCost * item.quantity;
    }, 0).toFixed(2);
  };

  // Continue shopping handler calls the parent function passed in props.
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Increments the quantity of an item.
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrements the quantity. If quantity reaches 0, remove the item.
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Removes an item from the cart.
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculates the subtotal cost for a given item.
  const calculateTotalCost = (item) => {
    const unitCost = parseFloat(item.cost.replace('$', ''));
    return (unitCost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button 
          className="get-started-button1" 
          onClick={() => alert("Checkout functionality will be added later")}
        >Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
