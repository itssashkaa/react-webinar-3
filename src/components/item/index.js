import React from "react";
import PropTypes from "prop-types";
import {priceFormat} from "../../utils";
import './style.css';

function Item(props) {
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price">
        {priceFormat(props.item.price)}
      </div>
      {props.isCart && (
        <div className="Item-count">
          {props.item.count} шт.
        </div>
      )}
      <div className='Item-actions'>
        <button onClick={() => props.isCart ? props.cartAction(props.item.code) : props.cartAction(props.item)}>
          {props.isCart ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  cartAction: PropTypes.func,
  isCart: PropTypes.bool
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
  cartAction: () => {},
  isCart: false
}

export default React.memo(Item);
