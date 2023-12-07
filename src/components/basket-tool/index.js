import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import useSelector from "../../store/use-selector";
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const localeData = useSelector(state => state.locale.localeData)
  return (
    <div className={cn()}>
      <Link to="/list" className={cn('nav')}>{localeData.nav_main}</Link>
      <span className={cn('label')}>{localeData.cart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: localeData.item,
            few: localeData.few_items,
            many: localeData.many_items,
          })} / ${numberFormat(sum)} ₽`
          : localeData.empty
        }
      </span>
      <button onClick={onOpen}>{localeData.to_cart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
