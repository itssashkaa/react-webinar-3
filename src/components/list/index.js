import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, cartAction, isCart}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} cartAction={cartAction} isCart={isCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  cartAction: PropTypes.func.isRequired,
  isCart: PropTypes.bool
};

List.defaultProps = {
  cartAction: () => {},
  isCart: false
}

export default React.memo(List);
