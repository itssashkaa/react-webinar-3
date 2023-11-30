import React from 'react';
import PropTypes from "prop-types";
import './style.css';

const Modal = (props) => {
  return (
    <div className={'Modal' + (props.visible ? ' Modal_active' : '')} onClick={() => props.setVisible(false)}>
      <div className='Modal__content' onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  children: PropTypes.node
}

Modal.defautltProps = {
  visible: false,
  setVisible: () => {}
}

export default React.memo(Modal)