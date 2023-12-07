import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const localeData = useSelector(state => state.locale.localeData);
  const store = useStore();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  function closeModal () {
    store.actions.modal.close();
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link className={cn('title')} to={`/list/${props.item._id}`} onClick={closeModal}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{localeData.btn_remove}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
