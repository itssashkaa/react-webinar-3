import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormat } from "../../utils";

function Controls({setModal, cart}) {
  const totalPrice = cart.reduce((price, item) => {
    return price + item.count * item.price
  }, 0);
  const uniqItemsCount = cart.length;
  return (
    <div className='Controls'>
      <div className="Controls__text">
        В корзине:
        <span className="Controls__text_strong"> {uniqItemsCount} {plural(uniqItemsCount, {one: 'товар', few: 'товара', many: 'товаров'})} / {priceFormat(totalPrice)}</span>
      </div>
      <button onClick={() => setModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setModal: PropTypes.func,
  cart: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
};

Controls.defaultProps = {
  setModal: () => {}
}

export default React.memo(Controls);
