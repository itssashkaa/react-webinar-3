import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../store/use-selector";

function Controls({onAdd, localeData}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{localeData.btn_add}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  localeData: PropTypes.object
};

Controls.defaultProps = {
  onAdd: () => {},
  localeData: {}
}

export default memo(Controls);
