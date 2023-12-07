import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../store/use-selector";

function Controls({onAdd}) {
  const localeData = useSelector(state => state.locale.localeData)
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{localeData.btn_add}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
