import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormat } from "../../utils";

function Controls({setModal, cartInfo}) {
  console.log(cartInfo);
  return (
    <div className='Controls'>
      <div className="Controls__text">
        В корзине:
        <span className="Controls__text_strong"> 
          {cartInfo.items_count === 0 
           ? 'Пусто'
           : `${cartInfo.items_count} ${plural(cartInfo.items_count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${priceFormat(cartInfo.total_price)}`
           }
          
        </span>
      </div>
      <button onClick={() => setModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  setModal: PropTypes.func,
  cartInfo: PropTypes.shape({
    items_count: PropTypes.number,
    total_price: PropTypes.number
  })
};

Controls.defaultProps = {
  setModal: () => {},
  cartInfo: PropTypes.shape({
    items_count: 0,
    total_price: 0
  })
}

export default React.memo(Controls);
