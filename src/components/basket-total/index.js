import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import useSelector from "../../store/use-selector";

function BasketTotal({sum, localeData}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{localeData.total_price}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  localeData: PropTypes.object
};

BasketTotal.defaultProps = {
  sum: 0,
  localeData: {}
}

export default memo(BasketTotal);
