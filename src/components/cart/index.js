import React from "react";
import Head from "../head";
import Item from "../item";
import { PropTypes } from "prop-types";
import "./style.css";
import List from "../list";
import { priceFormat } from "../../utils";

const cart = ({ cartList, setModal, cartAction, isModal }) => {
  const totalPrice = cartList.reduce(
    (price, item) => price + item.price * item.count,
    0
  );
  return (
    <div className="Cart">
      <Head title="Корзина">
        <button className="Cart__close-btn" onClick={() => setModal(false)}>
          Закрыть
        </button>
      </Head>
      <div className="Cart__list">
        {cartList.length ? (
          <List list={cartList} cartAction={cartAction} isCart={true} />
        ) : (
          <div className="Cart__list_empty">В корзине пусто</div>
        )}
        {totalPrice ? (
          <div className="Cart__list__footer">
            <div className="Cart__list__footer__item">Итого:</div>
            <div className="Cart__list__footer__item">{priceFormat(totalPrice)}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

cart.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cartAction: PropTypes.func,
  setModal: PropTypes.func,
  isModal: PropTypes.bool,
};

Item.defaultProps = {
  cartAction: () => {},
  setModal: () => {},
  isModal: false,
};

export default React.memo(cart);
